import React, { useEffect, useRef } from "react";
import YoutubeShort from "../components/YoutubeShort";
import { useState } from "react";

const VideoComponent = () => {
  const [videoIds, setVideoIds] = useState([]);

  const array = ["5vFhplWQJis", "WhD28kAD7oE", "tUqGNaEv_AA","a8iB4OLlaDE", "NVw3Bkz-d94", "7vZjkstOMOA","s5EH388jycQ", "_AVAOpKhYRU", "ictvN65Z-Vg","J300Hmu8IEA", "Ac86hBkNoVs","Mfb9ZcVCTTU", "k_7meFS5Uqo", "T4ogApc-7nk","aKN9FwTjPZ0", "ngqCimZU04U", "WiLBgh6b2Yo","SajGB8scmwg", "oUG3hwoF0kQ", 
  "N3W7wvJiWyE", "-pvU_G2T2Is", "njdJeu95p6s","aWFLhxZ07AQ", "_82BDL3b53w", "OM3tyI7tuaA","C83gbCgODtI", "B9b52Fnchv0", "dBfgWmkHZqE"]; 

  function shuffleArray(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  useEffect(() => {
    setVideoIds(shuffleArray(array));
    console.log("videoIds", videoIds);
  }, []);

  return (
    <div>
      <div className="flex snap-y flex-col items-center space-y-6 scroll-smooth">
        {videoIds.map((videoId, index) => (
          <div className="snap-start " key={index}>
            <YoutubeShort videoId={videoId} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoComponent;
