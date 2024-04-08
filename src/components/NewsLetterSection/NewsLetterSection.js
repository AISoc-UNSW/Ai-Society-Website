import React from "react";

import "./NewsLetterSection.css";
import NewsLetterStory from "./NewsLetterStory";

function NewsLetterSection() {
    return (
        <div className="newletter-body">
            <p className="newsletter-body-mini">Watch Tower</p>
            <p className="newsletter-body-header">The Watchtower Newsletter</p>
            <p className="newsletter-body-blurb">
                Explore our recent and upcoming AI workshops
            </p>

            <div className="newsletter-stories-container">
                <NewsLetterStory
                    image={"./rollercoaster.png"}
                    edition={" The WatchTower: 11th Edition"}
                    authors={"By Shetal, Andrew Suryanto"}
                />
                <NewsLetterStory
                    image={"./rollercoaster.png"}
                    edition={" The WatchTower: 11th Edition"}
                    authors={"By Shetal, Andrew Suryanto"}
                />
                <NewsLetterStory
                    image={"./rollercoaster.png"}
                    edition={" The WatchTower: 11th Edition"}
                    authors={"By Shetal, Andrew Suryanto"}
                />
            </div>
            <button class="button-4" role="button">
                View all
            </button>
        </div>
    );
}

export default NewsLetterSection;
