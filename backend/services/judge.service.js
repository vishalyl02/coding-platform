// // const { exec } = require("child_process");
// // const fs = require("fs");
// // const path = require("path");

// // console.log("✅ judge.service.js loaded");

// // /* ---------------- CONFIG ---------------- */

// // const BASE_DIR = path.join(__dirname, "../temp");
// // if (!fs.existsSync(BASE_DIR)) {
// //   fs.mkdirSync(BASE_DIR, { recursive: true });
// // }


// // /* Language configuration - Separate Alpine images */
// // const LANG = {
// //   cpp: {
// //     file: "main.cpp",
// //     image: "cpp-runner",  // ⚡ Custom Alpine C++ (15MB)
// //     compile: "g++ main.cpp -O2 -std=c++17 -o main",
// //     run: "./main"
// //   },
// //   python: {
// //     file: "main.py",
// //     image: "python:3.11-alpine",  // ⚡ Official Alpine Python (50MB)
// //     run: "python3 main.py"
// //   },
// //   java: {
// //     file: "Main.java",
// //     image: "code-runner",  // ✅ Your existing Ubuntu/Alpine with Java
// //     compile: "javac Main.java",
// //     run: "java Main"
// //   }
// // };
// // /* ---------------- QUEUE ---------------- */

// // const queue = [];
// // let running = 0;
// // const MAX_CONCURRENT = 2;

// // function processQueue() {
// //   console.log("🔄 processQueue called - Queue:", queue.length, "Running:", running);

// //   if (running >= MAX_CONCURRENT) return;
// //   if (queue.length === 0) return;

// //   const job = queue.shift();
// //   running++;

// //   job()
// //     .catch((err) => {
// //       console.error("❌ Queue job failed:", err);
// //     })
// //     .finally(() => {
// //       running--;
// //       processQueue();
// //     });
// // }

// // /* ---------------- MAIN JUDGE FUNCTION ---------------- */

// // async function runJudge(code, language, testCases) {
// //   console.log("========================================");
// //   console.log("🚀 runJudge called");
// //   console.log("========================================");
// //   console.log("➡️ Language:", language);
// //   console.log("➡️ Test cases:", testCases.length);
// //   console.log("➡️ Code length:", code.length);
// //   console.log("========================================");

// //   return new Promise((resolve) => {
// //     const task = async () => {
// //       console.log("📥 Task started from queue");

// //       const langConfig = LANG[language];
// //       if (!langConfig) {
// //         console.log("❌ Unsupported language:", language);
// //         return resolve({
// //           success: false,
// //           verdict: "ERR",
// //           error: `Unsupported language: ${language}`,
// //           passed: 0,
// //           total: testCases.length,
// //           results: [],
// //           outputs: [] // 🔥 IMPORTANT: Always include outputs array
// //         });
// //       }

// //       // Create unique work directory
// //       const runId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
// //       const workDir = path.join(BASE_DIR, runId);
// //       fs.mkdirSync(workDir, { recursive: true });
// //       console.log("📁 Created work directory:", workDir);

// //       // Write code to file
// //       const codeFile = path.join(workDir, langConfig.file);
// //       fs.writeFileSync(codeFile, code);
// //       console.log("📝 Code written to:", codeFile);

// //       const results = [];
// //       const outputs = []; // 🔥 CRITICAL: Store actual outputs here
// //       let passed = 0;
// //       let firstError = null;

// //       // Run each test case
// //       for (let i = 0; i < testCases.length; i++) {
// //         const testCase = testCases[i];
// //         console.log("========================================");
// //         console.log(`🧪 Running Test Case ${i + 1}/${testCases.length}`);
// //         console.log("========================================");
// //         console.log("📥 Input:", testCase.input.substring(0, 100));
// //         console.log("🎯 Expected:", testCase.output.substring(0, 100));

// //         const result = await runSingleTest(workDir, langConfig, testCase);
        
// //         console.log("📊 Test result:", {
// //           verdict: result.verdict,
// //           output: result.output?.substring(0, 100),
// //           error: result.error?.substring(0, 100)
// //         });
        
// //         results.push(result.verdict);
// //         outputs.push(result.output || ""); // 🔥 CRITICAL: Store the actual output
        
// //         if (result.verdict === "AC") {
// //           passed++;
// //           console.log(`✅ Test ${i + 1}: PASSED`);
// //         } else {
// //           console.log(`❌ Test ${i + 1}: ${result.verdict}`);
// //           if (!firstError) {
// //             firstError = result;
// //           }
// //         }
// //         console.log("========================================");
// //       }

// //       // Cleanup
// //       try {
// //         fs.rmSync(workDir, { recursive: true, force: true });
// //         console.log("🧹 Cleaned up work directory");
// //       } catch (err) {
// //         console.error("⚠️ Cleanup failed:", err.message);
// //       }

// //       // Determine final verdict
// //       let finalVerdict = "AC";
// //       if (results.includes("CE")) finalVerdict = "CE";
// //       else if (results.includes("TLE")) finalVerdict = "TLE";
// //       else if (results.includes("RE")) finalVerdict = "RE";
// //       else if (results.includes("WA")) finalVerdict = "WA";

// //       const finalResult = {
// //         success: passed === testCases.length,
// //         passed,
// //         total: testCases.length,
// //         verdict: finalVerdict,
// //         score: Math.floor((passed / testCases.length) * 100),
// //         results, // ["AC", "WA", "AC"]
// //         outputs, // 🔥 CRITICAL: ["15", "20", "30"] - actual outputs
// //         error: firstError?.error || null,
// //         message: passed === testCases.length 
// //           ? "All test cases passed! 🎉" 
// //           : `${passed}/${testCases.length} test cases passed`
// //       };

// //       console.log("========================================");
// //       console.log("🏁 FINAL RESULT:");
// //       console.log("========================================");
// //       console.log("Success:", finalResult.success);
// //       console.log("Passed:", finalResult.passed);
// //       console.log("Total:", finalResult.total);
// //       console.log("Verdict:", finalResult.verdict);
// //       console.log("Score:", finalResult.score);
// //       console.log("Results:", finalResult.results);
// //       console.log("Outputs:", finalResult.outputs); // 🔥 This should show actual outputs
// //       console.log("========================================");
      
// //       resolve(finalResult);
// //     };

// //     queue.push(task);
// //     processQueue();
// //   });
// // }

// // /* ---------------- RUN SINGLE TEST ---------------- */

// // async function runSingleTest(workDir, langConfig, testCase) {
// //   return new Promise((resolve) => {
// //     const TIME_LIMIT = 5000; // 5 seconds
// //     const MEMORY_LIMIT = "256m";

// //     console.log("🏃 runSingleTest started");

// //     // Prepare input file
// //     const inputFile = path.join(workDir, "input.txt");
// //     fs.writeFileSync(inputFile, testCase.input);
// //     console.log("📝 Input file written");

// //     // Build Docker command
// //     let cmd = "";
// //     if (langConfig.compile) {
// //       cmd = `cd /code && ${langConfig.compile} 2>&1 && cat input.txt | ${langConfig.run} 2>&1`;
// //     } else {
// //       cmd = `cd /code && cat input.txt | ${langConfig.run} 2>&1`;
// //     }

// //     const dockerCommand = `docker run --rm --memory="${MEMORY_LIMIT}" --cpus="1.0" --network none -v "${workDir}:/code" -w /code ${langConfig.image} sh -c "${cmd}"`;

// //     console.log("🐳 Executing Docker container...");

// //     const execProcess = exec(
// //       dockerCommand,
// //       {
// //         timeout: TIME_LIMIT,
// //         maxBuffer: 10 * 1024 * 1024,
// //         killSignal: "SIGKILL"
// //       },
// //       (error, stdout, stderr) => {
// //         console.log("========================================");
// //         console.log("🐳 Docker execution completed");
// //         console.log("========================================");
// //         console.log("📤 stdout length:", stdout.length);
// //         console.log("📤 stderr length:", stderr.length);
// //         console.log("📤 stdout preview:", stdout.substring(0, 200));
// //         console.log("📤 stderr preview:", stderr.substring(0, 200));
// //         console.log("❓ error object:", error ? "YES" : "NO");
// //         console.log("========================================");

// //         // Handle different error types
// //         if (error) {
// //           if (error.killed || error.signal === "SIGKILL") {
// //             console.log("⏱️ Time Limit Exceeded");
// //             return resolve({ 
// //               verdict: "TLE", 
// //               output: "", // 🔥 Return empty string for TLE
// //               error: "Time Limit Exceeded (5s)" 
// //             });
// //           }
          
// //           // Check if it's a compilation error
// //           const combinedOutput = (stdout + stderr).toLowerCase();
// //           if (combinedOutput.includes("error:") || combinedOutput.includes("exception")) {
// //             if (combinedOutput.includes("error:") && !stdout.trim()) {
// //               console.log("❌ Compilation Error");
// //               return resolve({ 
// //                 verdict: "CE", 
// //                 output: "", // 🔥 Return empty string for CE
// //                 error: stderr.substring(0, 500) 
// //               });
// //             }
            
// //             console.log("❌ Runtime Error");
// //             return resolve({ 
// //               verdict: "RE", 
// //               output: stdout.trim(), // 🔥 Return whatever output was produced before error
// //               error: stderr.substring(0, 500) 
// //             });
// //           }
// //         }

// //         // Process output - normalize whitespace
// //         const actualOutput = normalizeOutput(stdout);
// //         const expectedOutput = normalizeOutput(testCase.output);

// //         console.log("========================================");
// //         console.log("📊 OUTPUT COMPARISON:");
// //         console.log("========================================");
// //         console.log("📥 Input length:", testCase.input.length);
// //         console.log("🎯 Expected (normalized):", expectedOutput);
// //         console.log("📤 Actual (normalized):", actualOutput);
// //         console.log("🔍 Match:", actualOutput === expectedOutput);
// //         console.log("========================================");

// //         // Compare outputs
// //         if (actualOutput === expectedOutput) {
// //           console.log("✅ Output matches!");
// //           resolve({ 
// //             verdict: "AC", 
// //             output: actualOutput // 🔥 CRITICAL: Return the actual output
// //           });
// //         } else {
// //           console.log("❌ Output mismatch");
// //           console.log("Expected length:", expectedOutput.length);
// //           console.log("Actual length:", actualOutput.length);
// //           resolve({ 
// //             verdict: "WA", 
// //             output: actualOutput, // 🔥 CRITICAL: Return the actual output
// //             expected: expectedOutput,
// //             error: `Expected:\n${expectedOutput.substring(0, 200)}\n\nGot:\n${actualOutput.substring(0, 200)}`
// //           });
// //         }
// //       }
// //     );
// //   });
// // }

// // /* ---------------- HELPER FUNCTIONS ---------------- */

// // function normalizeOutput(str) {
// //   const normalized = str
// //     .trim()
// //     .split('\n')
// //     .map(line => line.trim())
// //     .filter(line => line.length > 0)
// //     .join('\n');
  
// //   console.log("🔧 normalizeOutput:", {
// //     input: str.substring(0, 50),
// //     output: normalized.substring(0, 50),
// //     inputLength: str.length,
// //     outputLength: normalized.length
// //   });
  
// //   return normalized;
// // }

// // /* ---------------- EXPORTS ---------------- */

// // module.exports = { runJudge };

// // console.log("🧪 Judge service ready");
// const { exec } = require("child_process");
// const fs = require("fs");
// const path = require("path");

// console.log("⚡ Ultra-Fast Judge Service Loaded");

// /* ---------------- CONFIG ---------------- */

// const BASE_DIR = path.join(__dirname, "../temp");
// if (!fs.existsSync(BASE_DIR)) {
//   fs.mkdirSync(BASE_DIR, { recursive: true });
// }

// /* Language configuration - Separate Alpine images */
// const LANG = {
//   cpp: {
//     file: "main.cpp",
//     image: "cpp-runner",
//     compile: "g++ main.cpp -O2 -std=c++17 -o main",
//     run: "./main"
//   },
//   python: {
//     file: "main.py",
//     image: "python:3.11-alpine",
//     run: "python3 main.py"
//   },
//   java: {
//     file: "Main.java",
//     image: "code-runner",
//     compile: "javac Main.java",
//     run: "java Main"
//   }
// };

// /* ---------------- QUEUE WITH HIGHER CONCURRENCY ---------------- */

// const queue = [];
// let running = 0;
// const MAX_CONCURRENT = 5; // ⚡ Increased from 2 to 5

// function processQueue() {
//   if (running >= MAX_CONCURRENT || queue.length === 0) return;

//   const job = queue.shift();
//   running++;

//   job()
//     .catch((err) => console.error("❌ Queue job failed:", err))
//     .finally(() => {
//       running--;
//       processQueue();
//     });
// }

// /* ---------------- MAIN JUDGE FUNCTION WITH PARALLEL EXECUTION ---------------- */

// async function runJudge(code, language, testCases) {
//   console.log(`⚡ runJudge: ${language}, ${testCases.length} tests`);

//   return new Promise((resolve) => {
//     const task = async () => {
//       const startTime = Date.now();
//       const langConfig = LANG[language];

//       if (!langConfig) {
//         return resolve({
//           success: false,
//           verdict: "ERR",
//           error: `Unsupported language: ${language}`,
//           passed: 0,
//           total: testCases.length,
//           results: [],
//           outputs: []
//         });
//       }

//       // Create work directory
//       const runId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
//       const workDir = path.join(BASE_DIR, runId);
//       fs.mkdirSync(workDir, { recursive: true });

//       // Write code to file
//       const codeFile = path.join(workDir, langConfig.file);
//       fs.writeFileSync(codeFile, code);

//       // ⚡ STEP 1: PRE-COMPILE ONCE (for compiled languages)
//       if (langConfig.compile) {
//         console.log("🔨 Pre-compiling code...");
//         const compileError = await preCompile(workDir, langConfig);
        
//         if (compileError) {
//           cleanup(workDir);
//           console.log(`❌ Compilation failed in ${Date.now() - startTime}ms`);
//           return resolve({
//             success: false,
//             verdict: "CE",
//             error: compileError,
//             passed: 0,
//             total: testCases.length,
//             results: Array(testCases.length).fill("CE"),
//             outputs: Array(testCases.length).fill("")
//           });
//         }
//         console.log(`✅ Compiled in ${Date.now() - startTime}ms`);
//       }

//       // ⚡ STEP 2: RUN ALL TEST CASES IN PARALLEL
//       console.log("🚀 Running tests in parallel...");
//       const testResults = await runTestsInParallel(workDir, langConfig, testCases);

//       // Cleanup
//       cleanup(workDir);

//       // Process results
//       const outputs = testResults.map(r => r.output || "");
//       const verdicts = testResults.map(r => r.verdict);
//       const passed = verdicts.filter(v => v === "AC").length;
//       const firstError = testResults.find(r => r.error);

//       // Determine final verdict
//       let finalVerdict = "AC";
//       if (verdicts.includes("CE")) finalVerdict = "CE";
//       else if (verdicts.includes("TLE")) finalVerdict = "TLE";
//       else if (verdicts.includes("RE")) finalVerdict = "RE";
//       else if (verdicts.includes("WA")) finalVerdict = "WA";

//       const totalTime = Date.now() - startTime;

//       const finalResult = {
//         success: passed === testCases.length,
//         passed,
//         total: testCases.length,
//         verdict: finalVerdict,
//         score: Math.floor((passed / testCases.length) * 100),
//         results: verdicts,
//         outputs: outputs,
//         error: firstError?.error || null,
//         message: passed === testCases.length 
//           ? "All test cases passed! 🎉" 
//           : `${passed}/${testCases.length} test cases passed`,
//         executionTime: totalTime
//       };

//       console.log(`✅ Completed: ${passed}/${testCases.length} in ${totalTime}ms`);
//       resolve(finalResult);
//     };

//     queue.push(task);
//     processQueue();
//   });
// }

// /* ---------------- PRE-COMPILATION (ONCE) ---------------- */

// async function preCompile(workDir, langConfig) {
//   return new Promise((resolve) => {
//     const cmd = `cd /code && ${langConfig.compile} 2>&1`;
//     const dockerCommand = `docker run --rm --memory="256m" --cpus="1.0" -v "${workDir}:/code" -w /code ${langConfig.image} sh -c "${cmd}"`;
    
//     exec(dockerCommand, { timeout: 10000 }, (error, stdout, stderr) => {
//       if (error || stderr.includes("error:")) {
//         resolve((stdout + stderr).substring(0, 500));
//       } else {
//         resolve(null);
//       }
//     });
//   });
// }

// /* ---------------- PARALLEL TEST EXECUTION ---------------- */

// async function runTestsInParallel(workDir, langConfig, testCases) {
//   const BATCH_SIZE = 3; // ⚡ Run 3 tests at once
//   const allResults = [];

//   // Process in batches to avoid overwhelming system
//   for (let i = 0; i < testCases.length; i += BATCH_SIZE) {
//     const batch = testCases.slice(i, i + BATCH_SIZE);
    
//     // Run batch in parallel
//     const batchPromises = batch.map((testCase, idx) => 
//       runSingleTestFast(workDir, langConfig, testCase, i + idx)
//     );
    
//     const batchResults = await Promise.all(batchPromises);
//     allResults.push(...batchResults);
//   }

//   return allResults;
// }

// /* ---------------- FAST SINGLE TEST EXECUTION ---------------- */

// async function runSingleTestFast(workDir, langConfig, testCase, testIndex) {
//   return new Promise((resolve) => {
//     const TIME_LIMIT = 3000; // ⚡ 3 seconds
//     const MEMORY_LIMIT = "128m"; // ⚡ Reduced memory

//     // Create unique input file (for parallel execution)
//     const inputFile = path.join(workDir, `input_${testIndex}.txt`);
//     fs.writeFileSync(inputFile, testCase.input);

//     // ⚡ Run ONLY (compilation already done)
//     const cmd = `cd /code && cat input_${testIndex}.txt | ${langConfig.run} 2>&1`;
//     const dockerCommand = `docker run --rm --memory="${MEMORY_LIMIT}" --cpus="0.5" --network=none -v "${workDir}:/code" -w /code ${langConfig.image} sh -c "${cmd}"`;

//     const startTime = Date.now();

//     exec(
//       dockerCommand,
//       {
//         timeout: TIME_LIMIT,
//         maxBuffer: 5 * 1024 * 1024,
//         killSignal: "SIGKILL"
//       },
//       (error, stdout, stderr) => {
//         const executionTime = Date.now() - startTime;

//         // Cleanup input file
//         try { fs.unlinkSync(inputFile); } catch (e) {}

//         // Handle errors
//         if (error) {
//           if (error.killed || error.signal === "SIGKILL") {
//             return resolve({ 
//               verdict: "TLE", 
//               output: "",
//               error: `Time Limit Exceeded (${executionTime}ms)`
//             });
//           }
          
//           const combinedOutput = (stdout + stderr).toLowerCase();
//           if (combinedOutput.includes("error:") || combinedOutput.includes("exception")) {
//             return resolve({ 
//               verdict: "RE", 
//               output: stdout.trim(),
//               error: stderr.substring(0, 300)
//             });
//           }
//         }

//         // Compare outputs
//         const actualOutput = normalizeOutput(stdout);
//         const expectedOutput = normalizeOutput(testCase.output);

//         if (actualOutput === expectedOutput) {
//           resolve({ verdict: "AC", output: actualOutput });
//         } else {
//           resolve({ 
//             verdict: "WA", 
//             output: actualOutput,
//             error: `Expected: ${expectedOutput.substring(0, 100)}\nGot: ${actualOutput.substring(0, 100)}`
//           });
//         }
//       }
//     );
//   });
// }

// /* ---------------- HELPER FUNCTIONS ---------------- */

// function normalizeOutput(str) {
//   return str
//     .trim()
//     .split('\n')
//     .map(line => line.trim())
//     .filter(line => line.length > 0)
//     .join('\n');
// }

// function cleanup(workDir) {
//   try {
//     fs.rmSync(workDir, { recursive: true, force: true });
//   } catch (err) {
//     console.error("⚠️ Cleanup failed:", err.message);
//   }
// }

// /* ---------------- EXPORTS ---------------- */

// module.exports = { runJudge };

// console.log("⚡ Ultra-Fast Judge ready with parallel execution");

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