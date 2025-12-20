import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./TestsLanding.css";

function TestsLanding() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const tests = [
    {
      id: 1,
      title: "Test 1 - Fundamentals",
      description: "Prefix Sum, Array Manipulation, Basic Algorithms",
      difficulty: "Easy to Medium",
      duration: "90 minutes",
      problems: 3,
      topics: ["Prefix Sum", "Arrays", "Algorithms"]
    },
    {
      id: 2,
      title: "Test 2 - Core DS&A",
      description: "Binary Search, Linked Lists, Dynamic Programming",
      difficulty: "Medium",
      duration: "90 minutes",
      problems: 3,
      topics: ["Binary Search", "Linked Lists", "DP"]
    },
    {
      id: 3,
      title: "Test 3 - Advanced Structures",
      description: "Two Pointers, Trees, Graphs",
      difficulty: "Medium to Hard",
      duration: "90 minutes",
      problems: 3,
      topics: ["Two Pointers", "Trees", "Graphs"]
    },
    {
      id: 4,
      title: "Test 4 - Problem Solving",
      description: "Arrays, Strings, Backtracking",
      difficulty: "Medium",
      duration: "90 minutes",
      problems: 3,
      topics: ["Arrays", "Strings", "Backtracking"]
    }
  ];

  const handleStartTest = (testId) => {
    if (!user) {
      alert("Please login to take tests");
      navigate("/login");
      return;
    }
    navigate(`/tests/${testId}`);
  };

  return (
    <div className="tests-landing-container">
      <div className="tests-landing-header">
        <h1>🧪 Coding Tests</h1>
        <p>Choose a test to begin your coding challenge</p>
      </div>

      <div className="tests-grid">
        {tests.map((test) => (
          <div key={test.id} className="test-card">
            <div className="test-card-header">
              <h2>{test.title}</h2>
              <span className="test-difficulty">{test.difficulty}</span>
            </div>
            
            <p className="test-description">{test.description}</p>
            
            <div className="test-details">
              <div className="test-detail">
                <span className="detail-icon">⏱️</span>
                <span>{test.duration}</span>
              </div>
              <div className="test-detail">
                <span className="detail-icon">📝</span>
                <span>{test.problems} Problems</span>
              </div>
            </div>

            <div className="test-topics">
              {test.topics.map((topic, idx) => (
                <span key={idx} className="topic-tag">{topic}</span>
              ))}
            </div>

            <button 
              className="start-test-btn"
              onClick={() => handleStartTest(test.id)}
            >
              Start Test →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TestsLanding;