import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { problems } from "./problems";
import { languageTemplates } from "./languageTemplates";
import { useTestTimer } from "./useTestTimer";

import TestHeader from "./TestHeader";
import ProblemList from "./ProblemList";
import QuestionPanel from "./QuestionPanel";
import IDEPanel from "./IDEPanel";

import { AuthContext } from "../../context/AuthContext";

import "./Tests.css";

function Tests() {
  /* -------------------- CONTEXT -------------------- */

  const navigate = useNavigate();
  const { user, refreshUser } = useContext(AuthContext);

  console.log("USER FROM CONTEXT:", user);

  /* -------------------- STATE -------------------- */
  const [testStarted, setTestStarted] = useState(false);
  const [testSubmitted, setTestSubmitted] = useState(false);

  const [activeProblem, setActiveProblem] = useState(1);
  const [solved, setSolved] = useState({});

  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState(languageTemplates.cpp);
  const [runResult, setRunResult] = useState("");
  const [score, setScore] = useState(0);

  /* -------------------- TIMER -------------------- */
  const { formatTime } = useTestTimer(
    testStarted,
    testSubmitted,
    90 * 60 // 90 minutes
  );

  /* -------------------- CHECK IF TEST ALREADY SUBMITTED -------------------- */
  useEffect(() => {
    if (user?.testSubmitted) {
      // Redirect to thank you page if test already submitted
      navigate("/tests/thank-you");
    }
  }, [user, navigate]);

  /* -------------------- LOAD SAVED CODE PER PROBLEM -------------------- */
  useEffect(() => {
    const fetchSavedCode = async () => {
      if (!user?.id) return;

      try {
        const res = await fetch(
          `https://inspection-loop-neck-assuming.trycloudflare.com${user.id}/${activeProblem}`
        );

        const data = await res.json();

        if (data?.code) {
          setCode(data.code);
          setLanguage(data.language || "cpp");
        } else {
          setCode(languageTemplates[language]);
        }
      } catch (err) {
        console.error("Failed to load saved code", err);
        setCode(languageTemplates[language]);
      }
    };

    fetchSavedCode();
  }, [activeProblem, user, language]);

  /* -------------------- RUN CODE -------------------- */
  const runCode = async () => {
    if (!testStarted || testSubmitted) return;

    if (!code.trim()) {
      setRunResult("Please write some code ❌");
      return;
    }

    setRunResult("Running...");

    try {
      const res = await fetch("https://inspection-loop-neck-assuming.trycloudflare.comrun", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          problemId: activeProblem,
          language,
          userId: user.id,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        setRunResult("❌ Runtime / Compilation Error");
        return;
      }
      
      setRunResult(`
      Verdict: ${data.verdict}
      Passed: ${data.passed}/${data.total}
      `);
      
      setScore(Math.floor((data.passed / data.total) * 100));
      
      setScore(data.score || 0);
    } catch {
      setRunResult("Failed to connect to backend ❌");
    }
  };

  /* -------------------- SUBMIT CODE (PER PROBLEM) -------------------- */
  const submitCode = async () => {
    if (!testStarted || testSubmitted) return;

    if (!code.trim()) {
      setRunResult("Please write some code ❌");
      return;
    }

    setRunResult("Submitting...");

    try {
      const res = await fetch("https://inspection-loop-neck-assuming.trycloudflare.comrun", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          problemId: activeProblem,
          language,
          userId: user.id,
          submit: true,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        setRunResult("❌ Submission Failed");
        return;
      }
      
      setRunResult(`
      ✅ Submitted Successfully
      Verdict: ${data.verdict}
      Score: ${data.score}
      `);
      
      if (data.verdict === "AC") {
        setSolved((prev) => ({
          ...prev,
          [activeProblem]: true,
        }));
      }
    } catch {
      setRunResult("Failed to connect to backend ❌");
    }
  };

  /* -------------------- SUBMIT ENTIRE TEST -------------------- */
  const handleSubmitTest = async () => {
    if (!user?.id) {
      alert("User not logged in");
      return;
    }

    const confirmSubmit = window.confirm(
      "Are you sure you want to submit the test? You cannot make changes after submission."
    );

    if (!confirmSubmit) return;

    try {
      const res = await fetch("https://inspection-loop-neck-assuming.trycloudflare.comtest/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Submission failed");
        return;
      }
      
      await refreshUser(); // This updates user.testSubmitted to true
      setTestSubmitted(true);
      navigate("/tests/thank-you");
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  /* -------------------- PREVENT ACCESS IF TEST SUBMITTED -------------------- */
  if (user?.testSubmitted) {
    return (
      <div className="test-container" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <div style={{ textAlign: "center" }}>
          <h2>✅ Test Already Submitted</h2>
          <p>You have already submitted this test.</p>
          <button 
            className="solve-btn" 
            onClick={() => navigate("/tests/thank-you")}
            style={{ marginTop: "20px" }}
          >
            View Results
          </button>
        </div>
      </div>
    );
  }

  /* -------------------- RENDER -------------------- */
  return (
    <div className="test-container">
      {/* HEADER */}
      <TestHeader
        formatTime={formatTime}
        testStarted={testStarted}
        testSubmitted={testSubmitted}
        onStart={() => setTestStarted(true)}
        onSubmit={handleSubmitTest}
      />

      {/* PANELS */}
      <div className="test-panels">
        {/* LEFT */}
        <ProblemList
          problems={problems}
          activeProblem={activeProblem}
          solved={solved}
          onSelect={setActiveProblem}
        />

        {/* CENTER */}
        <QuestionPanel problem={problems[activeProblem - 1]} />

        {/* RIGHT */}
        <IDEPanel
          code={code}
          setCode={setCode}
          testStarted={testStarted}
          testSubmitted={testSubmitted}
          onRunCode={runCode}
          onSubmitCode={submitCode}
          runResult={runResult}
          language={language}
          setLanguage={setLanguage}
          score={score}
        />
      </div>
    </div>
  );
}

export default Tests;