import Home from "./pages/Home";
import Join from "./pages/Join";
import { HashRouter, Routes, Route } from "react-router-dom";
function App() {
    return (
        <div className="App">
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/join" element={<Join />} />
                </Routes>
            </HashRouter>
        </div>
    );
}

export default App;
