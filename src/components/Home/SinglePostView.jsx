import React, { useState } from "react";
import { BsDot } from "react-icons/bs";
import { FaRegComment, FaRegBookmark, FaBookmark } from "react-icons/fa";
import { AiOutlineRetweet, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import moment from "moment";
const SinglePostView = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isRetweet, setIsRetweet] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const postPage = true;
  const retweetHandler = (e) => {
    e.stopPropagation();
    setIsRetweet((prev) => !prev);
  };
  const likeHandler = (e) => {
    e.stopPropagation();
    setIsLiked((prev) => !prev);
  };
  const bookmarkHandler = (e) => {
    e.stopPropagation();
    setIsBookmarked((prev) => !prev);
  };

  return (
    <div className="p-3 flex-col border-b border-light-border dark:border-dark-border duration-200">
      <div className="flex mb-4">
        <img
          src={post.user.profile_image}
          alt={post.user.username}
          className="h-14 w-14 rounded-full mr-4"
        />
        <div className={`${postPage && "gap-0 flex-col"} flex gap-1`}>
          <h4 className="font-bold">{post.user.full_name}</h4>
          <p className="text-gray-500">@{post.user.username}</p>
        </div>
      </div>
      <div className="flex flex-col gap-1 w-full">
        <div className="text-2xl">
          {post.content}

          {Boolean(post.is_media) ? (
            <img
              src={post.image}
              alt="post"
              className="rounded-2xl max-h-80 object-contain"
            />
          ) : (
            <span></span>
          )}
        </div>
        <div className="flex gap-[2px] mt-1">
          <p className="text-gray-500">{moment(post.timestamp).format("LT")}</p>
          <p className="flex items-center">
            <BsDot className="text-gray-600" />
          </p>
          <p className="text-gray-500">{moment(post.timestamp).format("ll")}</p>
        </div>
        <div className="flex gap-4 border-y border-light-border dark:border-dark-border py-2 my-2">
          <div className="flex gap-1">
            <h6 className="font-semibold">25</h6>
            <p className="text-gray-800 dark:text-gray-400">Retweets</p>
          </div>
          <div className="flex gap-1">
            <h6 className="font-semibold">55</h6>
            <p className="text-gray-800 dark:text-gray-400">Likes</p>
          </div>
        </div>
        <div className="flex justify-around">
          <button className="flex justify-center items-center gap-1 text-gray-600 dark:text-gray-200 ">
            <FaRegComment className="w-[40px] h-[40px] p-[12px] rounded-2xl hover:bg-sky-100 dark:hover:bg-half-transparent hover:text-sky-700" />
          </button>
          <button
            onClick={retweetHandler}
            className="flex justify-center items-center gap-1 text-gray-600 dark:text-gray-200"
          >
            {isRetweet ? (
              <AiOutlineRetweet className="w-[40px] h-[40px] p-[12px] rounded-2xl text-green-500 hover:bg-green-100 dark:hover:bg-half-transparent hover:text-green-700" />
            ) : (
              <AiOutlineRetweet className="w-[40px] h-[40px] p-[12px] rounded-2xl hover:bg-green-100 dark:hover:bg-half-transparent hover:text-green-700" />
            )}
          </button>
          <button
            onClick={likeHandler}
            className="flex justify-center items-center gap-1 text-gray-600 dark:text-gray-200"
          >
            {isLiked ? (
              <AiFillHeart className="w-[40px] h-[40px] p-[12px] rounded-2xl text-red-600 hover:bg-red-100 dark:hover:bg-half-transparent hover:text-red-700" />
            ) : (
              <AiOutlineHeart className="w-[40px] h-[40px] p-[12px] rounded-2xl hover:bg-red-100 dark:hover:bg-half-transparent hover:text-red-700" />
            )}
          </button>
          <button
            onClick={bookmarkHandler}
            className="w-[40px] h-[40px] p-[12px] rounded-2xl hover:bg-sky-100 dark:hover:bg-half-transparent hover:text-sky-700"
          >
            {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
          </button>
        </div>
      </div>
    </div>
  );
};

export { SinglePostView };
