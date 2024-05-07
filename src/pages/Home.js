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
import { throttle } from "lodash";

const Home = () => {
    const [isLoading, setLoading] = useState(true);
    // const [twoSeconds, setTwoSeconds] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const components = [
        <Brain />,
        <About />,
        <Events />,
        <NewsLetter />,
        <MeetUs />,
        <Faq />,
        <Sponsor />,
    ];

    // const handleScroll = throttle(
    //     (e) => {
    //         if (e.deltaY < 0 && currentIndex > 0) {
    //             setCurrentIndex(currentIndex - 1);
    //         } else if (e.deltaY > 0 && currentIndex < components.length - 1) {
    //             setCurrentIndex(currentIndex + 1);
    //         }
    //     },
    //     300,
    //     { trailing: false }
    // );

    // useEffect(() => {
    //     window.addEventListener("wheel", handleScroll);
    //     return () => window.removeEventListener("wheel", handleScroll);
    // }, [currentIndex, handleScroll]);

    window.onload = () => {
        setLoading(false);
    };
    // useEffect(() => {
    //     // Simulate loading process
    //     setTimeout(() => {
    //         setTwoSeconds(false);
    //     }, 2000);
    // }, []);

    const pageStyle = (index) => ({
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        transition:
            "opacity 0.5s ease-in-out 0.5s, transform 0.5s ease-in-out, visibility 0.5s ease-in-out 0.5s, filter 0.75s ease-in-out",
        visibility: index === currentIndex ? "visible" : "hidden",
        opacity: index === currentIndex ? 1 : 0,
        transform: index === currentIndex ? "scale(1)" : "scale(1.02)",
        filter: index === currentIndex ? "blur(0px)" : "blur(5px)",
    });

    return (
        <>
            <div>
                <NavBar
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                    total={components.length}
                />
                <LoadingScreen twoSeconds={false} isLoading={isLoading} />
                <Brain />
                <About />
                <Events />
                <NewsLetter />
                <MeetUs />
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
