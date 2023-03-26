import React from "react";
import './homepage.css';

let LogoImage = require('./logo.png');

function Homepage() {
    return (
  <div className="homePage">
    <h1>
      <img
        style={{ width: 100, height: 100 }}
        src={LogoImage}
        alt="Project Logo"
      />
    </h1>
    <p>{"\n"}Website under construction</p>
  </div>
);

}

export default Homepage;
