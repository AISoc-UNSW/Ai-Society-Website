import AboutSection from "./components/AboutSection/AboutSection";
import Header from "./components/HeroSection/Header";
import NewsLetterSection from "./components/NewsLetterSection/NewsLetterSection";
import UpcomingSection from "./components/UpcomingSection/UpcomingSection";
import JoinUsSection from "./components/JoinUsSection/JoinUsSection";
import MeetUs from "./components/meet_us";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";

function App() {
    return (
        <div className="App">
            <NavBar />

            <Header />

            <AboutSection />
            <NewsLetterSection />
            <UpcomingSection />
            <JoinUsSection />

            <Faq />
            <MeetUs />
            <Footer />
        </div>
    );
}

export default App;
