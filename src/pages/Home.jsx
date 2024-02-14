import { Link } from "react-router-dom";

import tick from "../assets/tick.svg";

import { useAtom } from "jotai";

import {  user_data, video_item, videos_data } from "../context/atom";
import moment from "moment";


const Home = () => {

  const [videos ] = useAtom(videos_data)
  const [ , setVideoItem] = useAtom(video_item)
  const [userData, setUserData] = useAtom(user_data);

  return (

    <div className="grid justify-center gap-4 bg-black px-8 font-roboto text-white md:grid-cols-2 md:justify-start lg:grid-cols-3 xl:grid-cols-4 ">
      {videos.map((item, index) => (
        <Link to={'/video/'+item?.id} onClick={()=>(setVideoItem(item) )} className="flex max-w-[30rem] flex-col md:max-w-md" key={index}>
          
          {/* Thumbnail */}
          {/* {console.log('oooopoo:',item)} */}

          <div className="relative overflow-hidden rounded-xl  aspect-video ">
            <span className=" absolute bottom-0 right-0 m-[0.35rem]  rounded bg-black px-1 py-[0.1rem] text-xs font-semibold">
              {item?.duration}
            </span>
            <img src={item?.thumbnail} alt="" className="object-cover w-full h-full" />
          </div>

          {/* Video Detail */}

          <div className="my-3 flex shrink-0">
            {/* Channel Logo */}
            {/* {console.log("okk",item?.channel_email,userData,)} */}
            {/* <img */}
              {userData.filter(email => email.id ==item?.channel_email)[0]?.logo_link !== "" 
              ?             
              <img
              src={ (userData.filter(email => email.id ==item?.channel_email)[0]?.logo_link)}
              alt=""
              className="top-0 h-10 w-10 rounded-full"/>
              :
              (userData.filter(email => email.id ==item?.channel_email)[0]?.photoURL !==""
              ?
              <img
              src={ (userData.filter(email => email.id ==item?.channel_email)[0]?.photoURL)}
              alt=""
              className="top-0 h-10 w-10 rounded-full"/>
              
              : 
              <button className="mr-3 h-10 w-10 rounded-full bg-[#ff0000] text-xl font-[500] text-white hover:bg-[#ff0000]/90">
              {userData.filter(email => email.id ==item?.channel_email)[0]?.displayName}
            </button>
              )}
           
            {/* /> */}

            {/* Video Text */}
            <div className="ml-3 flex flex-col">
              {/* Title */}
              <p className="line-clamp-2 font-semibold">{item?.title}</p>
              {/* Channel Name */}
              <div className="flex">
                <p className="mt-1 text-sm font-[500] text-neutral-400 hover:text-white">
                  {userData.filter(email => email.id ==item?.channel_email)[0]?.displayName}
                </p>
                {userData.filter(email => email.id ==item?.channel_email)[0]?.tick && (
                  <img
                    src={tick}
                    alt=""
                    className="ml-1 mt-1 w-3 fill-neutral-400"
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
                  {moment(userData.filter(email => email.id ==item?.channel_email)[0]?.timestamp).fromNow()}

                </p>
              </div>
            </div>

          </div>
        </Link>
      ))}
      <Link to='/short'>okkk
    
        </Link>
    </div>  
  );
};

export default Home;
