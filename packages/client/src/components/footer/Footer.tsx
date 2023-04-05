import React from "react";
import "./Footer.css";

interface Person {
  name: string;
  github: string;
}

interface FooterProps {
  people: Person[];
}

const Footer: React.FC<FooterProps> = ({ people }) => {
  return (
    <footer className="footer-down">
      <p>Made from ❤️ by:</p>
      {people.map((person, index) => (
        <div key={person.name} style={{ display: "inline-block" }}>
          <a
            href={person.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginRight: "10px" }}
          >
            {person.name}
          </a>
        </div>
      ))}
    </footer>
  );
};

export default Footer;
