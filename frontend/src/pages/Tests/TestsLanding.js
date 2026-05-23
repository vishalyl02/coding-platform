import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import TestLeaderboardModal from "../Leaderboard/TestLeaderboardModal.js";
import "./TestsLanding.css";

function TestsLanding() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [selectedTest, setSelectedTest] = useState(null); // For leaderboard modal
  const [solvedProblems, setSolvedProblems] = useState({});
  const API_URL = "https://polished-excessive-magnetic-judicial.trycloudflare.com";

  const tests = [
    {
      id: 1,
      title: "Test 1",
      description: "Arrays, Even/Odd, Basic Math",
      difficulty: "Easy",
      duration: "90 minutes",
      problems: 3,
      topics: ["Arrays", "Even/Odd", "Basic Math"]
    },
    {
      id: 2,
      title: "Test 2",
      description: "Factors, Digits, Arrays",
      difficulty: "Easy to Medium",
      duration: "90 minutes",
      problems: 3,
      topics: ["Factors", "Digits", "Arrays"]
    },
    {
      id: 3,
      title: "Test 3",
      description: "Minimum Element, Even/Odd, Arrays",
      difficulty: "Easy to Medium",
      duration: "90 minutes",
      problems: 3,
      topics: ["Minimum Element", "Even/Odd", "Arrays"]
    },
    {
      id: 4,
      title: "Test 4",
      description: "Max Difference, Max Product, Strings",
      difficulty: "Medium",
      duration: "90 minutes",
      problems: 3,
      topics: ["Max Difference", "Max Product", "Strings"]
    },
    {
      id: 5,
      title: "Test 5",
      description: "Array Based Questions",
      difficulty: "Medium",
      duration: "100000 minutes",
      problems: 5,
      topics: ["Array based"]
    }
  ];

  // Fetch solved problems for all tests
  useEffect(() => {
    if (!user?._id) return;

    const fetchAllSolved = async () => {
      const allSolved = {};
      
      for (const test of tests) {
        try {
          const res = await fetch(`${API_URL}/test/solved-problems/${user._id}/${test.id}`);
          if (res.ok) {
            const data = await res.json();
            if (data.success) {
              allSolved[test.id] = data.solved.length;
            }
          }
        } catch (err) {
          console.error(`Error fetching solved for test ${test.id}:`, err);
        }
      }
      
      setSolvedProblems(allSolved);
    };

    fetchAllSolved();
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleStartTest = (testId) => {
    if (!user) {
      alert("Please login to take tests");
      navigate("/login");
      return;
    }
    navigate(`/tests/${testId}`);
  };

  const handleOpenLeaderboard = (test) => {
    setSelectedTest(test);
  };

  const handleCloseLeaderboard = () => {
    setSelectedTest(null);
  };

  const getDifficultyClass = (difficulty) => {
    if (difficulty === "Easy") return "difficulty-easy";
    if (difficulty === "Medium") return "difficulty-medium";
    if (difficulty.includes("Easy to Medium")) return "difficulty-easy-medium";
    return "difficulty-medium";
  };

  return (
    <div className="tests-landing-modern">
      {/* Background Effects */}
      <div className="tests-bg">
        <div className="tests-bg-gradient"></div>
        <div className="tests-bg-orb tests-bg-orb-1"></div>
        <div className="tests-bg-orb tests-bg-orb-2"></div>
      </div>

      {/* Grid Overlay */}
      <div className="tests-grid-overlay"></div>

      {/* Content */}
      <div className="tests-content">
        <div className="tests-header">
          <h1 className="tests-title">Coding Tests</h1>
          <p className="tests-subtitle">Challenge yourself with curated problem sets</p>
        </div>

        <div className="tests-grid-container">
          {tests.map((test) => (
            <div key={test.id} className="test-card-modern">
              <div className="test-card-glow"></div>
              
              <div className="test-card-content">
                <div className="test-card-top">
                  <h2 className="test-card-title">{test.title}</h2>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
                    <span className={`test-difficulty-badge ${getDifficultyClass(test.difficulty)}`}>
                      {test.difficulty}
                    </span>
                    {/* 🆕 LEADERBOARD BUTTON */}
                    <button
                      className="test-leaderboard-btn"
                      onClick={() => handleOpenLeaderboard(test)}
                      title="View Leaderboard"
                    >
                      🏆 Leaderboard
                    </button>
                  </div>
                </div>
                
                <p className="test-card-description">{test.description}</p>
                
                <div className="test-meta">
                  {/* <div className="test-meta-item">
                    <svg className="test-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span>{test.duration}</span>
                  </div> */}
                  <div className="test-meta-item">
                    <svg className="test-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                    <span>{test.problems} Problems</span>
                    {solvedProblems[test.id] > 0 && (
                      <span style={{ 
                        marginLeft: "4px",
                        color: "#10b981",
                        fontWeight: "600"
                      }}>
                        • {solvedProblems[test.id]} Solved
                      </span>
                    )}
                  </div>
                </div>

                <div className="test-topics-container">
                  {test.topics.map((topic, idx) => (
                    <span key={idx} className="test-topic-tag">{topic}</span>
                  ))}
                </div>

                <button 
                  className="test-start-button"
                  onClick={() => handleStartTest(test.id)}
                >
                  <span>Start Test</span>
                  <svg className="test-start-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard Modal */}
      {selectedTest && (
        <TestLeaderboardModal
          testId={selectedTest.id}
          testName={selectedTest.title}
          onClose={handleCloseLeaderboard}
        />
      )}
    </div>
  );
}

export default TestsLanding;