import { useState, useEffect } from "react";
import CodeEditor from "./CodeEditor";
import TestCaseTabs from "./TestCaseTabs";

const API_URL = "https://liable-beside-ethnic-selective.trycloudflare.com";

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
  const [totalTestCount, setTotalTestCount] = useState(0); // 🔥 Track total test count

  const LANGUAGE_OPTIONS = [
    { value: 'cpp', label: 'C++' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' }
  ];

  useEffect(() => {
    if (!testId || !problem?.id) return;

    const fetchTestCases = async () => {
      const url = `${API_URL}/problems/${testId}/${problem.id}`;
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (data.success) {
          setBackendTestCases(data.testCases); // Only first 3
          setTotalTestCount(data.totalTestCases); // 🔥 Store total count
        }
      } catch (err) {
        console.error("❌ Failed to fetch test cases:", err);
      }
    };

    fetchTestCases();
  }, [testId, problem?.id]);

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
      
      if (customInput.trim()) {
        const customRes = await fetch(`${API_URL}/run/run-custom`, {
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
      console.error("🔥 RUN ERROR:", err);
      alert(`Failed to connect to backend.\n\nError: ${err.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const displayTestCases = backendTestCases.length > 0 ? backendTestCases : problem?.examples || [];

  return (
    <div className="panel ide-panel" style={{ 
      display: "flex", 
      flexDirection: "column", 
      height: "100%",
      padding: "0px",
      gap: "5px",
      overflow: "hidden",
      fontSize:"20px",
    }}>
      {/* Top Controls - Fixed */}
      <div style={{ display: "flex", gap: "8px", flexShrink: 0,marginTop:"10px"}}>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          disabled={!testStarted || testSubmitted}
          className="theme-select"
        >
          {LANGUAGE_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <button
          className="solve-btn"
          disabled={!testStarted || testSubmitted || isRunning}
          onClick={handleRunTests}
          style={{ background: "#10b981", flex: 0.25,height:'40px', width:"50px" }}
        >
          {isRunning ? "Running..." : "▶ Run"}
        </button>

        <button
          className="solve-btn"
          disabled={!testStarted || testSubmitted}
          onClick={onSubmitCode}
          style={{ height:'40px' }}
        >
          Submit Code
        </button>
      </div>

      {/* Code Editor - Scrollable Section */}
      <div style={{ 
        flexShrink: 0,
        maxHeight: "350px",
        overflowY: "auto",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        padding: "4px"
      }}>
        <CodeEditor
          code={code}
          setCode={setCode}
          testStarted={testStarted}
          testSubmitted={testSubmitted}
          language={language}
        />
      </div>

      {/* Test Cases - Scrollable Section */}
      <div style={{ 
        flex: 1,
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
       
      }}>
        <TestCaseTabs
          displayTestCases={displayTestCases}
          testResults={testResults}
          customInput={customInput}
          setCustomInput={setCustomInput}
          testStarted={testStarted}
          testSubmitted={testSubmitted}
        />
      </div>

      {/* 🔥 Test Progress - Shows X/Total including hidden tests */}
      {testResults?.default && (
        <div
          style={{
            // padding: "12px",
            padding:"0px",
            height:"38px",
            background: testResults.default.success ? "#dcfce7" : "#fee2e2",
            color: testResults.default.success ? "#065f46" : "#7f1d1d",
            borderRadius: "8px",
            fontWeight: "600",
            textAlign: "center",
            fontSize: "14px",
            border: `1px solid ${testResults.default.success ? "#86efac" : "#fca5a5"}`,
            flexShrink: 0
          }}
        >
          {testResults.default.success ? "✅ All Tests Passed!" : "❌ Some Tests Failed"}
          <div style={{ fontSize: "13px", marginTop: "4px", fontWeight: "400" }}>
            {/* 🔥 Shows progress including hidden test cases */}
            Passed: {testResults.default.passed}/{testResults.default.total}
            {/* {testResults.default.total > 3 && (
              <span style={{ fontSize: "11px", display: "block", marginTop: "2px", opacity: 0.8 }}>
                (including {testResults.default.total - 3} hidden test cases)
              </span>
            )} */}
          </div>
        </div>
      )}

      {/* Problem Score - Fixed at bottom */}
      {score !== undefined && (
        <div
          style={{
            height:"20px",
            padding: "0px",
            margin:"0px",
            background: "#dcfce7",
            color: "#065f46",
            borderRadius: "8px",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: "14px",
            border: "1px solid #86efac",
            flexShrink: 0
          }}
        >
          Problem Score: {score} / 100
        </div>
      )}
    </div>
  );
}

export default IDEPanel;