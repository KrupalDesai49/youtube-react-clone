import React from "react";
import UserComment from "./UserComment";
import { UserAuth } from "./AuthContext";
import { useState } from "react";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { db } from "../context/firebase";
import { useEffect } from "react";

const CommentsSection = () => {
  const { user } = UserAuth();
  const [commentEntring, setCommentEntring] = useState(false);
  const [comment, setComment] = useState("");
  const [commentsData, setCommentsData] = useState([]);
  const [renderComment, setRenderComment] = useState(false);
  let { videoId } = useParams();

  useEffect(() => {
    const q = collection(db, "ytvideo", videoId, "comments");
    onSnapshot(q, (querySnapshot) => {
      let commentsArray = [];
      querySnapshot.forEach((doc) => {
        commentsArray.push({ ...doc.data(), id: doc.id });
      });
      setCommentsData(commentsArray.sort((a, b) => b.timestamp - a.timestamp));
      // console.log(commentsArray)
    });
  }, [videoId]);

  //Creating Comment
  const createComment = async () => {
    if (user) {
      try {
        const commentData = {
          name: user.displayName,
          comment: comment,
          likes_count: 0,
          timestamp: Date.now(),
          reply: false,
          like: false,
          dislike: false,
        };
        await addDoc(
          collection(db, "ytvideo", videoId, "comments"),
          commentData,
        );

        setComment("");

        // const commentRef = doc(db, "ytvideo", videoId, "comments", user);
        // await setDoc(commentRef, commentData);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <>
      <div className=" flex w-full flex-col text-white">
        {/* No. of Comments & Sorting */}
        <div className="flex">
          <p className="text-xl font-bold">{commentsData.length} Comments</p>
          {/* TODO Sorting.............. */}
        </div>

        {/* User Comment Box */}
        <div className="mt-5 flex mb-4">
          {/* User Logo */}
          <button className="mr-4 h-11 w-11 shrink-0 rounded-full bg-[#ff0000] text-center text-2xl font-[400] text-white hover:bg-[#ff0000]/90 ">
            <p className="pt-1">
               {user && user.displayName && user.displayName.charAt(0).toUpperCase()}
            </p>
          </button>

          {/* Comment Edit box &  button */}
          <div className="flex w-full flex-col">
            {/* Comment Edit box */}
            <input
              type="text"
              onClick={() => setCommentEntring(true)}
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              className="line-clamp-3 border-b-2 border-b-stone-600 bg-transparent pt-0.5 text-sm transition duration-100 placeholder:text-stone-400 focus:border-b-white focus:outline-none"
              placeholder="Add a comment..."
            />
            {/* Comment button  */}
            {commentEntring && (
              // Comment Button
              <div
                className="flex flex-row-reverse pt-3"
                onClick={() => {
                  createComment()
                    .then(() => console.log("Comment added successfully"))
                    .catch((error) =>
                      console.error("Error adding comment: ", error),
                    );
                }}
              >
                <button className="ml-3 rounded-full bg-[#3ea6ff] px-4 py-2 text-sm font-[500] text-black hover:bg-[#65b8ff]">
                  Comment
                </button>

                {/* Cancel Button */}
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
          {commentsData.map((item, index) => (
            <div className="" key={index}>
              <UserComment item={item} setRenderComment={setRenderComment}commentsData={commentsData} setCommentsData={setCommentsData} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CommentsSection;
