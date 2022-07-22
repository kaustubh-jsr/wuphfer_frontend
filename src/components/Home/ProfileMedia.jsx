import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMediaPosts as getMediaPostsApi } from "../../api/homePage";
import { Post } from "./Post";

const ProfileMedia = () => {
  const [mediaPosts, setMediaPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((state) => state.auth);
  const { username } = useParams();

  useEffect(() => {
    const getMediaPosts = async () => {
      const resp = await getMediaPostsApi(token, username);
      if (resp.status === 200) {
        setMediaPosts(resp.data.mediaPosts);
        console.log(resp.data.mediaPosts);
      } else {
        toast.error(resp.data.message);
      }
      setLoading(false);
    };
    getMediaPosts();
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
      ) : mediaPosts.length ? (
        mediaPosts.map((post) => <Post key={post.id} post={post} />)
      ) : (
        <p className="flex justify-center font-normal text-lg pt-4">
          Your media posts will show up here
        </p>
      )}
    </div>
  );
};

export default ProfileMedia;
