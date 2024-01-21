import React from "react";
import { useInView } from "react-intersection-observer";

const YoutubeShort = ({ index, videoId }) => {
  const [inViewRef, inView] = useInView({
    //    triggerOnce: false,
    rootMargin:'100px'
   
  });
  const [inViewRef2, inView2] = useInView({
    threshold: 1,
  });

  const setRefs = (node) => {
    inViewRef2(node);
    inViewRef(node);
   };

//   console.log(index, "::", inView);
//   console.log(index,index, "::", inView2);

  return (
    <div>
        <iframe
   
          ref={setRefs}
          className="h-[85vh] min-h-[35.5rem] aspect-[9/16] rounded-xl border-2 border-white"
          src={inView?`https://www.youtube.com/embed/${videoId}?${inView2?'autoplay=1&mute=0':'autoplay=0&mute=1'}`:null}
          title="We Bought The Cheapest iPhone 15 Pro In the World!"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
    </div>
  );
};

export default YoutubeShort;
