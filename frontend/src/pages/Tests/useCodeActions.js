import { useState, useEffect } from "react";
import { languageTemplates } from "./languageTemplates";

// 🔥 API URL - Update this when tunnel URL changes
const API_URL = "https://inspection-loop-neck-assuming.trycloudflare.com";

export function useCodeActions(userId, activeProblem, testStarted, testSubmitted) {
  /* -------------------- STATE -------------------- */
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState(languageTemplates.cpp);
  const [runResult, setRunResult] = useState("");
  const [score, setScore] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* -------------------- LOAD SAVED CODE -------------------- */
  useEffect(() => {
    // Don't fetch if userId is not available yet
    if (userId === undefined || userId === null) {
      setCode(languageTemplates[language]);
      return;
    }

    const fetchSavedCode = async () => {
      try {
        const res = await fetch(
          `${API_URL}/saved-code/${userId}/${activeProblem}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch saved code");
        }

        const data = await res.json();

        if (data?.code) {
          // Load saved code and language
          setCode(data.code);
          setLanguage(data.language || "cpp");
        } else {
          // No saved code, use template
          setCode(languageTemplates[language]);
        }
      } catch (err) {
        console.error("Failed to load saved code:", err);
        // Fallback to template on error
        setCode(languageTemplates[language]);
      }
    };

    fetchSavedCode();
  }, [activeProblem, userId, language]);

  /* -------------------- RUN CODE -------------------- */
  const runCode = async () => {
    // Validate user is logged in
    if (!userId) {
      setRunResult("❌ User not logged in. Please refresh the page.");
      return;
    }

    // Validate conditions
    if (!testStarted || testSubmitted) {
      setRunResult("⚠️ Test is not active");
      return;
    }

    if (!code.trim()) {
      setRunResult("❌ Please write some code before running");
      return;
    }

    if (isRunning || isSubmitting) {
      return; // Prevent multiple simultaneous requests
    }

    setIsRunning(true);
    setRunResult("⏳ Running your code...");

    try {
      const res = await fetch(`${API_URL}/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          problemId: activeProblem,
          language,
          userId: userId,
          submit: false, // This is just a test run
        }),
      });

      if (!res.ok) {
        throw new Error("Server error");
      }

      const data = await res.json();

      if (!data.success) {
        setRunResult("❌ Runtime / Compilation Error\n\n" + (data.error || ""));
        setScore(0);
        return;
      }

      // Display results
      setRunResult(`
✅ Code Executed Successfully

Verdict: ${data.verdict}
Test Cases Passed: ${data.passed}/${data.total}
${data.message ? '\n' + data.message : ''}
      `.trim());

      // Calculate score
      const calculatedScore = data.score || Math.floor((data.passed / data.total) * 100);
      setScore(calculatedScore);

    } catch (err) {
      console.error("Run code error:", err);
      setRunResult("❌ Failed to connect to backend\n\nPlease check your internet connection.");
      setScore(0);
    } finally {
      setIsRunning(false);
    }
  };

  /* -------------------- SUBMIT CODE -------------------- */
  const submitCode = async (onSuccess) => {
    // Validate user is logged in
    if (!userId) {
      setRunResult("❌ User not logged in. Please refresh the page.");
      return;
    }

    // Validate conditions
    if (!testStarted || testSubmitted) {
      setRunResult("⚠️ Test is not active");
      return;
    }

    if (!code.trim()) {
      setRunResult("❌ Please write some code before submitting");
      return;
    }

    if (isRunning || isSubmitting) {
      return; // Prevent multiple simultaneous requests
    }

    // Confirm submission
    const confirmSubmit = window.confirm(
      `Are you sure you want to submit your solution for Problem ${activeProblem}?`
    );

    if (!confirmSubmit) {
      return;
    }

    setIsSubmitting(true);
    setRunResult("⏳ Submitting your solution...");

    try {
      const res = await fetch(`${API_URL}/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          problemId: activeProblem,
          language,
          userId: userId,
          submit: true, // This is a final submission
        }),
      });

      if (!res.ok) {
        throw new Error("Server error");
      }

      const data = await res.json();

      if (!data.success) {
        setRunResult("❌ Submission Failed\n\n" + (data.error || "Please try again."));
        return;
      }

      // Display submission results
      setRunResult(`
✅ SUBMITTED SUCCESSFULLY!

Verdict: ${data.verdict}
Score: ${data.score}/${data.totalScore || 100}
Test Cases Passed: ${data.passed}/${data.total}
${data.message ? '\n' + data.message : ''}
      `.trim());

      setScore(data.score || 0);

      // Mark problem as solved if verdict is "Accepted"
      if (data.verdict === "AC" || data.verdict === "Accepted") {
        if (onSuccess) {
          onSuccess(activeProblem);
        }
      }

    } catch (err) {
      console.error("Submit code error:", err);
      setRunResult("❌ Failed to connect to backend\n\nPlease check your internet connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* -------------------- RETURN -------------------- */
  return {
    // State
    language,
    code,
    runResult,
    score,
    isRunning,
    isSubmitting,
    
    // Actions
    setLanguage,
    setCode,
    runCode,
    submitCode,
  };
}