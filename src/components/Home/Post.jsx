import React, { useEffect, useState } from "react";
import { BsDot } from "react-icons/bs";
import { FaRegComment, FaRegBookmark, FaBookmark } from "react-icons/fa";
import { AiOutlineRetweet, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import moment from "moment";
import { bookmarkPost } from "../../redux/asyncActions/feedActions";
const Post = ({ post }) => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false);
  const [isRetweet, setIsRetweet] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(post.is_bookmark);
  const navigate = useNavigate();

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
    // this dispatch saves the status to db, and updates the slice for feed, but
    // posts in profile and explore are not in redux store, so this dispatch just acts like an
    // api call to server for them, their client status is maintained in the local
    // isBookmarked state.
    dispatch(bookmarkPost(token, post));
    // the below statement reinforces correct bookmark status in case of posts displayed
    // anywhere apart from feed, like profile or explore
    setIsBookmarked((prev) => !prev);
  };

  return (
    <div
      className="p-3 flex border-b border-light-border dark:border-dark-border duration-200 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800"
      onClick={() => navigate(`/${post.user.username}/status/${post.id}`)}
    >
      <img
        src={post.user.profile_image}
        alt={post.user.username}
        className="h-14 w-14 rounded-full mr-4"
      />
      <div className="flex flex-col gap-1 w-full">
        <div className="flex justify-start flex-wrap sm:gap-1">
          <h4 className="font-bold">{post.user.full_name}</h4>
          <p className="text-gray-500">@{post.user.username}</p>

          <p className="flex items-center">
            <BsDot className="text-gray-500" />
          </p>
          {/* <p className="text-gray-500">{moment(post.timestamp).calendar()}</p> */}
          <p className="text-gray-500">
            {moment(post.timestamp).startOf("second").fromNow()}
          </p>
        </div>

        <div>
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

        <div className="flex justify-between mr-6 py-2">
          <button className="flex justify-center items-center gap-1 text-gray-600 dark:text-gray-200 ">
            <FaRegComment className="w-[40px] h-[40px] p-[12px] rounded-2xl hover:bg-sky-100 dark:hover:bg-half-transparent hover:text-sky-700" />
            <p>2</p>
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
            <p>25</p>
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

export { Post };
