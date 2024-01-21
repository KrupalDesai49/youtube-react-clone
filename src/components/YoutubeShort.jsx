import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useInView } from "react-intersection-observer";

const YoutubeShort = ({ index, videoId }) => {
  const ref = useRef();
  const [inViewRef, inView] = useInView({
    //    triggerOnce: false,
    // threshold: 0.5,
    rootMargin:'100px'
  });

  //   useEffect(() => {
  //     if (inView) {

  //     }
  //   }, [inView, videoId, onEnded]);

  console.log(index, "::", inView);

  return (
    <div>
      <div className="" key={index}>
        <iframe
          // width="319"
          // height="567"
          ref={inViewRef}
          className={true&&"h-[35.5rem] rounded-xl border-2 border-white"}
          // src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0`}
          src={inView?`https://www.youtube.com/embed/${videoId}?`:null}
          title="We Bought The Cheapest iPhone 15 Pro In the World!"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
};

export default YoutubeShort;
