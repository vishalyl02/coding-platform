// const express = require("express");
// const router = express.Router(); // ✅ THIS WAS MISSING
// const User = require("../models/User");

// // router.get("/", async (req, res) => {
// //   console.log("🏆 LEADERBOARD FETCH");

// //   try {
// //     const users = await User.find()
// //       .sort({ totalScore: -1, lastSubmissionAt: 1 })
// //       .select("username totalScore");

// //     console.log(
// //       "📊 LEADERBOARD DATA:",
// //       users.map(u => ({ user: u.username, score: u.totalScore }))
// //     );

// //     res.json(users);
// //   } catch (err) {
// //     console.error("🔥 LEADERBOARD ERROR:", err);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // });
// router.get("/", async (req, res) => {
//   try {
//     const users = await User.find()
//       .sort({ totalScore: -1, lastSubmissionAt: 1 })
//       .select("_id username totalScore");

//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });


// module.exports = router;

const express = require("express");
const router = express.Router();
const User = require("../models/User");

// ========================================
// GLOBAL LEADERBOARD (unchanged)
// ========================================
router.get("/", async (req, res) => {
  try {
    const users = await User.find()
      .sort({ totalScore: -1, lastSubmissionAt: 1 })
      .select("_id username totalScore");

    res.json(users);
  } catch (err) {
    console.error("🔥 GLOBAL LEADERBOARD ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ========================================
// INDIVIDUAL TEST LEADERBOARD (NEW)
// ========================================
router.get("/test/:testId", async (req, res) => {
  try {
    const { testId } = req.params;
    console.log(`🏆 Fetching leaderboard for Test ${testId}`);

    // Find all users
    const users = await User.find().select("_id username testSubmissions codeSaves");

    // Map users with their test-specific data
    const leaderboardData = users
      .map(user => {
        // Find this user's submission for this specific test
        const testSub = user.testSubmissions.find(
          sub => sub.testId === testId.toString()
        );

        // Calculate current test score from problems (even if not submitted)
        const testProblems = user.codeSaves.filter(
          save => save.testId === testId.toString()
        );
        
        const calculatedScore = testProblems.reduce((total, problem) => {
          return total + (problem.bestScore || 0);
        }, 0);

        if (!testSub && calculatedScore === 0) {
          // User never attempted this test
          return {
            _id: user._id,
            username: user.username,
            score: 0,
            status: "Not Attempted",
            submitted: false,
            submittedAt: null,
            hasAttempted: false
          };
        }

        // User attempted the test
        return {
          _id: user._id,
          username: user.username,
          score: testSub ? testSub.score : calculatedScore,
          status: testSub?.submitted ? "Submitted" : "In Progress",
          submitted: testSub?.submitted || false,
          submittedAt: testSub?.submittedAt || null,
          hasAttempted: true
        };
      })
      // Sort by score (highest first), then by submission status, then by time
      .sort((a, b) => {
        // Sort by score (highest first)
        if (b.score !== a.score) return b.score - a.score;
        
        // If scores are equal, submitted users come first
        if (a.submitted !== b.submitted) return a.submitted ? -1 : 1;
        
        // If both submitted or both not, sort by submission time
        if (a.submittedAt && b.submittedAt) {
          return new Date(a.submittedAt) - new Date(b.submittedAt);
        }
        
        return 0;
      });

    console.log(`📊 Found ${leaderboardData.length} users for Test ${testId}`);
    res.json(leaderboardData);
  } catch (err) {
    console.error("🔥 Test Leaderboard Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;