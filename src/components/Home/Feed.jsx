import React, { useEffect, useState } from "react";
import { Post } from "..";
import { WoofInput } from "./WoofInput";
import { useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFeedPostsFromDB } from "../../redux/asyncActions/feedActions";
import { CircularProgress } from "@mui/material";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
const Feed = () => {
  const { posts } = useSelector((state) => state.feed);
  const { token, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // the outlet context lets the prop from parent route be passed to an outlet, since outlet can be any component
  // depending on child route, regular prop passing doesn't work instead context is passed which is accessible by any
  // outlet component rendered by using a useOutletContext hook
  const user = useOutletContext();
  const [currentPostContent, setCurrentPostContent] = useState("");
  const [loading, setLoading] = useState(true);
  useDocumentTitle("Home / Wuphfer");
  useEffect(() => {
    // retreive user feed from backend and update it in store
    if (isAuthenticated) {
      dispatch(setFeedPostsFromDB(token, setLoading));
    }
  }, [dispatch, token, isAuthenticated]);

  // useEffect(() => {
  //   const handleResize = () => {
  //     setScreenSize(window.innerWidth);
  //   };
  //   window.addEventListener("resize", handleResize);
  //   handleResize();
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  // useEffect(() => {

  // }, [screenSize]);
  return loading ? (
    <div className="flex justify-center">
      <CircularProgress
        size={30}
        thickness={4}
        value={100}
        className="mx-auto mt-8"
      />
    </div>
  ) : (
    <>
      <WoofInput
        user={user}
        currentPostContent={currentPostContent}
        setCurrentPostContent={setCurrentPostContent}
        isComment={false}
        // setPosts={setPosts}
      />
      <div className="pb-72">
        {posts.length ? (
          posts.map((post) => <Post key={post.id} post={post} />)
        ) : (
          <p className="flex justify-center font-normal text-lg pt-8">
            Your feed is empty, start following people to see their wuphfs in
            your feed
          </p>
        )}
      </div>
    </>
  );
};

export { Feed };
