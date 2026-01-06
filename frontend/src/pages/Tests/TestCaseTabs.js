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
      height: "350px",  // Reduced height
      border: "1px solid #374151",
      borderRadius: "8px",
      overflow: "hidden",
      backgroundColor: "#1e1e1e"
    }}>
      {/* Tab Headers */}
      <div style={{ 
        display: "flex", 
        borderBottom: "2px solid #374151",
        gap: "2px",
        padding: "4px 4px 0 4px",
        backgroundColor: "#1e1e1e",
        flexShrink: 0  // Prevent tabs from shrinking
      }}>
        {displayTestCases.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            style={{
              padding: "6px 12px",
              background: activeTab === idx ? "#3b82f6" : "#2d2d2d",
              color: activeTab === idx ? "white" : "#9ca3af",
              border: "none",
              borderRadius: "6px 6px 0 0",
              cursor: "pointer",
              fontWeight: activeTab === idx ? "600" : "400",
              fontSize: "12px",
              transition: "all 0.2s"
            }}
          >
            Case {idx + 1}
            {testResults?.default?.testCaseResults?.[idx] && (
              <span style={{ marginLeft: "4px" }}>
                {testResults.default.testCaseResults[idx].passed ? "✅" : "❌"}
              </span>
            )}
          </button>
        ))}
        
        <button
          onClick={() => setActiveTab(-1)}
          style={{
            padding: "6px 12px",
            background: activeTab === -1 ? "#3b82f6" : "#2d2d2d",
            color: activeTab === -1 ? "white" : "#9ca3af",
            border: "none",
            borderRadius: "6px 6px 0 0",
            cursor: "pointer",
            fontWeight: activeTab === -1 ? "600" : "400",
            fontSize: "12px",
            transition: "all 0.2s"
          }}
        >
          🧪 Custom
        </button>
      </div>

      {/* Tab Content - Scrollable Area */}
      <div style={{ 
        flex: 1, 
        overflowY: "auto",
        overflowX: "hidden",
        padding: "12px",
        backgroundColor: "#1e1e1e"
      }}>
        {/* Default Test Cases Content */}
        {activeTab >= 0 && activeTab < displayTestCases.length && (
          <div>
            {/* Input */}
            <div style={{ marginBottom: "10px" }}>
              <div style={{ 
                fontSize: "11px", 
                fontWeight: "600", 
                color: "#9ca3af", 
                marginBottom: "4px",
                textTransform: "uppercase",
                letterSpacing: "0.5px"
              }}>
                Input:
              </div>
              <pre style={{
                background: "#0d1117",
                padding: "8px",
                borderRadius: "4px",
                fontSize: "12px",
                fontFamily: "'Fira Code', 'Consolas', monospace",
                margin: 0,
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
                border: "1px solid #30363d",
                color: "#c9d1d9",
                lineHeight: "1.5",
                maxHeight: "150px",
                overflowY: "auto"
              }}>
                {displayTestCases[activeTab].input}
              </pre>
            </div>

            {/* Expected Output */}
            <div style={{ marginBottom: "10px" }}>
              <div style={{ 
                fontSize: "11px", 
                fontWeight: "600", 
                color: "#9ca3af", 
                marginBottom: "4px",
                textTransform: "uppercase",
                letterSpacing: "0.5px"
              }}>
                Expected Output:
              </div>
              <pre style={{
                background: "#0d1117",
                padding: "8px",
                borderRadius: "4px",
                fontSize: "12px",
                fontFamily: "'Fira Code', 'Consolas', monospace",
                margin: 0,
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
                border: "1px solid #30363d",
                color: "#c9d1d9",
                lineHeight: "1.5",
                maxHeight: "150px",
                overflowY: "auto"
              }}>
                {displayTestCases[activeTab].output}
              </pre>
            </div>

            {/* Your Output */}
            {testResults?.default?.testCaseResults?.[activeTab] && (
              <div style={{ marginBottom: "10px" }}>
                <div style={{ 
                  fontSize: "11px", 
                  fontWeight: "600", 
                  color: "#9ca3af", 
                  marginBottom: "4px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px"
                }}>
                  Your Output:
                  <span style={{ fontSize: "14px" }}>
                    {testResults.default.testCaseResults[activeTab].passed ? "✅" : "❌"}
                  </span>
                </div>
                <pre style={{
                  background: testResults.default.testCaseResults[activeTab].passed 
                    ? "#0d3a1f" 
                    : "#3d1319",
                  padding: "8px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  fontFamily: "'Fira Code', 'Consolas', monospace",
                  margin: 0,
                  whiteSpace: "pre-wrap",
                  wordWrap: "break-word",
                  border: `1px solid ${testResults.default.testCaseResults[activeTab].passed ? "#2ea043" : "#f85149"}`,
                  color: testResults.default.testCaseResults[activeTab].passed ? "#7ee787" : "#ffa198",
                  lineHeight: "1.5",
                  minHeight: "30px",
                  maxHeight: "200px",
                  overflowY: "auto"
                }}>
                  {testResults.default.testCaseResults[activeTab].yourOutput?.trim() || "(No output produced)"}
                </pre>
              </div>
            )}

            {/* Error */}
            {testResults?.default?.error && (
              <div>
                <div style={{ 
                  fontSize: "11px", 
                  fontWeight: "600", 
                  color: "#f85149", 
                  marginBottom: "4px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px"
                }}>
                  ⚠️ Error:
                </div>
                <pre style={{
                  background: "#3d1319",
                  padding: "8px",
                  borderRadius: "4px",
                  fontSize: "11px",
                  fontFamily: "'Fira Code', 'Consolas', monospace",
                  margin: 0,
                  whiteSpace: "pre-wrap",
                  wordWrap: "break-word",
                  border: "1px solid #f85149",
                  color: "#ffa198",
                  lineHeight: "1.4",
                  maxHeight: "200px",
                  overflowY: "auto"
                }}>
                  {testResults.default.error}
                </pre>
              </div>
            )}
          </div>
        )}

        {/* Custom Test Case Content */}
        {activeTab === -1 && (
          <div>
            <div style={{ marginBottom: "10px" }}>
              <div style={{ 
                fontSize: "11px", 
                fontWeight: "600", 
                color: "#9ca3af", 
                marginBottom: "4px",
                textTransform: "uppercase",
                letterSpacing: "0.5px"
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
                  minHeight: "80px",
                  padding: "8px",
                  fontSize: "12px",
                  fontFamily: "'Fira Code', 'Consolas', monospace",
                  border: "1px solid #30363d",
                  borderRadius: "4px",
                  resize: "vertical",
                  background: "#0d1117",
                  color: "#c9d1d9",
                  lineHeight: "1.5"
                }}
              />
            </div>

            {(customInput.trim() || testResults?.default) && (
              <div>
                <div style={{ 
                  fontSize: "11px", 
                  fontWeight: "600", 
                  color: "#9ca3af", 
                  marginBottom: "4px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px"
                }}>
                  Your Output:
                </div>
                <pre style={{
                  background: testResults?.custom?.success ? "#0d3a1f" : testResults?.custom?.error ? "#3d1319" : "#0d1117",
                  padding: "8px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  fontFamily: "'Fira Code', 'Consolas', monospace",
                  margin: 0,
                  whiteSpace: "pre-wrap",
                  wordWrap: "break-word",
                  border: `1px solid ${testResults?.custom?.success ? "#2ea043" : testResults?.custom?.error ? "#f85149" : "#30363d"}`,
                  color: testResults?.custom?.success ? "#7ee787" : testResults?.custom?.error ? "#ffa198" : "#c9d1d9",
                  lineHeight: "1.5",
                  minHeight: "50px",
                  maxHeight: "200px",
                  overflowY: "auto"
                }}>
                  {testResults?.custom?.output?.trim() || testResults?.custom?.error || "(Enter custom input and click Run to see output)"}
                </pre>
                
                {testResults?.custom && (
                  <div style={{ 
                    marginTop: "8px", 
                    padding: "6px 8px",
                    background: "#1c2d41",
                    borderRadius: "4px",
                    fontSize: "11px",
                    color: "#79c0ff",
                    border: "1px solid #1f6feb",
                    lineHeight: "1.4"
                  }}>
                    ℹ️ Custom test cases show your program's raw output without validation
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Custom Scrollbar Styles */}
      <style>{`
        div[style*="overflowY: auto"]::-webkit-scrollbar {
          width: 8px;
        }
        div[style*="overflowY: auto"]::-webkit-scrollbar-track {
          background: #1e1e1e;
        }
        div[style*="overflowY: auto"]::-webkit-scrollbar-thumb {
          background: #4b5563;
          border-radius: 4px;
        }
        div[style*="overflowY: auto"]::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }
        pre::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        pre::-webkit-scrollbar-track {
          background: transparent;
        }
        pre::-webkit-scrollbar-thumb {
          background: #4b5563;
          border-radius: 3px;
        }
        pre::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }
      `}</style>
    </div>
  );
}

export default TestCaseTabs;