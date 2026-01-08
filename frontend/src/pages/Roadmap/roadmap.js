import { useState, useEffect } from 'react';
import { ChevronRight, Code, Database, Globe, TrendingUp, CheckCircle, Lock } from 'lucide-react';

const RoadmapPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedPath, setSelectedPath] = useState('dsa');

  useEffect(() => {
    console.log('🎨 RoadmapPage mounted');
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const roadmaps = {
    dsa: {
      title: "Data Structures & Algorithms",
      icon: <Code style={{ width: 24, height: 24 }} />,
      color: "#6366f1",
      gradient: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
      stages: [
        {
          title: "Foundation",
          duration: "2-3 weeks",
          topics: [
            { name: "Time & Space Complexity", completed: true },
            { name: "Arrays & Strings", completed: true },
            { name: "Sorting & Searching", completed: false },
            { name: "Recursion Basics", completed: false }
          ]
        },
        {
          title: "Core Data Structures",
          duration: "4-6 weeks",
          topics: [
            { name: "Linked Lists", completed: false },
            { name: "Stacks & Queues", completed: false },
            { name: "Hash Tables", completed: false },
            { name: "Trees & BST", completed: false },
            { name: "Heaps & Priority Queues", completed: false }
          ]
        },
        {
          title: "Advanced Algorithms",
          duration: "6-8 weeks",
          topics: [
            { name: "Dynamic Programming", completed: false, locked: true },
            { name: "Graph Algorithms", completed: false, locked: true },
            { name: "Greedy Algorithms", completed: false, locked: true },
            { name: "Backtracking", completed: false, locked: true },
            { name: "Bit Manipulation", completed: false, locked: true }
          ]
        },
        {
          title: "Interview Prep",
          duration: "3-4 weeks",
          topics: [
            { name: "Pattern Recognition", completed: false, locked: true },
            { name: "System Design Basics", completed: false, locked: true },
            { name: "Mock Interviews", completed: false, locked: true }
          ]
        }
      ]
    },
    webdev: {
      title: "Web Development",
      icon: <Globe style={{ width: 24, height: 24 }} />,
      color: "#3b82f6",
      gradient: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
      stages: [
        {
          title: "HTML & CSS Fundamentals",
          duration: "2-3 weeks",
          topics: [
            { name: "HTML Semantics", completed: true },
            { name: "CSS Flexbox & Grid", completed: true },
            { name: "Responsive Design", completed: false },
            { name: "CSS Animations", completed: false }
          ]
        },
        {
          title: "JavaScript Essentials",
          duration: "4-5 weeks",
          topics: [
            { name: "ES6+ Features", completed: false },
            { name: "DOM Manipulation", completed: false },
            { name: "Async JavaScript", completed: false },
            { name: "APIs & Fetch", completed: false }
          ]
        },
        {
          title: "Frontend Frameworks",
          duration: "6-8 weeks",
          topics: [
            { name: "React Fundamentals", completed: false, locked: true },
            { name: "State Management", completed: false, locked: true },
            { name: "React Router", completed: false, locked: true },
            { name: "Next.js Basics", completed: false, locked: true }
          ]
        },
        {
          title: "Backend & Deployment",
          duration: "5-6 weeks",
          topics: [
            { name: "Node.js & Express", completed: false, locked: true },
            { name: "MongoDB/PostgreSQL", completed: false, locked: true },
            { name: "Authentication & Security", completed: false, locked: true },
            { name: "Deployment & DevOps", completed: false, locked: true }
          ]
        }
      ]
    },
    analyst: {
      title: "Data Analyst",
      icon: <TrendingUp style={{ width: 24, height: 24 }} />,
      color: "#a855f7",
      gradient: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
      stages: [
        {
          title: "Excel & Statistics",
          duration: "3-4 weeks",
          topics: [
            { name: "Advanced Excel", completed: true },
            { name: "Descriptive Statistics", completed: true },
            { name: "Probability Basics", completed: false },
            { name: "Hypothesis Testing", completed: false }
          ]
        },
        {
          title: "SQL Mastery",
          duration: "4-5 weeks",
          topics: [
            { name: "SQL Fundamentals", completed: false },
            { name: "Joins & Subqueries", completed: false },
            { name: "Window Functions", completed: false },
            { name: "Query Optimization", completed: false }
          ]
        },
        {
          title: "Python for Analysis",
          duration: "5-6 weeks",
          topics: [
            { name: "Pandas & NumPy", completed: false, locked: true },
            { name: "Data Cleaning", completed: false, locked: true },
            { name: "Matplotlib & Seaborn", completed: false, locked: true },
            { name: "Statistical Analysis", completed: false, locked: true }
          ]
        },
        {
          title: "Visualization & BI Tools",
          duration: "4-5 weeks",
          topics: [
            { name: "Tableau/Power BI", completed: false, locked: true },
            { name: "Dashboard Design", completed: false, locked: true },
            { name: "Business Metrics", completed: false, locked: true },
            { name: "Storytelling with Data", completed: false, locked: true }
          ]
        }
      ]
    }
  };

  const currentRoadmap = roadmaps[selectedPath];

  // Inline styles to ensure they work
  const styles = {
    container: {
      minHeight: '100vh',
      background: '#0f1419',
      color: 'white',
      overflow: 'hidden',
      position: 'relative',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    },
    backgroundOverlay: {
      position: 'fixed',
      inset: 0,
      pointerEvents: 'none',
      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(59, 130, 246, 0.05) 50%, rgba(139, 92, 246, 0.05) 100%)'
    },
    blob1: {
      position: 'absolute',
      top: '25%',
      left: '25%',
      width: 384,
      height: 384,
      background: 'rgba(99, 102, 241, 0.1)',
      borderRadius: '50%',
      filter: 'blur(120px)',
      animation: 'pulse 3s ease-in-out infinite'
    },
    blob2: {
      position: 'absolute',
      bottom: '25%',
      right: '25%',
      width: 384,
      height: 384,
      background: 'rgba(139, 92, 246, 0.1)',
      borderRadius: '50%',
      filter: 'blur(120px)',
      animation: 'pulse 3s ease-in-out infinite 1s'
    },
    mouseBlob: {
      position: 'absolute',
      width: 384,
      height: 384,
      background: 'rgba(59, 130, 246, 0.05)',
      borderRadius: '50%',
      filter: 'blur(100px)',
      transition: 'all 0.5s ease',
      left: mousePosition.x - 192,
      top: mousePosition.y - 192
    },
    grid: {
      position: 'fixed',
      inset: 0,
      pointerEvents: 'none',
      opacity: 0.1,
      backgroundImage: `
        linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
      `,
      backgroundSize: '50px 50px'
    },
    content: {
      position: 'relative',
      zIndex: 10,
      maxWidth: 1280,
      margin: '0 auto',
      padding: '48px 24px'
    },
    header: {
      textAlign: 'center',
      marginBottom: 64
    },
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)',
      border: '1px solid rgba(99, 102, 241, 0.3)',
      borderRadius: 9999,
      padding: '8px 16px',
      marginBottom: 24
    },
    title: {
      fontSize: 60,
      fontWeight: 700,
      marginBottom: 16,
      background: 'linear-gradient(135deg, #a5b4fc 0%, #60a5fa 50%, #c084fc 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    subtitle: {
      fontSize: 20,
      color: '#9ca3af',
      maxWidth: 672,
      margin: '0 auto'
    },
    pathButtons: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 16,
      marginBottom: 48
    },
    pathButton: (isActive, roadmap) => ({
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '16px 32px',
      borderRadius: 16,
      fontWeight: 600,
      fontSize: 16,
      background: isActive ? roadmap.gradient : 'rgba(255, 255, 255, 0.05)',
      border: isActive ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
      color: 'white',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: isActive ? `0 8px 24px ${roadmap.color}80` : 'none'
    }),
    timeline: {
      position: 'relative'
    },
    verticalLine: (gradient) => ({
      position: 'absolute',
      left: 32,
      top: 0,
      bottom: 0,
      width: 4,
      background: gradient,
      opacity: 0.3,
      borderRadius: 2
    }),
    stagesContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: 48
    },
    stageWrapper: {
      position: 'relative',
      paddingLeft: 80
    },
    stageNumber: (gradient, color) => ({
      position: 'absolute',
      left: 0,
      width: 64,
      height: 64,
      borderRadius: '50%',
      background: gradient,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 24,
      fontWeight: 700,
      boxShadow: `0 8px 24px ${color}80`
    }),
    stageCard: {
      background: 'linear-gradient(135deg, #1a1f2e 0%, #141821 100%)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: 16,
      padding: 32,
      transition: 'all 0.3s ease'
    },
    stageHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 16
    },
    stageTitle: {
      fontSize: 24,
      fontWeight: 700,
      marginBottom: 8
    },
    stageDuration: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      color: '#9ca3af',
      fontSize: 14
    },
    progressSection: {
      textAlign: 'right'
    },
    progressLabel: {
      fontSize: 14,
      color: '#9ca3af',
      marginBottom: 4
    },
    progressValue: {
      fontSize: 24,
      fontWeight: 700,
      background: 'linear-gradient(135deg, #a5b4fc 0%, #60a5fa 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    topicsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: 12
    },
    topicItem: (topic) => ({
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: 16,
      borderRadius: 12,
      background: topic.locked 
        ? 'rgba(255, 255, 255, 0.05)' 
        : topic.completed 
        ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.2) 100%)'
        : 'rgba(255, 255, 255, 0.05)',
      border: topic.completed ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)',
      opacity: topic.locked ? 0.5 : 1,
      cursor: topic.locked ? 'not-allowed' : 'pointer',
      transition: 'all 0.3s ease'
    }),
    checkIcon: {
      width: 20,
      height: 20,
      flexShrink: 0
    },
    uncheckedCircle: {
      width: 20,
      height: 20,
      borderRadius: '50%',
      border: '2px solid #6b7280',
      flexShrink: 0
    },
    topicName: (completed) => ({
      flex: 1,
      fontSize: 14,
      color: completed ? '#6ee7b7' : '#d1d5db'
    }),
    cta: {
      marginTop: 64,
      textAlign: 'center'
    },
    ctaBox: (gradient) => ({
      display: 'inline-block',
      background: gradient,
      padding: 32,
      borderRadius: 24,
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
    }),
    ctaTitle: {
      fontSize: 24,
      fontWeight: 700,
      marginBottom: 16
    },
    ctaButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      background: 'white',
      color: '#111827',
      padding: '16px 32px',
      borderRadius: 12,
      fontWeight: 600,
      fontSize: 16,
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    pulsingDot: {
      width: 8,
      height: 8,
      background: '#a5b4fc',
      borderRadius: '50%',
      animation: 'pulse 2s ease-in-out infinite'
    }
  };

  console.log('✅ Rendering with inline styles');

  return (
    <div style={styles.container}>
      {/* Add keyframes animation */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>

      {/* Background Effects */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none' }}>
        <div style={styles.backgroundOverlay}></div>
        <div style={styles.blob1}></div>
        <div style={styles.blob2}></div>
        <div style={styles.mouseBlob}></div>
      </div>

      {/* Grid Overlay */}
      <div style={styles.grid}></div>

      <div style={styles.content}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.badge}>
            <Database style={{ width: 16, height: 16, color: '#a5b4fc' }} />
            <span style={{ fontSize: 14, fontWeight: 500, color: '#c7d2fe' }}>Your Learning Journey</span>
          </div>
          
          <h1 style={styles.title}>Career Roadmaps</h1>
          
          <p style={styles.subtitle}>
            Choose your path and master the skills needed for your dream career
          </p>
        </div>

        {/* Path Selection */}
        <div style={styles.pathButtons}>
          {Object.entries(roadmaps).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setSelectedPath(key)}
              style={styles.pathButton(selectedPath === key, value)}
              onMouseEnter={(e) => {
                if (selectedPath !== key) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedPath !== key) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                }
              }}
            >
              {value.icon}
              <span>{value.title}</span>
            </button>
          ))}
        </div>

        {/* Roadmap Timeline */}
        <div style={styles.timeline}>
          <div style={styles.verticalLine(currentRoadmap.gradient)}></div>

          <div style={styles.stagesContainer}>
            {currentRoadmap.stages.map((stage, stageIndex) => (
              <div key={stageIndex} style={styles.stageWrapper}>
                <div style={styles.stageNumber(currentRoadmap.gradient, currentRoadmap.color)}>
                  {stageIndex + 1}
                </div>

                <div style={styles.stageCard}>
                  <div style={styles.stageHeader}>
                    <div>
                      <h3 style={styles.stageTitle}>{stage.title}</h3>
                      <p style={styles.stageDuration}>
                        <span style={styles.pulsingDot}></span>
                        {stage.duration}
                      </p>
                    </div>
                    <div style={styles.progressSection}>
                      <div style={styles.progressLabel}>Progress</div>
                      <div style={styles.progressValue}>
                        {Math.round((stage.topics.filter(t => t.completed).length / stage.topics.length) * 100)}%
                      </div>
                    </div>
                  </div>

                  <div style={styles.topicsGrid}>
                    {stage.topics.map((topic, topicIndex) => (
                      <div
                        key={topicIndex}
                        style={styles.topicItem(topic)}
                        onMouseEnter={(e) => {
                          if (!topic.locked) {
                            e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.5)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!topic.locked) {
                            e.currentTarget.style.borderColor = topic.completed 
                              ? 'rgba(16, 185, 129, 0.3)'
                              : 'rgba(255, 255, 255, 0.1)';
                          }
                        }}
                      >
                        {topic.locked ? (
                          <Lock style={{ ...styles.checkIcon, color: '#6b7280' }} />
                        ) : topic.completed ? (
                          <CheckCircle style={{ ...styles.checkIcon, color: '#10b981' }} />
                        ) : (
                          <div style={styles.uncheckedCircle}></div>
                        )}
                        <span style={styles.topicName(topic.completed)}>
                          {topic.name}
                        </span>
                        {!topic.locked && !topic.completed && (
                          <ChevronRight style={{ width: 16, height: 16, color: '#6b7280', flexShrink: 0 }} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div style={styles.cta}>
          <div style={styles.ctaBox(currentRoadmap.gradient)}>
            <h3 style={styles.ctaTitle}>Ready to Start Your Journey?</h3>
            <button 
              style={styles.ctaButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span>Begin Learning</span>
              <ChevronRight style={{ width: 20, height: 20 }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapPage;