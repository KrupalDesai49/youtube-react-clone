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

const UserComment = () => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [isReply, setisReply] = useState(false);
  const { user, logOut } = UserAuth();

  return (
    <div className="flex w-full py-2">
      {/* User Logo */}
      <button className="mr-4 h-10 w-10 shrink-0 rounded-full bg-[#ff0000] text-center text-2xl font-[400] text-white hover:bg-[#ff0000]/90 ">
        {/* {user.displayName.charAt(0).toUpperCase()} */}
        <p className="pt-0.5">K</p>
      </button>

      {/* Comments */}
      <div className="flex flex-col">
        {/* Username & time */}
        <div className="flex">
          <p className="text-xs">@abcdefghi123</p>
          <p className="pl-1 text-xs text-stone-400">3 months ago</p>
        </div>

        {/* Comments */}
        <p className="pt-1 text-sm">
          Phoebe shares the humorous sarcastic quality with Chandler, the pure
          innocent quality with Joey, and the quirky unorthodox quality with
          Ross.
        </p>

        {/* Like & Dislike */}
        <div className="-ml-1.5 flex items-center ">
          {/* Like */}
          <div
            //   onClick={funLiked}
            className="flex cursor-pointer items-center rounded-l-full  pt-1 "
          >
            <img
              src={liked ? like_fill : like}
              alt=""
              className="w-7 rounded-full p-1.5 hover:bg-[#3f3f3f]"
            />
            <p className=" pl-0.5 pr-3 text-xs  font-[500] text-stone-400">
              {/* {videoItem.like} */}97
            </p>
          </div>

          {/* Dislike */}
          <div
            //   onClick={funDisliked}
            className="flex cursor-pointer items-center rounded-r-full bg-[#272727] pt-1 "
          >
            <img
              src={disliked ? dislike_fill : dislike}
              alt=""
              className=" w-7  rounded-full p-1.5 hover:bg-[#3f3f3f]"
            />
          </div>
          <p className=" ml-4  rounded-full  px-3 py-2 text-xs font-[500] hover:bg-[#3f3f3f]">
            Reply
          </p>
        </div>

        {/* No. Of reply */}
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

            <p className="pl-1.5 text-[#3ea6ff] "> 4 replies</p>
          </div>
        </div>
        {/* Reply Section */}

        {isReply && <ReplySection />}
      </div>
    </div>
  );
};

export default UserComment;
