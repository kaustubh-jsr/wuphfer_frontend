import React, { useState } from "react";
import { AiOutlineCheck, AiOutlineDelete } from "react-icons/ai";
import { deletePost } from "../../redux/asyncActions/feedActions";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
const DeleteTweetDialog = ({ deletePostRef, post, page, setPosts }) => {
  const [showConfirmDel, setShowConfirmDel] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.stopPropagation();
    if (showConfirmDel) {
      dispatch(deletePost(token, post, setLoading));
      if (page) {
        setPosts((posts) => posts.filter((tweet) => tweet.id !== post.id));
      }
    } else {
      setShowConfirmDel(true);
    }
  };
  return (
    <div
      ref={deletePostRef}
      className="absolute top-2 right-0 w-44 dark:bg-main-dark-bg dark:text-white flex-col justify-center items-start gap-2 border-2 shadow-md lg:rounded-md bg-white py-4"
    >
      <button
        onClick={handleDelete}
        className="hover-effect rounded-none w-full disabled:cursor-wait"
        disabled={loading}
      >
        <div className="flex gap-2 items-center py-2 lg:p-2 text-red-500">
          {showConfirmDel ? (
            loading ? (
              <>
                <CircularProgress color="error" size="1rem" />
                Deleting...
              </>
            ) : (
              <>
                <AiOutlineCheck />
                Confirm Deletion
              </>
            )
          ) : (
            <>
              <AiOutlineDelete />
              Delete
            </>
          )}
        </div>
      </button>
    </div>
  );
};

export default DeleteTweetDialog;
