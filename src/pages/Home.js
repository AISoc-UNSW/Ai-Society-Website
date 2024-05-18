import MeetUs from "../components/meet_us";
import Faq from "../components/Faq";
import NavBar from "../components/NavBar";
import Sponsor from "../components/Sponsor";
import Events from "../components/Events";
import About from "../components/About";
import NewsLetter from "../components/Newsletter";
import LoadingScreen from "../components/LoadingScreen";
import Brain from "../components/Brain";
import { useState, useEffect } from "react";
import ChatBot from "../components/ChatBot";

const Home = () => {
    const [isLoading, setLoading] = useState(true);

    window.onload = () => {
        setLoading(false);
    };

    return (
        <>
            <div>
                <NavBar />
                <LoadingScreen twoSeconds={false} isLoading={isLoading} />
                <Brain />
                <About />
                <Events />
                <NewsLetter />
                <MeetUs />
                <ChatBot />
                <Faq />
                <Sponsor />
            </div>
        </>
    );
};
{
    /* {components.map((Component, index) => (
                <div key={index} style={pageStyle(index)}>
                    {Component}
                </div>
            ))} */
}
export default Home;
