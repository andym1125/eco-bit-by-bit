import React from "react";
import { Link } from "react-router-dom";

function Quiz() {
  return (
    <div className="History-app">
      <header className="History-header">
        <p> Quiz Page </p>
        <Link to="/"> go back </Link>
      </header>
    </div>
  );
}

export default Quiz;