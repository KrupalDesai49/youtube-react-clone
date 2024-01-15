import React from "react";

import ChannelButtonDetail from "../components/ChannelButtonDetail";
import Description from "../components/Description";
import VideoList from "../components/VideoList";

const VideoDetail = ({ videoData, allData, sendVideoData }) => {

 
  return (
    <div class="mx-auto max-w-[85rem] px-6 py-5 font-roboto text-white">
      <div className="flex flex-col space-x-0 md:flex-row items-center md:items-start md:space-x-6">
        {/* Left Video Player Section */}
        {/* Video & Channel Details */}
        <div className="flex flex-col md:w-[70%]">
          <iframe
            className="aspect-video w-full rounded-md md:rounded-xl"
            src={videoData.link}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>

          {/* Video Title */}
          <p className="pb-3 pt-3 text-lg font-bold md:pb-0 md:pt-5 md:text-xl">
            {videoData?.title}
          </p>

          {/* Channel & Buttons Section */}

          <ChannelButtonDetail sendVideoData={sendVideoData} videoData={videoData} />

          {/* Comment Section */}
          <Description videoData={videoData} />
        </div>

        {/* Right Video List Section */}
        <VideoList sendVideoData={sendVideoData} allData={allData} />
      </div>
    </div>
  );
};

export default VideoDetail;
