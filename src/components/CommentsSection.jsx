import React from "react";
import UserComment from "./UserComment";
import { UserAuth } from "./AuthContext";
import { useState } from "react";

const CommentsSection = () => {
  const { user } = UserAuth();
  const [commentEntring, setCommentEntring] = useState(false)



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
              onClick={()=>setCommentEntring(true)}
              className="border-b pt-0.5 border-b-stone-600 bg-transparent text-sm transition duration-100 placeholder:text-stone-400 focus:border-b-white focus:outline-none "
              placeholder="Add a comment..."
            />
            {/* Comment button  */}
            {commentEntring &&
            (<div className="flex-row-reverse flex pt-3">

              <button className="bg-[#3ea6ff] text-black hover:bg-[#65b8ff] px-4 py-2 rounded-full text-sm font-[500] ml-3">Comment</button>
              <button className="bg-transparent font-[500] hover:bg-[#3f3f3f] px-4 py-2 rounded-full text-sm" onClick={()=>setCommentEntring(false)}>Cancel</button>

            </div>)}
          </div>
        </div>

        {/* User's Comment */}
        <UserComment />
      </div>
    </>
  );
};

export default CommentsSection;
