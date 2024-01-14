import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import VideoDetail from "./pages/VideoDetail";
import { useState } from "react";

function App() {
  const [videoData, setVideoData] = useState([])

  const sendData=(item)=>{
    setVideoData(item)

  }
  return (
    <div className="min-h-screen bg-black">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home sendData={sendData} />} />
          <Route exact path="/video" element={<VideoDetail videoData={videoData}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
