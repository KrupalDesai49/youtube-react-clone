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

import { collection, onSnapshot, query } from "firebase/firestore";
import { useAtom } from "jotai";

import { videos_data } from "./context/atom";
import { AuthContextProvider } from "./components/AuthContext";
import { db } from "./context/firebase";

function App() {
  const [ , setVideos] = useAtom(videos_data);

  //Fetch Data
  useEffect(() => {
    const q = query(collection(db, "ytvideo"));
    const getData = onSnapshot(q, ({ docs }) => {
      try {
        const DataArr = docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setVideos(DataArr);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
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
              <Route exact path="/" element={<Home />} />
              <Route exact path="/video/:videoId" element={<VideoDetail />} />
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
