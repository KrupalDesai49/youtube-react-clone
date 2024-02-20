import  { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import dislike from "../assets/dislike.svg";
import dislike_fill from "../assets/dislike_fill.svg";
import down_arrow from "../assets/down_arrow.svg";
import like from "../assets/like.svg";
import like_fill from "../assets/like_fill.svg";
import up_arrow from "../assets/up_arrow.svg";

import ReplySection from "./ReplySection";

import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  updateDoc
} from "firebase/firestore";
import moment from "moment";

import { db } from "../context/firebase";
import { UserAuth } from "./AuthContext";
import { useAtom } from "jotai";
import { user_data } from "../context/atom";


const UserComment = ({ item, setCommentsData }) => {
  const [isReply, setisReply] = useState(false);
  const [reply, setReply] = useState("");
  const [replyData, setReplyData] = useState("");
  const [replyEntering, setReplyEntering] = useState(false);
  const { user } = UserAuth();
  let { videoId } = useParams();
  const [userData, setUserData] = useAtom(user_data);


  useEffect(() => {
    if (item?.reply) {
      const q = collection(
        db,
        "video",
        videoId,
        "comments",
        item?.id,
        "reply",
      );
      onSnapshot(q, (querySnapshot) => {
        let ReplyArray = [];
        querySnapshot.forEach((doc) => {
          ReplyArray.push({ ...doc.data(), id: doc.id });
        });
        setReplyData(ReplyArray.sort((a, b) => b.timestamp - a.timestamp));
        console.log("replyyyy", ReplyArray);
      });
    }
  }, [videoId, replyEntering]);

  //Creating Reply
  const createReply = async () => {
    if (user) {
      try {
        const commentData = {
          name: user.email,
          reply: reply,
          likes_count: 0,
          timestamp: Date.now(),
          like: false,
          dislike: false,
        };
        await addDoc(
          collection(db, "video", videoId, "comments", item?.id, "reply"),
          commentData,
        );
        await updateDoc(doc(db, "video", videoId, "comments", item?.id), {
          reply: true,
        });

        setReply("");
        setReplyEntering(false);
        // const commentRef = doc(db, "ytvideo", videoId, "comments", user);
        // await setDoc(commentRef, commentData);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const funLiked = () => {
    if (!item?.like) {
      if (item && item?.id) {
        addLike(item);
      } else {
        console("addLike error");
      }
      setCommentsData((prevComments) => {
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
      setCommentsData((prevComments) => {
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
      setCommentsData((prevComments) => {
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
    } else if (!item?.like) {
      if (item && item?.id) {
        onlyDislike(item);
      } else {
        console("onlyDislike error");
      }
    }
  };

  const addLike = async (item) => {
    await updateDoc(doc(db, "video", videoId, "comments", item?.id), {
      likes_count: parseInt(item?.likes_count) + 1,
      like: true,
      dislike: false,
    });
  };
  const subLike = async (item) => {
    await updateDoc(doc(db, "video", videoId, "comments", item?.id), {
      likes_count: parseInt(item?.likes_count) - 1,
      like: false,
    });
  };
  const subLike2 = async (item) => {
    try{

    await updateDoc(doc(db, "video", videoId, "comments", item?.id), {
      likes_count: parseInt(item?.likes_count) - 1,
      like: false,
      dislike:true

    });

  }catch(e){
    console.log(e)
  }
  };
  const onlyDislike = async (item) => {
    await updateDoc(doc(db, "video", videoId, "comments", item?.id), {
      like: false,
      dislike: !item?.dislike,
    });
  };

  return (
    <div className="flex w-full py-2">
      {/* User Logo */}
  
      {userData.filter(email => email.id ==item?.name)[0]?.logo_link !== "" 
              ?             
              <img
              src={ (userData.filter(email => email.id ==item?.name)[0]?.logo_link)}
              alt=""
              className=" h-10 w-10 rounded-full shrink-0  mr-4 object-cover"/>
              :
              (userData.filter(email => email.id ==item?.name)[0]?.photoURL !==""
              ?
              <img
              src={ (userData.filter(email => email.id ==item?.name)[0]?.photoURL)}
              alt=""
              className=" h-10 w-10 rounded-full shrink-0  mr-4 object-cover"/>
              
              : 
              <button className="mr-4 h-10 w-10 rounded-full bg-[#ff0000] text-2xl font-[400] text-center text-white hover:bg-[#ff0000]/90 shrink-0">
              <p className="pt-0.5">
              {userData.filter(email => email.id ==item?.name)[0]?.displayName.charAt(0).toUpperCase()}

        </p>
            </button>
              )}

      {/* Comments */}
      <div className="flex grow flex-col">
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

        {/* Comments */}
        <p className="pt-1 text-sm">{item?.comment}</p>

        {/* Like & Dislike & Reply */}
        <div className="-ml-1.5 flex items-center ">
          {/* Like */}
          <div className="flex cursor-pointer items-center rounded-l-full  pt-1 ">
            <img
              onClick={() => funLiked()}
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
            onClick={() => funDisliked()}
            className="flex cursor-pointer items-center rounded-r-full  pt-1 "
          >
            <img
              src={item?.dislike ? dislike_fill : dislike}
              alt=""
              className=" w-7  rounded-full p-1.5 hover:bg-[#3f3f3f]"
            />
          </div>

          {/* Reply */}
          <p
            className=" ml-4  rounded-full  px-3 py-2 text-xs font-[500] hover:bg-[#3f3f3f]"
            onClick={() => setReplyEntering(true)}
          >
            Reply
          </p>
        </div>

        {/* Reply Edit box &  button */}
        {replyEntering && (
          <div className="flex w-full flex-col">
            <div className="flex w-full py-1">
              {/* User Logo */}
          

              {userData.filter(email => email.id ==user?.email)[0]?.logo_link !== "" 
              ?             
              <img
              src={ (userData.filter(email => email.id ==user?.email)[0]?.logo_link)}
              alt=""
              className=" h-6 w-6 rounded-full shrink-0  mr-3 object-cover"/>
              :
              (userData.filter(email => email.id ==user?.email)[0]?.photoURL !==""
              ?
              <img
              src={ (userData.filter(email => email.id ==user?.email)[0]?.photoURL)}
              alt=""
              className=" h-6 w-6 rounded-full shrink-0  mr-3 object-cover"/>
              
              : 
              <button className="mr-3 h-6 w-6 rounded-full bg-[#ff0000]  font-[400] text-center text-white hover:bg-[#ff0000]/90 shrink-0">
              {userData.filter(email => email.id ==user?.email)[0]?.displayName.charAt(0).toUpperCase()}
            </button>
              )}

              <div className="flex w-full flex-col">
                {/* Comment Edit box */}
                <input
                  type="text"
                  onChange={(e) => setReply(e.target.value)}
                  value={reply}
                  className="line-clamp-3 border-b-2 peer border-b-stone-600 bg-transparent pt-0.5 text-sm transition duration-100 placeholder:text-stone-400  outline-none"
              placeholder="Add a reply..."
            />
            <p className="border-t-2 border-white  w-full  -my-[2px]  peer-focus:scale-100 scale-0 transition duration-[300ms]  place-self-center "></p>
                {/* Comment button  */}
                <div className="flex flex-row-reverse pt-3">
                  <button
                    className="ml-3 rounded-full bg-[#3ea6ff] px-4 py-2 text-sm font-[500] text-black hover:bg-[#65b8ff]"
                    onClick={() => {
                      createReply()
                        .then(() => console.log("Reply added successfully"))
                        .catch((error) =>
                          console.error("Error adding Reply: ", error),
                        );
                    }}
                  >
                    Reply
                  </button>

                  {/* Cancel Button */}
                  <button
                    className="rounded-full bg-transparent px-4 py-2 text-sm font-[500] hover:bg-[#3f3f3f]"
                    onClick={() => setReplyEntering(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* No. Of reply */}
        {item?.reply && (
          <div
            className="flex cursor-pointer"
            onClick={() => setisReply((e) => (e = !e))}
          >
            <div className="flex flex-row space-x-1 rounded-full px-3 py-1.5 hover:bg-[#263850]">
              <img
                src={!isReply ? down_arrow : up_arrow}
                alt=""
                className="w-3"
              />

              <p className="pl-1.5 text-[#3ea6ff] ">
                {" "}
                {replyData?.length} replies
              </p>
            </div>
          </div>
        )}

        {/* Reply Section */}

        {isReply &&
          replyData.map((replyItem, index) => (
            <div className="" key={index}>
              <ReplySection
                setReply={setReply}
                reply={reply}
                item={replyItem}
                setReplyData={setReplyData}
                createReply={createReply}
                itemCommentId={item?.id}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserComment;
