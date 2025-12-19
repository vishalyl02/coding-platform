const express = require("express");
const router = express.Router(); // ✅ THIS WAS MISSING
const User = require("../models/User");

router.get("/", async (req, res) => {
  console.log("🏆 LEADERBOARD FETCH");

  try {
    const users = await User.find()
      .sort({ totalScore: -1, lastSubmissionAt: 1 })
      .select("username totalScore");

    console.log(
      "📊 LEADERBOARD DATA:",
      users.map(u => ({ user: u.username, score: u.totalScore }))
    );

    res.json(users);
  } catch (err) {
    console.error("🔥 LEADERBOARD ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
