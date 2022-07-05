import React, { useState } from "react";
import { BsDot } from "react-icons/bs";
import { FaRegComment, FaRegBookmark, FaBookmark } from "react-icons/fa";
import { AiOutlineRetweet, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux/es/exports";
import moment from "moment";
import { BookmarkButton, LikeButton, RetweetButton } from "../Buttons";
const SinglePostView = ({ post }) => {
  const [isBookmarked, setIsBookmarked] = useState(post.is_bookmark);
  const [postDetailLikesCount, setPostDetailLikesCount] = useState(post.likes);
  const [postDetailSharesCount, setPostDetailSharesCount] = useState(
    post.share_count
  );
  const postPage = true;

  return (
    <div className="p-3 flex-col border-b border-light-border dark:border-dark-border duration-200">
      {post.is_retweet && (
        <div className="flex gap-2 pb-2">
          <AiOutlineRetweet className="w-[15px] h-[15px] text-gray-500 mb-2" />
          <p className="text-sm font-medium text-gray-500">
            {post.retweeted_by_username === post.current_user_username
              ? "You"
              : post.retweeted_by_fullname}{" "}
            rewuphfed
          </p>
        </div>
      )}
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
            <h6 className="font-semibold">{postDetailSharesCount}</h6>
            <p className="text-gray-800 dark:text-gray-400">Retweets</p>
          </div>
          <div className="flex gap-1">
            <h6 className="font-semibold">{postDetailLikesCount}</h6>
            <p className="text-gray-800 dark:text-gray-400 cursor-pointer hover:underline">
              {postDetailLikesCount === 1 ? "Like" : "Likes"}
            </p>
          </div>
        </div>
        <div className="flex justify-around">
          <RetweetButton
            post={post}
            isSinglePostView={true}
            setPostDetailSharesCount={setPostDetailSharesCount}
          />
          <LikeButton
            post={post}
            isSinglePostView={true}
            setPostDetailLikesCount={setPostDetailLikesCount}
          />
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

export { SinglePostView };
