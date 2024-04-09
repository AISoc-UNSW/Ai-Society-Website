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
        <div>
            <NavBar />
            <Landing />
            <About />
            <Events />
            <NewsLetter />
            <MeetUs />
            <Faq />

            <Sponsor />
            <Footer />
        </div>
    );
}

export default Home;
