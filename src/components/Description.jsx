import { useAtom } from "jotai";
import moment from "moment";
import React, { useState } from "react";
import { user_data } from "../context/atom";
import { useEffect } from "react";



const Description = ({ videoItem }) => {
  const [desClicked, setDesClicked] = useState(false);
const [view, setView] = useState('')
const [time1, setTime1] = useState('')
const [time2, setTime2] = useState('')


useEffect(() => {
  

if(videoItem && videoItem?.view && videoItem?.timestamp){
  setView(videoItem?.view.toLocaleString('en-US'))
  setTime1(moment(videoItem?.timestamp).fromNow())
  setTime2(new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(videoItem?.timestamp)))

}


  
}, [videoItem])




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
            {view}
          </p>
          <p className="pl-1 text-sm font-[500]">views</p>
          <p className="pl-2.5 text-sm font-[500]">
            {!desClicked
              ? time1
              :time2}
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
