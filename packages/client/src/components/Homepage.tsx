import { useNavigate } from "react-router-dom";
import "./Homepage.css";
import Textbox from "./textbox/Textbox";
import Footer from "./footer/Footer";

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


  // list of all the people
  const people = [
    { name: "Melis Tasatmaz", github: "https://github.com/Angel0002" },
    {
      name: 'Michael "Andy" McDowall', github: "https://github.com/andym1125",
    },
    { name: "Aryan Patel", github: "https://github.com/Aryan-Patel5475" },
    { name: "Jason Wolfe", github: "https://github.com/Ogwolfe" },
  ];

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
        <Footer people={people} />
      </div>
  );
}

export default Homepage;
