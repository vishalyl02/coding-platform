import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="home-modern">
      {/* Animated Background */}
      <div className="home-bg">
        <div className="home-bg-gradient"></div>
        <div className="home-bg-orb home-bg-orb-1"></div>
        <div className="home-bg-orb home-bg-orb-2"></div>
        <div className="home-bg-orb home-bg-orb-3"></div>
        <div 
          className="home-bg-cursor"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        ></div>
      </div>

      {/* Grid Overlay */}
      <div className="home-grid"></div>

      {/* Content */}
      <div className="home-content">
        <div className="home-container">
          {/* Badge */}
          <div className="home-badge">
            <svg className="home-badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
            <span>Next-Gen Coding Platform</span>
          </div>

          {/* Main Heading */}
          <h1 className="home-title">
            <span className="home-title-line home-title-gradient-1">Code.</span>
            <br />
            <span className="home-title-line home-title-gradient-2">Test.</span>
            <br />
            <span className="home-title-line home-title-gradient-3">Master.</span>
          </h1>

          {/* Subtitle */}
          <p className="home-subtitle">
            Elevate your coding skills with our advanced platform designed for 
            <span className="home-highlight home-highlight-cyan"> practice</span>,
            <span className="home-highlight home-highlight-blue"> competitive tests</span>, and
            <span className="home-highlight home-highlight-purple"> technical interviews</span>.
          </p>

          {/* CTA Buttons */}
          <div className="home-cta">
            <Link to="/tests" className="home-btn-primary">
              <span>Start Coding</span>
              <svg className="home-btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
              <div className="home-btn-gradient"></div>
            </Link>
            
            {/* <Link to="/leaderboard" className="home-btn-secondary">
              <svg className="home-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9H4.5a2.5 2.5 0 010-5H6"></path>
                <path d="M18 9h1.5a2.5 2.5 0 000-5H18"></path>
                <path d="M4 22h16"></path>
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                <path d="M18 2H6v7a6 6 0 0012 0V2z"></path>
              </svg>
              <span>View Leaderboard</span>
            </Link> */}
          </div>

          {/* Feature Cards */}
          <div className="home-features">
            <div className="home-card home-card-cyan">
              <div className="home-card-icon-wrapper">
                <svg className="home-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2a10 10 0 1 0 10 10H12V2z"></path>
                  <path d="M12 2v10l8.66 5"></path>
                </svg>
              </div>
              <h3 className="home-card-title">Smart Learning</h3>
              <p className="home-card-desc">Adaptive problem sets that evolve with your skill level</p>
            </div>

            <div className="home-card home-card-blue">
              <div className="home-card-icon-wrapper">
                <svg className="home-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="6"></circle>
                  <circle cx="12" cy="12" r="2"></circle>
                </svg>
              </div>
              <h3 className="home-card-title">Real Challenges</h3>
              <p className="home-card-desc">Industry-standard problems from top tech companies</p>
            </div>

            <div className="home-card home-card-purple">
              <div className="home-card-icon-wrapper">
                <svg className="home-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9H4.5a2.5 2.5 0 010-5H6"></path>
                  <path d="M18 9h1.5a2.5 2.5 0 000-5H18"></path>
                  <path d="M4 22h16"></path>
                  <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                  <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                  <path d="M18 2H6v7a6 6 0 0012 0V2z"></path>
                </svg>
              </div>
              <h3 className="home-card-title">Compete & Win</h3>
              <p className="home-card-desc">Join global leaderboards and prove your expertise</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;