import React from "react";
import tick from "../assets/tick.svg";

const VideoDetail = ({ videoData }) => {
  return (
    <div class="mx-auto max-w-5xl px-6 pt-5 font-roboto text-white">
      {/* Video & Channel Details */}
      <div className="flex flex-col">
        <iframe
          className="aspect-video w-full"
          src={videoData.link}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>

      {/* Video Title */}
      <p className="py-3 text-lg font-bold md:py-5 md:text-xl">
        {videoData?.title}
      </p>

      {/* Channel & Buttons */}
      <div className="flex flex-col lg:flex-row ">
        {/* Channel Details */}
        <div className="flex items-center">
          {/* Channel Logo */}
          <img
            src={videoData?.channel_logo}
            alt=""
            className="h-10 w-10 rounded-full"
          />

          {/* Channel Name & Subs*/}
          <div className="ml-3 flex flex-col">
            <div className="flex">
              <p className=" font-[500] text-white">
                {videoData?.channel_name}
              </p>
              {videoData?.channel_tick && (
                <img src={tick} alt="" className="ml-1  w-3 fill-neutral-400" />
              )}
            </div>
            <p className=" text-xs font-[450] text-neutral-400">
              {videoData?.channel_sub} subscribers
            </p>

          </div>       
               <button className="text-sm text-neutral-600 bg-white py-2 px-4 rounded-full ml-4 font-semibold hover:bg-white/85 '">Subscribe</button>

        </div>
      </div>
    </div>
  );
};

export default VideoDetail;
