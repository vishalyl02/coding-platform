import { useState } from "react";

function TestCaseTabs({ 
  displayTestCases, 
  testResults, 
  customInput,
  setCustomInput,
  testStarted,
  testSubmitted
}) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column",
      height: "400px",  // Fixed height for scrolling
      border: "1px solid #e5e7eb",
      borderRadius: "8px",
      overflow: "hidden"
    }}>
      {/* Tab Headers */}
      <div style={{ 
        display: "flex", 
        borderBottom: "2px solid #e5e7eb",
        gap: "4px",
        padding: "8px 8px 0 8px",
        backgroundColor: "#f9fafb"
      }}>
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
          {/* {testResults?.custom && (
            <span style={{ marginLeft: "6px" }}>
              {testResults.custom.success ? "✅" : "❌"}
            </span>
          )} */}
        </button>
      </div>

      {/* Tab Content - Scrollable Area */}
      <div style={{ 
        flex: 1, 
        overflowY: "auto",  // Enable scrolling
        padding: "16px"
      }}>
        {/* Default Test Cases Content */}
        {activeTab >= 0 && activeTab < displayTestCases.length && (
          <div>
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

            {/* Your Output */}
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
                  color: "#1f2937",
                  minHeight: "40px"
                }}>
                  {testResults.default.testCaseResults[activeTab].yourOutput?.trim() || "(No output produced)"}
                </pre>

                {testResults.default.error && (
                  <div style={{ marginTop: "12px" }}>
                    <div style={{ 
                      fontSize: "12px", 
                      fontWeight: "600", 
                      color: "#dc2626", 
                      marginBottom: "6px" 
                    }}>
                      Error:
                    </div>
                    <pre style={{
                      background: "#fee2e2",
                      padding: "12px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      fontFamily: "monospace",
                      margin: 0,
                      whiteSpace: "pre-wrap",
                      border: "1px solid #fca5a5",
                      color: "#7f1d1d"
                    }}>
                      {testResults.default.error}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Custom Test Case Content */}
        {activeTab === -1 && (
          <div>
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

            {(customInput.trim() || testResults?.default) && (
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
                  {/* {testResults?.custom && (
                    <span style={{ fontSize: "16px" }}>
                      {testResults.custom.success ? "✅" : "❌"}
                    </span>
                  )} */}
                </div>
                <pre style={{
                  background: testResults?.custom?.success ? "#dcfce7" : testResults?.custom?.error ? "#fee2e2" : "#f3f4f6",
                  padding: "12px",
                  borderRadius: "6px",
                  fontSize: "13px",
                  fontFamily: "monospace",
                  margin: 0,
                  whiteSpace: "pre-wrap",
                  border: `1px solid ${testResults?.custom?.success ? "#86efac" : testResults?.custom?.error ? "#fca5a5" : "#d1d5db"}`,
                  color: "#1f2937",
                  minHeight: "60px"
                }}>
                  {testResults?.custom?.output?.trim() || testResults?.custom?.error || "(Enter custom input and click Run to see output)"}
                </pre>
                
                {testResults?.custom && (
                  <div style={{ 
                    marginTop: "12px", 
                    padding: "10px",
                    background: "#f0f9ff",
                    borderRadius: "6px",
                    fontSize: "12px",
                   color: "#1f2937",
                    border: "1px solid #bfdbfe"
                  }}>
                    ℹ️ Custom test cases show your program's raw output without validation
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default TestCaseTabs;