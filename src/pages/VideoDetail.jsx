import React from "react";

const VideoDetail = ({ videoData }) => {
  return (
    <div class="mx-auto max-w-5xl px-6 pt-5">
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
    </div>
  );
};

export default VideoDetail;
