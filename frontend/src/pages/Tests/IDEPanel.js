// import { useState, useEffect } from "react";

// const API_URL = "https://inspection-loop-neck-assuming.trycloudflare.com";

// function IDEPanel({
//   code,
//   setCode,
//   testStarted,
//   testSubmitted,
//   onRunCode,
//   onSubmitCode,
//   runResult,
//   language,
//   setLanguage,
//   score,
//   totalTestScore,
//   problem,
//   testId,
//   userId,  // 🔥 ADD THIS LINE
// }) {
//   const [customInput, setCustomInput] = useState("");
//   const [testResults, setTestResults] = useState(null);
//   const [isRunning, setIsRunning] = useState(false);
//   const [backendTestCases, setBackendTestCases] = useState([]);
//   const [debugInfo, setDebugInfo] = useState(null);

//   console.log("========================================");
//   console.log("🎨 IDEPanel Render");
//   console.log("========================================");
//   console.log("Props received:", {
//     testStarted,
//     testSubmitted,
//     language,
//     score,
//     totalTestScore,
//     problemId: problem?.id,
//     testId,
//     codeLength: code?.length,
//     hasRunResult: !!runResult
//   });
//   console.log("========================================");

//   // 🔥 Fetch actual test cases from backend
//   useEffect(() => {
//     if (!testId || !problem?.id) {
//       console.log("⚠️ Cannot fetch test cases - missing testId or problem.id:", { testId, problemId: problem?.id });
//       return;
//     }

//     const fetchTestCases = async () => {
//       console.log("========================================");
//       console.log("📡 Fetching test cases from backend");
//       console.log("========================================");
//       console.log("testId:", testId);
//       console.log("problem.id:", problem.id);
      
//       const url = `${API_URL}/problems/${testId}/${problem.id}`;
//       console.log("🔗 Full URL:", url);

//       try {
//         console.log("🚀 Sending GET request...");
//         const res = await fetch(url);
        
//         console.log("📡 Response received:");
//         console.log("- Status:", res.status);
//         console.log("- OK:", res.ok);
//         console.log("- Status Text:", res.statusText);
        
//         if (!res.ok) {
//           const errorText = await res.text();
//           console.error("❌ Response not OK:", errorText);
//           throw new Error(`HTTP ${res.status}: ${errorText}`);
//         }
        
//         const data = await res.json();
//         console.log("📊 Response data:", data);
        
//         if (data.success) {
//           console.log("✅ Successfully fetched test cases:", data.testCases.length);
//           setBackendTestCases(data.testCases);
//         } else {
//           console.warn("⚠️ Success=false in response:", data);
//         }
//         console.log("========================================");
//       } catch (err) {
//         console.error("========================================");
//         console.error("❌ Failed to fetch test cases");
//         console.error("========================================");
//         console.error("Error name:", err.name);
//         console.error("Error message:", err.message);
//         console.error("Error stack:", err.stack);
//         console.error("========================================");
//       }
//     };

//     fetchTestCases();
//   }, [testId, problem?.id]);

//   // Run all tests (default + custom)
//   const handleRunTests = async () => {
//     console.log("========================================");
//     console.log("▶️ handleRunTests called");
//     console.log("========================================");
//     console.log("State check:", {
//       codeLength: code?.length,
//       testStarted,
//       testSubmitted,
//       isRunning,
//       testId,
//       problemId: problem?.id
//     });

//     if (!code.trim()) {
//       console.log("❌ No code provided");
//       alert("Please write some code first!");
//       return;
//     }

//     if (!testStarted || testSubmitted) {
//       console.log("❌ Test not active:", { testStarted, testSubmitted });
//       alert("Test is not active!");
//       return;
//     }

//     setIsRunning(true);
//     setTestResults(null);
//     setDebugInfo({ stage: "starting", timestamp: new Date().toISOString() });

//     try {
//       // Run default test cases
//       const requestBody = {
//         code,
//         language,
//         problemId: problem.id,
//         testId: testId,
//       };

//       console.log("========================================");
//       console.log("📦 DEFAULT TEST EXECUTION");
//       console.log("========================================");
//       console.log("Request Body:", JSON.stringify(requestBody, null, 2));
//       console.log("API URL:", API_URL);
//       console.log("Full URL:", `${API_URL}/run`);
//       console.log("========================================");

//       setDebugInfo({ stage: "sending_default", requestBody });

//       // Run default test cases
// const defaultRes = await fetch(`${API_URL}/run`, {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({
//     code,
//     language,
//     problemId: problem.id,
//     testId: testId,
//     userId: userId,  // 🔥 ADD THIS LINE
//   }),
// });

//       console.log("========================================");
//       console.log("📡 DEFAULT TEST RESPONSE");
//       console.log("========================================");
//       console.log("Status:", defaultRes.status);
//       console.log("Status Text:", defaultRes.statusText);
//       console.log("OK:", defaultRes.ok);
//       console.log("Headers:", Object.fromEntries(defaultRes.headers.entries()));
//       console.log("========================================");

//       setDebugInfo({ stage: "received_default", status: defaultRes.status, ok: defaultRes.ok });

//       if (!defaultRes.ok) {
//         const errorText = await defaultRes.text();
//         console.error("❌ Response not OK:", errorText);
//         throw new Error(`HTTP ${defaultRes.status}: ${errorText}`);
//       }

//       const defaultData = await defaultRes.json();
//       console.log("📊 Default test data:", JSON.stringify(defaultData, null, 2));

//       let customResult = null;
      
//       // If user provided custom input, run it too
//       if (customInput.trim()) {
//         console.log("========================================");
//         console.log("🧪 CUSTOM TEST EXECUTION");
//         console.log("========================================");
//         console.log("Custom input:", customInput);
        
//         const customBody = {
//           code,
//           language,
//           input: customInput,
//         };
        
//         console.log("Request Body:", JSON.stringify(customBody, null, 2));
//         console.log("Full URL:", `${API_URL}/run-custom`);
//         console.log("========================================");

//         setDebugInfo({ stage: "sending_custom", customInput });

//         const customRes = await fetch(`${API_URL}/run-custom`, {
//           method: "POST",
//           headers: { 
//             "Content-Type": "application/json",
//             "Accept": "application/json"
//           },
//           body: JSON.stringify(customBody),
//         });

//         console.log("📡 Custom test response:");
//         console.log("Status:", customRes.status);
//         console.log("OK:", customRes.ok);

//         if (customRes.ok) {
//           customResult = await customRes.json();
//           console.log("📊 Custom result:", customResult);
//         } else {
//           console.error("❌ Custom test failed:", await customRes.text());
//         }
//       }

//       const finalResults = {
//         default: defaultData,
//         custom: customResult,
//       };

//       console.log("========================================");
//       console.log("✅ SETTING FINAL RESULTS");
//       console.log("========================================");
//       console.log(JSON.stringify(finalResults, null, 2));
//       console.log("========================================");

//       setTestResults(finalResults);
//       setDebugInfo({ stage: "complete", success: true });

//     } catch (err) {
//       console.error("========================================");
//       console.error("🔥 FATAL ERROR IN handleRunTests");
//       console.error("========================================");
//       console.error("Error name:", err.name);
//       console.error("Error message:", err.message);
//       console.error("Error stack:", err.stack);
//       console.error("========================================");
      
//       setDebugInfo({
//         stage: "error",
//         errorName: err.name,
//         errorMessage: err.message,
//         timestamp: new Date().toISOString()
//       });

//       alert(`Failed to connect to backend.\n\nError: ${err.message}\n\nDetails:\n- API URL: ${API_URL}/run\n- Check browser console for more info\n- Make sure backend server is running`);
//     } finally {
//       console.log("🏁 handleRunTests complete, setting isRunning=false");
//       setIsRunning(false);
//     }
//   };

//   return (
//     <div className="panel ide-panel" style={{ position: "relative", display: "flex", flexDirection: "column", height: "100%" }}>
//       {/* 🔥 Overall Test Score Badge */}
//       {totalTestScore !== undefined && (
//         <div
//           style={{
//             position: "absolute",
//             top: "10px",
//             right: "10px",
//             background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//             color: "white",
//             padding: "8px 16px",
//             borderRadius: "20px",
//             fontWeight: "bold",
//             fontSize: "14px",
//             boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
//             zIndex: 10,
//           }}
//         >
//           Total: {totalTestScore} / 300
//         </div>
//       )}

//       {/* Debug Info Display (remove in production) */}
//       {debugInfo && (
//         <div style={{
//           background: "#fff3cd",
//           border: "1px solid #ffc107",
//           padding: "8px",
//           marginBottom: "8px",
//           fontSize: "11px",
//           fontFamily: "monospace",
//           borderRadius: "4px"
//         }}>
//           <strong>Debug:</strong> {JSON.stringify(debugInfo)}
//         </div>
//       )}

//       {/* Toolbar */}
//       <div style={{ marginBottom: "8px", display: "flex", gap: "8px" }}>
//         <select
//           value={language}
//           onChange={(e) => setLanguage(e.target.value)}
//           disabled={!testStarted || testSubmitted}
//           className="theme-select"
//         >
//           <option value="cpp">C++</option>
//           <option value="python">Python</option>
//           <option value="java">Java</option>
//         </select>

//         <button
//           className="solve-btn"
//           disabled={!testStarted || testSubmitted || isRunning}
//           onClick={handleRunTests}
//           style={{ background: "#10b981", flex: 1 }}
//         >
//           {isRunning ? "Running..." : "▶ Run"}
//         </button>

//         <button
//           className="solve-btn"
//           disabled={!testStarted || testSubmitted}
//           onClick={onSubmitCode}
//         >
//           Submit Code
//         </button>
//       </div>

//       {/* Code Editor */}
//       <textarea
//         className="test-editor"
//         value={code}
//         onChange={(e) => setCode(e.target.value)}
//         spellCheck={false}
//         disabled={!testStarted || testSubmitted}
//         placeholder={
//           language === "cpp"
//             ? "// Write your C++ solution here"
//             : language === "java"
//             ? "// Write your Java solution here"
//             : "# Write your Python solution here"
//         }
//         style={{ height: "40%", marginBottom: "10px" }}
//       />

//       {/* Test Cases Section */}
//       <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "10px" }}>
        
//         {/* Default Test Cases */}
//         <div
//           style={{
//             background: "#f8fafc",
//             borderRadius: "8px",
//             padding: "12px",
//             border: "1px solid #e2e8f0",
//           }}
//         >
//           <h4 style={{ margin: "0 0 10px 0", fontSize: "14px", color: "#4a5568" }}>
//             📝 Default Test Cases
//           </h4>

//           {/* 🔥 Use backend test cases if available, fallback to problem.examples */}
//           {(backendTestCases.length > 0 ? backendTestCases : problem?.examples || []).map((example, idx) => (
//             <div
//               key={idx}
//               style={{
//                 marginBottom: "10px",
//                 padding: "8px",
//                 background: "white",
//                 borderRadius: "6px",
//                 border: "1px solid #e2e8f0",
//               }}
//             >
//               <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
//                 <span style={{ fontSize: "12px", fontWeight: "600", color: "#64748b" }}>
//                   Test Case {idx + 1}
//                 </span>
//                 {testResults?.default?.testCaseResults?.[idx] && (
//                   <span style={{ fontSize: "18px" }}>
//                     {testResults.default.testCaseResults[idx].passed ? "✅" : "❌"}
//                   </span>
//                 )}
//               </div>

//               <div style={{ display: "flex", gap: "10px" }}>
//                 <div style={{ flex: 1 }}>
//                   <div style={{ fontSize: "11px", color: "#94a3b8", marginBottom: "2px" }}>Input:</div>
//                   <pre style={{
//                     fontSize: "12px",
//                     background: "#f1f5f9",
//                     padding: "6px",
//                     borderRadius: "4px",
//                     margin: 0,
//                     whiteSpace: "pre-wrap",
//                     fontFamily: "monospace",
//                   }}>
//                     {example.input}
//                   </pre>
//                 </div>

//                 <div style={{ flex: 1 }}>
//                   <div style={{ fontSize: "11px", color: "#94a3b8", marginBottom: "2px" }}>Expected:</div>
//                   <pre style={{
//                     fontSize: "12px",
//                     background: "#f1f5f9",
//                     padding: "6px",
//                     borderRadius: "4px",
//                     margin: 0,
//                     whiteSpace: "pre-wrap",
//                     fontFamily: "monospace",
//                   }}>
//                     {example.output}
//                   </pre>
//                 </div>

//                 {testResults?.default?.testCaseResults?.[idx] && (
//                   <div style={{ flex: 1 }}>
//                     <div style={{ fontSize: "11px", color: "#94a3b8", marginBottom: "2px" }}>Your Output:</div>
//                     <pre style={{
//                       fontSize: "12px",
//                       background: testResults.default.testCaseResults[idx].passed ? "#dcfce7" : "#fee2e2",
//                       padding: "6px",
//                       borderRadius: "4px",
//                       margin: 0,
//                       whiteSpace: "pre-wrap",
//                       fontFamily: "monospace",
//                     }}>
//                       {testResults.default.testCaseResults[idx].output || "No output"}
//                     </pre>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}

//           {testResults?.default && (
//             <div
//               style={{
//                 marginTop: "10px",
//                 padding: "10px",
//                 background: testResults.default.success ? "#dcfce7" : "#fee2e2",
//                 color: testResults.default.success ? "#065f46" : "#7f1d1d",
//                 borderRadius: "6px",
//                 fontWeight: "600",
//                 textAlign: "center",
//               }}
//             >
//               {testResults.default.success ? "✅ All Tests Passed!" : "❌ Some Tests Failed"}
//               {testResults.default.passed !== undefined && (
//                 <div style={{ fontSize: "14px", marginTop: "4px" }}>
//                   Passed: {testResults.default.passed}/{testResults.default.total}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Custom Test Case */}
//         <div
//           style={{
//             background: "#f8fafc",
//             borderRadius: "8px",
//             padding: "12px",
//             border: "1px solid #e2e8f0",
//           }}
//         >
//           <h4 style={{ margin: "0 0 10px 0", fontSize: "14px", color: "#4a5568" }}>
//             🧪 Custom Test Case
//           </h4>

//           <textarea
//             value={customInput}
//             onChange={(e) => setCustomInput(e.target.value)}
//             disabled={!testStarted || testSubmitted}
//             placeholder="Enter your custom input here..."
//             style={{
//               width: "100%",
//               height: "60px",
//               padding: "8px",
//               fontSize: "12px",
//               fontFamily: "monospace",
//               border: "1px solid #cbd5e1",
//               borderRadius: "4px",
//               resize: "vertical",
//               marginBottom: "8px",
//             }}
//           />

//           {testResults?.custom && (
//             <div style={{ display: "flex", gap: "10px" }}>
//               <div style={{ flex: 1 }}>
//                 <div style={{ fontSize: "11px", color: "#94a3b8", marginBottom: "2px" }}>Your Output:</div>
//                 <pre style={{
//                   fontSize: "12px",
//                   background: testResults.custom.success ? "#dcfce7" : "#fee2e2",
//                   color: testResults.custom.success ? "#065f46" : "#7f1d1d",
//                   padding: "8px",
//                   borderRadius: "4px",
//                   margin: 0,
//                   whiteSpace: "pre-wrap",
//                   fontFamily: "monospace",
//                   minHeight: "60px",
//                 }}>
//                   {testResults.custom.output || testResults.custom.error || "No output"}
//                 </pre>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Problem Score */}
//         {score !== undefined && (
//           <div
//             style={{
//               padding: "10px",
//               background: "#dcfce7",
//               color: "#065f46",
//               borderRadius: "6px",
//               fontWeight: "bold",
//               textAlign: "center",
//               fontSize: "14px",
//             }}
//           >
//             Problem Score: {score} / 100
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default IDEPanel;

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
      {totalTestScore !== undefined && (
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
      )}

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