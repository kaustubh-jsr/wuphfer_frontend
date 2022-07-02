import React, { useEffect, useState } from "react";
import { BsDot } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import moment from "moment";
import { BookmarkButton, LikeButton, RetweetButton } from "../Buttons";
const Post = ({ post }) => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isRetweet, setIsRetweet] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(post.is_bookmark);
  const navigate = useNavigate();

  const retweetHandler = (e) => {
    e.stopPropagation();
    setIsRetweet((prev) => !prev);
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
          <RetweetButton
            post={post}
            retweetHandler={retweetHandler}
            isRetweet={isRetweet}
            isSinglePostView={false}
            retweetCount={15}
          />
          <LikeButton post={post} isSinglePostView={false} />
          <BookmarkButton
            post={post}
            isBookmarked={isBookmarked}
            setIsBookmarked={setIsBookmarked}
          />
        </div>
      </div>
    </div>
  );
};

export { Post };
