import { useEffect, useState } from "react";
import "./Leaderboard.css"; // Reuse existing CSS

function TestLeaderboardModal({ testId, testName, onClose }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = "https://polished-excessive-magnetic-judicial.trycloudflare.com";

  useEffect(() => {
    if (!testId) return;

    setLoading(true);
    fetch(`${API_URL}/leaderboard/test/${testId}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setUsers(data);
        else setUsers([]);
        setLoading(false);
      })
      .catch(err => {
        console.error("❌ Error fetching test leaderboard:", err);
        setUsers([]);
        setLoading(false);
      });
  }, [testId]);

  const getMedalIcon = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return rank;
  };

  const getRankClass = (rank) => {
    if (rank === 1) return "rank-gold";
    if (rank === 2) return "rank-silver";
    if (rank === 3) return "rank-bronze";
    return "";
  };

  const getStatusBadge = (status) => {
    if (status === "Submitted") {
      return (
        <span style={{
          padding: "4px 12px",
          borderRadius: "12px",
          fontSize: "12px",
          fontWeight: "600",
          background: "#dcfce7",
          color: "#065f46",
          border: "1px solid #86efac"
        }}>
          ✅ Submitted
        </span>
      );
    } else if (status === "In Progress") {
      return (
        <span style={{
          padding: "4px 12px",
          borderRadius: "12px",
          fontSize: "12px",
          fontWeight: "600",
          background: "#fef3c7",
          color: "#92400e",
          border: "1px solid #fcd34d"
        }}>
          ⚠️ In Progress
        </span>
      );
    } else {
      return (
        <span style={{
          padding: "4px 12px",
          borderRadius: "12px",
          fontSize: "12px",
          fontWeight: "600",
          background: "#f1f5f9",
          color: "#475569",
          border: "1px solid #cbd5e1"
        }}>
          ❌ Not Attempted
        </span>
      );
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "20px"
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#020617",
          borderRadius: "24px",
          maxWidth: "900px",
          width: "100%",
          maxHeight: "85vh",
          overflow: "hidden",
          position: "relative",
          border: "1px solid rgba(148, 163, 184, 0.2)"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: "24px",
          borderBottom: "1px solid rgba(148, 163, 184, 0.1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "rgba(30, 41, 59, 0.5)"
        }}>
          <div>
            <h2 style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "#fbbf24",
              margin: 0,
              marginBottom: "4px"
            }}>
              {testName} Leaderboard
            </h2>
            <p style={{
              fontSize: "14px",
              color: "#94a3b8",
              margin: 0
            }}>
              Rankings for this test
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "rgba(148, 163, 184, 0.1)",
              border: "1px solid rgba(148, 163, 184, 0.2)",
              color: "#e2e8f0",
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(148, 163, 184, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(148, 163, 184, 0.1)";
            }}
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div style={{
          maxHeight: "calc(85vh - 100px)",
          overflowY: "auto",
          padding: "20px"
        }}>
          {loading ? (
            <div className="leaderboard-loading">
              <div className="loading-spinner"></div>
              <p>Loading rankings...</p>
            </div>
          ) : users.length === 0 ? (
            <div className="leaderboard-empty">
              <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <p>No one has attempted this test yet</p>
            </div>
          ) : (
            <div className="leaderboard-container" style={{ background: "transparent", border: "none", padding: 0 }}>
              <div className="leaderboard-table-wrapper">
                <table className="leaderboard-table">
                  <thead>
                    <tr>
                      <th className="rank-column">Rank</th>
                      <th className="user-column">User</th>
                      <th className="score-column">Score</th>
                      <th style={{ width: "180px", textAlign: "center" }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u, i) => (
                      <tr key={u._id} className={`leaderboard-row ${getRankClass(i + 1)}`}>
                        <td className="rank-cell">
                          <div className="rank-badge">
                            {getMedalIcon(i + 1)}
                          </div>
                        </td>
                        <td className="user-cell">
                          <div className="user-info">
                            <div className="user-avatar">
                              {u.username[0].toUpperCase()}
                            </div>
                            <span className="user-name">{u.username}</span>
                          </div>
                        </td>
                        <td className="score-cell">
                          <div className="score-badge">
                            {u.score}
                            <span className="score-label">pts</span>
                          </div>
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {getStatusBadge(u.status)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TestLeaderboardModal;