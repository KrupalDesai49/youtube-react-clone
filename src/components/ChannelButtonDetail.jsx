import { useState } from "react";

import dislike from "../assets/dislike.svg";
import dislike_fill from "../assets/dislike_fill.svg";
import download from "../assets/download.svg";
import like from "../assets/like.svg";
import like_fill from "../assets/like_fill.svg";
import more from "../assets/more.svg";
import share from "../assets/share.svg";
import tick from "../assets/tick.svg";

import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

import { db } from "../context/firebase";
import { useAtom } from "jotai";
import { userChannel_data, user_data } from "../context/atom";
import { Link } from "react-router-dom";
import { UserAuth } from "./AuthContext";
import { useEffect } from "react";

const ChannelButtonDetail = ({ videoItem, setVideoItem }) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [isSub, setIsSub] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [isDislike, setIsDislike] = useState(false);

  const { user } = UserAuth();
  const [userData, setUserData] = useAtom(user_data);
  const [userChannelData, setUserChannelData] = useAtom(userChannel_data);

  useEffect(() => {
    if ( userChannelData ) {
      setIsSub(userChannelData?.isSubscriber ?? false);
      setIsLike(userChannelData?.like ?? false);
      setIsDislike(userChannelData?.dislike ?? false);
    }
  }, [userChannelData]);

  const handleSub = async () => {
    if (user && videoItem) {
      try {
 

        const channelDocRef = doc(
          db,
          "user",
          user?.email,
          "channel",videoItem?.channel_email
        );
        const videoDocRef = doc(db, "user", videoItem?.channel_email);
        if (isSub) {
          setIsSub(false);

          const subData = {
            isSubscriber: false,
          };
          const VideoData = {
            subscribers: parseInt(userChannelData?.subscribers) - 1,
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
            subscribers: parseInt(userChannelData?.subscribers) + 1,
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
        console.log("eeeeeeeeeeeee");
      }
    }
  };

  const handleLike = async () => {
    if (user) {
      try {
 

        const channelDocRef = doc(
          db,
          "user",
          user?.email,
          "channel",videoItem?.channel_email,"otherData",
          videoItem?.id,
        );
        const videoDocRef = doc(db, "video", videoItem?.id);

        if (isLike) {
          setIsLike(false);

          setVideoItem({
            ...videoItem,
            likes_count: parseInt(videoItem?.likes_count) - 1,
            like: false,
          });

          const subData = {
            like: false,
          };
          const VideoData = {
            likes_count: parseInt(videoItem?.likes_count) - 1,
            like: false,
          };
          const docSnapshot = await getDoc(channelDocRef);
          if (!docSnapshot.exists()) {
            await setDoc(channelDocRef, subData);
          } else {
            await updateDoc(channelDocRef, subData);
          }
          await updateDoc(videoDocRef, VideoData);
        } else {
          setIsLike(true);
          setIsDislike(false);

          setVideoItem({
            ...videoItem,
            likes_count: parseInt(videoItem?.likes_count) + 1,
            like: true,
            dislike: false,
          });

          const subData = {
            like: true,
            dislike: false,
          };
          const VideoData = {
            likes_count: parseInt(videoItem?.likes_count) + 1,
            like: true,
            dislike: false,
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
  
  const handleDislike = async () => {
    if (user) {
      try {


        const channelDocRef = doc(
          db,
          "user",
          user?.email,
          "channel",videoItem?.channel_email,"otherData",
          videoItem?.id,
        );
        const videoDocRef = doc(db, "video", videoItem?.id);

        if (isDislike) {
          setIsDislike(false);

          setVideoItem({
            ...videoItem,
            dislike: false,
          });

          const subData = {
            dislike: false,
          };
          const VideoData = {
            dislike: false,
          };
          const docSnapshot = await getDoc(channelDocRef);
          if (!docSnapshot.exists()) {
            await setDoc(channelDocRef, subData);
          } else {
            await updateDoc(channelDocRef, subData);
          }
          await updateDoc(videoDocRef, VideoData);
        } else {
          setIsDislike(true);
          setIsLike(false);

          if (isLike) {
            setVideoItem({
              ...videoItem,
              likes_count: parseInt(videoItem?.likes_count) - 1,
              like: false,
              dislike: true,
            });

            const subData = {
              like: false,
              dislike: true,
            };
            const VideoData = {
              likes_count: parseInt(videoItem?.likes_count) - 1,
              like: false,
              dislike: true,
            };
            const docSnapshot = await getDoc(channelDocRef);
            if (!docSnapshot.exists()) {
              await setDoc(channelDocRef, subData);
            } else {
              await updateDoc(channelDocRef, subData);
            }
            await updateDoc(videoDocRef, VideoData);
          } else {
            setVideoItem({
              ...videoItem,
              dislike: true,
            });

            const subData = {
              dislike: true,
            };
            const VideoData = {
              dislike: true,
            };
            const docSnapshot = await getDoc(channelDocRef);
            if (!docSnapshot.exists()) {
              await setDoc(channelDocRef, subData);
            } else {
              await updateDoc(channelDocRef, subData);
            }
            await updateDoc(videoDocRef, VideoData);
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col xl:flex-row xl:justify-between ">
        {/* Channel Details */}
        <div className="flex items-center">
          {/* Channel Logo */}

          <Link
            className=" shrink-0"
            to={
              `/channel/` +
              userData.filter(
                (email) => email.id == videoItem?.channel_email,
              )[0]?.channelID
            }
          >
            {userData.filter((email) => email.id == videoItem?.channel_email)[0]
              ?.logo_link !== "" ? (
              <img
                src={
                  userData.filter(
                    (email) => email.id == videoItem?.channel_email,
                  )[0]?.logo_link
                }
                alt=""
                className="top-0 h-10 w-10 rounded-full object-cover"
              />
            ) : userData.filter(
                (email) => email.id == videoItem?.channel_email,
              )[0]?.photoURL !== "" ? (
              <img
                src={
                  userData.filter(
                    (email) => email.id == videoItem?.channel_email,
                  )[0]?.photoURL
                }
                alt=""
                className="top-0 h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <button className="mr-3 h-10 w-10 rounded-full bg-[#ff0000] text-xl font-[500] text-white hover:bg-[#ff0000]/90">
                {
                  userData.filter(
                    (email) => email.id == videoItem?.channel_email,
                  )[0]?.displayName.charAt(0).toUpperCase()
                }
              </button>
            )}
          </Link>
          {/* Channel Name & Subs*/}
          <div className="ml-3 flex flex-col">
            <div className="flex">
              <Link
                className=" shrink-0"
                to={
                  `/channel/` +
                  userData.filter(
                    (email) => email.id == videoItem?.channel_email,
                  )[0]?.channelID
                }
              >
                <p className=" font-[500] text-white">
                  {
                    userData.filter(
                      (email) => email.id == videoItem?.channel_email,
                    )[0]?.displayName
                  }
                </p>
              </Link>
              {userData.filter(
                (email) => email.id == videoItem?.channel_email,
              )[0]?.tick && (
                // {videoItem?.channel_tick ? (
                <img src={tick} alt="" className="ml-1  w-3 fill-neutral-400" />
              )}
            </div>
            <p className=" text-xs font-[450] text-neutral-400">
              {
                userChannelData?.subscribers ??"00"
                // userData.filter(
                //   (email) => email.id == videoItem?.channel_email,
                // )[0]?.subscribers
              }{" "}
              subscribers
            </p>
          </div>
          <button
            className={` ml-4 rounded-full  px-4 py-2 text-sm font-semibold transition duration-500  ${isSub ? "bg-[#272727] text-white hover:bg-[#3f3f3f]" : "bg-white text-neutral-600 hover:bg-white/85"}`}
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

        {/* Like button & other */}
        <div className="flex space-x-2 py-4">
          {/* Like & Dislike */}
          <div className="flex shrink-0 ">
            {/* Like */}
            <div
              onClick={handleLike}
              className="flex shrink-0 cursor-pointer items-center rounded-l-full bg-[#272727] py-1 pl-3 hover:bg-[#3f3f3f]"
            >
              <img src={isLike ? like_fill : like} alt="" className="w-5" />
              <p className="border-r border-r-zinc-600 pl-1 pr-3 font-[500]">
                {videoItem?.likes_count}
              </p>
            </div>
            {/* Dislike */}
            <div
              onClick={handleDislike}
              className="flex cursor-pointer items-center rounded-r-full bg-[#272727] py-1 pl-1.5  pr-3 hover:bg-[#3f3f3f]"
            >
              <img
                src={isDislike ? dislike_fill : dislike}
                alt=""
                className=" w-5"
              />
            </div>
          </div>

          {/* Share */}
          <a
            href={`https://www.youtube.com/watch?v=${videoItem?.VideoID}`}
            target="_blank"
            rel="noreferrer"
          >
            <div className="flex cursor-pointer items-center rounded-full bg-[#272727] py-1 pl-3 pr-4 hover:bg-[#3f3f3f]">
              <img src={share} alt="" className="w-7" />
              <p className="pl-1 font-[500] ">Share</p>
            </div>
          </a>
          {/* Download */}

          <div
            className="flex cursor-pointer items-center rounded-full bg-[#272727] py-1 pl-3 pr-4 hover:bg-[#3f3f3f]"
            // onClick={handleDownload}
          >
            <img src={download} alt="" className="w-6" />
            <p className="pl-1 font-[500] ">Download</p>
          </div>

          {/* More */}
          <div className="flex cursor-pointer items-center rounded-full bg-[#272727] px-2 py-1 hover:bg-[#3f3f3f]">
            <img src={more} alt="" className="w-5" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChannelButtonDetail;
