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
    image: "gcc:14-bookworm",  // ← CHANGED
    compile: "g++ main.cpp -O2 -std=c++17 -o main",
    run: "./main"
  },
  python: {
    file: "main.py",
    image: "python:3.11-alpine",  // ✅ Keep this
    run: "python3 main.py"
  },
  java: {
    file: "Main.java",
    image: "eclipse-temurin:17-jre-alpine",  // ← CHANGED
    compile: "javac Main.java",
    run: "java Main"
  }
};
/* ---------------- QUEUE ---------------- */

const queue = [];
let running = 0;
const MAX_CONCURRENT = 2;

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
  console.log("========================================");
  console.log("🚀 runJudge called");
  console.log("========================================");
  console.log("➡️ Language:", language);
  console.log("➡️ Test cases:", testCases.length);
  console.log("➡️ Code length:", code.length);
  console.log("========================================");

  return new Promise((resolve) => {
    const task = async () => {
      console.log("📥 Task started from queue");

      const langConfig = LANG[language];
      if (!langConfig) {
        console.log("❌ Unsupported language:", language);
        return resolve({
          success: false,
          verdict: "ERR",
          error: `Unsupported language: ${language}`,
          passed: 0,
          total: testCases.length,
          results: [],
          outputs: [] // 🔥 IMPORTANT: Always include outputs array
        });
      }

      // Create unique work directory
      const runId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const workDir = path.join(BASE_DIR, runId);
      fs.mkdirSync(workDir, { recursive: true });
      console.log("📁 Created work directory:", workDir);

      // Write code to file
      const codeFile = path.join(workDir, langConfig.file);
      fs.writeFileSync(codeFile, code);
      console.log("📝 Code written to:", codeFile);

      const results = [];
      const outputs = []; // 🔥 CRITICAL: Store actual outputs here
      let passed = 0;
      let firstError = null;

      // Run each test case
      for (let i = 0; i < testCases.length; i++) {
        const testCase = testCases[i];
        console.log("========================================");
        console.log(`🧪 Running Test Case ${i + 1}/${testCases.length}`);
        console.log("========================================");
        console.log("📥 Input:", testCase.input.substring(0, 100));
        console.log("🎯 Expected:", testCase.output.substring(0, 100));

        const result = await runSingleTest(workDir, langConfig, testCase);
        
        console.log("📊 Test result:", {
          verdict: result.verdict,
          output: result.output?.substring(0, 100),
          error: result.error?.substring(0, 100)
        });
        
        results.push(result.verdict);
        outputs.push(result.output || ""); // 🔥 CRITICAL: Store the actual output
        
        if (result.verdict === "AC") {
          passed++;
          console.log(`✅ Test ${i + 1}: PASSED`);
        } else {
          console.log(`❌ Test ${i + 1}: ${result.verdict}`);
          if (!firstError) {
            firstError = result;
          }
        }
        console.log("========================================");
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
        results, // ["AC", "WA", "AC"]
        outputs, // 🔥 CRITICAL: ["15", "20", "30"] - actual outputs
        error: firstError?.error || null,
        message: passed === testCases.length 
          ? "All test cases passed! 🎉" 
          : `${passed}/${testCases.length} test cases passed`
      };

      console.log("========================================");
      console.log("🏁 FINAL RESULT:");
      console.log("========================================");
      console.log("Success:", finalResult.success);
      console.log("Passed:", finalResult.passed);
      console.log("Total:", finalResult.total);
      console.log("Verdict:", finalResult.verdict);
      console.log("Score:", finalResult.score);
      console.log("Results:", finalResult.results);
      console.log("Outputs:", finalResult.outputs); // 🔥 This should show actual outputs
      console.log("========================================");
      
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

    console.log("🏃 runSingleTest started");

    // Prepare input file
    const inputFile = path.join(workDir, "input.txt");
    fs.writeFileSync(inputFile, testCase.input);
    console.log("📝 Input file written");

    // Build Docker command
    let cmd = "";
    if (langConfig.compile) {
      cmd = `cd /code && ${langConfig.compile} 2>&1 && cat input.txt | ${langConfig.run} 2>&1`;
    } else {
      cmd = `cd /code && cat input.txt | ${langConfig.run} 2>&1`;
    }

    const dockerCommand = `docker run --rm --memory="${MEMORY_LIMIT}" --cpus="1.0" --network none -v "${workDir}:/code" -w /code ${langConfig.image} sh -c "${cmd}"`;

    console.log("🐳 Executing Docker container...");

    const execProcess = exec(
      dockerCommand,
      {
        timeout: TIME_LIMIT,
        maxBuffer: 10 * 1024 * 1024,
        killSignal: "SIGKILL"
      },
      (error, stdout, stderr) => {
        console.log("========================================");
        console.log("🐳 Docker execution completed");
        console.log("========================================");
        console.log("📤 stdout length:", stdout.length);
        console.log("📤 stderr length:", stderr.length);
        console.log("📤 stdout preview:", stdout.substring(0, 200));
        console.log("📤 stderr preview:", stderr.substring(0, 200));
        console.log("❓ error object:", error ? "YES" : "NO");
        console.log("========================================");

        // Handle different error types
        if (error) {
          if (error.killed || error.signal === "SIGKILL") {
            console.log("⏱️ Time Limit Exceeded");
            return resolve({ 
              verdict: "TLE", 
              output: "", // 🔥 Return empty string for TLE
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
                output: "", // 🔥 Return empty string for CE
                error: stderr.substring(0, 500) 
              });
            }
            
            console.log("❌ Runtime Error");
            return resolve({ 
              verdict: "RE", 
              output: stdout.trim(), // 🔥 Return whatever output was produced before error
              error: stderr.substring(0, 500) 
            });
          }
        }

        // Process output - normalize whitespace
        const actualOutput = normalizeOutput(stdout);
        const expectedOutput = normalizeOutput(testCase.output);

        console.log("========================================");
        console.log("📊 OUTPUT COMPARISON:");
        console.log("========================================");
        console.log("📥 Input length:", testCase.input.length);
        console.log("🎯 Expected (normalized):", expectedOutput);
        console.log("📤 Actual (normalized):", actualOutput);
        console.log("🔍 Match:", actualOutput === expectedOutput);
        console.log("========================================");

        // Compare outputs
        if (actualOutput === expectedOutput) {
          console.log("✅ Output matches!");
          resolve({ 
            verdict: "AC", 
            output: actualOutput // 🔥 CRITICAL: Return the actual output
          });
        } else {
          console.log("❌ Output mismatch");
          console.log("Expected length:", expectedOutput.length);
          console.log("Actual length:", actualOutput.length);
          resolve({ 
            verdict: "WA", 
            output: actualOutput, // 🔥 CRITICAL: Return the actual output
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
  const normalized = str
    .trim()
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join('\n');
  
  console.log("🔧 normalizeOutput:", {
    input: str.substring(0, 50),
    output: normalized.substring(0, 50),
    inputLength: str.length,
    outputLength: normalized.length
  });
  
  return normalized;
}

/* ---------------- EXPORTS ---------------- */

module.exports = { runJudge };

console.log("🧪 Judge service ready");