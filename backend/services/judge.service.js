
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("🚀 NATIVE EXECUTION Judge Service Loaded");

/* ---------------- CONFIG ---------------- */

const BASE_DIR = path.join(__dirname, "../temp");
if (!fs.existsSync(BASE_DIR)) {
  fs.mkdirSync(BASE_DIR, { recursive: true });
}

/* Language configuration - NATIVE EXECUTION */
const LANG = {
  cpp: {
    file: "main.cpp",
    compile: ["g++", "main.cpp", "-O2", "-std=c++17", "-o", "main"],
    run: ["./main"]
  },
  python: {
    file: "main.py",
    run: ["python3", "main.py"]
  },
  java: {
    file: "Main.java",
    compile: ["javac", "Main.java"],
    run: ["java", "Main"]
  }
};

/* ---------------- QUEUE ---------------- */

const queue = [];
let running = 0;
const MAX_CONCURRENT = 10; // ⚡ Handle 10 submissions at once

function processQueue() {
  if (running >= MAX_CONCURRENT || queue.length === 0) return;
  const job = queue.shift();
  running++;
  job()
    .catch((err) => console.error("❌ Queue job failed:", err))
    .finally(() => {
      running--;
      processQueue();
    });
}

/* ---------------- MAIN JUDGE FUNCTION ---------------- */

async function runJudge(code, language, testCases) {
  console.log(`⚡ Native runJudge: ${language}, ${testCases.length} tests`);

  return new Promise((resolve) => {
    const task = async () => {
      const startTime = Date.now();
      const langConfig = LANG[language];

      if (!langConfig) {
        return resolve({
          success: false,
          verdict: "ERR",
          error: `Unsupported language: ${language}`,
          passed: 0,
          total: testCases.length,
          results: [],
          outputs: []
        });
      }

      const runId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const workDir = path.join(BASE_DIR, runId);
      fs.mkdirSync(workDir, { recursive: true });

      const codeFile = path.join(workDir, langConfig.file);
      fs.writeFileSync(codeFile, code);

      // ⚡ PRE-COMPILE ONCE
      if (langConfig.compile) {
        const compileError = await compileNative(workDir, langConfig);
        
        if (compileError) {
          cleanup(workDir);
          return resolve({
            success: false,
            verdict: "CE",
            error: compileError,
            passed: 0,
            total: testCases.length,
            results: Array(testCases.length).fill("CE"),
            outputs: Array(testCases.length).fill("")
          });
        }
      }

      // ⚡ RUN ALL TESTS IN PARALLEL
      const testResults = await Promise.all(
        testCases.map((tc, i) => runTestNative(workDir, langConfig, tc, i))
      );

      cleanup(workDir);

      const outputs = testResults.map(r => r.output || "");
      const verdicts = testResults.map(r => r.verdict);
      const passed = verdicts.filter(v => v === "AC").length;
      const firstError = testResults.find(r => r.error);

      let finalVerdict = "AC";
      if (verdicts.includes("CE")) finalVerdict = "CE";
      else if (verdicts.includes("TLE")) finalVerdict = "TLE";
      else if (verdicts.includes("RE")) finalVerdict = "RE";
      else if (verdicts.includes("WA")) finalVerdict = "WA";

      const totalTime = Date.now() - startTime;

      const finalResult = {
        success: passed === testCases.length,
        passed,
        total: testCases.length,
        verdict: finalVerdict,
        score: Math.floor((passed / testCases.length) * 100),
        results: verdicts,
        outputs: outputs,
        error: firstError?.error || null,
        message: passed === testCases.length 
          ? "All test cases passed! 🎉" 
          : `${passed}/${testCases.length} test cases passed`,
        executionTime: totalTime
      };

      console.log(`✅ NATIVE: ${passed}/${testCases.length} in ${totalTime}ms`);
      resolve(finalResult);
    };

    queue.push(task);
    processQueue();
  });
}

/* ---------------- NATIVE COMPILATION ---------------- */

async function compileNative(workDir, langConfig) {
  return new Promise((resolve) => {
    const compile = spawn(langConfig.compile[0], langConfig.compile.slice(1), {
      cwd: workDir,
      timeout: 10000
    });

    let stderr = "";
    compile.stderr.on("data", (data) => { stderr += data; });

    compile.on("close", (code) => {
      if (code !== 0) {
        resolve(stderr.substring(0, 500));
      } else {
        resolve(null);
      }
    });

    compile.on("error", (err) => {
      resolve(`Compilation error: ${err.message}`);
    });
  });
}

/* ---------------- NATIVE TEST EXECUTION ---------------- */

async function runTestNative(workDir, langConfig, testCase, testIndex) {
  return new Promise((resolve) => {
    const TIME_LIMIT = 2000; // 2 seconds

    const startTime = Date.now();
    let timedOut = false;

    // ⚡ Spawn process directly on host
    const run = spawn(langConfig.run[0], langConfig.run.slice(1), {
      cwd: workDir,
      stdio: ['pipe', 'pipe', 'pipe']
    });

    let stdout = "";
    let stderr = "";

    run.stdout.on("data", (data) => { stdout += data; });
    run.stderr.on("data", (data) => { stderr += data; });

    // Feed input
    run.stdin.write(testCase.input);
    run.stdin.end();

    // Timeout handler
    const timeout = setTimeout(() => {
      timedOut = true;
      run.kill("SIGKILL");
    }, TIME_LIMIT);

    run.on("close", (code) => {
      clearTimeout(timeout);
      const executionTime = Date.now() - startTime;

      if (timedOut) {
        return resolve({
          verdict: "TLE",
          output: "",
          error: `Time Limit Exceeded (${executionTime}ms)`
        });
      }

      // Runtime error
      if (code !== 0 && stderr) {
        return resolve({
          verdict: "RE",
          output: stdout.trim(),
          error: stderr.substring(0, 300)
        });
      }

      // Compare outputs
      const actualOutput = normalizeOutput(stdout);
      const expectedOutput = normalizeOutput(testCase.output);

      if (actualOutput === expectedOutput) {
        resolve({ verdict: "AC", output: actualOutput });
      } else {
        resolve({
          verdict: "WA",
          output: actualOutput,
          error: `Expected: ${expectedOutput.substring(0, 100)}\nGot: ${actualOutput.substring(0, 100)}`
        });
      }
    });

    run.on("error", (err) => {
      clearTimeout(timeout);
      resolve({
        verdict: "RE",
        output: "",
        error: `Execution error: ${err.message}`
      });
    });
  });
}

/* ---------------- HELPER FUNCTIONS ---------------- */

function normalizeOutput(str) {
  return str
    .trim()
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join('\n');
}

function cleanup(workDir) {
  try {
    fs.rmSync(workDir, { recursive: true, force: true });
  } catch (err) {
    console.error("⚠️ Cleanup failed:", err.message);
  }
}

/* ---------------- EXPORTS ---------------- */

module.exports = { runJudge };

console.log("⚡ NATIVE Judge ready - Direct execution (10x faster!)");