import AboutSection from "../components/AboutSection/AboutSection";
import Header from "../components/HeroSection/Header";
import NewsLetterSection from "../components/NewsLetterSection/NewsLetterSection";
import UpcomingSection from "../components/UpcomingSection/UpcomingSection";
import JoinUsSection from "../components/JoinUsSection/JoinUsSection";
import MeetUs from "../components/meet_us";
import Faq from "../components/Faq";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Sponsor from "../components/Sponsor";
import Events from "../components/Events";
import About from "../components/About";
import NewsLetter from "../components/Newsletter";
import Landing from "../components/Landing";

function Home() {
    return (
        <div style={{ width: "100vw", margin: 0, padding: 0 }}>
            <NavBar />
            <Landing />
            {/* <Header /> */}
            <About />
            {/* <AboutSection /> */}
            {/* <NewsLetterSection /> */}
            <Events />
            <NewsLetter />

            {/* <JoinUsSection /> */}
            <Faq />
            <MeetUs />
            <Sponsor />
            <Footer />
        </div>
    );
}

export default Home;
