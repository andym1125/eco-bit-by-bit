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
  let brand;
  let brandInfo;
  let result;
  // Determine which brand to recommend based on the score
  if (score >= 0 && score <= 4) {
    result = "Seventh Generation";
    brand = 1;
  } else if (score >= 5 && score <= 8) {
    result = "Allbirds";
    brand = 2;
  } else if (score >= 9 && score <= 12) {
    result = "Patagonia";
    brand = 3;
  } else if (score >= 13 && score <= 16) {
    result = "Eileen Fisher";
    brand = 4;
  } else {
    result = "Boll & Branch";
    brand = 5;
  }

  if (brand === 1) {
    brandInfo =
      "Seventh Generation is a brand that places a strong emphasis on eco-friendliness. Their products are made from plant-based materials and are free of harmful chemicals, making them a great choice for those who want to reduce their impact on the environment. Additionally, the company has a strong commitment to sustainability, using renewable energy sources and minimizing waste in their production process.";
  } else if (brand === 2) {
    brandInfo =
      "Allbirds is a brand that specializes in footwear made from natural and sustainable materials. They use materials such as merino wool, eucalyptus fiber, and sugar cane to create comfortable and stylish shoes that have a lower environmental impact than traditional footwear. Allbirds is also committed to reducing their carbon footprint and has set a goal to become carbon neutral by 2025.";
  } else if (brand === 3) {
    brandInfo =
      "Patagonia is a brand that is well-known for its commitment to environmental sustainability. They use recycled materials in many of their products and have made efforts to reduce their carbon footprint through the use of renewable energy sources and sustainable manufacturing practices. The company also supports environmental activism and advocates for the protection of public lands.";
  } else if (brand === 4) {
    brandInfo =
      "Eileen Fisher is a fashion brand that focuses on sustainability and ethical production practices. They use organic and sustainable materials such as Tencel, organic cotton, and recycled polyester in their clothing, and have implemented programs to reduce waste and increase recycling in their production process. The company also supports fair labor practices and works to ensure that their workers are treated fairly and ethically.";
  } else if (brand === 5) {
    brandInfo =
      "Boll & Branch is a brand that specializes in luxury bedding made from organic cotton. They use sustainable and eco-friendly practices in their production process, including the use of renewable energy and water-efficient manufacturing methods. The company also supports fair labor practices and works to ensure that their workers are paid fair wages and provided with safe and healthy working conditions.";
  }
  // Assign link to correct result based on user input
  
  const resultLink: {[key: string]: string} = {
    "Seventh Generation": "https://www.seventhgeneration.com/",
    "Allbirds": "https://www.allbirds.com/",
    "Patagonia": "https://www.patagonia.com/",
    "Eileen Fisher": "https://www.eileenfisher.com/",
    "Boll & Branch": "https://www.bollandbranch.com/",
  };

  const link = resultLink[result];

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
      <h3 className="Center"> Based on your answers the Brand thats right for you is: </h3>
      <h2 className="Answer-text">
        <a href={link}>
          {result}
        </a> 
      </h2>
      <form /> <p className="Intro-text">About the brand :
      <br />
      {brandInfo}
       <br />
      </p>
      <form />
      <Link to="/"> Back to home page </Link>
    </div>
  );
}

export default Quiz;
