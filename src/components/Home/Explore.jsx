import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { CircularProgress } from "@mui/material";
import { Post } from "./Post";
import { getAllPosts as getAllPostsApi } from "../../api/homePage";

const Explore = () => {
  const [explorePosts, setExplorePosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((state) => state.auth);

  useDocumentTitle("Explore / Wuphfer");
  useEffect(() => {
    const getAllPosts = async () => {
      const resp = await getAllPostsApi(token);
      setExplorePosts(resp.explorePosts);
      setLoading(false);
    };
    // retreive all posts from backend and update it in store
    getAllPosts();
  }, [token]);
  return (
    <div className="pb-72">
      {loading ? (
        <div className="flex justify-center items-center w-full">
          <CircularProgress
            size={30}
            thickness={4}
            value={100}
            className="mx-auto mt-8 text-center"
          />
        </div>
      ) : explorePosts.length ? (
        explorePosts.map((post) => <Post key={post.id} post={post} />)
      ) : (
        <p className="flex justify-center font-normal text-lg pt-8">
          Your explore page is empty, wuphfs will appear as people start
          wuphfing.
        </p>
      )}
    </div>
  );
};

export default Explore;
