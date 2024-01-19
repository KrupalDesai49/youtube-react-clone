import React from "react";
import UserComment from "./UserComment";
import { UserAuth } from "./AuthContext";
import { useState } from "react";

const CommentsSection = () => {
  const { user } = UserAuth();
  const [commentEntring, setCommentEntring] = useState(false);

  return (
    <>
      <div className=" flex w-full flex-col text-white">
        {/* No. of Comments & Sorting */}
        <div className="flex">
          <p className="text-xl font-bold">2,294 Comments</p>
          {/* TODO Sorting.............. */}
        </div>

        {/* User Comment Box */}
        <div className="mt-5 flex">
          {/* User Logo */}
          <button className="mr-4 h-11 w-11 shrink-0 rounded-full bg-[#ff0000] text-center text-2xl font-[400] text-white hover:bg-[#ff0000]/90 ">
            {/* {user.displayName.charAt(0).toUpperCase()} */}
            <p className="pt-1">K</p>
          </button>

          {/* Comment Edit box &  button */}
          <div className="flex w-full flex-col">
            {/* Comment Edit box */}
            <input
              type="text"
              onClick={() => setCommentEntring(true)}
              className="line-clamp-3 border-b border-b-stone-600 bg-transparent pt-0.5 text-sm transition duration-100 placeholder:text-stone-400 focus:border-b-white focus:outline-none"
              placeholder="Add a comment..."
            />
            {/* Comment button  */}
            {commentEntring && (
              <div className="flex flex-row-reverse pt-3">
                <button className="ml-3 rounded-full bg-[#3ea6ff] px-4 py-2 text-sm font-[500] text-black hover:bg-[#65b8ff]">
                  Comment
                </button>
                <button
                  className="rounded-full bg-transparent px-4 py-2 text-sm font-[500] hover:bg-[#3f3f3f]"
                  onClick={() => setCommentEntring(false)}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* User's Comment */}
        <div className="pt-2">
          <UserComment />
          <UserComment />
          <UserComment />
        </div>
      </div>
    </>
  );
};

export default CommentsSection;
