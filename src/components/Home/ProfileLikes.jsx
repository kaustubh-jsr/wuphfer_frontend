import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Post } from "./Post";
import { getLikedPosts as getLikedPostsApi } from "../../api/homePage";

const ProfileLikes = () => {
  const [likedPosts, setLikedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((state) => state.auth);
  const { username } = useParams();

  useEffect(() => {
    const getLikedPosts = async () => {
      const resp = await getLikedPostsApi(token, username);
      if (resp.status === 200) {
        setLikedPosts(resp.data.likedPosts);
      } else {
        toast.error(resp.data.message);
      }
      setLoading(false);
    };
    getLikedPosts();
  }, [token, username]);
  return (
    <div className="pb-72 flex flex-col">
      {loading ? (
        <CircularProgress
          size={30}
          thickness={4}
          value={100}
          className="mx-auto mt-8"
        />
      ) : likedPosts.length ? (
        likedPosts.map((post) => (
          <Post
            key={post.id}
            post={post}
            page="profile"
            setPosts={setLikedPosts}
          />
        ))
      ) : (
        <p className="flex justify-center font-normal text-lg pt-4">
          Liked wuphfs will show up here
        </p>
      )}
    </div>
  );
};

export default ProfileLikes;
