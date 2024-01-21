import { collection, onSnapshot, query } from "firebase/firestore";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import tick from "../assets/tick.svg";
import { video_item, videos_data } from "../context/atom";
import { db } from "../context/firebase";

const Home = () => {

 

  const [videos , setVideos] = useAtom(videos_data)
  const [videoItem , setVideoItem] = useAtom(video_item)

  return (

    <div className="grid justify-center gap-4 bg-black px-8 font-roboto text-white md:grid-cols-2 md:justify-start lg:grid-cols-3 xl:grid-cols-4 ">
      {videos.map((item, index) => (
        <Link to={'/video/'+item.id} onClick={()=>(setVideoItem(item) )} className="flex max-w-[30rem] flex-col md:max-w-md" key={index}>
          {/* Tumbnail */}
          {/* {console.log('oooopoo:',item)} */}

          <div className="relative overflow-hidden rounded-xl">
            <span className=" absolute bottom-0 right-0 m-[0.35rem]  rounded bg-black px-1 py-[0.1rem] text-xs font-semibold">
              {item?.duration}
            </span>
            <img src={item?.thumbnail} alt="" />
          </div>

          {/* Video Detail */}

          <div className="my-3 flex">
            {/* Channel Logo */}
            <img
              src={item?.channel_logo}
              alt=""
              className="top-0 h-10 w-10 rounded-full"
            />

            {/* Video Text */}
            <div className="ml-3 flex flex-col">
              {/* Title */}
              <p className="line-clamp-2 font-semibold">{item?.title}</p>
              {/* Channel Name */}
              <div className="flex">
                <p className="mt-1 text-sm font-[500] text-neutral-400 hover:text-white">
                  {item?.channel_name}
                </p>
                {item?.channel_tick && (
                  <img
                    src={tick}
                    alt=""
                    className="ml-1 mt-1.5 w-3 fill-neutral-400"
                  />
                )}
              </div>
              {/* View & Watch Hour */}
              <div className="flex">
                <p className=" text-sm font-[500] text-neutral-400">
                  {item?.view}
                </p>
                <p className="ml-1 text-sm font-[500] text-neutral-400">
                  views •
                </p>
                <p className="ml-1 text-sm font-[500] text-neutral-400">
                  {item?.upload_time}
                </p>
              </div>
            </div>

          </div>
        </Link>
      ))}
      <Link to='/vv'>okkk
    
        </Link>
    </div>  
  );
};

export default Home;
