import './IDE.css'

function IDE() {
    return (
      <div className="ide">
        <textarea
          placeholder="// Write your code here"
          spellCheck={false}
        />
        <button className="run-btn">Run Code</button>
      </div>
    );
  }
  
  export default IDE;
  