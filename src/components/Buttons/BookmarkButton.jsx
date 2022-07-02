import React from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { bookmarkPost } from "../../redux/asyncActions/feedActions";
const BookmarkButton = ({ post, isBookmarked, setIsBookmarked }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

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
    <button
      onClick={bookmarkHandler}
      className="w-[40px] h-[40px] p-[12px] rounded-2xl hover:bg-sky-100 dark:hover:bg-half-transparent hover:text-sky-700"
    >
      {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
    </button>
  );
};

export default BookmarkButton;
