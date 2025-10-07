import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Join from "./pages/Join";
import Merch from "./pages/Merch";
import Shop from "./pages/Shop";
function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/join" element={<Join />} />
          <Route path="/merch" element={<Merch />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
