import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import VideoDetail from "./pages/VideoDetail";
import { useState } from "react";
import { AuthContextProvider } from "./components/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

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
    <>
            <AuthContextProvider>

      <Router> 
           <div className=" flex flex-col min-h-screen bg-black">

        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home sendVideoData={sendVideoData} sendAllData={sendAllData} allData={allData}/>} />
          <Route exact path="/video" element={<VideoDetail sendVideoData={sendVideoData} allData={allData} videoData={videoData}/>} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
        </Routes></div>
      </Router>    

      </AuthContextProvider>
      </>
  );
}

export default App;
