import { useNavigate } from "react-router-dom";
import "./homepage.css";

// importing logo
let LogoImage = require("./logo.png");

// home page function
function Homepage() {
  const navigate = useNavigate();

  const goToQuiz = () => {
    navigate("/quiz");
  };

  const goToHistory = () => {
    navigate("/history");
  };

  const goToCompare = () => {
    navigate("/compare");
  };

  return (
    <div className="homepage">
      <h1>
        <img
          style={{ width: 100, height: 100 }}
          src={LogoImage}
          alt="Project Logo"
        />
      </h1>
      <p>
        <div className="button-container">
          <button onClick={goToQuiz} className="quiz-button">
            Quiz
          </button>
          <button className="filter-button">Filter</button>
          <button onClick={goToCompare} className="compare-button">
            Compare
          </button>
          <button onClick={goToHistory} className="history-button">
            History
          </button>
        </div>
        Website under construction
      </p>
    </div>
  );
}

export default Homepage;
