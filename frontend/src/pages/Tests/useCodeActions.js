import { useState, useEffect } from "react";
import { languageSample } from "./languageSample";

// 🔥 API URL - Make sure this is correct with no trailing slash
const API_URL = "https://hometown-publicity-eva-qty.trycloudflare.com";

export function useCodeActions(userId, activeProblem, testStarted, testSubmitted, testId) {
  /* ==================== STATE ==================== */
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState(languageSample.cpp);
  const [runResult, setRunResult] = useState("");
  const [score, setScore] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ==================== AUTO-SAVE CODE EVERY 5 SECONDS ==================== */
  useEffect(() => {
    // Don't auto-save if test is not active
    if (!userId || !testStarted || testSubmitted || !testId) {
      return;
    }

    const autoSaveInterval = setInterval(async () => {
      try {
        console.log("💾 Auto-saving code...");
        
        const response = await fetch(`${API_URL}/test/save-code`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            testId,
            problemId: activeProblem,
            code,
            language
          })
        });

        const data = await response.json();
        
        if (data.success) {
          console.log("✅ Code auto-saved at", new Date().toLocaleTimeString());
        } else {
          console.warn("⚠️ Auto-save warning:", data.error);
        }
      } catch (error) {
        console.error("❌ Auto-save failed:", error);
      }
    }, 5000); // Save every 5 seconds

    return () => clearInterval(autoSaveInterval);
  }, [userId, testId, activeProblem, code, language, testStarted, testSubmitted]);

  /* ==================== LOAD SAVED CODE WHEN SWITCHING PROBLEMS ==================== */
  useEffect(() => {
    // Reset to template if no user or test
    if (!userId || !testId) {
      setCode(languageSample[language]);
      setScore(0);
      return;
    }

    const fetchSavedCode = async () => {
      try {
        console.log(`📂 Loading saved code for Problem ${activeProblem}...`);
        
        const response = await fetch(
          `${API_URL}/test/saved-code/${userId}/${activeProblem}?testId=${testId}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success && data.code) {
          console.log("✅ Loaded saved code:", {
            codeLength: data.code.length,
            language: data.language,
            solved: data.solved,
            bestScore: data.bestScore
          });
          
          setCode(data.code);
          setLanguage(data.language || "cpp");
          setScore(data.bestScore || 0);
        } else {
          // No saved code, use template
          console.log("📝 No saved code found, using template");
          setCode(languageSample[language]);
          setScore(0);
        }
      } catch (error) {
        console.error("❌ Failed to load saved code:", error);
        setCode(languageSample[language]);
        setScore(0);
      }
    };

    fetchSavedCode();
  }, [activeProblem, userId, testId]); // Intentionally not including 'language'

  /* ==================== RUN CODE ==================== */
  const runCode = async () => {
    console.log("🔵 [runCode] Function called");
    console.log("🔍 [runCode] State check:", {
      userId,
      testStarted,
      testSubmitted,
      activeProblem,
      language,
      codeLength: code?.length,
      isRunning,
      isSubmitting,
      testId
    });

    // Validation checks
    if (!userId) {
      console.log("❌ [runCode] Validation failed: No userId");
      setRunResult("❌ Error: User not logged in. Please refresh the page.");
      return;
    }

    if (!testStarted || testSubmitted) {
      console.log("❌ [runCode] Validation failed: Test not active", { testStarted, testSubmitted });
      setRunResult("⚠️ Test is not active. Cannot run code.");
      return;
    }

    if (!code.trim()) {
      console.log("❌ [runCode] Validation failed: No code");
      setRunResult("❌ Please write some code before running.");
      return;
    }

    if (isRunning || isSubmitting) {
      console.log("⚠️ [runCode] Already running/submitting, skipping");
      return; // Prevent concurrent requests
    }

    setIsRunning(true);
    setRunResult("⏳ Running your code...");

    const requestBody = {
      code,
      problemId: activeProblem,
      language,
      userId,
      submit: false,
      testId
    };

    console.log("📦 [runCode] Request payload:", requestBody);
    console.log("🌐 [runCode] API_URL:", API_URL);
    console.log("🔗 [runCode] Full URL:", `${API_URL}/run`);

    try {
      console.log("🚀 [runCode] Sending fetch request...");
      
      const response = await fetch(`${API_URL}/run`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      });

      console.log("📡 [runCode] Response received:", {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        url: response.url
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ [runCode] Server returned error:", errorText);
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("📊 [runCode] Response data:", data);

      if (!data.success) {
        console.log("⚠️ [runCode] Code execution failed:", data);
        setRunResult(
          `❌ Runtime / Compilation Error\n\n${data.error || data.message || "Unknown error occurred"}`
        );
        setScore(0);
        return;
      }

      // Calculate score
      const calculatedScore = data.score || Math.floor((data.passed / data.total) * 100);
      console.log("💯 [runCode] Calculated score:", calculatedScore);
      
      // Display results
      const resultMessage = `
✅ Code Executed Successfully

Verdict: ${data.verdict || "N/A"}
Test Cases Passed: ${data.passed || 0}/${data.total || 0}
Score: ${calculatedScore}/100
${data.message ? '\n' + data.message : ''}
      `.trim();

      console.log("✅ [runCode] Success! Setting results");
      setRunResult(resultMessage);
      setScore(calculatedScore);

    } catch (error) {
      console.error("❌ [runCode] Catch block - Error:", error);
      console.error("❌ [runCode] Error name:", error.name);
      console.error("❌ [runCode] Error message:", error.message);
      console.error("❌ [runCode] Error stack:", error.stack);
      
      setRunResult(
        `❌ Failed to connect to server\n\nError: ${error.message}\n\nPlease check:\n• Your internet connection\n• Backend server is running\n• API URL is correct: ${API_URL}/run`
      );
      setScore(0);
    } finally {
      console.log("🏁 [runCode] Finally block - Setting isRunning to false");
      setIsRunning(false);
    }
  };

  /* ==================== SUBMIT CODE ==================== */
  const submitCode = async (onSuccess) => {
    console.log("🔵 [submitCode] Function called");
    console.log("🔍 [submitCode] State check:", {
      userId,
      testStarted,
      testSubmitted,
      activeProblem,
      language,
      codeLength: code?.length,
      isRunning,
      isSubmitting,
      testId
    });

    // Validation checks
    if (!userId) {
      console.log("❌ [submitCode] Validation failed: No userId");
      setRunResult("❌ Error: User not logged in. Please refresh the page.");
      return;
    }

    if (!testStarted || testSubmitted) {
      console.log("❌ [submitCode] Validation failed: Test not active");
      setRunResult("⚠️ Test is not active. Cannot submit code.");
      return;
    }

    if (!code.trim()) {
      console.log("❌ [submitCode] Validation failed: No code");
      setRunResult("❌ Please write some code before submitting.");
      return;
    }

    if (isRunning || isSubmitting) {
      console.log("⚠️ [submitCode] Already running/submitting, skipping");
      return; // Prevent concurrent requests₹
    }

    // Confirm submission
    const confirmSubmit = window.confirm(
      `⚠️ Are you sure you want to submit your solution for Problem ${activeProblem}?\n\nThis will lock your submission for this problem.`
    );

    if (!confirmSubmit) {
      console.log("ℹ️ [submitCode] User cancelled submission");
      return;
    }

    setIsSubmitting(true);
    setRunResult("⏳ Submitting your solution...");

    console.log("📦 [submitCode] Request payload:", {
      userId,
      testId,
      problemId: activeProblem,
      language,
      codeLength: code.length,
      submit: true
    });

    try {
      console.log("💾 [submitCode] Step 1: Saving code before submission...");
      
      const saveResponse = await fetch(`${API_URL}/test/save-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          testId,
          problemId: activeProblem,
          code,
          language
        })
      });

      console.log("📡 [submitCode] Save response:", {
        status: saveResponse.status,
        ok: saveResponse.ok
      });

      // Step 2: Submit for evaluation
      console.log("🚀 [submitCode] Step 2: Submitting for evaluation...");
      console.log("🔗 [submitCode] Full URL:", `${API_URL}/run`);
      
      const response = await fetch(`${API_URL}/run`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          code,
          problemId: activeProblem,
          language,
          userId,
          submit: true,
          testId
        })
      });

      console.log("📡 [submitCode] Submit response:", {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        url: response.url
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ [submitCode] Server returned error:", errorText);
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("📊 [submitCode] Submit result:", data);

      if (!data.success) {
        console.log("⚠️ [submitCode] Submission failed:", data);
        setRunResult(
          `❌ Submission Failed\n\n${data.error || data.message || "Unknown error occurred"}\n\nPlease try again.`
        );
        return;
      }

      const submittedScore = data.score || 0;
      const totalScore = data.totalScore || 100;
      const isAccepted = data.verdict === "AC" || data.verdict === "Accepted";

      console.log("💯 [submitCode] Submission scores:", {
        submittedScore,
        totalScore,
        isAccepted,
        verdict: data.verdict
      });

      // Display submission results
      const resultMessage = `
✅ SUBMITTED SUCCESSFULLY!

Verdict: ${data.verdict || "N/A"}
Score: ${submittedScore}/${totalScore}
Test Cases Passed: ${data.passed || 0}/${data.total || 0}
${data.message ? '\n' + data.message : ''}

${data.scoreImproved ? '🎉 New Best Score!' : ''}
${data.bestScore ? `Best Score: ${data.bestScore}/100` : ''}

Submission saved successfully ✅
      `.trim();

      console.log("✅ [submitCode] Success! Setting results");
      setRunResult(resultMessage);
      setScore(submittedScore);

      // Mark problem as solved if accepted
      if (isAccepted && onSuccess) {
        console.log("🎉 [submitCode] Marking problem as solved");
        onSuccess(activeProblem);
      }

    } catch (error) {
      console.error("❌ [submitCode] Catch block - Error:", error);
      console.error("❌ [submitCode] Error name:", error.name);
      console.error("❌ [submitCode] Error message:", error.message);
      console.error("❌ [submitCode] Error stack:", error.stack);
      
      setRunResult(
        `❌ Failed to connect to server\n\nError: ${error.message}\n\nPlease check:\n• Your internet connection\n• Backend server is running\n• API URL is correct: ${API_URL}/run\n\nYour code was NOT submitted. Please try again.`
      );
    } finally {
      console.log("🏁 [submitCode] Finally block - Setting isSubmitting to false");
      setIsSubmitting(false);
    }
  };

  /* ==================== CHANGE LANGUAGE ==================== */
  const handleLanguageChange = (newLanguage) => {
    // Warn user if they have unsaved code
    if (code !== languageSample[language] && code.trim() !== "") {
      const confirmChange = window.confirm(
        "Changing language will replace your current code with a template. Continue?"
      );
      
      if (!confirmChange) {
        return;
      }
    }

    setLanguage(newLanguage);
    setCode(languageSample[newLanguage]);
  };

  /* ==================== RETURN ==================== */
  return {
    // State
    language,
    code,
    runResult,
    score,
    isRunning,
    isSubmitting,
    
    // Actions
    setLanguage: handleLanguageChange,
    setCode,
    runCode,
    submitCode,
  };
}