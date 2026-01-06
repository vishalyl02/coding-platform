// const express = require("express");
// const router = express.Router();
// const problemTests = require("../data/problems");

// // Get test cases for a specific problem
// router.get("/:testId/:problemId", async (req, res) => {
//   const { testId, problemId } = req.params;
//   const problemKey = `${testId}-${problemId}`;
  
//   try {
//     const testCases = problemTests[problemKey];
    
//     if (!testCases) {
//       return res.status(404).json({ 
//         success: false,
//         message: "Problem not found" 
//       });
//     }

//     // Return test cases with input/output for display
//     const formattedTestCases = testCases.map((tc, idx) => ({
//       id: idx + 1,
//       input: tc.input,
//       output: tc.output,
//     }));

//     res.json({
//       success: true,
//       testCases: formattedTestCases,
//     });
//   } catch (err) {
//     console.error("Problem fetch error:", err);
//     res.status(500).json({ 
//       success: false,
//       message: "Server error" 
//     });
//   }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const problemTests = require("../data/problems");

// Get test cases for a specific problem
router.get("/:testId/:problemId", async (req, res) => {
  const { testId, problemId } = req.params;
  const problemKey = `${testId}-${problemId}`;
  
  try {
    const testCases = problemTests[problemKey];
    
    if (!testCases) {
      return res.status(404).json({ 
        success: false,
        message: "Problem not found" 
      });
    }

    // 🔥 Only return first 3 test cases for display
    const visibleTestCases = testCases.slice(0, 3).map((tc, idx) => ({
      id: idx + 1,
      input: tc.input,
      output: tc.output,
    }));

    res.json({
      success: true,
      testCases: visibleTestCases,
      totalTestCases: testCases.length, // 🔥 Send total count
    });
  } catch (err) {
    console.error("Problem fetch error:", err);
    res.status(500).json({ 
      success: false,
      message: "Server error" 
    });
  }
});

module.exports = router;