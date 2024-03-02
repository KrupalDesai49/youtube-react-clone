import { useAtom } from 'jotai'
import React from 'react'
import { user_data, video_item, videos_data } from '../../context/atom'
import { Link } from 'react-router-dom'
import moment from 'moment'
import tick from "../../assets/tick.svg";


import { doc, updateDoc } from "firebase/firestore";
import { db } from '../../context/firebase'
import { useState } from 'react'
import { useEffect } from 'react'
import { UserAuth } from '../../components/AuthContext'
import { useParams } from 'react-router-dom'

const ChannelVideo = () => {
  
  const [videos ] = useAtom(videos_data)
  const [ , setVideoItem] = useAtom(video_item)
  const [userData, setUserData] = useAtom(user_data);
  const [ChannelVideo, setChannelVideo] = useState([])
  const { user } = UserAuth();
  const { id } = useParams();
  
  
  useEffect(() => {
    if (userData) {
      // const data = 
      ChannelVideo.push(videos.filter(el=>el.channel_email===user.email))
      
    }
    console.log("okkkkkkk",id);
    
  }, [userData])
  

  const handleView = async (videoItem) => {
    try {       
      const videoDocRef = doc(db, "video", videoItem?.id);

        const VideoData = {
          view: parseInt(videoItem?.view) + 1,
        };
        setVideoItem(previosValue => ({...previosValue, view:parseInt(videoItem?.view) + 1}))
       
        await updateDoc(videoDocRef, VideoData);
     
    } catch (e) {
      console.log(e);
    }
};

  return (
    <>
      <div className="grid justify-center gap-4 bg-black  font-roboto text-white md:grid-cols-2 md:justify-start lg:grid-cols-3 xl:grid-cols-4 mx-3  md:mx-10 lg:mx-24 my-8">
      {ChannelVideo.map((item, index) => (
        <Link to={'/video/'+item?.id} onClick={()=>{setVideoItem(item);handleView(item)}} className="flex max-w-[30rem] flex-col md:max-w-md" key={index}>
          
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
            <Link className="shrink-0" to={`/channel/`+userData.filter(email => email.id ==item?.channel_email)[0]?.channelID+'/videoes'}>
              {userData.filter(email => email.id ==item?.channel_email)[0]?.logo_link !== "" 
              ?             
              <img
              src={ (userData.filter(email => email.id ==item?.channel_email)[0]?.logo_link)}
              alt=""
              className="top-0 h-10 w-10 rounded-full object-cover"/>
              :
              (userData.filter(email => email.id ==item?.channel_email)[0]?.photoURL !==""
              ?
              <img
              src={ (userData.filter(email => email.id ==item?.channel_email)[0]?.photoURL)}
              alt=""
              className="top-0 h-10 w-10 rounded-full object-cover"/>
              
              : 
              <button className="mr-3 h-10 w-10 rounded-full bg-[#ff0000] text-xl font-[500] text-white hover:bg-[#ff0000]/90">
              {userData.filter(email => email.id ==item?.channel_email)[0]?.displayName}
            </button>
              )}
           </Link>

            {/* Video Text */}
            <div className="ml-3 flex flex-col">
              {/* Title */}
              <p className="line-clamp-2 font-semibold">{item?.title}</p>
              {/* Channel Name */}
              <Link to={`/channel/`+userData.filter(email => email.id ==item?.channel_email)[0]?.channelID+'/videoes'} className="flex">
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
              </Link>
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
     
    </div>  
      
    </>
  )
}

export default ChannelVideo
