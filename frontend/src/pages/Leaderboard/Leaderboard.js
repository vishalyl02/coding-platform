import { useEffect, useState } from "react";
import "./Leaderboard.css";

function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://polished-excessive-magnetic-judicial.trycloudflare.com/leaderboard")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setUsers(data);
        else setUsers([]);
        setLoading(false);
      })
      .catch(() => {
        setUsers([]);
        setLoading(false);
      });
  }, []);

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

  return (
    <div className="leaderboard-modern">
      {/* Background Effects */}
      <div className="leaderboard-bg">
        <div className="leaderboard-bg-gradient"></div>
        <div className="leaderboard-bg-orb leaderboard-bg-orb-1"></div>
        <div className="leaderboard-bg-orb leaderboard-bg-orb-2"></div>
      </div>

      {/* Grid Overlay */}
      <div className="leaderboard-grid-overlay"></div>

      {/* Content */}
      <div className="leaderboard-content">
        <div className="leaderboard-header">
          <div className="leaderboard-trophy-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9H4.5a2.5 2.5 0 010-5H6"></path>
              <path d="M18 9h1.5a2.5 2.5 0 000-5H18"></path>
              <path d="M4 22h16"></path>
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
              <path d="M18 2H6v7a6 6 0 0012 0V2z"></path>
            </svg>
          </div>
          <h1 className="leaderboard-title">Leaderboard</h1>
          <p className="leaderboard-subtitle">Top performers this season</p>
        </div>

        <div className="leaderboard-container">
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
              <p>No rankings available yet</p>
            </div>
          ) : (
            <div className="leaderboard-table-wrapper">
              <table className="leaderboard-table">
                <thead>
                  <tr>
                    <th className="rank-column">Rank</th>
                    <th className="user-column">User</th>
                    <th className="score-column">Score</th>
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
                          {u.totalScore}
                          <span className="score-label">pts</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;