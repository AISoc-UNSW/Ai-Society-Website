import MeetUs from "../components/meet_us";
import Faq from "../components/Faq";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Sponsor from "../components/Sponsor";
import Events from "../components/Events";
import About from "../components/About";
import NewsLetter from "../components/Newsletter";
import LoadingScreen from "../components/LoadingScreen";
import Brain from "../components/Brain";
import ParticlePattern from "../components/ParticlePattern";
import { useState, useEffect } from "react";
import Stars from "../components/Stars";
function Home() {
    const [isLoading, setLoading] = useState(true);
    const [twoSeconds, setTwoSeconds] = useState(true);

    window.onload = () => {
        setLoading(false);
    };

    useEffect(() => {
        // Simulate loading process
        setTimeout(() => {
            setTwoSeconds(false);
        }, 2000);
    }, []);

    return (
        <div>
            <NavBar />
            <Brain />
            <About />
            <Events />
            <NewsLetter />
            <MeetUs />
            <Faq />

            <Sponsor />
            <Footer />
            {/* {(twoSeconds || isLoading) && <LoadingScreen />} */}
            <LoadingScreen twoSeconds={false} isLoading={isLoading} />
        </div>
    );
}

export default Home;
