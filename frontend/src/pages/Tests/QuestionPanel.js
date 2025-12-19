function QuestionPanel({ problem }) {
    return (
      <div className="panel question-panel">
        <h3>{problem.title}</h3>
        <pre className="statement">{problem.statement}</pre>
      </div>
    );
  }
  
  export default QuestionPanel;
  