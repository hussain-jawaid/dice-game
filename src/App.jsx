import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import PlayGame from "./components/PlayGame";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play-game" element={<PlayGame />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
