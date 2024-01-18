import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { AuthContextProvider } from "./components/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VideoDetail from "./pages/VideoDetail";

function App() {
  const [videoItem, setVideoItem] = useState([])


  const sendVideoData = (item) => {
    setVideoItem(item);
  };


  return (
    <>
      <AuthContextProvider>
        <Router>
          <div className=" flex min-h-screen flex-col bg-black">
            <Navbar />
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <Home
                  setVideoItem={setVideoItem}
                  />
                }
              />
              <Route
                exact
                path="/video/:videoId"
                element={
                  <VideoDetail
                  setVideoItem={setVideoItem}
                  videoItem={videoItem}
                  />
                }
              />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </Router>
      </AuthContextProvider>
    </>
  );
}

export default App;
