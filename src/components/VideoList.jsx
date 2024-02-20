import { useAtom } from 'jotai';
import { Link } from 'react-router-dom';

import tick from "../assets/tick.svg";

import { user_data, videos_data } from '../context/atom';
import moment from 'moment';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../context/firebase';
import { useState } from 'react';


const VideoList = ({setVideoItem}) => {

  const [videos] = useAtom(videos_data)
  const [userData, setUserData] = useAtom(user_data);
  const [prevItem, setPrevItem] = useState(null)

  const handleView = async (videoItem) => {
    try {


if(videoItem?.id !== prevItem?.id) {
  // if (!_.isEqual(videoItem, prevItem)) {

      const videoDocRef = doc(db, "video", videoItem?.id);

        const VideoData = {
          view: parseInt(videoItem?.view) + 1,
        };
        setVideoItem(previosValue => ({...previosValue, view:parseInt(videoItem?.view) + 1}))
       
        await updateDoc(videoDocRef, VideoData);
        setPrevItem(videoItem)
      }
     
    } catch (e) {
      console.log(e);
    }
};
  
  return (
    <div>
          <div className="flex flex-col space-y-4 py-4 bg-black pr-8 font-roboto text-white ">
      {videos.map((item, index) => (
        <Link to={'/video/'+item.id}  onClick={()=>{setVideoItem(item); handleView(item)}} className="flex max-w-[35rem]  md:max-w-md" key={index}>
          {/* Tumbnail */}
          <div className="relative flex-none cursor-pointer overflow-hidden rounded-md">
            <span className=" absolute bottom-0 right-0 m-[0.35rem]  rounded bg-black px-1 py-[0.1rem] text-xs font-semibold">
              {item?.duration}
            </span>
            <img src={item?.thumbnail} alt="" className='aspect-video object-cover max-w-40' />
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
                  {userData.filter(email => email.id ==item?.channel_email)[0]?.displayName}

                </p>
                {userData.filter(email => email.id ==item?.channel_email)[0]?.tick && (

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
                  {item?.view}{" "}views • {" "} {moment(userData.filter(email => email.id ==item?.channel_email)[0]?.timestamp).fromNow()}
                </p>
            
            
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
      
    </div>
  )
}

export default VideoList
