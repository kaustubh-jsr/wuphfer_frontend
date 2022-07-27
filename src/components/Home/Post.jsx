import React, { useEffect, useState } from "react";
import { BsDot } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { BookmarkButton, LikeButton, RetweetButton } from "../Buttons";
import { AiOutlineRetweet } from "react-icons/ai";
const Post = ({ post }) => {
  //IMP INFO For Retweet States :
  // Retweet states need to be in this parent component, instead of localizing
  // in the retweet button, like we did for the like button, because
  // based on the retweet status, we need a marker of ("Someone retweeted") on the
  // post and the single post page, both of which are parents to the retweet button

  // The isRetweetByMe state (now moved to RetweetButton component)is for button color green
  //  on self retweet or default otherwise this state is different from isRetweet state,
  // isRetweet is for whether the post
  // is a retweet at all by anyone we follow, and decides whether a marker should
  // be shown above the tweet, the below state, is for whether the retweet btn
  // should be active or not.Both states coincide when user encounters his own retweet
  // const [isRetweetByMe, setIsRetweetByMe] = useState(post.retweeted_by_me);
  const [isBookmarked, setIsBookmarked] = useState(post.is_bookmark);
  const navigate = useNavigate();
  let postLink;
  if (post.is_retweet) {
    postLink = `/${post.retweeted_by_username}/status/${post.id}`;
  } else {
    postLink = `/${post.user.username}/status/${post.id}`;
  }
  return (
    <div
      className="p-3 flex border-b border-light-border dark:border-dark-border duration-200 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800"
      onClick={() => navigate(postLink)}
    >
      <div className="mr-4 flex flex-col items-end">
        {post.is_retweet && (
          <AiOutlineRetweet className="w-[15px] h-[15px] text-gray-500 mb-2" />
        )}
        <img
          src={post.user.profile_image}
          alt={post.user.username}
          className="h-14 w-14 rounded-full"
        />
      </div>
      <div className="flex flex-col gap-1 w-full">
        {post.is_retweet && (
          <Link
            to={`/${post.retweeted_by_username}`}
            className="text-sm font-medium text-gray-500 hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            {post.retweeted_by_username === post.current_user_username
              ? "You"
              : post.retweeted_by_fullname}{" "}
            rewuphfed
          </Link>
        )}
        <div className="flex justify-start flex-wrap sm:gap-1">
          <Link
            to={`/${post.user.username}`}
            className="font-bold hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            {post.user.full_name}
          </Link>
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
            <p>{post.comments_count}</p>
          </button>
          <RetweetButton post={post} isSinglePostView={false} />
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
