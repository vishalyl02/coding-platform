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
    const result = await runJudge(code, language, testCases);

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
