const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

<<<<<<< HEAD
console.log("✅ judge.service.js loaded");

/* ---------------- CONFIG ---------------- */

const BASE_DIR = path.join(__dirname, "../temp");
if (!fs.existsSync(BASE_DIR)) fs.mkdirSync(BASE_DIR, { recursive: true });

=======
/* ---------------- CONFIG ---------------- */

const BASE_DIR = path.join(__dirname, "../../runs");
if (!fs.existsSync(BASE_DIR)) fs.mkdirSync(BASE_DIR);

/* Language configuration */
>>>>>>> 9d169c67397f98911be23ecbc84efdbeb700d23a
const LANG = {
  cpp: {
    file: "main.cpp",
    image: "cpp-judge",
<<<<<<< HEAD
    compile: "g++ main.cpp -O2 -std=c++17 -o main",
    run: "./main"
=======
    cmd: "g++ main.cpp && ./a.out"
>>>>>>> 9d169c67397f98911be23ecbc84efdbeb700d23a
  },
  python: {
    file: "main.py",
    image: "python-judge",
<<<<<<< HEAD
    run: "python3 main.py"
=======
    cmd: "python main.py"
>>>>>>> 9d169c67397f98911be23ecbc84efdbeb700d23a
  },
  js: {
    file: "main.js",
    image: "js-judge",
<<<<<<< HEAD
    run: "node main.js"
=======
    cmd: "node main.js"
>>>>>>> 9d169c67397f98911be23ecbc84efdbeb700d23a
  },
  java: {
    file: "Main.java",
    image: "java-judge",
<<<<<<< HEAD
    compile: "javac Main.java",
    run: "java Main"
=======
    cmd: "javac Main.java && java Main"
>>>>>>> 9d169c67397f98911be23ecbc84efdbeb700d23a
  },
  rust: {
    file: "main.rs",
    image: "rust-judge",
<<<<<<< HEAD
    compile: "rustc main.rs -o main",
    run: "./main"
=======
    cmd: "rustc main.rs && ./main"
>>>>>>> 9d169c67397f98911be23ecbc84efdbeb700d23a
  }
};

/* ---------------- QUEUE ---------------- */

const queue = [];
let running = 0;
<<<<<<< HEAD
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
=======
const MAX_CONCURRENT = 2; // ⚠️ t2.micro safe

function enqueue(task) {
  return new Promise((resolve, reject) => {
    queue.push({ task, resolve, reject });
    processQueue();
  });
}

function processQueue() {
  if (running >= MAX_CONCURRENT || queue.length === 0) return;

  const { task, resolve, reject } = queue.shift();
  running++;

  task()
    .then(resolve)
    .catch(reject)
    .finally(() => {
      running--;
      processQueue();
    });
}

/* ---------------- RUN JUDGE ---------------- */

async function runJudge(code, language, testCases) {
  if (!LANG[language]) {
    return { success: false, message: "Unsupported language ❌" };
  }

  return enqueue(async () => {
    const runId = Date.now() + "-" + Math.random().toString(36).slice(2);
    const workDir = path.join(BASE_DIR, runId);
    fs.mkdirSync(workDir);

    const { file, image, cmd } = LANG[language];
    fs.writeFileSync(path.join(workDir, file), code);

    let passed = 0;
    const results = [];

    for (let i = 0; i < testCases.length; i++) {
      const { input, output } = testCases[i];

      const dockerCmd = `
      docker run --rm \
        --cpus="0.5" \
        --memory="256m" \
        --pids-limit=64 \
        -v "${workDir}:/code" \
        ${image} \
        timeout 2s bash -c "${cmd}"
      `;

      const verdict = await new Promise((resolve) => {
        exec(dockerCmd, { timeout: 4000 }, (err, stdout, stderr) => {
          if (err) {
            if (err.killed) return resolve("TLE");
            if (stderr?.includes("error")) return resolve("CE");
            return resolve("RE");
          }

          const actual = normalize(stdout || "");
          const expected = normalize(output);

          if (actual === expected) resolve("AC");
          else resolve("WA");
        });
      });

      results.push(verdict);
      if (verdict === "AC") passed++;
      else break; // stop at first failure
    }

    fs.rmSync(workDir, { recursive: true, force: true });

    return {
      success: passed === testCases.length,
      passed,
      total: testCases.length,
      verdict:
        passed === testCases.length
          ? "AC"
          : results.includes("TLE")
          ? "TLE"
          : results.includes("CE")
          ? "CE"
          : results.includes("RE")
          ? "RE"
          : "WA",
      results
    };
  });
>>>>>>> 9d169c67397f98911be23ecbc84efdbeb700d23a
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
