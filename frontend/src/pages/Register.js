// Register.js
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const res = await fetch('https://hometown-publicity-eva-qty.trycloudflare.com/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Registration failed');
        setIsLoading(false);
        return;
      }

      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch {
      setError('Server error. Try again.');
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleRegister();
    }
  };

  return (
    <div className="auth-container register-container">
      <div className="auth-bg-blur blur-1-register"></div>
      <div className="auth-bg-blur blur-2-register"></div>

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
            <h2 className="card-title gradient-text-purple">Create Account</h2>
            <p className="card-subtitle">Join thousands of developers mastering their coding skills</p>
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
                placeholder="Choose a username"
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
                placeholder="Create a strong password"
              />
            </div>

            {error && <div className="alert alert-error">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <button onClick={handleRegister} disabled={isLoading} className="submit-btn btn-purple">
              {isLoading ? (
                <>
                  <div className="spinner"></div>
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
                  <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>

            <p className="switch-auth">
              Already have an account? <Link to="/login" className="switch-link-purple">Sign in instead</Link>
            </p>
          </div>

          <div className="security-badge">
            <svg className="security-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <div>
              <h4 className="security-title">Your data is secure</h4>
              <p className="security-text">We use industry-standard encryption to protect your information</p>
            </div>
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

export default Register;