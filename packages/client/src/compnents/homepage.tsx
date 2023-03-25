import React from "react";
import './homepage.css';

let Logo = require('./logo.png');

function Homepage() {
    return (
        <div className="homePage">
            <h1
                style={{
                    backgroundColor: "#6096B4",
                    width: "100%",
                    height: "100px",
                }}
            >
                <img
                    style={{ width: 100, height: 100 }}
                    src={Logo}
                    alt="React Logo"
                />
            </h1>
            <p
                style={{
                    backgroundColor: "#EEE9DA",
                    paddingTop: "300px",
                    fontSize: 50,
                    width: "100%",
                    height: "100vh",
                }}
            >
                {"\n"}
                Website under construction
            </p>
        </div>
    );
}

export default Homepage;
