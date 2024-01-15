import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import VideoDetail from "./pages/VideoDetail";
import { useState } from "react";

function App() {
  const [videoData, setVideoData] = useState([])
  const [allData, setAllData] = useState([])

  const sendVideoData=(item)=>{
    setVideoData(item)

  }
 

  const sendAllData=(item)=>{
    setAllData(item)

  }
  return (
    <div className="min-h-screen bg-black">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home sendVideoData={sendVideoData} sendAllData={sendAllData} allData={allData}/>} />
          <Route exact path="/video" element={<VideoDetail sendVideoData={sendVideoData} allData={allData} videoData={videoData}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
