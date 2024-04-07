import React from "react";

import "./AboutSection.css";

function AboutSection() {
    return (
        <div className="box-container" id="about">
            <div className="text-blurb">
                <p className="text-blurb-bold box-container-text">
                    Empowering Minds, Advancing AI: Exploring the Frontiers of
                    Artificial Intelligence
                </p>
                <p className="box-container-text text-blurb-non">
                    Welcome to our university society dedicated to the study and
                    application of artificial intelligence. Through engaging
                    events, workshops, and projects, we aim to foster a
                    community of AI enthusiasts and drive innovation in this
                    rapidly evolving field.
                </p>
            </div>
            <div className="aboutimage">
                <img src={require("./build.png")} className="aboutimage-size" />
            </div>
        </div>
    );
}

export default AboutSection;
