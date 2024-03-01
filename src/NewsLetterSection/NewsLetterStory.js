import React from "react";
import "./NewsLetterSection.css";

function NewsLetterStory({ image, edition, authors }) {
  return (
    <div className="newsletter-display-box">
      <img src={require("./gptstore.png")} className="aboutImage-size" />
      <div>
        <div className="read-display">
          <div className="newsletter-AI-grey">
            <p>AI</p>
          </div>
          <p className="newsletter-ai-text"> 5 min read</p>
        </div>
        <p className="newsletter-title">{edition}</p>
        <p className="newsletter-author">{authors}</p>
        <p className="newsletter-read">Read more</p>
      </div>
    </div>
  );
}

export default NewsLetterStory;
