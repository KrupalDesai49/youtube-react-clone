import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import VideoDetail from "./pages/VideoDetail";

function App() {
  return (
    <div className="min-h-screen bg-black">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/video" element={<VideoDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
