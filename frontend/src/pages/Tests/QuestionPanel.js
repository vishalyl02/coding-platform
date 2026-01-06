// function QuestionPanel({ problem }) {
//   if (!problem) {
//     return (
//       <div className="panel question-panel">
//         <p>Loading problem...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="panel question-panel">
//       <h3 style={{ marginBottom: "16px", fontSize: "20px", fontWeight: "600" }}>
//         {problem.title}
//       </h3>
      
//       {/* Problem Description - using description field, not statement */}
//       <div 
//         className="problem-description"
//         style={{
//           fontSize: "14px",
//           lineHeight: "1.6",
//           color: "#374151",
//           whiteSpace: "pre-wrap",
//           fontFamily: "system-ui, -apple-system, sans-serif"
//         }}
//       >
//         {problem.description}
//       </div>

//       {/* Examples Section */}
//       {problem.examples && problem.examples.length > 0 && (
//         <div style={{ marginTop: "24px" }}>
//           <h4 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "12px" }}>
//             Examples:
//           </h4>
          
//           {problem.examples.map((example, idx) => (
//             <div 
//               key={idx}
//               style={{
//                 background: "#f9fafb",
//                 padding: "12px",
//                 borderRadius: "6px",
//                 marginBottom: "12px",
//                 border: "1px solid #e5e7eb"
//               }}
//             >
//               <div style={{ fontSize: "13px", fontWeight: "600", marginBottom: "8px" , color:"blue" }}>
//                 Example {idx + 1}:
//               </div>
              
//               <div style={{ marginBottom: "8px" }}>
//                 <span style={{ fontSize: "12px", color: "#6b7280", fontWeight: "600" }}>
//                   Input:
//                 </span>
//                 <pre style={{
//                   background: "white",
//                   padding: "8px",
//                   borderRadius: "4px",
//                   fontSize: "12px",
//                   fontFamily: "monospace",
//                   margin: "4px 0 0 0",
//                   border: "1px solid #e5e7eb",
//                   color:"blue"
//                 }}>
//                   {example.input}
//                 </pre>
//               </div>
              
//               <div style={{ marginBottom: example.explanation ? "8px" : "0" }}>
//                 <span style={{ fontSize: "12px", color: "#6b7280", fontWeight: "600" }}>
//                   Output:
//                 </span>
//                 <pre style={{
//                   background: "white",
//                   padding: "8px",
//                   borderRadius: "4px",
//                   fontSize: "12px",
//                   fontFamily: "monospace",
//                   margin: "4px 0 0 0",
//                   border: "1px solid #e5e7eb",
//                   color:"blue"
//                 }}>
//                   {example.output}
//                 </pre>
//               </div>
              
//               {example.explanation && (
//                 <div>
//                   <span style={{ fontSize: "12px", color: "#6b7280", fontWeight: "600" }}>
//                     Explanation:
//                   </span>
//                   <p style={{
//                     fontSize: "12px",
//                     margin: "4px 0 0 0",
//                     color: "#374151"
//                   }}>
//                     {example.explanation}
//                   </p>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default QuestionPanel;
function QuestionPanel({ problem }) {
  if (!problem) {
    return (
      <div className="panel question-panel">
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          color: '#64748b',
          fontSize: '16px'
        }}>
          Loading problem...
        </div>
      </div>
    );
  }

  return (
    <div className="panel question-panel">
      <h3>
        {problem.title}
      </h3>
      
      {/* Problem Description */}
      <div className="problem-description">
        {problem.description}
      </div>

      {/* Problem Statement Section */}
      {problem.statement && (
        <div style={{ 
          marginTop: "28px",
          padding: "16px",
          background: "rgba(15, 23, 42, 0.4)",
          borderRadius: "10px",
          border: "1px solid rgba(139, 92, 246, 0.2)"
        }}>
          <h4 style={{ 
            fontSize: "16px", 
            fontWeight: "700", 
            marginBottom: "12px",
            color: "#c4b5fd"
          }}>
            Problem Statement:
          </h4>
          <div style={{
            fontSize: "14px",
            lineHeight: "1.7",
            color: "#cbd5e1",
            whiteSpace: "pre-wrap"
          }}>
            {problem.statement}
          </div>
        </div>
      )}

      {/* Examples Section */}
      {problem.examples && problem.examples.length > 0 && (
        <div style={{ marginTop: "28px" }}>
          <h4>
            Examples
          </h4>
          
          {problem.examples.map((example, idx) => (
            <div 
              key={idx}
              style={{
                background: "rgba(15, 23, 42, 0.6)",
                padding: "16px",
                borderRadius: "10px",
                marginBottom: "16px",
                border: "1px solid rgba(99, 102, 241, 0.2)",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)"
              }}
            >
              <div style={{ 
                fontSize: "14px", 
                fontWeight: "700", 
                marginBottom: "12px",
                color: "#818cf8"
              }}>
                Example {idx + 1}:
              </div>
              
              <div style={{ marginBottom: "12px" }}>
                <span style={{ 
                  fontSize: "13px", 
                  color: "#94a3b8", 
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px"
                }}>
                  Input:
                </span>
                <pre style={{
                  background: "#0a0e1a",
                  padding: "12px",
                  borderRadius: "6px",
                  fontSize: "13px",
                  fontFamily: "'JetBrains Mono', monospace",
                  margin: "6px 0 0 0",
                  border: "1px solid rgba(99, 102, 241, 0.3)",
                  color: "#60a5fa",
                  lineHeight: "1.6",
                  overflowX: "auto"
                }}>
                  {example.input}
                </pre>
              </div>
              
              <div style={{ marginBottom: example.explanation ? "12px" : "0" }}>
                <span style={{ 
                  fontSize: "13px", 
                  color: "#94a3b8", 
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px"
                }}>
                  Output:
                </span>
                <pre style={{
                  background: "#0a0e1a",
                  padding: "12px",
                  borderRadius: "6px",
                  fontSize: "13px",
                  fontFamily: "'JetBrains Mono', monospace",
                  margin: "6px 0 0 0",
                  border: "1px solid rgba(99, 102, 241, 0.3)",
                  color: "#10b981",
                  lineHeight: "1.6",
                  overflowX: "auto"
                }}>
                  {example.output}
                </pre>
              </div>
              
              {example.explanation && (
                <div>
                  <span style={{ 
                    fontSize: "13px", 
                    color: "#94a3b8", 
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px"
                  }}>
                    Explanation:
                  </span>
                  <p style={{
                    fontSize: "13px",
                    margin: "6px 0 0 0",
                    color: "#cbd5e1",
                    lineHeight: "1.6"
                  }}>
                    {example.explanation}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Constraints Section */}
      {problem.constraints && (
        <div style={{ 
          marginTop: "28px",
          padding: "16px",
          background: "rgba(15, 23, 42, 0.4)",
          borderRadius: "10px",
          border: "1px solid rgba(236, 72, 153, 0.2)"
        }}>
          <h4 style={{ 
            fontSize: "16px", 
            fontWeight: "700", 
            marginBottom: "12px",
            color: "#f9a8d4"
          }}>
            Constraints:
          </h4>
          <div style={{
            fontSize: "13px",
            lineHeight: "1.7",
            color: "#cbd5e1",
            whiteSpace: "pre-wrap"
          }}>
            {problem.constraints}
          </div>
        </div>
      )}
    </div>
  );
}

export default QuestionPanel;