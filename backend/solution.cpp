// const express = require("express");
// const fs = require("fs");
// const { execSync } = require("child_process");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Backend is running ✅");
// });

// /* ===============================
//    PROBLEM-WISE TEST CASES
// ================================ */
// const problemTests = {
//   1: [
//     {
//       input: `5
// 1 2 3 4 5
// 3
// 0 2
// 1 3
// 2 4
// `,
//       output: `6
// 9
// 12`
//     },
//     {
//       input: `4
// 10 20 30 40
// 2
// 0 1
// 1 3
// `,
//       output: `30
// 90`
//     }
//   ],

//   2: [
//     {
//       input: `5
// 5 3 1 4 2
// `,
//       output: `1 2 3 4 5`
//     }
//   ],

//   3: [
//     {
//       input: `4 3
// 1 2
// 2 3
// 3 4
// `,
//       output: `YES`
//     }
//   ]
// };

// const normalize = (str) =>
//   str.trim().replace(/\s+/g, " ");

// /* ===============================
//    COMPILE & RUN API
// ================================ */
// app.post("/run", (req, res) => {
//   const { code, problemId } = req.body;

//   if (!code || !problemId) {
//     return res.json({
//       success: false,
//       message: "Invalid request ❌",
//     });
//   }

//   const testCases = problemTests[problemId];

//   if (!testCases) {
//     return res.json({
//       success: false,
//       message: "Problem not found ❌",
//     });
//   }

//   try {
//     fs.writeFileSync("solution.cpp", code);

//     /* -------- COMPILE -------- */
//     try {
//       execSync("g++ solution.cpp -O2 -o solution.out", {
//         timeout: 3000,
//         stdio: "pipe",
//       });
//     } catch (err) {
//       return res.json({
//         success: false,
//         message: "Compilation Error ❌\n" + err.stderr.toString(),
//       });
//     }

//     /* -------- RUN TESTS -------- */
//     let passed = 0;

//     for (const tc of testCases) {
//       try {
//         const output = execSync(
//           `printf "${tc.input}" | ./solution.out`,
//           {
//             timeout: 2000,
//             stdio: "pipe",
//           }
//         ).toString();

//         if (
//           normalize(output) ===
//           normalize(tc.output)
//         ) {
//           passed++;
//         }
//       } catch {
//         return res.json({
//           success: false,
//           message: "Runtime Error / TLE ❌",
//         });
//       }
//     }

//     /* -------- RESPONSE -------- */
//     res.json({
//       success: passed === testCases.length,
//       passed,
//       total: testCases.length,
//       message: `${passed}/${testCases.length} test cases passed ${
//         passed === testCases.length ? "✅" : "❌"
//       }`,
//     });

//   } catch (err) {
//     res.json({
//       success: false,
//       message: "Internal Server Error ❌",
//     });
//   }
// });

// /* ===============================
//    SERVER
// ================================ */
// const PORT = 3001;
// app.listen(PORT, () => {
//   console.log(`Backend running on http://localhost:${PORT}`);
// });
const express = require("express");
const fs = require("fs");
const { execSync } = require("child_process");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const problemTests = {
  1: [
    {
      input: `5
1 2 3 4 5
3
0 2
1 3
2 4
`,
      output: `6
9
12`
    }
  ]
};

const normalize = s => s.trim().replace(/\s+/g, " ");

app.post("/run", (req, res) => {
  const { code, problemId } = req.body;

  if (!problemTests[problemId]) {
    return res.json({ success: false, message: "Invalid problem ❌" });
  }

  try {
    fs.writeFileSync("solution.cpp", code);

    execSync("g++ solution.cpp -O2 -o solution.out", {
      stdio: "pipe",
      timeout: 3000
    });

    let passed = 0;
    for (const tc of problemTests[problemId]) {
      const output = execSync(
        `printf "${tc.input.replace(/"/g, '\\"')}" | ./solution.out`,
        { timeout: 2000 }
      ).toString();

      if (normalize(output) === normalize(tc.output)) {
        passed++;
      }
    }

    res.json({
      success: passed === problemTests[problemId].length,
      passed,
      total: problemTests[problemId].length,
      message: `${passed}/${problemTests[problemId].length} test cases passed ✅`
    });

  } catch (err) {
    res.json({
      success: false,
      message: "Runtime Error / Segmentation Fault ❌"
    });
  }
});

app.listen(3001, () => {
  console.log("Backend running on http://localhost:3001");
});
