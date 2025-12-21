const express = require("express");
const router = express.Router();
const User = require("../models/User");

// ========================================
// TEST SUBMISSION ENDPOINTS
// ========================================

// 🔥 Submit Test (Lock test forever)
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

    // 🔥 FIX: Calculate total score from all problems in this test
    const testProblems = user.codeSaves.filter(
      save => save.testId === testId.toString()
    );
    
    const testScore = testProblems.reduce((total, problem) => {
      return total + (problem.bestScore || 0);
    }, 0);

    console.log("📊 Test score calculation:", {
      testId,
      problemsFound: testProblems.length,
      scores: testProblems.map(p => ({ problemId: p.problemId, score: p.bestScore })),
      totalScore: testScore
    });

    // 🔥 FIX: Update user's total score
    user.totalScore = testScore;

    // Submit the test
    user.submitTest(testId, testScore);
    await user.save();

    console.log(`✅ TEST ${testId} MARKED AS SUBMITTED`);
    console.log("👤 USER:", user.username);
    console.log("💯 TOTAL SCORE:", testScore);

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

// 🔥 Get test submission status
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

// ========================================
// CODE PERSISTENCE ENDPOINTS
// ========================================

// 🔥 Auto-save code (called every 5 seconds from frontend)
router.post("/save-code", async (req, res) => {
  try {
    const { userId, testId, problemId, code, language } = req.body;

    if (!userId || !testId || !problemId) {
      return res.status(400).json({ 
        success: false,
        error: "userId, testId, and problemId are required" 
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ 
        success: false,
        error: "User not found" 
      });
    }

    // Check if test is already submitted
    if (user.isTestSubmitted(testId)) {
      return res.status(400).json({ 
        success: false,
        error: "Cannot save code - test already submitted" 
      });
    }

    // Save the code
    user.saveCode(testId, problemId, code || "", language || "cpp");
    await user.save();

    console.log(`💾 Auto-saved code for user ${userId}, test ${testId}, problem ${problemId}`);

    res.json({ 
      success: true,
      message: "Code auto-saved",
      timestamp: new Date()
    });
  } catch (error) {
    console.error("❌ Error auto-saving code:", error);
    res.status(500).json({ 
      success: false,
      error: "Failed to save code" 
    });
  }
});

// 🔥 Get saved code for a problem
router.get("/saved-code/:userId/:problemId", async (req, res) => {
  try {
    const { userId, problemId } = req.params;
    const { testId } = req.query;

    if (!userId || !problemId) {
      return res.status(400).json({ 
        success: false,
        error: "userId and problemId are required" 
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ 
        success: false,
        error: "User not found" 
      });
    }

    // If testId provided, get saved code for specific test
    if (testId) {
      const savedCode = user.getSavedCode(testId, problemId);
      
      return res.json({
        success: true,
        code: savedCode?.code || "",
        language: savedCode?.language || "cpp",
        solved: savedCode?.solved || false,
        bestScore: savedCode?.bestScore || 0,
        lastSavedAt: savedCode?.lastSavedAt
      });
    }

    // If no testId, return empty (backwards compatible)
    res.json({
      success: true,
      code: "",
      language: "cpp",
      solved: false,
      bestScore: 0
    });

  } catch (error) {
    console.error("❌ Error retrieving saved code:", error);
    res.status(500).json({ 
      success: false,
      error: "Failed to retrieve code" 
    });
  }
});

// 🔥 Get all solved problems for a test (for checkmarks)
router.get("/solved-problems/:userId/:testId", async (req, res) => {
  try {
    const { userId, testId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ 
        success: false,
        error: "User not found" 
      });
    }

    // Get all solved problems for this test
    const solvedProblems = user.codeSaves
      .filter(save => save.testId === testId && save.solved)
      .map(save => ({
        problemId: save.problemId,
        bestScore: save.bestScore
      }));

    res.json({
      success: true,
      solved: solvedProblems
    });
  } catch (error) {
    console.error("❌ Error getting solved problems:", error);
    res.status(500).json({ 
      success: false,
      error: "Failed to get solved problems" 
    });
  }
});

module.exports = router;