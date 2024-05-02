import Home from "./pages/Home";
import Join from "./pages/Join";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/join" element={<Join />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
