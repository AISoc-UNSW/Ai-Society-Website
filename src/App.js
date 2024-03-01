import AboutSection from "./AboutSection/AboutSection";
import Header from "./HeroSection/Header";
import FrequentlyAskedQuestion from "./FrequentlyAskedQuestion/FrequentlyAskedQuestion";
import NewsLetterSection from "./NewsLetterSection/NewsLetterSection";
import UpcomingSection from "./UpcomingSection/UpcomingSection";

function App() {
  return (
    <div className="App">
      <Header />
      <AboutSection />
      <NewsLetterSection />
      <UpcomingSection />
      <FrequentlyAskedQuestion />
    </div>
  );
}

export default App;
