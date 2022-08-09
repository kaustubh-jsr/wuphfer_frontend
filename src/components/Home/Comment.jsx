import moment from "moment";
import React, { useRef, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsDot, BsThreeDots } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  likeUnlikeComment as likeUnlikeCommentApi,
  deleteComment as deleteCommentApi,
} from "../../api/homePage";
import useClickOutside from "../../hooks/useClickOutside";
import DeleteTweetDialog from "./DeleteTweetDialog";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const Comment = ({ comment, setComments }) => {
  // comment
  //  -> comment_user, comment_text,commented_on_user,timestamp,isCommentLiked,numCommentLikes
  const { token } = useSelector((state) => state.auth);
  const [isLiked, setIsLiked] = useState(comment.is_liked);
  const [likeCount, setLikeCount] = useState(comment.likes);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const deleteCommentRef = useRef();
  const handleDeleteComment = (e) => {
    e.stopPropagation();
    setShowDeleteDialog(true);
  };
  const onOutsiteDeleteDialogClick = () => {
    setShowDeleteDialog(false);
  };
  useClickOutside(deleteCommentRef, onOutsiteDeleteDialogClick);
  const likeHandler = () => {
    // set client side status for faster ux
    if (isLiked) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }
    setIsLiked((prev) => !prev);
    // call the api,and set likes accordingly
    (async () => {
      const resp = await likeUnlikeCommentApi(token, comment);
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
        setLikeCount((prev) => (prev > 1 ? prev - 1 : 0));
      }
    })();
  };

  const deleteComment = () => {
    (async () => {
      const resp = await deleteCommentApi(token, comment);
      if (resp.status === 200) {
        toast.success(resp.data.message, {
          position: "bottom-center",
          duration: 5000,
          style: {
            color: "white",
            backgroundColor: "rgb(14, 165, 233)",
          },
        });
      }
    })();
  };
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 0 }}
      whileInView={{ opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", duration: 0.8, delay: 0 }}
      className="px-3 pt-3 flex border-b border-light-border dark:border-dark-border duration-200  hover:bg-slate-50 dark:hover:bg-slate-800"
    >
      <img
        src={comment.user_profile_image}
        alt={comment.user_full_name}
        className="h-14 w-14 rounded-full mr-4"
      />
      <motion.div layout className="flex flex-col gap-1 w-full">
        <div className="flex gap-1">
          <h4 className="font-bold">{comment.user_full_name}</h4>
          <p className="text-gray-500">@{comment.user_username}</p>

          <p className="flex items-center">
            <BsDot className="text-gray-500" />
          </p>
          <p className="text-gray-500">
            {moment(comment.timestamp).startOf("second").fromNow()}
          </p>
          {comment.user_username === comment.current_user_username && (
            <button className="ml-auto" onClick={handleDeleteComment}>
              <BsThreeDots className="hover:bg-light-blue hover:text-blue-500 p-1 h-6 w-6 rounded-full" />
            </button>
          )}
          {comment.user_username === comment.current_user_username &&
            showDeleteDialog && (
              <div className="relative">
                <DeleteTweetDialog
                  post={comment}
                  deletePostRef={deleteCommentRef}
                  setPosts={setComments}
                  isComment={true}
                  deleteComment={deleteComment}
                />
              </div>
            )}
        </div>
        <p className="pb-2 text-gray-500 text-md">
          Replying to{" "}
          <Link
            to={`/${comment.post_username}`}
            className="text-sky-600 cursor-pointer hover:underline"
          >
            @{comment.post_username}
          </Link>
        </p>
        <div>{comment.text}</div>
        <div className="flex justify-start gap-8 mr-6 pt-2">
          <button
            onClick={likeHandler}
            className="flex justify-center items-center gap-1 text-gray-600 dark:text-gray-200"
          >
            {isLiked ? (
              <AiFillHeart className="w-[40px] h-[40px] p-[12px] rounded-2xl text-red-600 hover:bg-red-100 dark:hover:bg-half-transparent hover:text-red-700" />
            ) : (
              <AiOutlineHeart className="w-[40px] h-[40px] p-[12px] rounded-2xl hover:bg-red-100 dark:hover:bg-half-transparent hover:text-red-700" />
            )}
            <p>{likeCount}</p>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Comment;
