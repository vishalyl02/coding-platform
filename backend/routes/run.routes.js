const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { runJudge } = require("../services/judge.service");

// Import test cases from problems.js
const problemTests = require("../data/problems");

/**
 * Get test cases for a problem
 */
function getTestCases(testId, problemId) {
  console.log("🔍 getTestCases called with:", { testId, problemId });
  
  let problemKey = `${testId}-${problemId}`;
  let tests = problemTests[problemKey];
  
  console.log(`📝 Trying key: "${problemKey}"`, tests ? `Found ${tests.length} tests` : "Not found");
  
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

router.post("/run-custom", async (req, res) => {
  console.log("========================================");
  console.log("🧪 /run-custom ENDPOINT HIT");
  console.log("========================================");
  
  const { code, language, input } = req.body;

  if (!code || !language) {
    return res.status(400).json({ 
      success: false,
      message: "Code and language required" 
    });
  }

  try {
    const mockTestCase = {
      input: input || "",
      output: ""
    };

    const result = await runJudge(code, language, [mockTestCase]);
    
    console.log("========================================");
    console.log("🧪 CUSTOM RUN RESULT:");
    console.log("========================================");
    console.log("Success:", result.success);
    console.log("Outputs array:", result.outputs);
    console.log("Output[0]:", result.outputs?.[0]);
    console.log("========================================");
    
    const response = {
      success: !result.error,
      output: result.outputs?.[0] || "", // 🔥 Use outputs array
      error: result.error || null,
    };
    
    console.log("✅ Sending custom response:", response);
    res.json(response);
  } catch (err) {
    console.error("🔥 CUSTOM RUN ERROR:", err);
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
  console.log("========================================");

  try {
    const { code, problemId, language, userId, submit, testId } = req.body;

    console.log("📊 Parameters:", {
      problemId,
      language,
      userId,
      submit,
      testId,
      codeLength: code?.length
    });

    // VALIDATION
    if (!userId) {
      return res.status(401).json({ 
        success: false,
        error: "User not logged in" 
      });
    }

    if (!code || !code.trim()) {
      return res.status(400).json({ 
        success: false,
        error: "Code is required" 
      });
    }

    if (!problemId) {
      return res.status(400).json({ 
        success: false,
        error: "Problem ID is required" 
      });
    }

    if (!language) {
      return res.status(400).json({ 
        success: false,
        error: "Language is required" 
      });
    }

    // GET TEST CASES
    const testCases = getTestCases(testId, problemId);
    
    if (!testCases || testCases.length === 0) {
      console.log("❌ NO TEST CASES FOUND");
      return res.status(400).json({
        success: false,
        error: `No test cases found for test ${testId}, problem ${problemId}`,
        availableKeys: Object.keys(problemTests)
      });
    }

    console.log(`✅ Found ${testCases.length} test cases`);

    // RUN CODE THROUGH JUDGE
    console.log("========================================");
    console.log("🏃 EXECUTING CODE");
    console.log("========================================");
    
    const executionResult = await runJudge(code, language, testCases);
    
    console.log("========================================");
    console.log("📊 EXECUTION RESULT:");
    console.log("========================================");
    console.log(JSON.stringify(executionResult, null, 2));
    console.log("========================================");

    // 🔥 CRITICAL: Build test case results with actual outputs
    console.log("========================================");
    console.log("🔧 BUILDING TEST CASE RESULTS:");
    console.log("========================================");
    
    const testCaseResults = testCases.map((tc, idx) => {
      const yourOutput = executionResult.outputs?.[idx];
      const passed = executionResult.results?.[idx] === "AC";
      
      console.log(`Test Case ${idx + 1}:`, {
        input: tc.input.substring(0, 50),
        expectedOutput: tc.output,
        yourOutput: yourOutput,
        yourOutputType: typeof yourOutput,
        yourOutputExists: yourOutput !== undefined && yourOutput !== null,
        passed: passed,
        verdict: executionResult.results?.[idx]
      });
      
      return {
        input: tc.input,
        expectedOutput: tc.output,
        yourOutput: yourOutput !== undefined && yourOutput !== null ? String(yourOutput) : "",
        passed: passed,
      };
    });

    console.log("========================================");
    console.log("✅ TEST CASE RESULTS BUILT:");
    console.log("========================================");
    testCaseResults.forEach((tcr, idx) => {
      console.log(`Result ${idx + 1}:`, {
        yourOutput: tcr.yourOutput,
        expectedOutput: tcr.expectedOutput,
        passed: tcr.passed
      });
    });
    console.log("========================================");

    // SCORE TRACKING
    if (submit && userId && testId && executionResult.success) {
      console.log("💾 SCORE TRACKING...");
      
      try {
        const user = await User.findById(userId);
        
        if (user && !user.isTestSubmitted(testId)) {
          const savedCode = user.getSavedCode(testId, problemId);
          const currentBestScore = savedCode?.bestScore || 0;
          
          if (executionResult.score > currentBestScore) {
            user.saveCode(testId, problemId, code, language);
            
            const scoreIndex = user.codeSaves.findIndex(
              s => s.testId === testId.toString() && s.problemId === problemId.toString()
            );
            
            if (scoreIndex >= 0) {
              user.codeSaves[scoreIndex].bestScore = executionResult.score;
              user.codeSaves[scoreIndex].solved = executionResult.score === 100;
            }
            
            await user.save();
            
            executionResult.bestScore = executionResult.score;
            executionResult.scoreImproved = true;
          } else {
            executionResult.bestScore = currentBestScore;
            executionResult.scoreImproved = false;
          }
        }
      } catch (err) {
        console.error("❌ SCORE TRACKING ERROR:", err);
      }
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
      testCaseResults: testCaseResults, // 🔥 WITH ACTUAL OUTPUTS
    };

    console.log("========================================");
    console.log("✅ SENDING FINAL RESPONSE:");
    console.log("========================================");
    console.log(JSON.stringify(response, null, 2));
    console.log("========================================");
    
    res.json(response);

  } catch (error) {
    console.error("========================================");
    console.error("🔥 FATAL ERROR:");
    console.error("========================================");
    console.error(error);
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