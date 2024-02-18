import { useEffect } from "react";
import { useParams } from "react-router-dom";

import ChannelButtonDetail from "../components/ChannelButtonDetail";
import Description from "../components/Description";
import VideoList from "../components/VideoList";
import CommentsSection from "../components/CommentsSection";

import { useAtom } from "jotai";

import { userChannel_data, user_data, video_item, videos_data } from "../context/atom";
import { collection, doc, onSnapshot, query } from "firebase/firestore";
import { db } from "../context/firebase";
import { UserAuth } from "../components/AuthContext";


const VideoDetail = () => {
  const { user } = UserAuth();

  let { videoId } = useParams();
  const [videoItem, setVideoItem] = useAtom(video_item);
  const [videos ] = useAtom(videos_data)
  const [userData, setUserData] = useAtom(user_data);
  const [userChannelData, setUserChannelData] = useAtom(userChannel_data);


  useEffect(() => {
    if (Object.keys(videoItem).length==0 && videos.length>0) {

      const currentVideo = videos.find((video) => video.id === videoId);
      setVideoItem(currentVideo);
    }
  }, [videoId, videoItem, videos]);


  useEffect(() => {
    if (user &&   user?.email && videoItem && videoItem?.channel_email && videoItem?.id) {
      const userChannelDocRef = doc(db, "user", user.email, "channel",videoItem?.channel_email,"otherData", videoItem?.id);
      const userSubDocRef = doc(db, "user", user.email, "channel",videoItem?.channel_email);
      // console.log("userChannelDocRef", "user", user.email, "channel",videoItem?.channel_email,"otherData", videoItem?.id);
  
      const unsubscribe = onSnapshot(userChannelDocRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const userData = { ...docSnapshot.data(), id: docSnapshot.id };
          setUserChannelData(prevUserChannelData => ({ ...prevUserChannelData, ...userData }));
          console.log("userChannelData", userData);
        } else {
          console.log("No such document!");
        }
      }, (error) => {
        console.error("Error fetching document: ", error);
      });
  
      const unsubscribe2 = onSnapshot(userSubDocRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const userData = { ...docSnapshot.data(), id: docSnapshot.id };
          setUserChannelData(prevUserChannelData => ({ ...prevUserChannelData, ...userData }));
          console.log("userChannelData", userData);
        } else {
          console.log("No such document!");
        }
      }, (error) => {
        console.error("Error fetching document: ", error);
      });
  
      // Clean up the listener when the component unmounts
      return () => {
        unsubscribe();
        unsubscribe2();
      };
    }
  }, [user, videoItem]);
  return (
    <div className="mx-auto max-w-[85rem]  bg-black px-6 py-5 font-roboto text-white">
      <div className="flex flex-col items-center space-x-0 md:flex-row md:items-start md:space-x-6">
        {/* Left Video Player Section */}
        {/* Video & Channel Details */}
        <div className="flex flex-col md:w-[75%]">
          {videoItem && Object.keys(videoItem).length!=0 && (<iframe
            className="aspect-video w-full rounded-md md:rounded-xl "
            src={`https://www.youtube.com/embed/${videoItem.VideoID}`}
            title="YouTube video player"
            style={{ border: "none" }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          )}

          {/* Video Title */}
          <p className="pb-3 pt-3 text-lg font-bold md:pb-0 md:pt-5 md:text-xl">
            {videoItem?.title}
          </p>

          {/* Channel & Buttons Section */}

          <ChannelButtonDetail
            videoItem={videoItem}
            setVideoItem={setVideoItem}
          />

          {/* Description Section */}
          <Description />

          {/* Comment Section */}
          <div className="hidden md:block mt-3">
            <CommentsSection />
          </div>
        </div>

        {/* Right Video List Section */}
        <div className="flex flex-col">
          <VideoList setVideoItem={setVideoItem} />
          <div className="block md:hidden mt-4">
            <CommentsSection  />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;
