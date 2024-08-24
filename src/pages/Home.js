import MeetUs from "../components/meet_us";
import Faq from "../components/Faq";
import NavBar from "../components/NavBar";
import Sponsor from "../components/Sponsor";
import Events from "../components/Events";
import About from "../components/About";
import NewsLetter from "../components/Newsletter";
import LoadingScreen from "../components/LoadingScreen";
import Footer from "../components/Footer";
import Brain from "../components/Brain";
import Chatbot from "../components/ChatBot";
import { useState, useEffect } from "react";
import ParticlePattern from "../components/ParticlePattern";
import Stars from "../components/Stars";

const Home = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <div>
        <NavBar />
        <LoadingScreen twoSeconds={false} isLoading={isLoading} />
        <ParticlePattern />
        <Stars />
        <Brain />
        <About />
        <Events />
        <NewsLetter />
        <Chatbot />
        <MeetUs />
        <Faq />
        <Sponsor />
        <Footer />
      </div>
    </>
  );
};

export default Home;
