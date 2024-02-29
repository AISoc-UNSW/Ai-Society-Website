import React from "react";
import "./Header.css";

function Header() {
  return (
    <div className="heroSection">
      <div className="heroInner">
        <img src={require("./aisoclogo.png")} className="logo" />
        <a href="#" className="heroNav">
          About Us
        </a>
        <a href="#" className="heroNav">
          Events
        </a>
        <a href="#" className="heroNav">
          Projects
        </a>
        <a href="#" className="heroNav">
          More
        </a>
      </div>
      <div className="middleSection">
        <p className="middleText">Hello World!!</p>
        <p className="middleText boldText">Welcome to the UNSW AI Society</p>
      </div>
    </div>
  );
}

export default Header;
