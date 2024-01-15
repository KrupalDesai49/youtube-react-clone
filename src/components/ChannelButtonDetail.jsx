import React from 'react'

const ChannelButtonDetail = ({videoData}) => {
  return (
    <>
       <div className="flex flex-col md:justify-between md:flex-row ">
        {/* Channel Details */}
        <div className="flex items-center">
          {/* Channel Logo */}
          <img
            src={videoData?.channel_logo}
            alt=""
            className="h-10 w-10 rounded-full"
          />

          {/* Channel Name & Subs*/}
          <div className="ml-3 flex flex-col">
            <div className="flex">
              <p className=" font-[500] text-white">
                {videoData?.channel_name}
              </p>
              {videoData?.channel_tick && (
                <img src={tick} alt="" className="ml-1  w-3 fill-neutral-400" />
              )}
            </div>
            <p className=" text-xs font-[450] text-neutral-400">
              {videoData?.channel_sub} subscribers
            </p>
          </div>
          <button className="' ml-4 rounded-full bg-white px-4 py-2 text-sm font-semibold text-neutral-600 hover:bg-white/85">
            Subscribe
          </button>
        </div>

        {/* Like button & other */}
        <div className="flex space-x-2 py-4">
          {/* Like & Dislike */}
          <div className="flex ">
            {/* Like */}
            <div className="flex cursor-pointer items-center rounded-l-full bg-[#272727] py-1 pl-3 hover:bg-[#3f3f3f]">
              <img src={like} alt="" className="w-7" />
              <p className="border-r border-r-zinc-600 pl-1 pr-3 font-[500]">
                {videoData.like}
              </p>
            </div>
            {/* Dislike */}
            <div className="flex cursor-pointer items-center rounded-r-full bg-[#272727] py-1 pl-1  pr-3 hover:bg-[#3f3f3f]">
              <img src={dislike} alt="" className=" w-7" />
            </div>
          </div>

          {/* Share */}
          <div className="flex cursor-pointer items-center rounded-full bg-[#272727] py-1 pl-3 pr-4 hover:bg-[#3f3f3f]">
            <img src={share} alt="" className="w-7" />
            <p className="pl-1 font-[500] ">Share</p>
          </div>

          {/* Download */}
          <div className="flex cursor-pointer items-center rounded-full bg-[#272727] py-1 pl-3 pr-4 hover:bg-[#3f3f3f]">
            <img src={download} alt="" className="w-6" />
            <p className="pl-1 font-[500] ">Download</p>
          </div>

          {/* More */}
          <div className="flex cursor-pointer items-center rounded-full bg-[#272727] px-2 py-1 hover:bg-[#3f3f3f]">
            <img src={more} alt="" className="w-5" />
          </div>
        </div>
      </div>
    </>
  )
}

export default ChannelButtonDetail
