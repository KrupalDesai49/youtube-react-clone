import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import dislike from "../assets/dislike.svg";
import dislike_fill from "../assets/dislike_fill.svg";
import download from "../assets/download.svg";
import like from "../assets/like.svg";
import like_fill from "../assets/like_fill.svg";
import more from "../assets/more.svg";
import share from "../assets/share.svg";
import tick from "../assets/tick.svg";
import { db } from "../context/firebase";

const ChannelButtonDetail = ({videoItem, setVideoItem}) => {

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);



  const funLiked = () => {
    if (!liked ) {
      addLike(videoItem)
      setVideoItem({...videoItem,like:parseInt(videoItem.like)+1})
      setLiked(true);
      setDisliked(false);

    }else if(liked){
      subLike(videoItem)
      setVideoItem({...videoItem,like:parseInt(videoItem.like)-1})
      setLiked(false);
      setDisliked(false);
    }
  };

  const funDisliked = () => {
    if (!disliked && liked) {
      subLike(videoItem)
      setVideoItem({...videoItem,like:parseInt(videoItem.like)-1})
      setLiked(false);
      setDisliked(true);
    }else if (!disliked && !liked) {
      setLiked(false);
      setDisliked(true);
    }else if(disliked){
      setLiked(false);
      setDisliked(false);
    }
  };

  const addLike = async (item) => {
    await updateDoc(doc(db, "ytvideo", item.id), {
            like:     (parseInt(item.like) + 1)
  
    });
  };
  const subLike = async (item) => {
    await updateDoc(doc(db, "ytvideo", item.id), {
            like: (parseInt(item.like) - 1)  
    });
  };

  return (
    <>
      <div className="flex flex-col xl:flex-row xl:justify-between ">
        {/* Channel Details */}
        <div className="flex items-center">
          {/* Channel Logo */}
          <img
            src={videoItem?.channel_logo}
            alt=""
            className="h-10 w-10 rounded-full"
          />

          {/* Channel Name & Subs*/}
          <div className="ml-3 flex flex-col">
            <div className="flex">
              <p className=" font-[500] text-white">
                {videoItem?.channel_name}
              </p>
              {videoItem?.channel_tick ? (
                <img src={tick} alt="" className="ml-1  w-3 fill-neutral-400" /> 
               
              )  :""  }
            </div>
            <p className=" text-xs font-[450] text-neutral-400">
              {videoItem?.channel_sub} subscribers
            </p>
          </div>
          <button className="' ml-4 rounded-full bg-white px-4 py-2 text-sm font-semibold text-neutral-600 hover:bg-white/85">
            Subscribe
          </button>
        </div>

        {/* Like button & other */}
        <div className="flex space-x-2 py-4">
          {/* Like & Dislike */}
          <div className="flex ">
            {/* Like */}
            <div
              onClick={funLiked}
              className="flex cursor-pointer items-center rounded-l-full bg-[#272727] py-1 pl-3 hover:bg-[#3f3f3f]"
            >
              <img src={liked?like_fill:like} alt="" className="w-5" />
              <p className="border-r border-r-zinc-600 pl-1 pr-3 font-[500]">
                {videoItem.like}
              </p>
            </div>
            {/* Dislike */}
            <div
              onClick={funDisliked}
              className="flex cursor-pointer items-center rounded-r-full bg-[#272727] py-1 pl-1.5  pr-3 hover:bg-[#3f3f3f]"
            >
              <img src={disliked?dislike_fill:dislike} alt="" className=" w-5" />
            </div>
          </div>

          {/* Share */}
          <div className="flex cursor-pointer items-center rounded-full bg-[#272727] py-1 pl-3 pr-4 hover:bg-[#3f3f3f]">
            <img src={share} alt="" className="w-7" />
            <p className="pl-1 font-[500] ">Share</p>
          </div>

          {/* Download */}
          <div className="flex cursor-pointer items-center rounded-full bg-[#272727] py-1 pl-3 pr-4 hover:bg-[#3f3f3f]">
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
