const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("✅ judge.service.js loaded");

/* ---------------- CONFIG ---------------- */

const BASE_DIR = path.join(__dirname, "../temp");
if (!fs.existsSync(BASE_DIR)) {
  fs.mkdirSync(BASE_DIR, { recursive: true });
}

/* Language configuration */
const LANG = {
  cpp: {
    file: "main.cpp",
    image: "gcc:latest",
    compile: "g++ main.cpp -O2 -std=c++17 -o main",
    run: "./main"
  },
  python: {
    file: "main.py",
    image: "python:3.11-slim",
    run: "python3 main.py"
  },
  js: {
    file: "main.js",
    image: "node:18-slim",
    run: "node main.js"
  },
  java: {
    file: "Main.java",
    image: "openjdk:17-slim",
    compile: "javac Main.java",
    run: "java Main"
  }
};

/* ---------------- QUEUE ---------------- */

const queue = [];
let running = 0;
const MAX_CONCURRENT = 2; // Safe for t2.micro

function processQueue() {
  console.log("🔄 processQueue called - Queue:", queue.length, "Running:", running);

  if (running >= MAX_CONCURRENT) return;
  if (queue.length === 0) return;

  const job = queue.shift();
  running++;

  job()
    .catch((err) => {
      console.error("❌ Queue job failed:", err);
    })
    .finally(() => {
      running--;
      processQueue();
    });
}

/* ---------------- MAIN JUDGE FUNCTION ---------------- */

async function runJudge(code, language, testCases) {
  console.log("🚀 runJudge called");
  console.log("➡️ Language:", language);
  console.log("➡️ Test cases:", testCases.length);

  return new Promise((resolve) => {
    const task = async () => {
      console.log("📥 Task started from queue");

      const langConfig = LANG[language];
      if (!langConfig) {
        return resolve({
          success: false,
          verdict: "ERR",
          error: `Unsupported language: ${language}`,
          passed: 0,
          total: testCases.length
        });
      }

      // Create unique work directory
      const runId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const workDir = path.join(BASE_DIR, runId);
      fs.mkdirSync(workDir, { recursive: true });

      // Write code to file
      const codeFile = path.join(workDir, langConfig.file);
      fs.writeFileSync(codeFile, code);
      console.log("📝 Code written to:", codeFile);

      const results = [];
      let passed = 0;
      let firstError = null;

      // Run each test case
      for (let i = 0; i < testCases.length; i++) {
        const testCase = testCases[i];
        console.log(`\n🧪 Running Test Case ${i + 1}/${testCases.length}`);

        const result = await runSingleTest(workDir, langConfig, testCase);
        
        results.push(result.verdict);
        
        if (result.verdict === "AC") {
          passed++;
          console.log(`✅ Test ${i + 1}: PASSED`);
        } else {
          console.log(`❌ Test ${i + 1}: ${result.verdict}`);
          if (!firstError) {
            firstError = result;
          }
          // Continue running all tests instead of stopping at first failure
        }
      }

      // Cleanup
      try {
        fs.rmSync(workDir, { recursive: true, force: true });
        console.log("🧹 Cleaned up work directory");
      } catch (err) {
        console.error("⚠️ Cleanup failed:", err.message);
      }

      // Determine final verdict
      let finalVerdict = "AC";
      if (results.includes("CE")) finalVerdict = "CE";
      else if (results.includes("TLE")) finalVerdict = "TLE";
      else if (results.includes("RE")) finalVerdict = "RE";
      else if (results.includes("WA")) finalVerdict = "WA";

      const finalResult = {
        success: passed === testCases.length,
        passed,
        total: testCases.length,
        verdict: finalVerdict,
        score: Math.floor((passed / testCases.length) * 100),
        results,
        error: firstError?.error || null,
        message: passed === testCases.length 
          ? "All test cases passed! 🎉" 
          : `${passed}/${testCases.length} test cases passed`
      };

      console.log("🏁 Final Result:", finalResult);
      resolve(finalResult);
    };

    queue.push(task);
    processQueue();
  });
}

/* ---------------- RUN SINGLE TEST ---------------- */

async function runSingleTest(workDir, langConfig, testCase) {
  return new Promise((resolve) => {
    const TIME_LIMIT = 5000; // 5 seconds
    const MEMORY_LIMIT = "256m";

    // Prepare input file
    const inputFile = path.join(workDir, "input.txt");
    fs.writeFileSync(inputFile, testCase.input);

    // Build Docker command
    let cmd = "";
    if (langConfig.compile) {
      // Compile first, then run with input
      cmd = `cd /code && ${langConfig.compile} 2>&1 && cat input.txt | ${langConfig.run} 2>&1`;
    } else {
      // Just run with input
      cmd = `cd /code && cat input.txt | ${langConfig.run} 2>&1`;
    }

    const dockerCommand = `docker run --rm --memory="${MEMORY_LIMIT}" --cpus="1.0" --network none -v "${workDir}:/code" -w /code ${langConfig.image} sh -c "${cmd}"`;

    console.log("🐳 Executing Docker container...");

    const execProcess = exec(
      dockerCommand,
      {
        timeout: TIME_LIMIT,
        maxBuffer: 10 * 1024 * 1024, // 10MB
        killSignal: "SIGKILL"
      },
      (error, stdout, stderr) => {
        console.log("🐳 Docker execution completed");

        // Handle different error types
        if (error) {
          if (error.killed || error.signal === "SIGKILL") {
            console.log("⏱️ Time Limit Exceeded");
            return resolve({ 
              verdict: "TLE", 
              output: "", 
              error: "Time Limit Exceeded (5s)" 
            });
          }
          
          // Check if it's a compilation error
          const combinedOutput = (stdout + stderr).toLowerCase();
          if (combinedOutput.includes("error:") || combinedOutput.includes("exception")) {
            if (combinedOutput.includes("error:") && !stdout.trim()) {
              console.log("❌ Compilation Error");
              return resolve({ 
                verdict: "CE", 
                output: "", 
                error: stderr.substring(0, 500) 
              });
            }
            
            // Runtime error
            console.log("❌ Runtime Error");
            return resolve({ 
              verdict: "RE", 
              output: stdout.trim(), 
              error: stderr.substring(0, 500) 
            });
          }
        }

        // Process output - normalize whitespace
        const actualOutput = normalizeOutput(stdout);
        const expectedOutput = normalizeOutput(testCase.output);

        console.log("📥 Input length:", testCase.input.length);
        console.log("📤 Expected output:", expectedOutput.substring(0, 100));
        console.log("📤 Actual output:", actualOutput.substring(0, 100));

        // Compare outputs
        if (actualOutput === expectedOutput) {
          console.log("✅ Output matches!");
          resolve({ verdict: "AC", output: actualOutput });
        } else {
          console.log("❌ Output mismatch");
          resolve({ 
            verdict: "WA", 
            output: actualOutput, 
            expected: expectedOutput,
            error: `Expected:\n${expectedOutput.substring(0, 200)}\n\nGot:\n${actualOutput.substring(0, 200)}`
          });
        }
      }
    );
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

/* ---------------- EXPORTS ---------------- */

module.exports = { runJudge };

console.log("🧪 Judge service ready");