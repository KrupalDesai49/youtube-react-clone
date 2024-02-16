import "./App.css";
import { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VideoDetail from "./pages/VideoDetail";
import Shorts from "./pages/Shorts";
import NotFound from "./pages/NotFound";

import { collection, doc, onSnapshot, query } from "firebase/firestore";
import { useAtom } from "jotai";

import {
  short_data,
  user_data,
  videos_data,
} from "./context/atom";
import { AuthContextProvider } from "./components/AuthContext";
import { db } from "./context/firebase";
import Channel from "./pages/Channel/Channel";

function App() {
  const [, setVideosData] = useAtom(videos_data);
  const [userData, setUserData] = useAtom(user_data);
  const [shortData, setShortData] = useAtom(short_data);

  //Fetch  Data
  useEffect(() => {

    const videoDocRef = query(collection(db, "video"));
    const shortDocRef = query(collection(db, "short"));
    const userDocRef = query(collection(db, "user"));

    const getVideoData = onSnapshot(videoDocRef, ({ docs }) => {
      try {
        const DataArr = docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setVideosData(DataArr);
        console.log("Video List", DataArr);
      } catch (error) {
        console.error("Error fetching Video data from Firebase:", error);
      }
    });

    const getChannelData = onSnapshot(shortDocRef, ({ docs }) => {
      try {
        const shortData = docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setShortData(shortData);
        console.log("shortData", shortData);
      } catch (error) {
        console.error("Error fetching Short data from Firebase:", error);
      }
    });

    const getUserData = onSnapshot(userDocRef, ({ docs }) => {
      try {
        const userData = docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setUserData(userData);
        console.log("userData", userData);
      } catch (error) {
        console.error("Error fetching User data from Firebase:", error);
      }
    });

    return () => {
      getVideoData();
      getChannelData();
      getUserData();
    };

  }, []);

  return (
    <>
      <AuthContextProvider>
        <Router>
          <div className=" flex min-h-screen flex-col text-white bg-black">
            <Navbar />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/video/:videoId" element={<VideoDetail />} />
              <Route exact path="/channel/:channelId" element={<Channel />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route path="*" element={<NotFound />} />

              <Route exact path="/short" element={<Shorts />} />
            </Routes>
          </div>
        </Router>
      </AuthContextProvider>
    </>
  );
}

export default App;
