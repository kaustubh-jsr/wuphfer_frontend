import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { likeUnlikePost as likeUnlikePostApi } from "../../api/homePage";
// import Heart from "./TwitterHeart";
const LikeButton = ({ post, isSinglePostView }) => {
  const { token } = useSelector((state) => state.auth);
  const [isLiked, setIsLiked] = useState(post.is_liked);
  const [likeCount, setLikeCount] = useState(post.likes);
  // This state might be useful if twitter-like heart animation is added, Remove later.
  // const [isclicked, setIsClicked] = useState(isLiked);

  const likeHandler = (e) => {
    console.log(likeCount);
    e.stopPropagation();
    if (isLiked) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }
    setIsLiked((prev) => !prev);
    // call api
    (async () => {
      const resp = await likeUnlikePostApi(token, post);
      if (resp.status === "ok") {
        if (resp.likeStatus === "liked") {
          setIsLiked(true);
          setLikeCount(resp.totalLikes);
        } else {
          setIsLiked(false);
          setLikeCount(resp.totalLikes);
        }
      } else {
        setIsLiked((prev) => !prev);
        setLikeCount((prev) => prev - 1);
      }
    })();
    // if failed, revert to prev state.
  };
  return (
    <button
      onClick={likeHandler}
      className="flex justify-center items-center gap-1 text-gray-600 dark:text-gray-200"
    >
      {isLiked ? (
        <AiFillHeart className="w-[40px] h-[40px] p-[12px] rounded-2xl text-red-600 hover:bg-red-100 dark:hover:bg-half-transparent hover:text-red-700" />
      ) : (
        <AiOutlineHeart className="w-[40px] h-[40px] p-[12px] rounded-2xl hover:bg-red-100 dark:hover:bg-half-transparent hover:text-red-700" />
      )}

      {/* <Heart isclicked={isLiked} onClick={likeHandler} /> */}
      {!isSinglePostView && <p>{likeCount}</p>}
    </button>
  );
};

export default LikeButton;
