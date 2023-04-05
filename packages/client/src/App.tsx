import "./App.css";
import Homepage from "./components/Homepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Quiz from "./components/quiz/Quiz";
import History from "./components/history/History";
import Compare from "./components/compare/Compare";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/history" element={<History />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/" element={<Homepage />} />
      </Routes>
    </Router>
  );
}
