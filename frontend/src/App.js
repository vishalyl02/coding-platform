import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import TestsLanding from './pages/Tests/TestsLanding';
import Home from "./pages/Home";
import IDE from "./pages/IDE";
import Tests from "./pages/Tests/Tests";
import ThankYou from "./pages/Tests/ThankYou";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Questions from "./pages/Questions";
import "./App.css";
import Register from "./pages/Register";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import RoadmapPage from "./pages/Roadmap/roadmap";
import QuizApp from "./pages/Quiz/quiz";
function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/ide" element={<IDE />} />
        <Route path="/tests" element={<TestsLanding />} />
        <Route path="/tests/:testId" element={<Tests />} />
        <Route path="/tests/thank-you" element={<ThankYou />} />
        <Route path="/register" element={<Register />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/leaderboard" element={<Leaderboard />} />  {/* 🔥 ADD */}
        <Route path="/roadmap" element={<RoadmapPage/>} />  {/* 🔥 ADD */}
        <Route path="/quiz" element={<QuizApp/>} />  {/* 🔥 ADD */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
