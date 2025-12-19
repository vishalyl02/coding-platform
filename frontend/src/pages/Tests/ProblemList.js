function ProblemList({ problems, activeProblem, solved, onSelect }) {
    return (
      <div className="panel problem-panel-left">
        {problems.map((p) => (
          <div
            key={p.id}
            className={`problem-item ${activeProblem === p.id ? "active" : ""}`}
            onClick={() => onSelect(p.id)}
          >
            Problem {p.id}
            {solved[p.id] && <span className="tick">✔</span>}
          </div>
        ))}
      </div>
    );
  }
  
  export default ProblemList;
  