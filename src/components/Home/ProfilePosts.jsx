import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProfilePosts as getProfilePostsApi } from "../../api/homePage";
import { Post } from "./Post";

const ProfilePosts = () => {
  const [profilePosts, setProfilePosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((state) => state.auth);
  const { username } = useParams();
  useEffect(() => {
    const getProfilePosts = async () => {
      const resp = await getProfilePostsApi(token, username);
      if (resp.status === 200) {
        setProfilePosts(resp.data.profilePosts);
      } else {
        toast.error(resp.data.message);
      }
      setLoading(false);
    };
    getProfilePosts();
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
      ) : profilePosts.length ? (
        profilePosts.map((post) => (
          <Post
            key={post.id}
            post={post}
            page="profile"
            setPosts={setProfilePosts}
          />
        ))
      ) : (
        <p className="flex justify-center font-normal text-lg pt-4">
          No posts here yet
        </p>
      )}
    </div>
  );
};

export default ProfilePosts;
