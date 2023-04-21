import { useNavigate } from "react-router-dom";
import "./Homepage.css";
import Textbox from "./textbox/Textbox";
import {DeletedValuesProvider} from "./textbox/DeletedValuesContext";
import People from './footer/People';

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

  const handleDelete = (value: string) => {
    // something
  };

  async function logJSONData() {
    const response = await fetch('Calvin-Klein-Pocket-Button-Down-Sleeve/dp/B0BXMM181W');
    const jsonData = await response.json();
    console.log(jsonData);
  }

  return (
      <div className="homepage">
        <header>
          <img
              style={{ width: 100, height: 100 }}
              src={LogoImage}
              alt="Project Logo"
          />
        </header>
        <h1>
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
        </h1>
        <p>
          <Textbox onDelete={handleDelete} />
        </p>
        <People />
      </div>
  );
}

export default Homepage;