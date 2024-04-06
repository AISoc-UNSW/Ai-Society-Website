import React from "react";
import "./UpcomingSection.css";

function EventBox() {
  return (
    <div className="upcoming-event-container">
      <div className="event-date">
        <p>Fri</p>
        <p>05</p>
        <p>Feb</p>
        <p>2024</p>
      </div>
      <div className="vertical-line"></div>

      <div>
        <p>UNSW O-Week</p>
        <p>UNSW</p>
        <p>Meet us at 0 week</p>
      </div>
      <button className="button-4">Facebook</button>
    </div>
  );
}

export default EventBox;
