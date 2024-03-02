import { useAtom } from "jotai";
import React from "react";
import { user_data, video_item, videos_data } from "../../context/atom";
import { Link } from "react-router-dom";
import moment from "moment";
import tick from "../../assets/tick.svg";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../context/firebase";
import { useState } from "react";
import { useEffect } from "react";
import { UserAuth } from "../../components/AuthContext";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

const ChannelVideo = () => {
  const [videos] = useAtom(videos_data);
  const [, setVideoItem] = useAtom(video_item);
  const [userData, setUserData] = useAtom(user_data);
  const [ChannelVideo, setChannelVideo] = useState();
  const { user } = UserAuth();
  const id = useLocation();

 
  useEffect(() => {
     if (userData && videos) {
      // const data =
      const com1 =id?.pathname?.split('/')[2]
      setChannelVideo(videos?.filter(el=>com1===userData.filter(item=>item?.id===el?.channel_email)[0]?.channelID))

      console.log("okkkkkkk11",ChannelVideo);
      console.log("okkkkkkk222",userData.filter(item=>item?.id==="kaano@gmail.com")[0]?.channelID);
    }
    // console.log("okkkkkkk",id?.pathname?.split('/')[2])
  }, [userData,videos])
  

  const handleView = async (videoItem) => {
    try {
      const videoDocRef = doc(db, "video", videoItem?.id);

      const VideoData = {
        view: parseInt(videoItem?.view) + 1,
      };
      setVideoItem((previosValue) => ({
        ...previosValue,
        view: parseInt(videoItem?.view) + 1,
      }));

      await updateDoc(videoDocRef, VideoData);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="mx-3 my-8 grid justify-center  gap-4 bg-black font-roboto text-white md:mx-10 md:grid-cols-2 md:justify-start  lg:mx-24 lg:grid-cols-3 xl:grid-cols-4">
        {ChannelVideo?.map((item, index) => (
          <Link
            to={"/video/" + item?.id}
            onClick={() => {
              setVideoItem(item);
              handleView(item);
            }}
            className="flex max-w-[30rem] flex-col md:max-w-md"
            key={index}
          >
            {/* Thumbnail */}
            {/* {console.log('oooopoo:',item)} */}

            <div className="relative aspect-video overflow-hidden  rounded-xl ">
              <span className=" absolute bottom-0 right-0 m-[0.35rem]  rounded bg-black px-1 py-[0.1rem] text-xs font-semibold">
                {item?.duration}
              </span>
              <img
                src={item?.thumbnail}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>

            {/* Video Detail */}
            <div className="my-2.5 flex shrink-0">
              {/* Channel Logo */}
              {/* {console.log("okk",item?.channel_email,userData,)} */}
              {/* <Link
                className="shrink-0"
                to={
                  `/channel/` +
                  userData.filter((email) => email.id == item?.channel_email)[0]
                    ?.channelID +
                  "/videoes"
                }
              >
                {userData.filter((email) => email.id == item?.channel_email)[0]
                  ?.logo_link !== "" ? (
                  <img
                    src={
                      userData.filter(
                        (email) => email.id == item?.channel_email,
                      )[0]?.logo_link
                    }
                    alt=""
                    className="top-0 h-10 w-10 rounded-full object-cover"
                  />
                ) : userData.filter(
                    (email) => email.id == item?.channel_email,
                  )[0]?.photoURL !== "" ? (
                  <img
                    src={
                      userData.filter(
                        (email) => email.id == item?.channel_email,
                      )[0]?.photoURL
                    }
                    alt=""
                    className="top-0 h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <button className="mr-3 h-10 w-10 rounded-full bg-[#ff0000] text-xl font-[500] text-white hover:bg-[#ff0000]/90">
                    {
                      userData.filter(
                        (email) => email.id == item?.channel_email,
                      )[0]?.displayName
                    }
                  </button>
                )}
              </Link> */}

              {/* Video Text */}
              <div className=" flex flex-col">
                {/* Title */}
                <p className="line-clamp-2 font-semibold">{item?.title}</p>
                {/* Channel Name */}
                {/* <Link
                  to={
                    `/channel/` +
                    userData.filter(
                      (email) => email.id == item?.channel_email,
                    )[0]?.channelID +
                    "/videoes"
                  }
                  className="flex"
                >
                  <p className="mt-1 text-sm font-[500] text-neutral-400 hover:text-white">
                    {
                      userData.filter(
                        (email) => email.id == item?.channel_email,
                      )[0]?.displayName
                    }
                  </p>
                  {userData.filter(
                    (email) => email.id == item?.channel_email,
                  )[0]?.tick && (
                    <img
                      src={tick}
                      alt=""
                      className="ml-1 mt-1 w-3 fill-neutral-400"
                    />
                  )}
                </Link> */}
                {/* View & Watch Hour */}
                <div className="flex">
                  <p className=" text-sm font-[500] text-neutral-400">
                    {item?.view}
                  </p>
                  <p className="ml-1 text-sm font-[500] text-neutral-400">
                    views •
                  </p>
                  <p className="ml-1 text-sm font-[500] text-neutral-400">
                    {moment(
                      userData.filter(
                        (email) => email.id == item?.channel_email,
                      )[0]?.timestamp,
                    ).fromNow()}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ChannelVideo;
