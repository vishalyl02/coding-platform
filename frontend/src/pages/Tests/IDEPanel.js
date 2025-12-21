import { useState, useEffect } from "react";

const API_URL = "https://inspection-loop-neck-assuming.trycloudflare.com";

function IDEPanel({
  code,
  setCode,
  testStarted,
  testSubmitted,
  onRunCode,
  onSubmitCode,
  runResult,
  language,
  setLanguage,
  score,
  totalTestScore,
  problem,
  testId,
  userId,
}) {
  const [customInput, setCustomInput] = useState("");
  const [testResults, setTestResults] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [backendTestCases, setBackendTestCases] = useState([]);
  const [activeTab, setActiveTab] = useState(0); // 0, 1, 2 for test case tabs, -1 for custom

  // 🔥 Fetch actual test cases from backend
  useEffect(() => {
    if (!testId || !problem?.id) {
      return;
    }

    const fetchTestCases = async () => {
      const url = `${API_URL}/problems/${testId}/${problem.id}`;

      try {
        const res = await fetch(url);
        
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        
        const data = await res.json();
        
        if (data.success) {
          setBackendTestCases(data.testCases);
        }
      } catch (err) {
        console.error("Failed to fetch test cases:", err);
      }
    };

    fetchTestCases();
  }, [testId, problem?.id]);

  // Run all tests (default + custom)
  const handleRunTests = async () => {
    if (!code.trim()) {
      alert("Please write some code first!");
      return;
    }

    if (!testStarted || testSubmitted) {
      alert("Test is not active!");
      return;
    }

    setIsRunning(true);
    setTestResults(null);

    try {
      // Run default test cases
      const defaultRes = await fetch(`${API_URL}/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          language,
          problemId: problem.id,
          testId: testId,
          userId: userId,
        }),
      });

      if (!defaultRes.ok) {
        const errorText = await defaultRes.text();
        throw new Error(`HTTP ${defaultRes.status}: ${errorText}`);
      }

      const defaultData = await defaultRes.json();

      let customResult = null;
      
      // If user provided custom input, run it too
      if (customInput.trim()) {
        const customRes = await fetch(`${API_URL}/run-custom`, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            code,
            language,
            input: customInput,
          }),
        });

        if (customRes.ok) {
          customResult = await customRes.json();
        }
      }

      setTestResults({
        default: defaultData,
        custom: customResult,
      });

    } catch (err) {
      console.error("Run error:", err);
      alert(`Failed to connect to backend.\n\nError: ${err.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  // Get test cases to display (backend or fallback to frontend)
  const displayTestCases = backendTestCases.length > 0 ? backendTestCases : problem?.examples || [];

  return (
    <div className="panel ide-panel" style={{ position: "relative", display: "flex", flexDirection: "column", height: "100%" }}>
      {/* 🔥 Overall Test Score Badge */}
      {/* {totalTestScore !== undefined && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            padding: "8px 16px",
            borderRadius: "20px",
            fontWeight: "bold",
            fontSize: "14px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            zIndex: 10,
          }}
        >
          Total: {totalTestScore} / 300
        </div>
      )} */}

      {/* Toolbar */}
      <div style={{ marginBottom: "8px", display: "flex", gap: "8px" }}>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          disabled={!testStarted || testSubmitted}
          className="theme-select"
        >
          <option value="cpp">C++</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
        </select>

        <button
          className="solve-btn"
          disabled={!testStarted || testSubmitted || isRunning}
          onClick={handleRunTests}
          style={{ background: "#10b981", flex: 1 }}
        >
          {isRunning ? "Running..." : "▶ Run"}
        </button>

        <button
          className="solve-btn"
          disabled={!testStarted || testSubmitted}
          onClick={onSubmitCode}
        >
          Submit Code
        </button>
      </div>

      {/* Code Editor */}
      <textarea
        className="test-editor"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck={false}
        disabled={!testStarted || testSubmitted}
        placeholder={
          language === "cpp"
            ? "// Write your C++ solution here"
            : language === "java"
            ? "// Write your Java solution here"
            : "# Write your Python solution here"
        }
        style={{ height: "40%", marginBottom: "10px" }}
      />

      {/* Test Cases Section - LeetCode Style Tabs */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        
        {/* Tab Headers */}
        <div style={{ 
          display: "flex", 
          borderBottom: "2px solid #e5e7eb",
          gap: "4px",
          marginBottom: "12px"
        }}>
          {/* Default Test Case Tabs */}
          {displayTestCases.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              style={{
                padding: "8px 16px",
                background: activeTab === idx ? "#3b82f6" : "transparent",
                color: activeTab === idx ? "white" : "#6b7280",
                border: "none",
                borderRadius: "6px 6px 0 0",
                cursor: "pointer",
                fontWeight: activeTab === idx ? "600" : "400",
                fontSize: "13px",
                transition: "all 0.2s"
              }}
            >
              Case {idx + 1}
              {testResults?.default?.testCaseResults?.[idx] && (
                <span style={{ marginLeft: "6px" }}>
                  {testResults.default.testCaseResults[idx].passed ? "✅" : "❌"}
                </span>
              )}
            </button>
          ))}
          
          {/* Custom Test Case Tab */}
          <button
            onClick={() => setActiveTab(-1)}
            style={{
              padding: "8px 16px",
              background: activeTab === -1 ? "#3b82f6" : "transparent",
              color: activeTab === -1 ? "white" : "#6b7280",
              border: "none",
              borderRadius: "6px 6px 0 0",
              cursor: "pointer",
              fontWeight: activeTab === -1 ? "600" : "400",
              fontSize: "13px",
              transition: "all 0.2s"
            }}
          >
            🧪 Custom
            {testResults?.custom && (
              <span style={{ marginLeft: "6px" }}>
                {testResults.custom.success ? "✅" : "❌"}
              </span>
            )}
          </button>
        </div>

        {/* Tab Content */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          {/* Default Test Cases Content */}
          {activeTab >= 0 && activeTab < displayTestCases.length && (
            <div style={{ 
              background: "#f9fafb", 
              padding: "16px", 
              borderRadius: "8px",
              border: "1px solid #e5e7eb"
            }}>
              {/* Input */}
              <div style={{ marginBottom: "16px" }}>
                <div style={{ 
                  fontSize: "12px", 
                  fontWeight: "600", 
                  color: "#374151", 
                  marginBottom: "6px" 
                }}>
                  Input:
                </div>
                <pre style={{
                  background: "white",
                  padding: "12px",
                  borderRadius: "6px",
                  fontSize: "13px",
                  fontFamily: "monospace",
                  margin: 0,
                  whiteSpace: "pre-wrap",
                  border: "1px solid #e5e7eb",
                  color: "#1f2937"
                }}>
                  {displayTestCases[activeTab].input}
                </pre>
              </div>

              {/* Expected Output */}
              <div style={{ marginBottom: "16px" }}>
                <div style={{ 
                  fontSize: "12px", 
                  fontWeight: "600", 
                  color: "#374151", 
                  marginBottom: "6px" 
                }}>
                  Expected Output:
                </div>
                <pre style={{
                  background: "white",
                  padding: "12px",
                  borderRadius: "6px",
                  fontSize: "13px",
                  fontFamily: "monospace",
                  margin: 0,
                  whiteSpace: "pre-wrap",
                  border: "1px solid #e5e7eb",
                  color: "#1f2937"
                }}>
                  {displayTestCases[activeTab].output}
                </pre>
              </div>

              {/* Your Output (only if tests have been run) */}
              {testResults?.default?.testCaseResults?.[activeTab] && (
                <div>
                  <div style={{ 
                    fontSize: "12px", 
                    fontWeight: "600", 
                    color: "#374151", 
                    marginBottom: "6px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}>
                    Your Output:
                    <span style={{ fontSize: "16px" }}>
                      {testResults.default.testCaseResults[activeTab].passed ? "✅" : "❌"}
                    </span>
                  </div>
                  <pre style={{
                    background: testResults.default.testCaseResults[activeTab].passed 
                      ? "#dcfce7" 
                      : "#fee2e2",
                    padding: "12px",
                    borderRadius: "6px",
                    fontSize: "13px",
                    fontFamily: "monospace",
                    margin: 0,
                    whiteSpace: "pre-wrap",
                    border: `1px solid ${testResults.default.testCaseResults[activeTab].passed ? "#86efac" : "#fca5a5"}`,
                    color: "#1f2937"
                  }}>
                    {testResults.default.testCaseResults[activeTab].yourOutput || "No output"}
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* Custom Test Case Content */}
          {activeTab === -1 && (
            <div style={{ 
              background: "#f9fafb", 
              padding: "16px", 
              borderRadius: "8px",
              border: "1px solid #e5e7eb"
            }}>
              {/* Custom Input */}
              <div style={{ marginBottom: "16px" }}>
                <div style={{ 
                  fontSize: "12px", 
                  fontWeight: "600", 
                  color: "#374151", 
                  marginBottom: "6px" 
                }}>
                  Custom Input:
                </div>
                <textarea
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  disabled={!testStarted || testSubmitted}
                  placeholder="Enter your custom input here..."
                  style={{
                    width: "100%",
                    minHeight: "100px",
                    padding: "12px",
                    fontSize: "13px",
                    fontFamily: "monospace",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    resize: "vertical",
                    background: "white"
                  }}
                />
              </div>

              {/* Custom Output (only if custom test has been run) */}
              {testResults?.custom && (
                <div>
                  <div style={{ 
                    fontSize: "12px", 
                    fontWeight: "600", 
                    color: "#374151", 
                    marginBottom: "6px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}>
                    Your Output:
                    <span style={{ fontSize: "16px" }}>
                      {testResults.custom.success ? "✅" : "❌"}
                    </span>
                  </div>
                  <pre style={{
                    background: testResults.custom.success ? "#dcfce7" : "#fee2e2",
                    padding: "12px",
                    borderRadius: "6px",
                    fontSize: "13px",
                    fontFamily: "monospace",
                    margin: 0,
                    whiteSpace: "pre-wrap",
                    border: `1px solid ${testResults.custom.success ? "#86efac" : "#fca5a5"}`,
                    color: "#1f2937",
                    minHeight: "60px"
                  }}>
                    {testResults.custom.output || testResults.custom.error || "No output"}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Overall Test Results Summary */}
        {testResults?.default && (
          <div
            style={{
              marginTop: "12px",
              padding: "12px",
              background: testResults.default.success ? "#dcfce7" : "#fee2e2",
              color: testResults.default.success ? "#065f46" : "#7f1d1d",
              borderRadius: "8px",
              fontWeight: "600",
              textAlign: "center",
              fontSize: "14px",
              border: `1px solid ${testResults.default.success ? "#86efac" : "#fca5a5"}`
            }}
          >
            {testResults.default.success ? "✅ All Tests Passed!" : "❌ Some Tests Failed"}
            <div style={{ fontSize: "13px", marginTop: "4px", fontWeight: "400" }}>
              Passed: {testResults.default.passed}/{testResults.default.total}
            </div>
          </div>
        )}

        {/* Problem Score */}
        {score !== undefined && (
          <div
            style={{
              marginTop: "8px",
              padding: "10px",
              background: "#dcfce7",
              color: "#065f46",
              borderRadius: "8px",
              fontWeight: "bold",
              textAlign: "center",
              fontSize: "14px",
              border: "1px solid #86efac"
            }}
          >
            Problem Score: {score} / 100
          </div>
        )}
      </div>
    </div>
  );
}

export default IDEPanel;