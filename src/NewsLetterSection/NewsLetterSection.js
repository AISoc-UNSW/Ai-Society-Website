import React from "react";

import "./NewsLetterSection.css";

function NewsLetterSection() {
  return (
    <div className="newletter-body">
      <p className="newsletter-body-mini">Watch Tower</p>
      <p className="newsletter-body-header">The Watchtower Newsletter</p>
      <p className="newsletter-body-blurb">
        Explore our recent and upcoming AI workshops
      </p>

      <div className="newsletter-stories-container">
        <div className="newsletter-display-box">
          <img src={require("./gptstore.png")} className="aboutImage-size" />
          <p>The WatchTower: 11th Edition</p>
          <p>By Shetal, Andrew Suryanto</p>
        </div>
        <div className="newsletter-display-box">
          {" "}
          <img src={require("./gptstore.png")} className="aboutImage-size" />
        </div>
        <div className="newsletter-display-box">
          {" "}
          <img src={require("./gptstore.png")} className="aboutImage-size" />
        </div>
      </div>
      <button className="newsletter-button">View All</button>
    </div>
  );
}

export default NewsLetterSection;
