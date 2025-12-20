import { useNavigate } from "react-router-dom";
import "./ThankYou.css";

function ThankYou() {
  const navigate = useNavigate();

  return (
    <div className="thank-you-container">
      <div className="thank-you-card">
        <div className="success-icon">✅</div>
        <h1>Test Submitted Successfully!</h1>
        <p>Thank you for completing the test.</p>
        <p>Your responses have been recorded.</p>
        
        <div className="action-buttons">
          <button
            className="primary-btn"
            onClick={() => navigate("/tests")}
          >
            Back to Tests
          </button>
          <button
            className="secondary-btn"
            onClick={() => navigate("/leaderboard")}
          >
            View Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default ThankYou;