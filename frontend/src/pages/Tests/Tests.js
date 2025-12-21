import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { allTests } from "./allTestProblems";
import { useTestTimer } from "./useTestTimer";
import { useTestState } from "./useTestState";
import { useCodeActions } from "./useCodeActions";

import TestHeader from "./TestHeader";
import ProblemList from "./ProblemList";
import QuestionPanel from "./QuestionPanel";
import IDEPanel from "./IDEPanel";

import { AuthContext } from "../../context/AuthContext";

import "./Tests.css";

function Tests() {
  /* -------------------- ROUTING & AUTH -------------------- */
  const { testId } = useParams();
  const navigate = useNavigate();
  const { user, refreshUser } = useContext(AuthContext);

  // Get userId (could be .id or ._id)
  const userId = user?.id || user?._id;
  const totalTestScore = user?.totalScore || 0;
  // 🔍 DEBUG: Log user state
  console.log("🔍 Tests.js - Component Render:", {
    testId,
    userId: userId,
    username: user?.username,
    userExists: !!user,
    userObject: user,
    timestamp: new Date().toISOString()
  });

  // 🔍 DEBUG: Track user changes
  useEffect(() => {
    console.log("👤 User changed:", {
      userId: userId,
      username: user?.username,
      userExists: !!user,
      fullUser: user
    });
  }, [user, userId]);

  // 🔍 DEBUG: Track testId changes
  useEffect(() => {
    console.log("📝 TestId changed:", testId);
  }, [testId]);

  /* -------------------- CUSTOM HOOKS -------------------- */
  // Test state management with persistence
  const {
    testStarted,
    testSubmitted,
    isLoading,
    activeProblem,
    setActiveProblem,
    solved,
    markProblemSolved,
    startTest,
    submitTest,
  } = useTestState(testId, userId);

  // 🔥 UPDATED: Pass testId to useCodeActions
  // Code editor and execution with auto-save
  const {
    language,
    setLanguage,
    code,
    setCode,
    runResult,
    score,
    runCode,
    submitCode,
  } = useCodeActions(userId, activeProblem, testStarted, testSubmitted, testId);

  // Timer with persistence
  const { formatTime } = useTestTimer(
    testStarted,
    testSubmitted,
    90 * 60, // 90 minutes in seconds
    testId
  );

  /* -------------------- DATA -------------------- */
  // Get problems for this specific test
  const problems = allTests[testId] || allTests[1];

  /* -------------------- HANDLERS -------------------- */
  // Handle full test submission
  const handleSubmitTest = async () => {
    console.log("🚀 handleSubmitTest called");
    console.log("🔍 User before submit:", {
      userId: userId,
      username: user?.username,
      userExists: !!user,
      fullUser: user
    });

    // Double check user is logged in
    if (!userId) {
      console.error("❌ No userId available at submit time");
      alert("Session expired. Please log in again.");
      navigate("/login");
      return;
    }

    try {
      console.log("📤 Calling submitTest...");
      const success = await submitTest();
      
      console.log("✅ submitTest result:", success);
      console.log("🔍 User after submit:", {
        userId: userId,
        username: user?.username,
        userExists: !!user,
        fullUser: user
      });

      if (success) {
        console.log("🎉 Test submitted successfully, navigating...");
        
        // Navigate to thank you page
        navigate("/tests/thank-you");
        
        console.log("🔍 User after navigate:", {
          userId: userId,
          username: user?.username,
          userExists: !!user,
          fullUser: user
        });
        
        // Refresh user data AFTER navigation (in background)
        setTimeout(() => {
          console.log("🔄 Starting background refresh...");
          console.log("🔍 User before refresh:", {
            userId: userId,
            username: user?.username,
            userExists: !!user,
            fullUser: user
          });
          
          refreshUser().then(() => {
            console.log("✅ Background refresh completed");
          }).catch(err => {
            console.error("❌ Background refresh failed:", err);
          });
        }, 100);
      }
    } catch (err) {
      console.error("❌ Test submission error:", err);
      
      // Handle specific error messages
      if (err.message === "User not logged in") {
        alert("Your session has expired. Please log in again.");
        navigate("/login");
      } else {
        alert(err.message || "Server error during submission");
      }
    }
  };

  // Handle individual code submission
  const handleCodeSubmit = async () => {
    await submitCode(markProblemSolved);
  };

  /* -------------------- LOADING STATE -------------------- */
  // Show loading while checking user auth OR test state
  if (isLoading || user === undefined) {
    console.log("⏳ Loading state:", { isLoading, userUndefined: user === undefined });
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "1.5rem",
          color: "#666",
        }}
      >
        Loading test data...
      </div>
    );
  }

  /* -------------------- AUTH CHECK -------------------- */
  if (!user) {
    console.log("❌ No user, showing login prompt");
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <h2>Please Log In</h2>
        <p>You need to be logged in to access tests.</p>
        <button
          className="solve-btn"
          onClick={() => navigate("/login")}
          style={{ padding: "10px 30px" }}
        >
          Go to Login
        </button>
      </div>
    );
  }

  /* -------------------- TEST ALREADY SUBMITTED -------------------- */
  if (testSubmitted) {
    console.log("✅ Test already submitted");
    return (
      <div
        className="test-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "500px" }}>
          <h2 style={{ fontSize: "2rem", marginBottom: "20px" }}>
            ✅ Test Already Submitted
          </h2>
          <p style={{ fontSize: "1.2rem", color: "#666", marginBottom: "30px" }}>
            You have already submitted Test {testId}. You cannot make any further changes.
          </p>
          <button
            className="solve-btn"
            onClick={() => navigate("/tests")}
            style={{ padding: "12px 40px", fontSize: "1rem" }}
          >
            Back to Tests
          </button>
        </div>
      </div>
    );
  }

  console.log("✅ Rendering main test interface");

  /* -------------------- MAIN TEST INTERFACE -------------------- */
  return (
    <div className="test-container">
      {/* HEADER WITH TIMER AND SUBMIT */}
      <TestHeader
        formatTime={formatTime}
        testStarted={testStarted}
        testSubmitted={testSubmitted}
        onStart={startTest}
        onSubmit={handleSubmitTest}
      />

      {/* THREE PANEL LAYOUT */}
      <div className="test-panels">
        {/* LEFT PANEL - Problem List */}
        <ProblemList
          problems={problems}
          activeProblem={activeProblem}
          solved={solved}
          onSelect={setActiveProblem}
        />

        {/* CENTER PANEL - Problem Description */}
        <QuestionPanel problem={problems[activeProblem - 1]} />


    
        <IDEPanel
  code={code}
  setCode={setCode}
  testStarted={testStarted}
  testSubmitted={testSubmitted}
  onRunCode={runCode}
  onSubmitCode={handleCodeSubmit}
  runResult={runResult}
  language={language}
  setLanguage={setLanguage}
  score={score}
  totalTestScore={totalTestScore}
  problem={problems[activeProblem - 1]}
  testId={testId}
  userId={userId}  // 🔥 ADD THIS LINE
/>
    </div>
    </div>
  );
}

export default Tests;