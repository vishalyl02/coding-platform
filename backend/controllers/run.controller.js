const runJudge = require("../services/judge.service");
const problems = require("../data/problems");
const User = require("../models/User");

const runCode = async (req, res) => {
  try {
    const { code, problemId, language, userId } = req.body;

    if (!code || !problemId || !language) {
      return res.json({
        success: false,
        message: "Invalid request ❌",
      });
    }

    const testCases = problems[problemId];

    if (!testCases) {
      return res.json({
        success: false,
        message: "Problem not found ❌",
      });
    }

    // 🔥 Run judge
    const result = runJudge(code, language, testCases);

    // 🔥 Score calculation
    const score = Math.round(
      (result.passed / result.total) * 100
    );

    // 🔥 Save score to DB
    if (userId) {
      const user = await User.findById(userId);
      if (user) {
        user.problemScores.set(String(problemId), score);

        let total = 0;
        for (const val of user.problemScores.values()) {
          total += val;
        }

        user.totalScore = total;
        user.lastSubmissionAt = new Date();
        await user.save();
      }
    }

    return res.json({
      ...result,
      score,
    });

  } catch (err) {
    return res.json({
      success: false,
      message: "Server Error ❌",
    });
  }
};

module.exports = { runCode };
// const User = require("../models/User");
// const runJudge = require("../services/judge.service");
// const problems = require("../data/problems");

// const runCode = async (req, res) => {
//   const { code, problemId, language, userId, submit } = req.body;

//   if (!code || !problemId || !language || !userId) {
//     return res.json({ success: false, message: "Invalid request ❌" });
//   }

//   const testCases = problems[problemId];
//   if (!testCases) {
//     return res.json({ success: false, message: "Problem not found ❌" });
//   }

//   const result = runJudge(code, language, testCases);

//   // 🟡 RUN only (no save)
//   if (!submit) {
//     return res.json(result);
//   }

//   // 🔴 SUBMIT MODE
//   const user = await User.findById(userId);

//   if (user.testSubmitted) {
//     return res.json({
//       success: false,
//       message: "Test already submitted ❌",
//     });
//   }

//   const score = result.success
//     ? Math.floor((result.passed / result.total) * 100)
//     : 0;

//   // Remove old submission if exists
//   user.submissions = user.submissions.filter(
//     (s) => s.problemId !== problemId
//   );

//   user.submissions.push({
//     problemId,
//     language,
//     code,
//     score,
//   });

//   // 🔥 Recalculate total score
//   user.totalScore = user.submissions.reduce(
//     (sum, s) => sum + s.score,
//     0
//   );

//   await user.save();

//   res.json({
//     ...result,
//     score,
//     totalScore: user.totalScore,
//   });
// };

// module.exports = { runCode };
