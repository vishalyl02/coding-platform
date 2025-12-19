
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// import { problems } from "./problems";
// import { languageTemplates } from "./languageTemplates";
// import { useTestTimer } from "./useTestTimer";

// import TestHeader from "./TestHeader";
// import ProblemList from "./ProblemList";
// import QuestionPanel from "./QuestionPanel";
// import IDEPanel from "./IDEPanel";
// import { useContext } from "react";
// import { AuthContext } from "../../context/AuthContext";


// import "./Tests.css";

// function Tests() {
//   /* -------------------- STATE -------------------- */
//   const { user } = useContext(AuthContext);

//   const [testStarted, setTestStarted] = useState(false);
//   const [testSubmitted, setTestSubmitted] = useState(false);

//   const [activeProblem, setActiveProblem] = useState(1);
//   const [solved, setSolved] = useState({});

//   const [language, setLanguage] = useState("cpp");
//   const [code, setCode] = useState(languageTemplates.cpp);
//   const [runResult, setRunResult] = useState("");
//   const [score, setScore] = useState(0);
//   const navigate = useNavigate();

//   /* -------------------- TIMER -------------------- */
//   const { formatTime } = useTestTimer(
//     testStarted,
//     testSubmitted,
//     90 * 60 // 90 minutes
//   );
//   console.log("USER FROM CONTEXT:", user);

//   useEffect(() => {
//     if (user?.testSubmitted) {
//       setTestSubmitted(true);
//       setTestStarted(true); // 🔥 important so UI shows test as started
//     }
//   }, [user]);
//   useEffect(() => {
//     const fetchSavedCode = async () => {
//       if (!user) return;

//       try {
//         const res = await fetch(
//           `http://localhost:3001/submission/${user._id}/${activeProblem}`
//         );

//         const data = await res.json();

//         if (data?.code) {
//           setCode(data.code);
//           setLanguage(data.language || "cpp");
//         } else {
//           // No previous submission → show template
//           setCode(languageTemplates[language]);
//         }
//       } catch (err) {
//         console.error("Failed to load saved code", err);
//         setCode(languageTemplates[language]);
//       }
//     };

//     fetchSavedCode();
//   }, [activeProblem, user]);   // 👈 IMPORTANT dependencies


//   /* -------------------- RESET EDITOR -------------------- */
//   // useEffect(() => {
//   //   setCode(languageTemplates[language]);
//   //   setRunResult("");
//   // }, [activeProblem, language]);

//   /* -------------------- RUN CODE -------------------- */
//   const runCode = async () => {
//     if (!testStarted || testSubmitted) return;

//     if (!code.trim()) {
//       setRunResult("Please write some code ❌");
//       return;
//     }

//     setRunResult("Running...");

//     try {
//       const res = await fetch("http://localhost:3001/run", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           code,
//           problemId: activeProblem,
//           language,
//           userId: user._id,
//         }),
//       });

//       const data = await res.json();
//       setRunResult(data.message || data.result);
//       setScore(data.score);
//     } catch {
//       setRunResult("Failed to connect to backend ❌");
//     }
//   };

//   /* -------------------- SUBMIT CODE -------------------- */
//   const submitCode = async () => {
//     if (!testStarted || testSubmitted) return;

//     if (!code.trim()) {
//       setRunResult("Please write some code ❌");
//       return;
//     }

//     setRunResult("Submitting...");

//     try {
//       const res = await fetch("http://localhost:3001/run", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           code,
//           problemId: activeProblem,
//           language,
//           userId: user._id,
//           submit: true,
//         }),
//       });

//       const data = await res.json();
//       setRunResult(data.message || data.result);

//       if (data.success && !solved[activeProblem]) {
//         setSolved((prev) => ({
//           ...prev,
//           [activeProblem]: true,
//         }));
//       }
//     } catch {
//       setRunResult("Failed to connect to backend ❌");
//     }
//   };

//   /* -------------------- SUBMIT TEST -------------------- */
//   const handleSubmitTest = async () => {
//     if (!user || !user._id) {
//       alert("User not logged in");
//       return;
//     }
  
//     try {
//       const res = await fetch("http://localhost:3001/test/submit", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId: user._id,
//         }),
//       });
  
//       const data = await res.json();
  
//       if (!res.ok) {
//         alert(data.message || "Submission failed");
//         return;
//       }
  
//       setTestSubmitted(true);
//       navigate("/tests/thank-you");
//     } catch (err) {
//       console.error(err);
//       alert("Server error");
//     }
//   };
  
  
//   /* -------------------- RENDER -------------------- */
//   return (
//     <div className="test-container">
//       {/* HEADER */}
//       <TestHeader
//         formatTime={formatTime}
//         testStarted={testStarted}
//         testSubmitted={testSubmitted}
//         onStart={() => setTestStarted(true)}
//         onSubmit={handleSubmitTest}
//       />

//       {/* MAIN LAYOUT */}
//       <div className="test-panels">
//         {/* LEFT: PROBLEM LIST */}
//         <ProblemList
//           problems={problems}
//           activeProblem={activeProblem}
//           solved={solved}
//           onSelect={setActiveProblem}
//         />

//         {/* CENTER: QUESTION */}
//         <QuestionPanel problem={problems[activeProblem - 1]} />

//         {/* RIGHT: IDE */}
//         <IDEPanel
//           code={code}
//           setCode={setCode}
//           testStarted={testStarted}
//           testSubmitted={testSubmitted}
//           onRunCode={runCode}
//           onSubmitCode={submitCode}
//           runResult={runResult}
//           language={language}
//           setLanguage={setLanguage}
//           score={score} 
//         />
//       </div>
//     </div>
//   );
// }

// export default Tests;
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { problems } from "./problems";
import { languageTemplates } from "./languageTemplates";
import { useTestTimer } from "./useTestTimer";

import TestHeader from "./TestHeader";
import ProblemList from "./ProblemList";
import QuestionPanel from "./QuestionPanel";
import IDEPanel from "./IDEPanel";

import { AuthContext } from "../../context/AuthContext";

import "./Tests.css";

function Tests() {
  /* -------------------- CONTEXT -------------------- */

  const navigate = useNavigate();
  const { user, refreshUser } = useContext(AuthContext);

  console.log("USER FROM CONTEXT:", user);

  /* -------------------- STATE -------------------- */
  const [testStarted, setTestStarted] = useState(false);
  const [testSubmitted, setTestSubmitted] = useState(false);

  const [activeProblem, setActiveProblem] = useState(1);
  const [solved, setSolved] = useState({});

  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState(languageTemplates.cpp);
  const [runResult, setRunResult] = useState("");
  const [score, setScore] = useState(0);

  /* -------------------- TIMER -------------------- */
  const { formatTime } = useTestTimer(
    testStarted,
    testSubmitted,
    90 * 60 // 90 minutes
  );

  /* -------------------- CHECK IF TEST ALREADY SUBMITTED -------------------- */
  useEffect(() => {
    if (user?.testSubmitted) {
      setTestSubmitted(true);
      setTestStarted(true);
    }
  }, [user]);

  /* -------------------- LOAD SAVED CODE PER PROBLEM -------------------- */
  useEffect(() => {
    const fetchSavedCode = async () => {
      if (!user?.id) return;

      try {
        const res = await fetch(
          `http://localhost:3001/submission/${user.id}/${activeProblem}`
        );

        const data = await res.json();

        if (data?.code) {
          setCode(data.code);
          setLanguage(data.language || "cpp");
        } else {
          setCode(languageTemplates[language]);
        }
      } catch (err) {
        console.error("Failed to load saved code", err);
        setCode(languageTemplates[language]);
      }
    };

    fetchSavedCode();
  }, [activeProblem, user, language]);

  /* -------------------- RUN CODE -------------------- */
  const runCode = async () => {
    if (!testStarted || testSubmitted) return;

    if (!code.trim()) {
      setRunResult("Please write some code ❌");
      return;
    }

    setRunResult("Running...");

    try {
      const res = await fetch("https://coding-platform-beige.vercel.app/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          problemId: activeProblem,
          language,
          userId: user.id,
        }),
      });

      const data = await res.json();
      setRunResult(data.message || data.result);
      setScore(data.score || 0);
    } catch {
      setRunResult("Failed to connect to backend ❌");
    }
  };

  /* -------------------- SUBMIT CODE (PER PROBLEM) -------------------- */
  const submitCode = async () => {
    if (!testStarted || testSubmitted) return;

    if (!code.trim()) {
      setRunResult("Please write some code ❌");
      return;
    }

    setRunResult("Submitting...");

    try {
      const res = await fetch("https://coding-platform-beige.vercel.app/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          problemId: activeProblem,
          language,
          userId: user.id,
          submit: true,
        }),
      });

      const data = await res.json();
      setRunResult(data.message || data.result);

      if (data.success) {
        setSolved((prev) => ({
          ...prev,
          [activeProblem]: true,
        }));
      }
    } catch {
      setRunResult("Failed to connect to backend ❌");
    }
  };

  /* -------------------- SUBMIT ENTIRE TEST -------------------- */
  const handleSubmitTest = async () => {
    if (!user?.id) {
      alert("User not logged in");
      return;
    }

    try {
      const res = await fetch("https://coding-platform-beige.vercel.app/test/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Submission failed");
        return;
      }
      await refreshUser();
      setTestSubmitted(true);
      navigate("/tests/thank-you");
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  /* -------------------- RENDER -------------------- */
  return (
    <div className="test-container">
      {/* HEADER */}
      <TestHeader
        formatTime={formatTime}
        testStarted={testStarted}
        testSubmitted={testSubmitted}
        onStart={() => setTestStarted(true)}
        onSubmit={handleSubmitTest}
      />

      {/* PANELS */}
      <div className="test-panels">
        {/* LEFT */}
        <ProblemList
          problems={problems}
          activeProblem={activeProblem}
          solved={solved}
          onSelect={setActiveProblem}
        />

        {/* CENTER */}
        <QuestionPanel problem={problems[activeProblem - 1]} />

        {/* RIGHT */}
        <IDEPanel
          code={code}
          setCode={setCode}
          testStarted={testStarted}
          testSubmitted={testSubmitted}
          onRunCode={runCode}
          onSubmitCode={submitCode}
          runResult={runResult}
          language={language}
          setLanguage={setLanguage}
          score={score}
        />
      </div>
    </div>
  );
}

export default Tests;
