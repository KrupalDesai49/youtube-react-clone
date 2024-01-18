import React from "react";

import { useAtom } from "jotai";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ChannelButtonDetail from "../components/ChannelButtonDetail";
import CommentsSection from "../components/CommentsSection";
import Description from "../components/Description";
import VideoList from "../components/VideoList";
import { video_item, videos_data } from "../context/atom";

const VideoDetail = () => {
  // let { videoId } = useParams();
  const [videoItem, setVideoItem] = useAtom(video_item);
  // const [videos , setVideos] = useAtom(videos_data)

  // useEffect(() => {
  //   if (!videoItem) {
  //     console.log("111", videoItem);

  //     const currentVideo = videos.find((video) => video.id === videoId);
  //     setVideoItem(currentVideo);
  //   }
  // }, [videoId, videoItem]);

  return (
    <div className="mx-auto max-w-[85rem] px-6 py-5 font-roboto text-white">
      <div className="flex flex-col items-center space-x-0 md:flex-row md:items-start md:space-x-6">
        {/* Left Video Player Section */}
        {/* Video & Channel Details */}
        <div className="flex flex-col md:w-[70%]">
          <iframe
            className="aspect-video w-full rounded-md md:rounded-xl"
            src={videoItem.link}
            title="YouTube video player"
            style={{ border: "none" }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>

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
          <Description videoItem={videoItem} />

          {/* Comment Section */}
          <div className="hidden md:block mt-3">
            <CommentsSection />
          </div>
        </div>

        {/* Right Video List Section */}
        <div className="flex flex-col">
          <VideoList setVideoItem={setVideoItem} />
          <div className="block md:hidden">
            <CommentsSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;
