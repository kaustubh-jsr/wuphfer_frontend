import React from "react";
import { AiOutlineRetweet } from "react-icons/ai";
const RetweetButton = ({
  retweetHandler,
  isRetweet,
  isSinglePostView,
  retweetCount,
}) => {
  return (
    <button
      onClick={retweetHandler}
      className="flex justify-center items-center gap-1 text-gray-600 dark:text-gray-200"
    >
      {isRetweet ? (
        <AiOutlineRetweet className="w-[40px] h-[40px] p-[12px] rounded-2xl text-green-500 hover:bg-green-100 dark:hover:bg-half-transparent hover:text-green-700" />
      ) : (
        <AiOutlineRetweet className="w-[40px] h-[40px] p-[12px] rounded-2xl hover:bg-green-100 dark:hover:bg-half-transparent hover:text-green-700" />
      )}
      {!isSinglePostView && <p>{retweetCount}</p>}
    </button>
  );
};

export default RetweetButton;
