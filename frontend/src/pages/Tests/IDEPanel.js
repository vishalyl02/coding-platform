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
  }) {
    return (
      <div className="panel ide-panel">
        {/* Toolbar */}
        <div style={{ marginBottom: "8px", display: "flex", gap: "8px" }}>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            disabled={!testStarted || testSubmitted}
            className="theme-select"
          >
            <option value="cpp">C++</option>
          </select>
  
          <button
            className="solve-btn"
            disabled={!testStarted || testSubmitted}
            onClick={onRunCode}
            style={{ background: "#64748b" }}
          >
            Run Code
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
        />
  
        {/* Output / Error Box */}
        {runResult && (
          <pre
            style={{
              marginTop: "10px",
              fontSize: "13px",
              background: runResult.includes("Error")
                ? "#fee2e2"
                : "#ecfeff",
              color: runResult.includes("Error")
                ? "#7f1d1d"
                : "#065f46",
              padding: "12px",
              borderRadius: "6px",
              whiteSpace: "pre-wrap",
              maxHeight: "220px",
              overflowY: "auto",
            }}
          >
            {runResult}
          </pre>
        )}
        {score !== undefined && (
  <div
    style={{
      marginTop: "8px",
      padding: "8px",
      background: "#dcfce7",
      color: "#065f46",
      borderRadius: "6px",
      fontWeight: "bold",
      textAlign: "center",
    }}
  >
    Score: {score} / 100
  </div>
)}

      </div>
    );
  }
  
  export default IDEPanel;
  