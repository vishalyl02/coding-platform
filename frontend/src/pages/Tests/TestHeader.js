function TestHeader({
    formatTime,
    testStarted,
    testSubmitted,
    onStart,
    onSubmit,
  }) {
    return (
      <div className="test-header">
        <h2>🌿 Nature Coding Challenge</h2>
  
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <span className="timer">⏱ {formatTime()}</span>
  
          {/* 🚫 TEST ALREADY SUBMITTED */}
          {testSubmitted && (
            <span style={{ color: "#16a34a", fontWeight: "600" }}>
              ✅ Test Submitted
            </span>
          )}
  
          {/* ▶️ START TEST */}
          {!testStarted && !testSubmitted && (
            <button className="solve-btn" onClick={onStart}>
              Start Test
            </button>
          )}
  
          {/* 🧾 SUBMIT TEST */}
          {testStarted && !testSubmitted && (
            <button
              className="solve-btn"
              style={{ background: "#dc2626" }}
              onClick={onSubmit}
            >
              Submit Test
            </button>
          )}
        </div>
      </div>
    );
  }
  
  export default TestHeader;
  