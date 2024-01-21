import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useInView } from "react-intersection-observer";

const YoutubeShort = ({ index, videoId }) => {
//   const ref = useRef();
  const [inViewRef, inView] = useInView({
    //    triggerOnce: false,
    // threshold: 0.5,
    rootMargin:'100px'
   
  });
  const [inViewRef2, inView2] = useInView({
    //    triggerOnce: false,
    threshold: 1,
    // rootMargin:'100px'
  });

  const setRefs = (node) => {
    inViewRef2(node);
    inViewRef(node);
   };

  console.log(index, "::", inView);
  console.log(index,index, "::", inView2);

  return (
    <div>
      <div className="" >
        <iframe
          // width="319"
          // height="567"
        //   ref={inViewRef}
          ref={setRefs}
          className="h-[35.5rem] rounded-xl border-2 border-white"
          // src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0`}
          src={inView?`https://www.youtube.com/embed/${videoId}?${inView2?'autoplay=1&mute=0':'autoplay=0&mute=1'}`:null}
          title="We Bought The Cheapest iPhone 15 Pro In the World!"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default YoutubeShort;
