const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const normalize = require("../utils/normalize");

/* ---------------- CONFIG ---------------- */

const BASE_DIR = path.join(__dirname, "../../runs");
if (!fs.existsSync(BASE_DIR)) fs.mkdirSync(BASE_DIR);

/* Language configuration */
const LANG = {
  cpp: {
    file: "main.cpp",
    image: "cpp-judge",
    cmd: "g++ main.cpp && ./a.out"
  },
  python: {
    file: "main.py",
    image: "python-judge",
    cmd: "python main.py"
  },
  js: {
    file: "main.js",
    image: "js-judge",
    cmd: "node main.js"
  },
  java: {
    file: "Main.java",
    image: "java-judge",
    cmd: "javac Main.java && java Main"
  },
  rust: {
    file: "main.rs",
    image: "rust-judge",
    cmd: "rustc main.rs && ./main"
  }
};

/* ---------------- QUEUE ---------------- */

const queue = [];
let running = 0;
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
}

module.exports = runJudge;
