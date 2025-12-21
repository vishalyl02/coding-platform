import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Profile.css";

function Profile() {
  const { user, logout } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="profile-modern">
        <div className="profile-content">
          <div className="profile-empty">
            <svg className="profile-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <h2>Please Login</h2>
            <p>You need to be logged in to view your profile</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-modern">
      {/* Background Effects */}
      <div className="profile-bg">
        <div className="profile-bg-gradient"></div>
        <div className="profile-bg-orb profile-bg-orb-1"></div>
        <div className="profile-bg-orb profile-bg-orb-2"></div>
      </div>

      {/* Grid Overlay */}
      <div className="profile-grid-overlay"></div>

      {/* Content */}
      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-card-header">
            <div className="profile-avatar-large">
              {user.username[0].toUpperCase()}
            </div>
            <h1 className="profile-title">Student Profile</h1>
          </div>

          <div className="profile-card-body">
            <div className="profile-info-section">
              <div className="profile-info-item">
                <div className="profile-info-label">
                  <svg className="profile-info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span>Username</span>
                </div>
                <div className="profile-info-value">{user.username}</div>
              </div>

              <div className="profile-info-item">
                <div className="profile-info-label">
                  <svg className="profile-info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
                    <circle cx="8.5" cy="7" r="4"></circle>
                    <polyline points="17 11 19 13 23 9"></polyline>
                  </svg>
                  <span>Account Status</span>
                </div>
                <div className="profile-info-value">
                  <span className="profile-status-badge">Active</span>
                </div>
              </div>

              <div className="profile-info-item">
                <div className="profile-info-label">
                  <svg className="profile-info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                  <span>Member Since</span>
                </div>
                <div className="profile-info-value">
                  {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </div>
              </div>
            </div>

            <div className="profile-actions">
              <button className="profile-logout-btn" onClick={logout}>
                <svg className="profile-logout-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;