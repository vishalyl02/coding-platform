const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { runJudge } = require("../services/judge.service");

// Import test cases from problems.js
const problemTests = require("../data/problems");

/**
 * Get test cases for a problem
 * 🔥 UPDATED: Now handles testId-problemId format
 */
function getTestCases(testId, problemId) {
  console.log("🔍 getTestCases called with:", { testId, problemId });
  
  // Try with testId-problemId format first (e.g., "2-1")
  let problemKey = `${testId}-${problemId}`;
  let tests = problemTests[problemKey];
  
  console.log(`📝 Trying key: "${problemKey}"`, tests ? `Found ${tests.length} tests` : "Not found");
  
  // Fallback to just problemId for backward compatibility
  if (!tests) {
    problemKey = problemId.toString();
    tests = problemTests[problemKey];
    console.log(`📝 Fallback key: "${problemKey}"`, tests ? `Found ${tests.length} tests` : "Not found");
  }
  
  if (!tests || tests.length === 0) {
    console.warn(`⚠️ No test cases found for ${problemKey}`);
    console.log("🗂️ Available keys in problemTests:", Object.keys(problemTests));
    return [];
  }
  
  console.log(`✅ Found ${tests.length} test cases for ${problemKey}`);
  return tests;
}

// ========================================
// CUSTOM TEST EXECUTION ENDPOINT
// ========================================
router.post("/run-custom", async (req, res) => {
  console.log("========================================");
  console.log("🧪 /run-custom ENDPOINT HIT");
  console.log("⏰ Timestamp:", new Date().toISOString());
  console.log("========================================");
  console.log("📦 Request Body:", JSON.stringify(req.body, null, 2));
  
  const { code, language, input } = req.body;

  if (!code || !language) {
    console.log("❌ Validation failed: Missing code or language");
    return res.status(400).json({ 
      success: false,
      message: "Code and language required" 
    });
  }

  console.log("✅ Validation passed");
  console.log("🔧 Creating mock test case...");

  try {
    // Create a mock test case with user's input
    const mockTestCase = {
      input: input || "",
      output: "" // We don't compare, just show output
    };

    console.log("🏃 Running judge with custom input...");
    const result = await runJudge(code, language, [mockTestCase]);
    console.log("📊 Judge result:", JSON.stringify(result, null, 2));
    
    const response = {
      success: !result.error,
      output: result.outputs?.[0] || result.error || "No output",
      error: result.error,
    };
    
    console.log("✅ Sending response:", JSON.stringify(response, null, 2));
    res.json(response);
  } catch (err) {
    console.error("========================================");
    console.error("🔥 CUSTOM RUN ERROR");
    console.error("========================================");
    console.error("Error name:", err.name);
    console.error("Error message:", err.message);
    console.error("Error stack:", err.stack);
    console.error("========================================");
    
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
});

// ========================================
// MAIN CODE EXECUTION ENDPOINT
// ========================================
router.post("/", async (req, res) => {
  console.log("========================================");
  console.log("🚀 /run ENDPOINT HIT (MAIN)");
  console.log("⏰ Timestamp:", new Date().toISOString());
  console.log("========================================");
  console.log("📦 Full Request Body:", JSON.stringify(req.body, null, 2));
  console.log("🔗 Request Headers:", JSON.stringify(req.headers, null, 2));
  console.log("🌐 Request URL:", req.originalUrl);
  console.log("🔧 Request Method:", req.method);

  try {
    const { code, problemId, language, userId, submit, testId } = req.body;

    console.log("========================================");
    console.log("📊 Extracted Parameters:");
    console.log("========================================");
    console.log("- problemId:", problemId, typeof problemId);
    console.log("- language:", language, typeof language);
    console.log("- userId:", userId, typeof userId);
    console.log("- submit:", submit, typeof submit);
    console.log("- testId:", testId, typeof testId);
    console.log("- code length:", code?.length, "chars");
    console.log("========================================");

    // VALIDATION
    console.log("🔍 Starting validation...");
    
    if (!userId) {
      console.log("❌ VALIDATION FAILED: No userId");
      return res.status(401).json({ 
        success: false,
        error: "User not logged in" 
      });
    }
    console.log("✅ userId validated");

    if (!code || !code.trim()) {
      console.log("❌ VALIDATION FAILED: No code provided");
      return res.status(400).json({ 
        success: false,
        error: "Code is required" 
      });
    }
    console.log("✅ code validated");

    if (!problemId) {
      console.log("❌ VALIDATION FAILED: No problemId");
      return res.status(400).json({ 
        success: false,
        error: "Problem ID is required" 
      });
    }
    console.log("✅ problemId validated");

    if (!language) {
      console.log("❌ VALIDATION FAILED: No language");
      return res.status(400).json({ 
        success: false,
        error: "Language is required" 
      });
    }
    console.log("✅ language validated");

    console.log("✅ All validations passed");

    // 🔥 GET TEST CASES (now with testId support)
    console.log("========================================");
    console.log("🔍 Fetching test cases...");
    console.log("- testId:", testId);
    console.log("- problemId:", problemId);
    console.log("========================================");
    
    const testCases = getTestCases(testId, problemId);
    
    if (!testCases || testCases.length === 0) {
      console.log("❌ NO TEST CASES FOUND");
      console.log("🗂️ Available keys:", Object.keys(problemTests));
      return res.status(400).json({
        success: false,
        error: `No test cases found for test ${testId}, problem ${problemId}`,
        availableKeys: Object.keys(problemTests)
      });
    }

    console.log(`✅ Found ${testCases.length} test cases`);
    console.log("📝 Test cases preview:", JSON.stringify(testCases.slice(0, 1), null, 2));

    // RUN CODE THROUGH JUDGE
    console.log("========================================");
    console.log("🏃 EXECUTING CODE THROUGH JUDGE");
    console.log("========================================");
    console.log("Code preview (first 100 chars):", code.substring(0, 100));
    
    const executionResult = await runJudge(code, language, testCases);
    
    console.log("========================================");
    console.log("📊 JUDGE EXECUTION RESULT");
    console.log("========================================");
    console.log(JSON.stringify(executionResult, null, 2));
    console.log("========================================");

    // 🔥 ADD TEST CASE RESULTS FOR FRONTEND DISPLAY
    const testCaseResults = testCases.map((tc, idx) => ({
      input: tc.input,
      expectedOutput: tc.output,
      yourOutput: executionResult.outputs?.[idx] || "No output",
      passed: executionResult.results?.[idx] || false,
    }));

    console.log("✅ Test case results prepared:", testCaseResults.length, "results");

    // SCORE TRACKING (Only for submissions)
    if (submit && userId && testId && executionResult.success) {
      console.log("========================================");
      console.log("💾 SCORE TRACKING (SUBMISSION MODE)");
      console.log("========================================");
      
      try {
        const user = await User.findById(userId);
        console.log("👤 User found:", user ? user.username : "NOT FOUND");
        
        if (user && !user.isTestSubmitted(testId)) {
          const savedCode = user.getSavedCode(testId, problemId);
          const currentBestScore = savedCode?.bestScore || 0;
          
          console.log("📊 Current best score:", currentBestScore);
          console.log("📊 New score:", executionResult.score);
          
          if (executionResult.score > currentBestScore) {
            console.log("🎉 New best score! Updating...");
            
            user.saveCode(testId, problemId, code, language);
            
            const scoreIndex = user.codeSaves.findIndex(
              s => s.testId === testId.toString() && s.problemId === problemId.toString()
            );
            
            if (scoreIndex >= 0) {
              user.codeSaves[scoreIndex].bestScore = executionResult.score;
              user.codeSaves[scoreIndex].solved = executionResult.score === 100;
            }
            
            await user.save();
            console.log("✅ Score saved successfully");
            
            executionResult.bestScore = executionResult.score;
            executionResult.scoreImproved = true;
          } else {
            console.log("ℹ️ No score improvement");
            executionResult.bestScore = currentBestScore;
            executionResult.scoreImproved = false;
          }
        } else {
          if (!user) {
            console.log("⚠️ User not found for score tracking");
          } else {
            console.log("⚠️ Test already submitted, skipping score tracking");
          }
        }
      } catch (err) {
        console.error("========================================");
        console.error("❌ SCORE TRACKING ERROR");
        console.error("========================================");
        console.error("Error:", err);
        console.error("========================================");
      }
    } else {
      console.log("ℹ️ Skipping score tracking (submit:", submit, "userId:", !!userId, "testId:", !!testId, "success:", executionResult.success, ")");
    }

    // SEND RESPONSE
    const response = {
      success: executionResult.success,
      verdict: executionResult.verdict,
      passed: executionResult.passed,
      total: executionResult.total,
      score: executionResult.score || 0,
      totalScore: 100,
      message: executionResult.message,
      error: executionResult.error,
      bestScore: executionResult.bestScore,
      scoreImproved: executionResult.scoreImproved,
      testCaseResults: testCaseResults, // 🔥 ADD THIS for frontend
    };

    console.log("========================================");
    console.log("✅ SENDING FINAL RESPONSE");
    console.log("========================================");
    console.log(JSON.stringify(response, null, 2));
    console.log("========================================");
    
    res.json(response);

  } catch (error) {
    console.error("========================================");
    console.error("🔥 FATAL ERROR IN /run ENDPOINT");
    console.error("========================================");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    console.error("========================================");
    
    res.status(500).json({
      success: false,
      verdict: "ERR",
      error: "Execution failed",
      message: error.message,
      passed: 0,
      total: 0,
      score: 0,
      testCaseResults: [],
    });
  }
});

module.exports = router;