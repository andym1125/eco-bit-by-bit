import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Quiz.css";

function Quiz() {
    const [score, setScore] = useState(0);

    function handleAnswer(answer: string) {
        // Add score based on the answer selected
        if (answer === "a") {
            setScore(score + 1);
        } else if (answer === "b") {
            setScore(score + 2);
        } else if (answer === "c") {
            setScore(score + 3);
        } else if (answer === "d") {
            setScore(score + 4);
        }
    }

    let result;
    // Determine which brand to recommend based on the score
    if (score >= 0 && score <= 4) {
        result = "Brand: Seventh Generation";
    } else if (score >= 5 && score <= 8) {
        result = "Brand: Allbirds";
    } else if (score >= 9 && score <= 12) {
        result = "Brand: Patagonia";
    } else if (score >= 13 && score <= 16) {
        result = "Brand: Eileen Fisher";
    } else {
        result = "Brand: Boll & Branch";
    }

    return (
        <div className="Quiz-app">
            <header className="Quiz-header">
                <h1> Eco Quiz </h1>
            </header>
            <div className="Intro-text">
                <p>
                    {" "}
                    Answer the questions below to determine which brand suits your
                    shopping needs!!{" "}
                </p>
            </div>
            <form>
        <label>
          1. What type of products do you use the most in your daily life?
          <br />
          <label>
          <input
            type="radio"
            name="question1"
            value="a"
            onChange={() => handleAnswer("a")}
          />{" "}
          Clothing and accessories
          </label>
          <br />
          <label>
          <input
            type="radio"
            name="question1"
            value="b"
            onChange={() => handleAnswer("b")}
          />{" "}
          Shoes and footwear
          </label>
          <br />
          <label>
          <input
            type="radio"
            name="question1"
            value="c"
            onChange={() => handleAnswer("c")}
          />{" "}
          Household cleaning and personal care products
          </label>
          <br />
          <label>
          <input
            type="radio"
            name="question1"
            value="d"
            onChange={() => handleAnswer("d")}
          />{" "}
          Bedding and bath products
        </label>
        </label>
        <br />
        <br />
        <label>
          2. How important is sustainability to you when it comes to purchasing
          products?
          <br />
          <label>
            <input
            type="radio"
            name="question2"
            value="a"
            onChange={() => handleAnswer("a")}
          />{" "}
          Very important
          </label>
          <br />
          <label>
            <input
            type="radio"
            name="question2"
            value="b"
            onChange={() => handleAnswer("b")}
          />{" "}
          Somewhat important
          <br />
          <label>
            <input
            type="radio"
            name="question2"
            value="c"
            onChange={() => handleAnswer("c")}
          />{" "}
          Not very important
          <br />
          <label>
            <input
            type="radio"
            name="question2"
            value="d"
            onChange={() => handleAnswer("d")}
          />{" "}
          Not at all important
          </label>
          </label>
        <br />
        <br />
        <label>
          3. How often do you purchase new products?
          <br />
          <label>
            <input
            type="radio"
            name="question3"
            value="a"
            onChange={() => handleAnswer("a")}
          />{" "}
          Frequently, I like to keep up with the latest trends
          </label>
          <br />
          <label>
            <input
            type="radio"
            name="question3"
            value="b"
            onChange={() => handleAnswer("b")}
          />{" "}
          Occasionally, when I need something specific
          </label>
          <br />
          <label>
            <input
            type="radio"
            name="question3"
            value="c"
            onChange={() => handleAnswer("c")}
          />{" "}
          Rarely, I try to make things last as long as possible
          </label>
          <br />
          <label>
            <input
            type="radio"
            name="question3"
            value="d"
            onChange={() => handleAnswer("d")}
          />{" "}
          Never, I prefer to use what I already have
          </label>
          </label>
        <br />
        <br />
        <label>
          4. What type of materials do you prefer for your products?
          <br />
          <input
            type="radio"
            name="question4"
            value="a"
            onChange={() => handleAnswer("a")}
          />{" "}
          Recycled materials
          </label>
          <br />
          <label>
            <input
            type="radio"
            name="question4"
            value="b"
            onChange={() => handleAnswer("b")}
          />{" "}
          Organic materials
          </label>
          <br />
          <label>
            <input
            type="radio"
            name="question4"
            value="c"
            onChange={() => handleAnswer("c")}
          />{" "}
          Plant-based materials
          </label>
          <br />
          <label>
            <input
            type="radio"
            name="question4"
            value="d"
            onChange={() => handleAnswer("d")}
          />{" "}
          All of the above
          </label>
          </label>
        <br />
        <br />
        <label>
          5. How much are you willing to spend on eco-friendly products?
          </label>
          <br />
          <label>
            <input
            type="radio"
            name="question5"
            value="a"
            onChange={() => handleAnswer("a")}
          />{" "}
          I'm willing to spend more to support sustainable brands
          </label>
          <br />
          <label>
            <input
            type="radio"
            name="question5"
            value="b"
            onChange={() => handleAnswer("b")}
          />{" "}
          I don't mind spending a little extra, but not too much
          </label>
          <br />
          <label>
            <input
            type="radio"
            name="question5"
            value="c"
            onChange={() => handleAnswer("c")}
          />{" "}
          I prefer to stick to more affordable options
          </label>
          <br />
          <label>
            <input
            type="radio"
            name="question5"
            value="d"
            onChange={() => handleAnswer("d")}
          />{" "}
          Price isn't a factor for me
          </label>
        </label>
      </form>
            <h3> Your recommended brand is {result} </h3>
            <Link to="/"> Back to home page </Link>
        </div>
    );
}

export default Quiz;
