import React, { useEffect, useState } from "react";
import { Post } from "..";
import { useDispatch, useSelector } from "react-redux";
import { bookmarkActions } from "../../redux/slices/bookmarkSlice";
import CircularProgress from "@mui/material/CircularProgress";
import { getBookmarks } from "../../api/homePage";

const Bookmarks = () => {
  const { bookmarks } = useSelector((state) => state.bookmark);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const resp = await getBookmarks(token);
      if (resp.status === "ok") {
        dispatch(
          bookmarkActions.setBookmarks({ bookmarksFromDB: resp.bookmarks })
        );
      }
    })();
    setLoading(false);
  }, [dispatch, token]);
  return (
    <div className="pb-72 flex flex-col">
      {loading ? (
        <CircularProgress
          size={30}
          thickness={4}
          value={100}
          className="mx-auto mt-8"
        />
      ) : bookmarks.length ? (
        bookmarks.map((post) => <Post key={post.id} post={post} />)
      ) : (
        <p className="flex justify-center font-normal text-lg pt-4">
          Your bookmarked wuphfs will show up here
        </p>
      )}
    </div>
  );
};

export { Bookmarks };
