const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/submit", async (req, res) => {
  console.log("🚀 /test/submit HIT");
  console.log("➡️ BODY:", req.body);

  const { userId, testId } = req.body;

  if (!userId) {
    console.log("❌ NO USER ID");
    return res.status(401).json({ message: "User not logged in" });
  }

  if (!testId) {
    console.log("❌ NO TEST ID");
    return res.status(400).json({ message: "Test ID required" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      console.log("❌ USER NOT FOUND");
      return res.status(404).json({ message: "User not found" });
    }

    // Check if test already submitted
    if (user.isTestSubmitted(testId)) {
      console.log("⚠️ TEST ALREADY SUBMITTED");
      return res.status(400).json({ 
        message: "Test already submitted",
        alreadySubmitted: true 
      });
    }

    // Calculate score for this test (you can customize this logic)
    const testScore = user.totalScore; // Or calculate based on test-specific problems

    // Submit the test
    user.submitTest(testId, testScore);
    await user.save();

    console.log(`✅ TEST ${testId} MARKED AS SUBMITTED`);
    console.log("👤 USER:", user.username);

    res.json({ 
      success: true,
      testId: testId,
      score: testScore 
    });
  } catch (err) {
    console.error("🔥 TEST SUBMIT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔥 NEW: Get test submission status
router.get("/status/:userId/:testId", async (req, res) => {
  try {
    const { userId, testId } = req.params;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const submission = user.testSubmissions.find(
      sub => sub.testId === testId
    );

    res.json({
      submitted: submission?.submitted || false,
      submittedAt: submission?.submittedAt,
      score: submission?.score || 0,
    });
  } catch (err) {
    console.error("🔥 TEST STATUS ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;