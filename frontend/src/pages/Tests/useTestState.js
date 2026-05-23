// useTestState.js - Manages all test state and persistence (UPDATED WITH PERSISTENCE)
import { useState, useEffect, useRef } from "react";

const API_URL = "https://polished-excessive-magnetic-judicial.trycloudflare.com";

export function useTestState(testId, userId) {
  const [testStarted, setTestStarted] = useState(false);
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeProblem, setActiveProblem] = useState(1);
  const [solved, setSolved] = useState({});
  
  const previousTestId = useRef(testId);

  // Reset state when testId changes (moving to a new test)
  useEffect(() => {
    if (previousTestId.current !== testId) {
      console.log("Test ID changed, resetting state");
      setTestStarted(false);
      setTestSubmitted(false);
      setActiveProblem(1);
      setSolved({});
      setIsLoading(true);
      previousTestId.current = testId;
    }
  }, [testId]);

  // Load test state on mount or when userId/testId changes
  useEffect(() => {
    let isMounted = true;

    console.log("🔍 useTestState effect triggered:", { userId, testId });

    // If userId is not available, set loading to false and return
    if (!userId) {
      console.log("❌ No userId available in useTestState");
      setIsLoading(false);
      return;
    }

    if (!testId) {
      console.log("No testId provided");
      setIsLoading(false);
      return;
    }

    console.log(`Loading test state for test ${testId}, user ${userId}`);

    const loadTestState = async () => {
      setIsLoading(true);
      
      try {
        // Check if test is already submitted (with timeout)
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const statusRes = await fetch(
          `${API_URL}/test/status/${userId}/${testId}`,
          { signal: controller.signal }
        );
        
        clearTimeout(timeoutId);

        if (!isMounted) return;

        if (statusRes.ok) {
          const statusData = await statusRes.json();
          console.log("Test status:", statusData);

          if (statusData.submitted) {
            setTestSubmitted(true);
            setIsLoading(false);
            return;
          }
        } else {
          console.warn("Failed to fetch test status, continuing with localStorage");
        }

        // 🔥 NEW: Load solved problems from backend
        try {
          const solvedRes = await fetch(
            `${API_URL}/test/solved-problems/${userId}/${testId}`
          );
          
          if (solvedRes.ok) {
            const solvedData = await solvedRes.json();
            
            if (solvedData.success && solvedData.solved) {
              // Convert array to object for easy lookup
              const solvedMap = {};
              solvedData.solved.forEach(item => {
                solvedMap[item.problemId] = true;
              });
              
              console.log("✅ Loaded solved problems from backend:", solvedMap);
              setSolved(solvedMap);
            }
          }
        } catch (solvedErr) {
          console.warn("Failed to load solved problems from backend, using localStorage");
        }

        // Load saved state from localStorage
        const savedStarted = localStorage.getItem(`test_${testId}_started`);
        const savedProblem = localStorage.getItem(`test_${testId}_activeProblem`);
        const savedSolved = localStorage.getItem(`test_${testId}_solved`);

        console.log("LocalStorage state:", { savedStarted, savedProblem, savedSolved });

        if (savedStarted === 'true') {
          setTestStarted(true);
        }
        
        if (savedProblem) {
          setActiveProblem(parseInt(savedProblem));
        }
        
        // 🔥 UPDATED: Merge localStorage solved with backend solved
        if (savedSolved) {
          try {
            const localSolved = JSON.parse(savedSolved);
            setSolved(prev => ({ ...prev, ...localSolved }));
          } catch (e) {
            console.error("Failed to parse solved problems:", e);
          }
        }

        if (isMounted) {
          setIsLoading(false);
          console.log("Test state loaded successfully");
        }
      } catch (err) {
        if (err.name === 'AbortError') {
          console.error("Request timeout");
        } else {
          console.error("Failed to load test state:", err);
        }
        
        // Set default state on error
        if (isMounted) {
          setTestStarted(false);
          setTestSubmitted(false);
          setActiveProblem(1);
          setSolved({});
          setIsLoading(false);
        }
      }
    };

    loadTestState();

    return () => {
      isMounted = false;
    };
  }, [userId, testId]);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (!testId) return;

    if (testStarted) {
      localStorage.setItem(`test_${testId}_started`, 'true');
      if (!localStorage.getItem(`test_${testId}_startTime`)) {
        localStorage.setItem(`test_${testId}_startTime`, Date.now().toString());
      }
    }

    localStorage.setItem(`test_${testId}_activeProblem`, activeProblem.toString());
    localStorage.setItem(`test_${testId}_solved`, JSON.stringify(solved));
  }, [testStarted, activeProblem, solved, testId]);

  const startTest = () => {
    setTestStarted(true);
  };

  const markProblemSolved = (problemId) => {
    setSolved((prev) => ({
      ...prev,
      [problemId]: true,
    }));
  };

  const submitTest = async () => {
    // Check if userId is available
    if (!userId) {
      throw new Error("User not logged in");
    }

    const confirmSubmit = window.confirm(
      "Are you sure you want to submit the test? You cannot make changes after submission."
    );

    if (!confirmSubmit) return false;

    try {
      const res = await fetch(`${API_URL}/test/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          testId: testId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Submission failed");
      }

      // Clear localStorage for this test
      localStorage.removeItem(`test_${testId}_started`);
      localStorage.removeItem(`test_${testId}_startTime`);
      localStorage.removeItem(`test_${testId}_activeProblem`);
      localStorage.removeItem(`test_${testId}_solved`);

      setTestSubmitted(true);
      console.log("Test submitted successfully");
      return true;
    } catch (error) {
      console.error("Submit test error:", error);
      throw error;
    }
  };

  return {
    testStarted,
    testSubmitted,
    isLoading,
    activeProblem,
    setActiveProblem,
    solved,
    markProblemSolved,
    startTest,
    submitTest,
  };
}