import Home from "./pages/Home";
import Join from "./pages/Join";
import Merch from "./pages/Merch";
import { HashRouter, Routes, Route } from "react-router-dom";
function App() {
    return (
        <div className="App">
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/join" element={<Join />} />
                    <Route path="/merch" element={<Merch />} />
                </Routes>
            </HashRouter>
        </div>
    );
}

export default App;
