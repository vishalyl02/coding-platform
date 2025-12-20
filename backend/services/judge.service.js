const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

console.log("✅ judge.service.js loaded");

/* ---------------- CONFIG ---------------- */

const BASE_DIR = path.join(__dirname, "../temp");
if (!fs.existsSync(BASE_DIR)) fs.mkdirSync(BASE_DIR, { recursive: true });

const LANG = {
  cpp: {
    file: "main.cpp",
    image: "cpp-judge",
    compile: "g++ main.cpp -O2 -std=c++17 -o main",
    run: "./main"
  },
  python: {
    file: "main.py",
    image: "python-judge",
    run: "python3 main.py"
  },
  js: {
    file: "main.js",
    image: "js-judge",
    run: "node main.js"
  },
  java: {
    file: "Main.java",
    image: "java-judge",
    compile: "javac Main.java",
    run: "java Main"
  },
  rust: {
    file: "main.rs",
    image: "rust-judge",
    compile: "rustc main.rs -o main",
    run: "./main"
  }
};

/* ---------------- QUEUE ---------------- */

const queue = [];
let running = 0;
const MAX_CONCURRENT = 2;

function processQueue() {
  console.log("🔄 processQueue called");
  console.log("📊 Queue:", queue.length, "Running:", running);

  if (running >= MAX_CONCURRENT) return;
  if (queue.length === 0) return;

  const job = queue.shift();
  running++;

  job()
    .catch(() => {})
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
      console.log("📥 Task added to queue");

      const langConfig = LANG[language];
      if (!langConfig) {
        return resolve({
          success: false,
          error: `Unsupported language: ${language}`
        });
      }

      // Create unique work directory
      const workDir = path.join(BASE_DIR, `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
      fs.mkdirSync(workDir, { recursive: true });

      // Write code to file
      const codeFile = path.join(workDir, langConfig.file);
      fs.writeFileSync(codeFile, code);
      console.log("📝 Code written to:", codeFile);

      const results = [];
      let passed = 0;

      // Run each test case
      for (let i = 0; i < testCases.length; i++) {
        const testCase = testCases[i];
        console.log(`\n🧪 Running Test Case ${i + 1}/${testCases.length}`);

        const result = await runSingleTest(workDir, langConfig, testCase);
        
        results.push(result.verdict);
        if (result.verdict === "AC") passed++;

        console.log(`✅ Test ${i + 1}: ${result.verdict}`);
        if (result.verdict !== "AC") {
          console.log("📥 Input:", testCase.input.substring(0, 100));
          console.log("📤 Expected:", testCase.output.substring(0, 100));
          console.log("📤 Got:", result.output.substring(0, 100));
        }
      }

      // Cleanup
      try {
        fs.rmSync(workDir, { recursive: true, force: true });
      } catch (err) {
        console.error("⚠️ Cleanup failed:", err.message);
      }

      const finalResult = {
        success: passed === testCases.length,
        passed,
        total: testCases.length,
        verdict: passed === testCases.length ? "AC" : results.find(r => r !== "AC") || "WA",
        results
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

    // Prepare input - escape for shell
    const input = testCase.input.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/`/g, '\\`').replace(/\$/g, '\\$');
    
    // Build Docker command
    let cmd = "";
    if (langConfig.compile) {
      cmd = `${langConfig.compile} 2>&1 && echo '${input}' | ${langConfig.run}`;
    } else {
      cmd = `echo '${input}' | ${langConfig.run}`;
    }

    const dockerCommand = `docker run --rm -i --memory="${MEMORY_LIMIT}" --cpus="1" -v "${workDir}:/code" -w /code ${langConfig.image} sh -c "${cmd}"`;

    console.log("🐳 Running Docker");

    const execProcess = exec(
      dockerCommand,
      {
        timeout: TIME_LIMIT,
        maxBuffer: 10 * 1024 * 1024, // 10MB
        killSignal: "SIGKILL"
      },
      (error, stdout, stderr) => {
        console.log("🐳 Docker exec returned");

        // Handle different error types
        if (error) {
          if (error.killed || error.signal === "SIGKILL") {
            return resolve({ verdict: "TLE", output: "", error: "Time Limit Exceeded" });
          }
          
          // Check if it's a compilation error
          if (stderr && stderr.includes("error:")) {
            console.log("❌ Compilation Error:", stderr.substring(0, 200));
            return resolve({ verdict: "CE", output: "", error: stderr.substring(0, 500) });
          }
          
          // Runtime error
          console.log("❌ Runtime Error:", error.message);
          return resolve({ verdict: "RE", output: stdout, error: error.message });
        }

        // Process output
        const actualOutput = stdout.trim();
        const expectedOutput = testCase.output.trim();

        console.log("🧪 TEST INPUT:");
        console.log(JSON.stringify(testCase.input));
        console.log("🧪 EXPECTED OUTPUT:");
        console.log(JSON.stringify(expectedOutput));
        console.log("🧪 ACTUAL OUTPUT (raw):");
        console.log(JSON.stringify(actualOutput));

        // Compare outputs
        if (actualOutput === expectedOutput) {
          resolve({ verdict: "AC", output: actualOutput });
        } else {
          resolve({ verdict: "WA", output: actualOutput, expected: expectedOutput });
        }
      }
    );
  });
}

/* ---------------- EXPORTS ---------------- */

module.exports = { runJudge };

console.log("🧪 Judge service ready");
