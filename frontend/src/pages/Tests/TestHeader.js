import "./TestHeader.css";

function TestHeader({
  formatTime,
  testStarted,
  testSubmitted,
  onStart,
  onSubmit,
}) {
  return (
    <div className="test-header-modern" style={{height:"30px"}}>
      <div className="test-header-left">
        <h2 className="test-header-title">Coding Challenge</h2>
      </div>

      <div className="test-header-right">
        <div className="test-timer">
          <svg className="test-timer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <span className="test-timer-text">{formatTime()}</span>
        </div>

        {testSubmitted && (
          <div className="test-status-badge test-status-submitted">
            <svg className="test-status-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>Test Submitted</span>
          </div>
        )}

        {!testStarted && !testSubmitted && (
          <button className="test-header-btn test-start-btn" onClick={onStart}>
            <svg className="test-header-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            <span>Start Test</span>
          </button>
        )}

        {testStarted && !testSubmitted && (
          <button className="test-header-btn test-submit-btn" onClick={onSubmit} style={{height:"30px"}}>
            <svg className="test-header-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span>Submit Test</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default TestHeader;