import React, { useEffect, useState } from "react";
import { Post } from "..";
import { useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFeedPostsFromDB } from "../../redux/asyncActions/feedActions";
const Feed = () => {
  const { posts } = useSelector((state) => state.feed);
  const { token, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  //   useEffect(() => {

  //   },[])
  return (
    <div className="pb-72 flex flex-col">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export { Feed };
