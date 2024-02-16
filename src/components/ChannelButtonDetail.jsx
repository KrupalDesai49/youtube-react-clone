import { useState } from "react";

import dislike from "../assets/dislike.svg";
import dislike_fill from "../assets/dislike_fill.svg";
import download from "../assets/download.svg";
import like from "../assets/like.svg";
import like_fill from "../assets/like_fill.svg";
import more from "../assets/more.svg";
import share from "../assets/share.svg";
import tick from "../assets/tick.svg";

import { doc, updateDoc } from "firebase/firestore";

import { db } from "../context/firebase";
import { useAtom } from "jotai";
import { user_data } from "../context/atom";
import { Link } from "react-router-dom";



const ChannelButtonDetail = ({ videoItem, setVideoItem }) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [userData, setUserData] = useAtom(user_data);




  const funLiked = () => {
    if (!liked) {
      addLike(videoItem);
      setVideoItem({ ...videoItem, like: parseInt(videoItem.like) + 1 });
      setLiked(true);
      setDisliked(false);
    } else if (liked) {
      subLike(videoItem);
      setVideoItem({ ...videoItem, like: parseInt(videoItem.like) - 1 });
      setLiked(false);
      setDisliked(false);
    }
  };

  const funDisliked = () => {
    if (!disliked && liked) {
      subLike(videoItem);
      setVideoItem({ ...videoItem, like: parseInt(videoItem.like) - 1 });
      setLiked(false);
      setDisliked(true);
    } else if (!disliked && !liked) {
      setLiked(false);
      setDisliked(true);
    } else if (disliked) {
      setLiked(false);
      setDisliked(false);
    }
  };

  const addLike = async (item) => {
    await updateDoc(doc(db, "ytvideo", item.id), {
      like: parseInt(item.like) + 1,
    });
  };
  const subLike = async (item) => {
    await updateDoc(doc(db, "ytvideo", item.id), {
      like: parseInt(item.like) - 1,
    });
  };

  return (
    <>
      <div className="flex flex-col xl:flex-row xl:justify-between ">
        {/* Channel Details */}
        <div className="flex items-center">
          {/* Channel Logo */}

<Link className=" shrink-0" to={`/channel/`+userData.filter(email => email.id ==videoItem?.channel_email)[0]?.channelID}>
{userData.filter(email => email.id ==videoItem?.channel_email)[0]?.logo_link !== "" 
              ?             
              <img
              src={ (userData.filter(email => email.id ==videoItem?.channel_email)[0]?.logo_link)}
              alt=""
              className="top-0 h-10 w-10 rounded-full"/>
              :
              (userData.filter(email => email.id ==videoItem?.channel_email)[0]?.photoURL !==""
              ?
              <img
              src={ (userData.filter(email => email.id ==videoItem?.channel_email)[0]?.photoURL)}
              alt=""
              className="top-0 h-10 w-10 rounded-full"/>
              
              : 
              <button className="mr-3 h-10 w-10 rounded-full bg-[#ff0000] text-xl font-[500] text-white hover:bg-[#ff0000]/90">
              {userData.filter(email => email.id ==videoItem?.channel_email)[0]?.displayName}
            </button>
              )}
</Link>
          {/* Channel Name & Subs*/}
          <div className="ml-3 flex flex-col">
            <div className="flex">
<Link className=" shrink-0" to={`/channel/`+userData.filter(email => email.id ==videoItem?.channel_email)[0]?.channelID}>
              <p className=" font-[500] text-white">
                {userData.filter(email => email.id ==videoItem?.channel_email)[0]?.displayName}

              </p>
              </Link>
              {userData.filter(email => email.id ==videoItem?.channel_email)[0]?.tick && (

              // {videoItem?.channel_tick ? (
                <img src={tick} alt="" className="ml-1  w-3 fill-neutral-400" />
              ) }
            </div>
            <p className=" text-xs font-[450] text-neutral-400">
              {userData.filter(email => email.id ==videoItem?.channel_email)[0]?.subscribers} subscribers
            </p>
          </div>
          <button className="' ml-4 rounded-full bg-white px-4 py-2 text-sm font-semibold text-neutral-600 hover:bg-white/85">
            Subscribe
          </button>
        </div>

        {/* Like button & other */}
        <div className="flex space-x-2 py-4">
          {/* Like & Dislike */}
          <div className="flex shrink-0 ">
            {/* Like */}
            <div
              onClick={funLiked}
              className="flex cursor-pointer items-center rounded-l-full bg-[#272727] py-1 pl-3 hover:bg-[#3f3f3f] shrink-0"
            >
              <img src={liked ? like_fill : like} alt="" className="w-5" />
              <p className="border-r border-r-zinc-600 pl-1 pr-3 font-[500]">
                {videoItem?.likes_count}
              </p>
            </div>
            {/* Dislike */}
            <div
              onClick={funDisliked}
              className="flex cursor-pointer items-center rounded-r-full bg-[#272727] py-1 pl-1.5  pr-3 hover:bg-[#3f3f3f]"
            >
              <img
                src={disliked ? dislike_fill : dislike}
                alt=""
                className=" w-5"
              />
            </div>
          </div>

          {/* Share */}
          <a href={`https://www.youtube.com/watch?v=${videoItem?.VideoID}`} target="_blank" rel="noreferrer">
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
