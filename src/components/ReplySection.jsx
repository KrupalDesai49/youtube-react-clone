import React, { useState } from "react";
import dislike from "../assets/dislike.svg";
import dislike_fill from "../assets/dislike_fill.svg";
import like from "../assets/like.svg";
import like_fill from "../assets/like_fill.svg";
import { UserAuth } from "./AuthContext";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { db } from "../context/firebase";
import moment from "moment";
import { useAtom } from "jotai";
import { user_data } from "../context/atom";

const ReplySection = ({ item, reply, setReplyData, setReply ,itemCommentId,createReply}) => {
  const [replyEntering, setReplyEntering] = useState(false);

  const { user } = UserAuth();
  let { videoId } = useParams();
  const [userData, setUserData] = useAtom(user_data);


  const funLiked = () => {
    if (!item?.like) {
      if (item && item?.id) {
        addLike(item);
      } else {
        console("addLike error");
      }
      setReplyData((prevComments) => {
        return prevComments.map((comment) => {
          if (comment.id === item?.id) {
            return {
              ...comment,
              likes_count: parseInt(comment.likes_count) + 1,
              like: true,
              dislike: false,
            };
          } else {
            return comment;
          }
        });
      });
    } else if (item?.like) {
      if (item && item?.id) {
        subLike(item);
      } else {
        console("subLike error");
      }
      setReplyData((prevComments) => {
        return prevComments.map((comment) => {
          if (comment.id === item?.id) {
            return {
              ...comment,
              likes_count: parseInt(comment.likes_count) - 1,
              like: false,
              dislike: false,
            };
          } else {
            return comment;
          }
        });
      });
    }
  };

  const funDisliked = () => {
    if (!item?.dislike && item?.like) {
      if (item && item?.id) {
        subLike2(item);
      } else {
        console("subLike error");
      }
      setReplyData((prevComments) => {
        return prevComments.map((comment) => {
          if (comment.id === item?.id) {
            return {
              ...comment,
              likes_count: parseInt(comment.likes_count) - 1,
              like: false,
              dislike: true,

            };
          } else {
            return comment;
          }
        });
      });
    } else if (!item?.like) {
      if (item && item?.id) {
        onlyDislike(item);
      } else {
        console("onlyDislike error");
      }
    }
  };

  const addLike = async (item) => {
    await updateDoc(doc(db, "video", videoId, "comments", itemCommentId, "reply", item?.id), {
      likes_count: parseInt(item?.likes_count) + 1,
      like: true,
      dislike: false,
    });
  };
  const subLike = async (item) => {
    await updateDoc(doc(db,"video", videoId, "comments", itemCommentId, "reply", item?.id), {
      likes_count: parseInt(item?.likes_count) - 1,
      like: false,

    });
  };
  const subLike2 = async (item) => {
    await updateDoc(doc(db,"video", videoId, "comments", itemCommentId, "reply", item?.id), {
      likes_count: parseInt(item?.likes_count) - 1,
      like: false,
      dislike: true,

    });
  };

  const onlyDislike = async (item) => {
    await updateDoc(doc(db, "video", videoId, "comments", itemCommentId, "reply", item?.id), {
      like: false,
      dislike: !item?.dislike,
    });
  };

  return (
    <div className="flex flex-col">
      <div className="flex w-full py-1">
        {/* User Logo */}
      
        {userData.filter(email => email.id ==item?.name)[0]?.logo_link !== "" 
              ?             
              <img
              src={ (userData.filter(email => email.id ==item?.name)[0]?.logo_link)}
              alt=""
              className=" h-6 w-6 rounded-full shrink-0  mr-3 "/>
              :
              (userData.filter(email => email.id ==item?.name)[0]?.photoURL !==""
              ?
              <img
              src={ (userData.filter(email => email.id ==item?.name)[0]?.photoURL)}
              alt=""
              className=" h-6 w-6 rounded-full shrink-0  mr-3 "/>
              
              : 
              <button className="mr-3 h-6 w-6 rounded-full bg-[#ff0000]  font-[400] text-center text-white hover:bg-[#ff0000]/90">
              {userData.filter(email => email.id ==item?.name)[0]?.displayName.charAt(0).toUpperCase()}
            </button>
              )}



        {/* Reply */}
        <div className="flex flex-col">
          {/* Username & time */}
          <div className="flex">
            <p className="text-xs">
              @
            {userData.filter(email => email.id ==item?.name)[0]?.displayName
                ?.split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join("")}
            </p>
            <p className="pl-1 text-xs text-stone-400">
              {moment(item?.timestamp).fromNow()}
            </p>
          </div>

          {/* Repliys */}
          <p className="pt-1 text-sm">{item?.reply}</p>

          {/* Like & Dislike */}
          <div className="-ml-1.5 flex items-center ">
            {/* Like */}
            <div
              onClick={funLiked}
              className="flex cursor-pointer items-center rounded-l-full  py-1 "
            >
              <img
                src={item?.like ? like_fill : like}
                alt=""
                className="w-7 rounded-full p-1.5 hover:bg-[#3f3f3f]"
              />
              <p className=" pl-0.5 pr-3 text-xs  font-[500] text-stone-400">
                {Number(item?.likes_count)}
              </p>
            </div>

            {/* Dislike */}
            <div
              onClick={funDisliked}
              className="flex cursor-pointer items-center rounded-r-full bg-[#272727] py-1 "
            >
              <img
                src={item?.dislike ? dislike_fill : dislike}
                alt=""
                className=" w-7  rounded-full p-1.5 hover:bg-[#3f3f3f]"
              />
            </div>
            <p
              className=" ml-4  rounded-full  px-3 py-2 text-xs font-[500] hover:bg-[#3f3f3f]"
              onClick={() => {
                setReplyEntering(true);
                setReply(
                  "@" +
            userData.filter(email => email.id ==item?.name)[0]?.displayName

                      ?.split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1),
                      )
                      .join("") + " ",
                );
              }}
            >
              Reply
            </p>
          </div>
        </div>
      </div>

      {/*  */}
      {/* Rply Edit box &  button */}
      {replyEntering && (
        <div className="-mt-1.5 flex w-full flex-col pl-10">
          <div className="flex w-full ">
            {/* User Logo */}
           
            {userData.filter(email => email.id ==user?.email)[0]?.logo_link !== "" 
              ?             
              <img
              src={ (userData.filter(email => email.id ==user?.email)[0]?.logo_link)}
              alt=""
              className=" h-6 w-6 rounded-full shrink-0  mr-3 "/>
              :
              (userData.filter(email => email.id ==user?.email)[0]?.photoURL !==""
              ?
              <img
              src={ (userData.filter(email => email.id ==user?.email)[0]?.photoURL)}
              alt=""
              className=" h-6 w-6 rounded-full shrink-0  mr-3 "/>
              
              : 
              <button className="mr-3 h-6 w-6 rounded-full bg-[#ff0000]  font-[400] text-center text-white hover:bg-[#ff0000]/90">
              {userData.filter(email => email.id ==user?.email)[0]?.displayName.charAt(0).toUpperCase()}
            </button>
              )}
            <div className="flex w-full flex-col">
              {/* reply Edit box */}
              <input
                type="text"
                onChange={(e) => setReply(e.target.value)}
                value={reply}
                className="line-clamp-3 border-b-2 peer border-b-stone-600 bg-transparent pt-0.5 text-sm transition duration-100 placeholder:text-stone-400  outline-none"
                placeholder="Add a reply..."
              />
              <p className="border-t-2 border-white  w-full  -my-[2px]  peer-focus:scale-100 scale-0 transition duration-[300ms]  place-self-center "></p>
              {/* reply button  */}
              <div className="flex flex-row-reverse pt-3">
                <button
                  className="ml-3 rounded-full bg-[#3ea6ff] px-4 py-2 text-sm font-[500] text-black hover:bg-[#65b8ff]"
                  onClick={() => {
                    createReply()
                      .then(() => console.log("Reply added successfully"))
                      .catch((error) =>
                        console.error("Error adding Reply: ", error),
                      );
                    setReplyEntering(false);
                  }}
                >
                  Reply
                </button>

                {/* Cancel Button */}
                <button
                  className="rounded-full bg-transparent px-4 py-2 text-sm font-[500] hover:bg-[#3f3f3f]"
                  onClick={() => {setReplyEntering(false); setReply("")}}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReplySection;
