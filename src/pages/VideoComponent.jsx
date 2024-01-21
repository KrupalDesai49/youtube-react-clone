import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import YoutubeShort from "../components/YoutubeShort";

const VideoComponent = () => {
  // const videoIds = ["5vFhplWQJis", "WhD28kAD7oE", "tUqGNaEv_AA","5vFhplWQJis", "WhD28kAD7oE", "tUqGNaEv_AA","5vFhplWQJis", "WhD28kAD7oE", "tUqGNaEv_AA","5vFhplWQJis", "WhD28kAD7oE", "tUqGNaEv_AA","5vFhplWQJis", "WhD28kAD7oE", "tUqGNaEv_AA","5vFhplWQJis", "WhD28kAD7oE", "tUqGNaEv_AA"]; // Replace with your actual video IDs
  const videoIds = ["5vFhplWQJis", "WhD28kAD7oE", "tUqGNaEv_AA","5vFhplWQJis", "WhD28kAD7oE", "tUqGNaEv_AA"]; // Replace with your actual video IDs
  // const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // const handleVideoEnded = () => {
  //   if (currentVideoIndex < videoIds.length - 1) {
  //     setCurrentVideoIndex(currentVideoIndex + 1);
  //   }
  // };


  return (
    <div>
      <div className="flex flex-col items-center space-y-6">
        {videoIds.map((videoId, index) => (
          <div className="" key={index}>
          <YoutubeShort
            videoId={videoId}
            // onEnded={handleVideoEnded}
            // isActive={index === currentVideoIndex}
            index={index}
          />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoComponent;
