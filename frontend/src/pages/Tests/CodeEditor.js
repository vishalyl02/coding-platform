function CodeEditor({ 
    code, 
    setCode, 
    testStarted, 
    testSubmitted, 
    language 
  }) {
    return (
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
        style={{ 
          width: "100%",
          minHeight: "300px",  // Changed from fixed height to minHeight
          padding: "12px",
          fontSize: "14px",
          fontFamily: "monospace",
          border: "none",  // Border handled by parent
          borderRadius: "4px",
          resize: "vertical",
          backgroundColor: testStarted && !testSubmitted ? "white" : "#f9fafb",
          boxSizing: "border-box"
        }}
      />
    );
  }
  
  export default CodeEditor;