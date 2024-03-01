import AboutSection from "./AboutSection/AboutSection";
import Header from "./HeroSection/Header";
import FrequentlyAskedQuestion from "./FrequentlyAskedQuestion/FrequentlyAskedQuestion";
import NewsLetterSection from "./NewsLetterSection/NewsLetterSection";
import UpcomingSection from "./UpcomingSection/UpcomingSection";
import JoinUsSection from "./JoinUsSection/JoinUsSection";

function App() {
  return (
    <div className="App">
      <Header />
      <AboutSection />
      <NewsLetterSection />
      <UpcomingSection />
      <JoinUsSection />
      <FrequentlyAskedQuestion />
    </div>
  );
}

export default App;
