import React from "react";
import tick from "../assets/tick.svg";
import like from "../assets/like.svg";
import dislike from "../assets/dislike.svg";
import share from "../assets/share.svg";
import download from "../assets/download.svg";
import more from "../assets/more.svg";
import ChannelButtonDetail from "../components/ChannelButtonDetail";
import Comments from "../components/Comments";

const VideoDetail = ({ videoData }) => {
  return (
    <div class="mx-auto max-w-4xl px-6 pt-5 font-roboto text-white">
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
      <p className="pt-3 pb-3 md:pb-0 text-lg font-bold md:pt-5 md:text-xl">
        {videoData?.title}
      </p>

      {/* Channel & Buttons Section */}
      
     <ChannelButtonDetail videoData={videoData} />

     {/* Comment Section */}
     <Comments  videoData={videoData} />
    </div>
  );
};

export default VideoDetail;
