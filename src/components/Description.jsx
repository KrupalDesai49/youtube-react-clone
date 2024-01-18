import React, { useState } from "react";

const Description = ({ videoItem }) => {
  const [desClicked, setDesClicked] = useState(false);

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
            {desClicked ? videoItem?.detail_view : videoItem?.view}
          </p>
          <p className="pl-1 text-sm font-[500]">views</p>
          <p className="pl-2.5 text-sm font-[500]">
            {desClicked
              ? videoItem?.detail_upload_time
              : videoItem?.upload_time}
          </p>
        </div>

        {/* Desacription */}
        <p
          className={`${
            desClicked ? "line-clamp-none" : "line-clamp-2"
          } pt-1 text-sm`}
        >
          {videoItem?.description}
        </p>

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
