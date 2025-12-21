import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">⚡ Code</Link>

      <div className="navbar-right">
        <Link to="/">Home</Link>
        {/* <Link to="/ide">IDE</Link> */}
        <Link to="/tests">Tests</Link>
        {/* <Link to="/questions">Questions</Link> */}

        {user && (
  <Link
    to="/leaderboard"
    style={{
      fontWeight: "600",
      color: "#2563eb",
    }}
  >
    🏆 Leaderboard
  </Link>
)}


        {!user && (
          <>
            <Link to="/register" className="auth-btn">Register</Link>
            <Link to="/login" className="auth-btn">Login</Link>
          </>
        )}

        {user && (
          <>
            <Link to="/profile" className="profile-btn">
              {user.username}
            </Link>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
