function QuestionPanel({ problem }) {
  if (!problem) {
    return (
      <div className="panel question-panel">
        <p>Loading problem...</p>
      </div>
    );
  }

  return (
    <div className="panel question-panel">
      <h3 style={{ marginBottom: "16px", fontSize: "20px", fontWeight: "600" }}>
        {problem.title}
      </h3>
      
      {/* Problem Description - using description field, not statement */}
      <div 
        className="problem-description"
        style={{
          fontSize: "14px",
          lineHeight: "1.6",
          color: "#374151",
          whiteSpace: "pre-wrap",
          fontFamily: "system-ui, -apple-system, sans-serif"
        }}
      >
        {problem.description}
      </div>

      {/* Examples Section */}
      {problem.examples && problem.examples.length > 0 && (
        <div style={{ marginTop: "24px" }}>
          <h4 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "12px" }}>
            Examples:
          </h4>
          
          {problem.examples.map((example, idx) => (
            <div 
              key={idx}
              style={{
                background: "#f9fafb",
                padding: "12px",
                borderRadius: "6px",
                marginBottom: "12px",
                border: "1px solid #e5e7eb"
              }}
            >
              <div style={{ fontSize: "13px", fontWeight: "600", marginBottom: "8px" }}>
                Example {idx + 1}:
              </div>
              
              <div style={{ marginBottom: "8px" }}>
                <span style={{ fontSize: "12px", color: "#6b7280", fontWeight: "600" }}>
                  Input:
                </span>
                <pre style={{
                  background: "white",
                  padding: "8px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  fontFamily: "monospace",
                  margin: "4px 0 0 0",
                  border: "1px solid #e5e7eb"
                }}>
                  {example.input}
                </pre>
              </div>
              
              <div style={{ marginBottom: example.explanation ? "8px" : "0" }}>
                <span style={{ fontSize: "12px", color: "#6b7280", fontWeight: "600" }}>
                  Output:
                </span>
                <pre style={{
                  background: "white",
                  padding: "8px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  fontFamily: "monospace",
                  margin: "4px 0 0 0",
                  border: "1px solid #e5e7eb"
                }}>
                  {example.output}
                </pre>
              </div>
              
              {example.explanation && (
                <div>
                  <span style={{ fontSize: "12px", color: "#6b7280", fontWeight: "600" }}>
                    Explanation:
                  </span>
                  <p style={{
                    fontSize: "12px",
                    margin: "4px 0 0 0",
                    color: "#374151"
                  }}>
                    {example.explanation}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default QuestionPanel;