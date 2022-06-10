import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";

const Comment = () => {
  const [isLiked, setIsLiked] = useState(false);
  const likeHandler = (e) => {
    e.stopPropagation();
    setIsLiked((prev) => !prev);
  };
  return (
    <div className="p-3 flex border-b border-light-border dark:border-dark-border duration-200  hover:bg-slate-50 dark:hover:bg-slate-800">
      <img
        src="https://bit.ly/3wPiIQo"
        alt="Profile"
        className="h-14 w-14 rounded-full mr-4"
      />
      <div className="flex flex-col gap-1 w-full">
        <div className="flex gap-1">
          <h4 className="font-bold">Michael Scott</h4>
          <p className="text-gray-500">@michael</p>

          <p className="flex items-center">
            <BsDot className="text-gray-500" />
          </p>
          <p className="text-gray-500">6h</p>
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio non hic
          eligendi illum vero et est provident harum saepe consectetur, quaerat
          quisquam quia quibusdam magnam iste nobis voluptate sed qui?
        </div>
        <div className="flex justify-start gap-8 mr-6 py-2">
          <button className="flex justify-center items-center gap-1 text-gray-600 dark:text-gray-200 ">
            <FaRegComment className="w-[40px] h-[40px] p-[12px] rounded-2xl hover:bg-sky-100 dark:hover:bg-half-transparent hover:text-sky-700" />
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
            <p>56</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
