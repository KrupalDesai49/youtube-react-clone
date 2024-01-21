import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { AuthContextProvider } from "./components/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VideoDetail from "./pages/VideoDetail";
import VideoComponent from "./pages/VideoComponent";
import NotFound from "./pages/NotFound";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "./context/firebase";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { video_item, videos_data } from "./context/atom";

function App() {
  // const [videoItem, setVideoItem] = useState([])


  const [videos , setVideos] = useAtom(videos_data)
  const [videoItem , setVideoItem] = useAtom(video_item)

  //Read Data
  useEffect(() => {
    const q = query(collection(db, "ytvideo"));
    const getData = onSnapshot(q, (querySnapshot) => {
      let DataArr = [];
      querySnapshot.forEach((doc) => {
        DataArr.push({ ...doc.data(), id: doc.id });
      });
      setVideos(DataArr);
      // console.log('oooopoo:',DataArr)

    });

    return () => getData();
  }, []);




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
                  // setVideoItem={setVideoItem}
                  />
                }
              />
              <Route
                exact
                path="/video/:videoId"
                element={
                  <VideoDetail
                  // setVideoItem={setVideoItem}
                  // videoItem={videoItem}
                  />
                }
              />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
             <Route path="*" element={<NotFound />} /> 
             
               <Route exact path="/vv" element={
               <VideoComponent />
              
               } />
             
            </Routes>
          </div>
        </Router>
      </AuthContextProvider>
    </>
  );
}

export default App;
