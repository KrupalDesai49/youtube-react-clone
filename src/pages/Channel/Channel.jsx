import React from "react";
import { useParams } from "react-router-dom";
import tick from "../../assets/tick.svg";
import { useState } from "react";
import { UserAuth } from "../../components/AuthContext";
import { useAtom } from "jotai";
import { user_data } from "../../context/atom";
import { useEffect } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../context/firebase";

const Channel = () => {
  let { channelId } = useParams();
  const [isSub, setIsSub] = useState(false);
  const [channelData, setChannelData] = useState({});
  const [totalVideo, setTotalVideo] = useState(0);
  const [userData, setUserData] = useAtom(user_data);

  const { user } = UserAuth();

  useEffect(() => {
    if (userData.length !== 0) {
      setChannelData(userData?.find((e) => e?.channelID == channelId));
    }
  }, [channelId, userData]);

  useEffect(() => {
    const getTotalNoOfVideo = async () => {
      try {
        const videosRef = collection(db, "video");

        const q = query(
          videosRef,
          where("channel_email", "==", channelData?.id),
        );
        const querySnapshot = await getDocs(q);
        setTotalVideo(querySnapshot.size);
      } catch (error) {
        console.log(error);
      }
    };

    getTotalNoOfVideo();
  }, [channelData]);

  useEffect(() => {
    if( channelData?.id && user?.email){
    const channelDocRef = doc(
      db,
      "user",
      user?.email,
      "channel",
      channelData?.id,
    );

    const isChannelSubscribed = onSnapshot(channelDocRef, (doc) => {
      try {
        const Data = doc.data();
        console.log("Data List", Data);
        setIsSub(Data.isSubscriber);
      } catch (error) {
        console.error("Error fetching data from Firebase:", error);
      }
    });

    return () => {
      isChannelSubscribed();
    };
    }
  }, [channelData]);

  const handleSub = async () => {
    if (user) {
      try {
        const channelDocRef = doc(
          db,
          "user",
          user?.email,
          "channel",
          channelData?.id,
        );
        const videoDocRef = doc(db, "user", channelData?.id);
        if (isSub) {
          setIsSub(false);
          const subData = {
            isSubscriber: false,
          };
          const VideoData = {
            subscribers: parseInt(channelData?.subscribers) - 1,
          };
          const docSnapshot = await getDoc(channelDocRef);
          if (!docSnapshot.exists()) {
            await setDoc(channelDocRef, subData);
          } else {
            await updateDoc(channelDocRef, subData);
          }
          await updateDoc(videoDocRef, VideoData);
        } else {
          setIsSub(true);
          const subData = {
            isSubscriber: true,
          };
          const VideoData = {
            subscribers: parseInt(channelData?.subscribers) + 1,
          };
          const docSnapshot = await getDoc(channelDocRef);
          if (!docSnapshot.exists()) {
            await setDoc(channelDocRef, subData);
          } else {
            await updateDoc(channelDocRef, subData);
          }
          await updateDoc(videoDocRef, VideoData);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <>
      {/* Main Container */}
      <div className="flex flex-col">
        {/* Container for Banner & Channel Details */}
        <div className="mx-3  md:mx-10 lg:mx-24">
          {/* Channel Banner */}
          {channelData?.banner_link !== "" && (
            <img
              src="https://yt3.googleusercontent.com/IHsFb5t8eC5-Lr742a2_4fpmr6QPSRatY2oEHlDHJiaKjkXOBQ1AA_O-3iKTo50fPPrH_RgdzQ=w2120-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj"
              className="aspect-[4/1] rounded-lg object-cover md:aspect-auto md:rounded-xl"
              alt=""
            />
          )}

          {/* Container Of Channel Detail */}
          <div className="mt-3 flex md:mt-8">
            {/* Channel Logo */}
            <div className=" shrink-0">
              {channelData?.logo_link !== "" ? (
                <img
                  src={channelData?.logo_link}
                  alt=""
                  className="size-24 rounded-full  object-cover md:size-40"
                />
              ) : channelData?.photoURL !== "" ? (
                <img
                  src={channelData?.photoURL}
                  alt=""
                  className="size-24 rounded-full object-cover md:size-40"
                />
              ) : (
                <button className="size-24 rounded-full bg-[#ff0000] text-5xl font-[500] text-white hover:bg-[#ff0000]/90 md:size-40 md:text-7xl">
                  {channelData?.id?.charAt(0).toUpperCase()}
                </button>
              )}
            </div>

            {/* Channel Name & Details */}
            <div className="ml-4 flex shrink flex-col md:ml-7 ">
              {/* Name & Tick */}
              <div className="flex w-fit items-center  justify-center ">
                <p className="line-clamp-1 text-2xl font-bold md:text-4xl">
                  {channelData?.displayName}
                </p>

                {channelData?.tick && (
                  <img
                    src={tick}
                    alt=""
                    className="ml-1 size-3 md:ml-2 md:size-4"
                  />
                )}
              </div>

              {/* Channel ID */}
              <p className="mt-0.5 text-sm text-[#aaaaaa] md:mt-1.5 md:text-base">
                {channelId}{" "}
              </p>

              {/* Container of no. of subs & Video */}
              <div className="mt-0.5 flex md:mt-1">
                <p className="line-clamp-1 text-sm text-[#aaaaaa] md:text-base">
                  {channelData?.subscribers} subscribers ‧ {totalVideo} videos
                </p>
              </div>

              {/* SUBSCRIBE Button */}
              <button
                className={` mt-2 w-fit rounded-full px-4  py-2 text-sm font-semibold transition duration-500 md:mt-4  ${isSub ? "bg-[#272727] text-white hover:bg-[#3f3f3f]" : "bg-white text-black hover:bg-white/85"}`}
                onClick={handleSub}
              >
                <div className={`flex  `}>
                  <svg
                    className={`w-5  ${isSub ? "block pl-1" : " hidden"}`}
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="#fff"
                      d="M9.985 0c1.089 0 1.971.898 1.971 2.006l-.009.163c.868.352 1.707.936 2.451 1.71c.862.893 1.366 2.077 1.521 3.596v5.478l1.191 2.098c.4.666.528 1.224.216 1.707c-.286.441-.797.595-1.49.583h-2.67C12.854 18.86 11.532 20 9.95 20c-1.584 0-2.905-1.14-3.216-2.658H3.778l-.056-.003c-.627-.054-1.094-.357-1.199-.94c-.071-.397.023-.823.268-1.331l1.225-2.18l.003-5.473c.107-1.21.56-2.337 1.348-3.371c.667-.875 1.62-1.519 2.654-1.89a1.752 1.752 0 0 1-.006-.148C8.015.898 8.897 0 9.985 0m1.818 17.342H8.097c.275.77 1 1.32 1.853 1.32c.852 0 1.578-.55 1.853-1.32M10.082 3.124c-1.354 0-2.843.645-3.677 1.74c-.638.836-.994 1.722-1.075 2.61v5.59c0 .117-.03.232-.087.333l-1.291 2.296a1.71 1.71 0 0 0-.12.311h12.014c.121.002.213-.003.276-.005a2.615 2.615 0 0 0-.141-.265l-1.287-2.267a.678.678 0 0 1-.088-.335l.003-5.586c-.121-1.162-.506-2.064-1.149-2.732c-1.04-1.08-2.262-1.69-3.378-1.69m-.097-1.787a.66.66 0 0 0-.635.497c.246-.031.49-.047.732-.047c.177 0 .356.01.535.032a.66.66 0 0 0-.632-.482"
                    />
                  </svg>
                  <p className={`   ${isSub ? "pl-2" : " "}`}>
                    {isSub ? "Subscribed" : "Subscribe"}{" "}
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Channel Navbar Container */}
        <div className="w-full border">55</div>
      </div>
    </>
  );
};

export default Channel;
