import React, { useEffect, useState } from "react";
import { Post } from "..";
import { WoofInput } from "./WoofInput";
import { useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFeedPostsFromDB } from "../../redux/asyncActions/feedActions";
const Feed = () => {
  const { posts } = useSelector((state) => state.feed);
  const { token, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // the outlet context lets the prop from parent route be passed to an outlet, since outlet can be any component
  // depending on child route, regular prop passing doesn't work instead context is passed which is accessible by any
  // outlet component rendered by using a useOutletContext hook
  const user = useOutletContext();
  // const [posts, setPosts] = useState([]);
  const [currentPostContent, setCurrentPostContent] = useState("");
  useEffect(() => {
    // retreive user feed from backend and update it in store
    if (isAuthenticated) {
      dispatch(setFeedPostsFromDB(token));
      console.log("render feed");
    }
  }, [dispatch, token, isAuthenticated]);
  return (
    <>
      <WoofInput
        user={user}
        currentPostContent={currentPostContent}
        setCurrentPostContent={setCurrentPostContent}
        // setPosts={setPosts}
      />
      <div className="pb-72">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </>
  );
};

export { Feed };
