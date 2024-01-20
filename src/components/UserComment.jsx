import React from "react";
import { useState } from "react";
import dislike from "../assets/dislike.svg";
import dislike_fill from "../assets/dislike_fill.svg";
import down_arrow from "../assets/down_arrow.svg";
import like from "../assets/like.svg";
import like_fill from "../assets/like_fill.svg";
import up_arrow from "../assets/up_arrow.svg";
import ReplySection from "./ReplySection";
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

const UserComment = ({ item, setCommentsData }) => {
  const [isReply, setisReply] = useState(false);
  const [reply, setReply] = useState("");
  const [replyData, setReplyData] = useState("");
  const [replyEntering, setReplyEntering] = useState(false);
  const { user } = UserAuth();
  let { videoId } = useParams();

  useEffect(() => {
    if (item.reply) {
      const q = collection(
        db,
        "ytvideo",
        videoId,
        "comments",
        item.id,
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
          name: user.displayName,
          reply: reply,
          likes_count: 0,
          timestamp: Date.now(),
          like: false,
          dislike: false,
        };
        await addDoc(
          collection(db, "ytvideo", videoId, "comments", item.id, "reply"),
          commentData,
        );
        await updateDoc(doc(db, "ytvideo", videoId, "comments", item.id), {
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
    if (!item.like) {
      if (item && item.id) {
        addLike(item);
      } else {
        console("addLike error");
      }
      setCommentsData((prevComments) => {
        return prevComments.map((comment) => {
          if (comment.id === item.id) {
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
    } else if (item.like) {
      if (item && item.id) {
        subLike(item);
      } else {
        console("subLike error");
      }
      setCommentsData((prevComments) => {
        return prevComments.map((comment) => {
          if (comment.id === item.id) {
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
    if (!item.dislike && item.like) {
      if (item && item.id) {
        subLike(item);
      } else {
        console("subLike error");
      }
      setCommentsData((prevComments) => {
        return prevComments.map((comment) => {
          if (comment.id === item.id) {
            return {
              ...comment,
              likes_count: parseInt(comment.likes_count) - 1,
              like: false,
            };
          } else {
            return comment;
          }
        });
      });
    } else if (!item.like) {
      if (item && item.id) {
        onlyDislike(item);
      } else {
        console("onlyDislike error");
      }
    }
  };

  const addLike = async (item) => {
    await updateDoc(doc(db, "ytvideo", videoId, "comments", item.id), {
      likes_count: parseInt(item.likes_count) + 1,
      like: true,
      dislike: false,
    });
  };
  const subLike = async (item) => {
    await updateDoc(doc(db, "ytvideo", videoId, "comments", item.id), {
      likes_count: parseInt(item.likes_count) - 1,
      like: false,
    });
  };
  const onlyDislike = async (item) => {
    await updateDoc(doc(db, "ytvideo", videoId, "comments", item.id), {
      like: false,
      dislike: !item.dislike,
    });
  };

  return (
    <div className="flex w-full py-2">
      {/* User Logo */}
      <button className="mr-4 h-10 w-10 shrink-0 rounded-full bg-[#ff0000] text-center text-2xl font-[400] text-white hover:bg-[#ff0000]/90 ">
        <p className="pt-0.5">
          {user && user.displayName && item.name?.charAt(0).toUpperCase()}
        </p>
      </button>

      {/* Comments */}
      <div className="flex grow flex-col">
        {/* Username & time */}
        <div className="flex">
          <p className="text-xs">
            @
            {item.name
              ?.split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join("")}
          </p>
          <p className="pl-1 text-xs text-stone-400">
            {moment(item.timestamp).fromNow()}
          </p>
        </div>

        {/* Comments */}
        <p className="pt-1 text-sm">{item.comment}</p>

        {/* Like & Dislike & Reply */}
        <div className="-ml-1.5 flex items-center ">
          {/* Like */}
          <div className="flex cursor-pointer items-center rounded-l-full  pt-1 ">
            <img
              onClick={() => funLiked()}
              src={item.like ? like_fill : like}
              alt=""
              className="w-7 rounded-full p-1.5 hover:bg-[#3f3f3f]"
            />
            <p className=" pl-0.5 pr-3 text-xs  font-[500] text-stone-400">
              {Number(item.likes_count)}
            </p>
          </div>

          {/* Dislike */}
          <div
            onClick={() => funDisliked()}
            className="flex cursor-pointer items-center rounded-r-full  pt-1 "
          >
            <img
              src={item.dislike ? dislike_fill : dislike}
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
              <button className="text- mr-4 h-6 w-6 shrink-0 rounded-full bg-[#ff0000] text-center font-[400] text-white hover:bg-[#ff0000]/90 ">
                {/* {user.displayName.charAt(0).toUpperCase()} */}
                <p className="">
                  {user &&
                    user.displayName &&
                    user.displayName.charAt(0).toUpperCase()}
                </p>
              </button>
              <div className="flex w-full flex-col">
                {/* Comment Edit box */}
                <input
                  type="text"
                  onChange={(e) => setReply(e.target.value)}
                  value={reply}
                  className="line-clamp-3 border-b border-b-stone-600 bg-transparent pt-0.5 text-sm transition duration-100 placeholder:text-stone-400 focus:border-b-white focus:outline-none"
                  placeholder="Add a reply..."
                />
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
        {item.reply && (
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
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserComment;
