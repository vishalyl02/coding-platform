const questions = [
    "Two Sum",
    "Best Time to Buy and Sell Stock",
    "Contains Duplicate",
    "Product of Array Except Self",
    "Maximum Subarray",
    "Valid Anagram",
    "Merge Two Sorted Lists",
    "Linked List Cycle",
    "Binary Search",
    "Climbing Stairs"
  ];
  
  function Questions() {
    return (
      <div className="questions">
        <h2>Problems</h2>
        <ul>
          {questions.map((q, i) => (
            <li key={i}>{q}</li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default Questions;
  