import React from "react";
import { useState } from "react";

const Description = ({ videoData }) => {
  const [desClicked, setDesClicked] = useState(false);

  const desFunc = () => setDesClicked(e=>!e)

  return (
    <>
      <div onClick={desFunc} className={`${desClicked?'':'hover:bg-[#3f3f3f] cursor-pointer'} rounded-xl bg-[#272727] px-3 py-2 `}>
        {/* Views & Date */}
        <div className="flex">
          <p className="text-sm font-[500]">
            {desClicked ? videoData?.detail_view : videoData?.view}
          </p>
          <p className="text-sm font-[500] pl-1">
            views
          </p>
          <p className="pl-2.5 text-sm font-[500]">
            {desClicked
              ? videoData?.detail_upload_time
              : videoData?.upload_time}
          </p>
        </div>

        {/* Desacription */}
        <p
          className={`${
            desClicked ? "line-clamp-none" : "line-clamp-2"
          } pt-1 text-sm`}
        >
          {videoData?.description}
        </p>

        {/* More  */}
        <p className={`${desClicked?"text-base":"text-sm"} font-[500] cursor-pointer`}>
          {!desClicked ? "...more" : "Show less"}
        </p>
      </div>
    </>
  );
};

export default Description;
