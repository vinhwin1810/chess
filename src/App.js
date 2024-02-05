import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import { Home, Play } from "./pages";

const App = () => {
  return (
    <main className="bg-slate-300/2 h-[100vh]">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/play" element={<Play />} />
        </Routes>
      </Router>
    </main>
  );
};

export default App;
