import { useAtom } from 'jotai';
import React from 'react';
import tick from "../assets/tick.svg";
import { videos_data } from '../context/atom';

const VideoList = ({setVideoItem}) => {

  const [videos] = useAtom(videos_data)




  
  return (
    <div>
          <div className="flex flex-col space-y-4 py-4 bg-black pr-8 font-roboto text-white ">
      {videos.map((item, index) => (
        <div onClick={()=>(setVideoItem(item))} className="flex max-w-[30rem]  md:max-w-md" key={index}>
          {/* Tumbnail */}
          <div className="relative flex-none cursor-pointer overflow-hidden rounded-md">
            <span className=" absolute bottom-0 right-0 m-[0.35rem]  rounded bg-black px-1 py-[0.1rem] text-xs font-semibold">
              {item?.duration}
            </span>
            <img src={item?.thumbnail} alt="" className='aspect-video max-w-40' />
          </div>

          {/* Video Detail */}

          <div className=" items-center flex">
    

            {/* Video Text */}
            <div className="ml-3 flex flex-col">
              {/* Title */}
              <p className="line-clamp-2 font-[500] text-sm">{item?.title}</p>
              {/* Channel Name */}
              <div className="flex">
                <p className="mt-1 text-xs font-[500] text-neutral-400 line-clamp-1 hover:text-white">
                  {item?.channel_name}
                </p>
                {item?.channel_tick && (
                  <img
                    src={tick}
                    alt=""
                    className="ml-[3px] mt-1 w-3 fill-neutral-400"
                  />
                )}
              </div>
              {/* View & Watch Hour */}
              <div className="flex">
                <p className=" text-xs font-[500] text-neutral-400">
                  {item?.view}
                </p>
                <p className="ml-1 text-xs font-[500] text-neutral-400">
                  views •
                </p>
                <p className="ml-1 text-xs font-[500] text-neutral-400">
                  {item?.upload_time}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
      
    </div>
  )
}

export default VideoList
