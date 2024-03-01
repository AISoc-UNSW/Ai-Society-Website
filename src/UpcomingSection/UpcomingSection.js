import React from "react";
import "./UpcomingSection.css";
import EventBox from "./EventBox";

function UpcomingSection() {
  return (
    <div className="upcoming-body">
      <div>
        <p>Discover</p>
        <p className="upcoming-capitalise">Upcoming</p>
        <p className="upcoming-blurb">
          Stay updated with the latest events, lectures, and meetings related to
          artificial intelligence.
        </p>
      </div>
      <div>
        <div className="upcoming-filter">
          <div>
            <p>See all</p>
          </div>
          <p className="upcoming-filter-button">Workshops</p>
          <p className="upcoming-filter-button">Events</p>
        </div>
      </div>

      <div clasName="upcoming-events">
        <EventBox />
        <EventBox />
        <EventBox />
      </div>
    </div>
  );
}

export default UpcomingSection;
