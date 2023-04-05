import React from "react";
import { Link } from "react-router-dom";

function Quiz() {
  return (
    <div className="Compare-app">
      <header className="Compare-header">
        <p> Compare Page </p>
        <Link to="/"> go back </Link>
      </header>
    </div>
  );
}

export default Quiz;
