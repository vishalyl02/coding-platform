// Login.js
import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('https://liable-beside-ethnic-selective.trycloudflare.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        login(data.user);
        setSuccess('Login successful! Redirecting...');
        setTimeout(() => {
          navigate('/profile');
        }, 1500);
      } else {
        setError('Invalid credentials');
        setIsLoading(false);
      }
    } catch {
      setError('Server error. Try again.');
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-bg-blur blur-1"></div>
      <div className="auth-bg-blur blur-2"></div>

      <Link to="/" className="back-button">
        <svg className="back-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span>Back to Home</span>
      </Link>

      <div className="auth-content">
        <div className="auth-header">
          <div className="logo-section">
            <svg className="logo-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            <h1 className="logo-text">CodeMaster</h1>
          </div>
          <div className="tagline">
            <svg className="tagline-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Next-Gen Coding Platform</span>
          </div>
        </div>

        <div className="auth-card">
          <div className="card-header">
            <h2 className="card-title gradient-text-cyan">Welcome Back</h2>
            <p className="card-subtitle">Enter your credentials to access your account</p>
          </div>

          <div className="form-container">
            <div className="form-group">
              <label className="form-label">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={handleKeyPress}
                className="form-input"
                placeholder="Enter your username"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                className="form-input"
                placeholder="Enter your password"
              />
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" className="checkbox-input" />
                Remember me
              </label>
              <button className="forgot-link">Forgot password?</button>
            </div>

            {error && <div className="alert alert-error">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <button onClick={handleLogin} disabled={isLoading} className="submit-btn btn-cyan">
              {isLoading ? (
                <>
                  <div className="spinner"></div>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>

            <p className="switch-auth">
              Don't have an account? <Link to="/register" className="switch-link">Create one now</Link>
            </p>
          </div>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <p className="feature-text">Fast & Secure</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💻</div>
            <p className="feature-text">Modern UI</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <p className="feature-text">Real-time</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;