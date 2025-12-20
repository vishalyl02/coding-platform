const express = require("express");
const router = express.Router();
const {runJudge} = require("../services/judge.service");
const problems = require("../data/problems");
const User = require("../models/User");

router.post("/", async (req, res) => {
  console.log("🔥 /run HIT");
  console.log("➡️ BODY:", req.body);

  const { code, problemId, language, userId, submit } = req.body;

  // ---------------- VALIDATION ----------------
  if (!code || !problemId || !language) {
    console.log("❌ INVALID REQUEST");
    return res.status(400).json({ message: "Invalid request" });
  }

  const testCases = problems[problemId];
  if (!testCases) {
    console.log("❌ PROBLEM NOT FOUND:", problemId);
    return res.status(404).json({ message: "Problem not found" });
  }

  // ---------------- RUN JUDGE ----------------
  console.log("🧪 Running Judge...");
<<<<<<< HEAD
  const result = await runJudge(code, language, testCases);
=======
const result = await runJudge(code, language, testCases);

>>>>>>> 9d169c67397f98911be23ecbc84efdbeb700d23a
  console.log("🧪 Judge Result:", result);

  // ---------------- RUN ONLY ----------------
  if (!submit) {
    return res.json(result);
  }

  // ---------------- SUBMISSION MODE ----------------
  try {
    console.log("💾 SUBMISSION MODE");
    console.log("👤 USER ID:", userId);

    const user = await User.findById(userId);
    if (!user) {
      console.log("❌ USER NOT FOUND");
      return res.status(401).json({ message: "User not logged in" });
    }

    console.log("👤 USER FOUND:", user.username);

    // 🔒 SAFE SCORE HANDLING
    const prevScore = Number(user.problemScores?.get(String(problemId)) || 0);
    const rawScore = result.success
  ? Math.floor((result.passed / result.total) * 100)
  : 0;

    const safeScore = Number.isFinite(rawScore) ? rawScore : 0;
    const newScore = Math.max(prevScore, safeScore);

    console.log("📊 prevScore:", prevScore);
    console.log("📊 rawScore:", rawScore);
    console.log("📊 newScore:", newScore);

    user.problemScores.set(String(problemId), newScore);

    user.totalScore = Array.from(user.problemScores.values()).reduce(
      (sum, val) => sum + Number(val || 0),
      0
    );

    user.lastSubmissionAt = new Date();

    await user.save();

    console.log("✅ USER UPDATED");
    console.log("📊 problemScores:", user.problemScores);
    console.log("🏆 totalScore:", user.totalScore);

    return res.json({
      ...result,
      score: newScore,
      message: "Submission saved successfully ✅",
    });

  } catch (err) {
    console.error("🔥 SUBMISSION ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
