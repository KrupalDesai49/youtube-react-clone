import { useAtom } from "jotai";
import moment from "moment";
import React, { useState } from "react";
import { video_item } from "../context/atom";

const Description = () => {
  const [desClicked, setDesClicked] = useState(false);
  const [videoItem, setVideoItem] = useAtom(video_item);

  const desFunc = () => setDesClicked((e) => !e);


  return (
    <>
      <div
        onClick={desFunc}
        className={`${
          desClicked ? "" : "cursor-pointer hover:bg-[#3f3f3f]"
        } rounded-xl bg-[#272727] px-3 py-2 `}
      >
        {/* Views & Date */}
        <div className="flex">
          <p className="text-sm font-[500]">
            {/* {videoItem?.view.toLocaleString('en-US') ??"00"} */}
            {/* {videoItem && videoItem?.view ? videoItem?.view.toLocaleString('en-US') : 'ppp'} */}
            {/* {videoItem && videoItem?.view ? videoItem?.view : '00'} */}
            {videoItem?.view ?? "0"}

          </p>
          
          <p className="pl-1 text-sm font-[500]">views</p>
          <p className="pl-2.5 text-sm font-[500]">
            {!desClicked
              ? moment(videoItem?.timestamp).fromNow()
              : new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              }).format(new Date(videoItem?.timestamp))}
          </p>
        </div>

        {/* Description */}
        <pre
          className={`${
            desClicked ? "line-clamp-none" : "line-clamp-2"
          } pt-1 text-sm  whitespace-pre-wrap font-roboto`}
        >
          {videoItem?.description}
        </pre>

        {/* More  */}
        <p
          className={`${
            desClicked ? "text-base" : "text-sm"
          } cursor-pointer font-[500]`}
        >
          {!desClicked ? "...more" : "Show less"}
        </p>
      </div>
    </>
  );
};

export default Description;
