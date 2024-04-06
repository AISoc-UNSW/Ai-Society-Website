import AboutSection from "./components/AboutSection/AboutSection";
import Header from "./components/HeroSection/Header";
import NewsLetterSection from "./components/NewsLetterSection/NewsLetterSection";
import UpcomingSection from "./components/UpcomingSection/UpcomingSection";
import JoinUsSection from "./components/JoinUsSection/JoinUsSection";
import MeetUs from "./components/meet_us";
import Faq from "./components/Faq";
import Footer from "./components/Footer";

function App() {
    return (
        <div className="App">
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
