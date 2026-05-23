import { useState } from 'react';
import { ChevronRight, CheckCircle, XCircle, Award, Code, Globe, TrendingUp, Server } from 'lucide-react';

const QuizApp = () => {
  const [view, setView] = useState('categories'); // categories, topics, quiz, results, review
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  // const [showResults, setShowResults] = useState(false);

  // Quiz Structure
  const quizData = {
    dsa: {
      title: "Data Structures & Algorithms",
      icon: <Code style={{ width: 24, height: 24 }} />,
      color: "#6366f1",
      topics: {
        array: {
          title: "Arrays",
          questions: [
            {
              id: 1,
              question: "What is the time complexity of accessing an element in an array by index?",
              options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
              correct: 0,
              explanation: "Array access by index is O(1) because arrays store elements in contiguous memory locations, allowing direct access using the index."
            },
            {
              id: 2,
              question: "Which operation is most efficient on a dynamic array (ArrayList)?",
              options: [
                "Inserting at the beginning",
                "Deleting from the middle",
                "Accessing by index",
                "Inserting in the middle"
              ],
              correct: 2,
              explanation: "Accessing elements by index in an array is O(1), making it the most efficient operation. Insert/delete operations require shifting elements, making them O(n)."
            },
            {
              id: 3,
              question: "What is the space complexity of an array of size n?",
              options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
              correct: 2,
              explanation: "An array of size n requires O(n) space as it stores n elements in contiguous memory."
            },
            {
              id: 4,
              question: "In a sorted array, which algorithm provides the best time complexity for searching?",
              options: [
                "Linear Search - O(n)",
                "Binary Search - O(log n)",
                "Jump Search - O(√n)",
                "Exponential Search - O(log n)"
              ],
              correct: 1,
              explanation: "Binary Search provides O(log n) time complexity for sorted arrays by repeatedly dividing the search space in half."
            },
            {
              id: 5,
              question: "What happens when you try to access an array index that is out of bounds in most programming languages?",
              options: [
                "Returns null",
                "Returns 0",
                "Throws an exception/error",
                "Returns the last element"
              ],
              correct: 2,
              explanation: "Most programming languages throw an IndexOutOfBoundsException or similar error when accessing invalid array indices to prevent memory corruption."
            }
          ]
        },
        string: { title: "Strings", questions: [] },
        linkedlist: { title: "Linked Lists", questions: [] },
        stack: { title: "Stack & Queue", questions: [] },
        map: { title: "Hash Maps", questions: [] },
        graph: { title: "Graphs", questions: [] }
      }
    },
    webdev: {
      title: "Web Development",
      icon: <Globe style={{ width: 24, height: 24 }} />,
      color: "#3b82f6",
      topics: {
        html: { title: "HTML & CSS", questions: [] },
        javascript: { title: "JavaScript", questions: [] },
        react: { title: "React", questions: [] },
        nodejs: { title: "Node.js", questions: [] }
      }
    },
    analyst: {
      title: "Data Analyst",
      icon: <TrendingUp style={{ width: 24, height: 24 }} />,
      color: "#a855f7",
      topics: {
        sql: { title: "SQL", questions: [] },
        python: { title: "Python", questions: [] },
        statistics: { title: "Statistics", questions: [] },
        visualization: { title: "Data Visualization", questions: [] }
      }
    },
    devops: {
      title: "DevOps",
      icon: <Server style={{ width: 24, height: 24 }} />,
      color: "#10b981",
      topics: {
        docker: { title: "Docker", questions: [] },
        kubernetes: { title: "Kubernetes", questions: [] },
        cicd: { title: "CI/CD", questions: [] },
        aws: { title: "AWS", questions: [] }
      }
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setView('topics');
  };

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    const questions = quizData[selectedCategory].topics[topic].questions;
    if (questions.length > 0) {
      setCurrentQuestion(0);
      setUserAnswers({});
      setShowResults(false);
      setView('quiz');
    } else {
      alert('Quiz questions coming soon for this topic!');
    }
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    setUserAnswers({
      ...userAnswers,
      [questionId]: answerIndex
    });
  };

  const handleNextQuestion = () => {
    const questions = quizData[selectedCategory].topics[selectedTopic].questions;
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitQuiz = () => {
    setView('results');
    setShowResults(true);
  };

  const calculateScore = () => {
    const questions = quizData[selectedCategory].topics[selectedTopic].questions;
    let correct = 0;
    questions.forEach(q => {
      if (userAnswers[q.id] === q.correct) {
        correct++;
      }
    });
    return { correct, total: questions.length };
  };

  const handleReviewAnswers = () => {
    setView('review');
  };

  const handleBackToCategories = () => {
    setView('categories');
    setSelectedCategory(null);
    setSelectedTopic(null);
    setCurrentQuestion(0);
    setUserAnswers({});
    setShowResults(false);
  };

  // Styles
  const styles = {
    container: {
      minHeight: '100vh',
      background: '#0f1419',
      color: 'white',
      padding: '40px 20px',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    },
    header: {
      textAlign: 'center',
      marginBottom: 60
    },
    title: {
      fontSize: 56,
      fontWeight: 700,
      marginBottom: 16,
      background: 'linear-gradient(135deg, #a5b4fc 0%, #60a5fa 50%, #c084fc 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    subtitle: {
      fontSize: 18,
      color: '#9ca3af'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: 24,
      maxWidth: 1200,
      margin: '0 auto',
      padding: '0 20px'
    },
    card: {
      background: 'linear-gradient(135deg, #1a1f2e 0%, #141821 100%)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: 16,
      padding: 32,
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    cardTitle: {
      fontSize: 24,
      fontWeight: 700,
      marginBottom: 12,
      display: 'flex',
      alignItems: 'center',
      gap: 12
    },
    cardDescription: {
      fontSize: 14,
      color: '#9ca3af',
      marginBottom: 20
    },
    button: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: '12px 24px',
      background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
      color: 'white',
      border: 'none',
      borderRadius: 12,
      fontSize: 16,
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    backButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: '10px 20px',
      background: 'rgba(255, 255, 255, 0.05)',
      color: 'white',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: 8,
      fontSize: 14,
      fontWeight: 500,
      cursor: 'pointer',
      marginBottom: 30
    },
    quizContainer: {
      maxWidth: 900,
      margin: '0 auto'
    },
    questionCard: {
      background: 'linear-gradient(135deg, #1a1f2e 0%, #141821 100%)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: 16,
      padding: 40,
      marginBottom: 30
    },
    questionHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 30,
      paddingBottom: 20,
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    },
    questionNumber: {
      fontSize: 14,
      color: '#9ca3af',
      fontWeight: 600
    },
    questionText: {
      fontSize: 20,
      fontWeight: 600,
      marginBottom: 30,
      lineHeight: 1.6
    },
    optionsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    },
    option: (isSelected, isCorrect, isWrong, inReview) => ({
      padding: '16px 20px',
      background: isCorrect && inReview 
        ? 'rgba(16, 185, 129, 0.1)' 
        : isWrong && inReview
        ? 'rgba(239, 68, 68, 0.1)'
        : isSelected 
        ? 'rgba(99, 102, 241, 0.2)' 
        : 'rgba(255, 255, 255, 0.05)',
      border: isCorrect && inReview
        ? '2px solid #10b981'
        : isWrong && inReview
        ? '2px solid #ef4444'
        : isSelected 
        ? '2px solid #6366f1' 
        : '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: 12,
      cursor: inReview ? 'default' : 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }),
    navigationButtons: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 16
    },
    resultsContainer: {
      maxWidth: 600,
      margin: '0 auto',
      textAlign: 'center'
    },
    scoreCard: {
      background: 'linear-gradient(135deg, #1a1f2e 0%, #141821 100%)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: 16,
      padding: 60,
      marginBottom: 30
    },
    scoreCircle: (percentage) => ({
      width: 200,
      height: 200,
      borderRadius: '50%',
      background: `conic-gradient(#10b981 ${percentage * 3.6}deg, rgba(255, 255, 255, 0.1) 0deg)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 30px'
    }),
    scoreInner: {
      width: 170,
      height: 170,
      borderRadius: '50%',
      background: '#1a1f2e',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    scoreText: {
      fontSize: 48,
      fontWeight: 700,
      color: '#10b981'
    },
    explanationBox: {
      background: 'rgba(99, 102, 241, 0.1)',
      border: '1px solid rgba(99, 102, 241, 0.3)',
      borderRadius: 12,
      padding: 20,
      marginTop: 20,
      textAlign: 'left'
    },
    explanationTitle: {
      fontSize: 14,
      fontWeight: 600,
      color: '#a5b4fc',
      marginBottom: 8
    },
    explanationText: {
      fontSize: 14,
      color: '#cbd5e1',
      lineHeight: 1.6
    }
  };

  // Render Category Selection
  if (view === 'categories') {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Quiz Categories</h1>
          <p style={styles.subtitle}>Choose a category to test your knowledge</p>
        </div>

        <div style={styles.grid}>
          {Object.entries(quizData).map(([key, category]) => (
            <div
              key={key}
              style={styles.card}
              onClick={() => handleCategorySelect(key)}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = category.color;
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={styles.cardTitle}>
                <div style={{ color: category.color }}>{category.icon}</div>
                {category.title}
              </div>
              <div style={styles.cardDescription}>
                {Object.keys(category.topics).length} topics available
              </div>
              <button style={{ ...styles.button, background: category.color }}>
                Start Quiz
                <ChevronRight style={{ width: 20, height: 20 }} />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Render Topic Selection
  if (view === 'topics') {
    const category = quizData[selectedCategory];
    return (
      <div style={styles.container}>
        <button style={styles.backButton} onClick={handleBackToCategories}>
          ← Back to Categories
        </button>

        <div style={styles.header}>
          <h1 style={styles.title}>{category.title}</h1>
          <p style={styles.subtitle}>Select a topic to begin the quiz</p>
        </div>

        <div style={styles.grid}>
          {Object.entries(category.topics).map(([key, topic]) => (
            <div
              key={key}
              style={styles.card}
              onClick={() => handleTopicSelect(key)}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = category.color;
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={styles.cardTitle}>{topic.title}</div>
              <div style={styles.cardDescription}>
                {topic.questions.length > 0 
                  ? `${topic.questions.length} questions`
                  : 'Coming soon'}
              </div>
              <button 
                style={{ ...styles.button, background: category.color }}
                disabled={topic.questions.length === 0}
              >
                {topic.questions.length > 0 ? 'Start Quiz' : 'Coming Soon'}
                <ChevronRight style={{ width: 20, height: 20 }} />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Render Quiz
  if (view === 'quiz') {
    const questions = quizData[selectedCategory].topics[selectedTopic].questions;
    const currentQ = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
      <div style={styles.container}>
        <div style={styles.quizContainer}>
          <button style={styles.backButton} onClick={handleBackToCategories}>
            ← Exit Quiz
          </button>

          <div style={styles.questionCard}>
            <div style={styles.questionHeader}>
              <span style={styles.questionNumber}>
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span style={{ fontSize: 14, color: '#10b981', fontWeight: 600 }}>
                {Math.round(progress)}% Complete
              </span>
            </div>

            <div style={{ 
              height: 4, 
              background: 'rgba(255, 255, 255, 0.1)', 
              borderRadius: 2,
              marginBottom: 30,
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #10b981, #6366f1)',
                transition: 'width 0.3s ease'
              }}></div>
            </div>

            <div style={styles.questionText}>{currentQ.question}</div>

            <div style={styles.optionsContainer}>
              {currentQ.options.map((option, index) => (
                <div
                  key={index}
                  style={styles.option(userAnswers[currentQ.id] === index, false, false, false)}
                  onClick={() => handleAnswerSelect(currentQ.id, index)}
                >
                  <div style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    border: '2px solid',
                    borderColor: userAnswers[currentQ.id] === index ? '#6366f1' : '#4b5563',
                    background: userAnswers[currentQ.id] === index ? '#6366f1' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {userAnswers[currentQ.id] === index && (
                      <div style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: 'white'
                      }}></div>
                    )}
                  </div>
                  <span style={{ fontSize: 16 }}>{option}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.navigationButtons}>
            <button
              style={{
                ...styles.button,
                background: currentQuestion === 0 ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.1)',
                cursor: currentQuestion === 0 ? 'not-allowed' : 'pointer'
              }}
              onClick={handlePreviousQuestion}
              disabled={currentQuestion === 0}
            >
              Previous
            </button>

            {currentQuestion === questions.length - 1 ? (
              <button
                style={{
                  ...styles.button,
                  background: Object.keys(userAnswers).length === questions.length
                    ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                    : 'rgba(255, 255, 255, 0.1)',
                  cursor: Object.keys(userAnswers).length === questions.length ? 'pointer' : 'not-allowed'
                }}
                onClick={handleSubmitQuiz}
                disabled={Object.keys(userAnswers).length !== questions.length}
              >
                Submit Quiz
                <ChevronRight style={{ width: 20, height: 20 }} />
              </button>
            ) : (
              <button style={styles.button} onClick={handleNextQuestion}>
                Next Question
                <ChevronRight style={{ width: 20, height: 20 }} />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Render Results
  if (view === 'results') {
    const { correct, total } = calculateScore();
    const percentage = Math.round((correct / total) * 100);

    return (
      <div style={styles.container}>
        <div style={styles.resultsContainer}>
          <div style={styles.scoreCard}>
            <div style={{ marginBottom: 30 }}>
              <Award style={{ width: 64, height: 64, color: '#10b981', margin: '0 auto' }} />
            </div>

            <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 30 }}>
              Quiz Completed!
            </h2>

            <div style={styles.scoreCircle(percentage)}>
              <div style={styles.scoreInner}>
                <div style={styles.scoreText}>{percentage}%</div>
                <div style={{ fontSize: 14, color: '#9ca3af' }}>
                  {correct} / {total} Correct
                </div>
              </div>
            </div>

            <div style={{ fontSize: 18, color: '#cbd5e1', marginBottom: 30 }}>
              {percentage >= 80 ? '🎉 Excellent work!' : 
               percentage >= 60 ? '👍 Good job!' : 
               '💪 Keep practicing!'}
            </div>

            <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
              <button
                style={styles.button}
                onClick={handleReviewAnswers}
              >
                Review Answers
              </button>
              <button
                style={{
                  ...styles.button,
                  background: 'rgba(255, 255, 255, 0.1)'
                }}
                onClick={handleBackToCategories}
              >
                Back to Categories
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render Review
  if (view === 'review') {
    const questions = quizData[selectedCategory].topics[selectedTopic].questions;

    return (
      <div style={styles.container}>
        <div style={styles.quizContainer}>
          <button style={styles.backButton} onClick={() => setView('results')}>
            ← Back to Results
          </button>

          <div style={{ ...styles.header, marginBottom: 40 }}>
            <h1 style={{ ...styles.title, fontSize: 36 }}>Answer Review</h1>
            <p style={styles.subtitle}>Review your answers and learn from explanations</p>
          </div>

          {questions.map((q, qIndex) => {
            const userAnswer = userAnswers[q.id];
            const isCorrect = userAnswer === q.correct;

            return (
              <div key={q.id} style={{ ...styles.questionCard, marginBottom: 30 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 20
                }}>
                  <span style={{ ...styles.questionNumber, fontSize: 16 }}>
                    Question {qIndex + 1}
                  </span>
                  {isCorrect ? (
                    <CheckCircle style={{ width: 20, height: 20, color: '#10b981' }} />
                  ) : (
                    <XCircle style={{ width: 20, height: 20, color: '#ef4444' }} />
                  )}
                </div>

                <div style={styles.questionText}>{q.question}</div>

                <div style={styles.optionsContainer}>
                  {q.options.map((option, index) => (
                    <div
                      key={index}
                      style={styles.option(
                        userAnswer === index,
                        index === q.correct,
                        userAnswer === index && !isCorrect,
                        true
                      )}
                    >
                      <div style={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        {index === q.correct ? (
                          <CheckCircle style={{ width: 24, height: 24, color: '#10b981' }} />
                        ) : userAnswer === index && !isCorrect ? (
                          <XCircle style={{ width: 24, height: 24, color: '#ef4444' }} />
                        ) : (
                          <div style={{
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            border: '2px solid #4b5563'
                          }}></div>
                        )}
                      </div>
                      <span style={{ fontSize: 16 }}>{option}</span>
                    </div>
                  ))}
                </div>

                <div style={styles.explanationBox}>
                  <div style={styles.explanationTitle}>💡 Explanation:</div>
                  <div style={styles.explanationText}>{q.explanation}</div>
                </div>
              </div>
            );
          })}

          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <button style={styles.button} onClick={handleBackToCategories}>
              Back to Categories
              <ChevronRight style={{ width: 20, height: 20 }} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default QuizApp;