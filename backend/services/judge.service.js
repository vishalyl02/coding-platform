const fs = require("fs");
const { execSync } = require("child_process");
const path = require("path");
const normalize = require("../utils/normalize");

const TEMP_DIR = path.join(__dirname, "../temp");

function runJudge(code, language, testCases) {
  if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR);
  }

  let compileCmd = "";
  let runCmd = "";
  let sourceFile = "";

  if (language === "cpp") {
    sourceFile = path.join(TEMP_DIR, "solution.cpp");
    fs.writeFileSync(sourceFile, code);
    compileCmd = `g++ ${sourceFile} -O2 -o ${TEMP_DIR}/a.out`;
    runCmd = `${TEMP_DIR}/a.out`;
  }

  
  else {
    return { success: false, message: "Unsupported language ❌" };
  }

  // -------- Compile (if needed)
  try {
    if (compileCmd) {
      execSync(compileCmd, { timeout: 3000 });
    }
  } catch (err) {
    return {
      success: false,
      message:
        "Compilation Error ❌\n" +
        (err.stderr?.toString() || err.stdout?.toString() || err.message),
    };
  }

  // -------- Run tests
  let passed = 0;

  for (const tc of testCases) {
    try {
      const output = execSync(
        `printf "${tc.input.replace(/"/g, '\\"')}" | ${runCmd}`,
        { timeout: 2000 }
      ).toString();

      if (normalize(output) === normalize(tc.output)) {
        passed++;
      }
    } catch (err) {
      return {
        success: false,
        message:
          "Runtime Error ❌\n" +
          (err.stderr?.toString() || err.stdout?.toString() || err.message),
      };
    }
  }

  return {
    success: passed === testCases.length,
    passed,
    total: testCases.length,
    message: `${passed}/${testCases.length} test cases passed ${
      passed === testCases.length ? "✅" : "❌"
    }`,
  };
}

module.exports = runJudge;
