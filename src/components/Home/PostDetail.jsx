import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import { WoofInput } from "./WoofInput";
import { useOutletContext, useParams } from "react-router-dom";
import { SinglePostView } from "./SinglePostView";
import { useSelector } from "react-redux";
import { getPostDetail as getPostDetailApi } from "../../api/homePage";
import toast from "react-hot-toast";
import { CircularProgress } from "@mui/material";
// component renders the single post with all details and comments
//  on that post
const PostDetail = () => {
  const { post_id } = useParams();
  const { token } = useSelector((state) => state.auth);
  // const { posts } = useSelector((state) => state.feed);
  // problem with below line when the u checkout feed of user u don't follow, his
  // posts are not in store, so u can't get the single detail view, since u are not hitting db here/
  // const post = posts.find((post) => post.id === Number(params.post_id));
  const user = useOutletContext();
  const [currentPostContent, setCurrentPostContent] = useState("");
  const [post, setPost] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    const getPostDetail = async () => {
      const resp = await getPostDetailApi(token, post_id);
      if (resp.status === 200) {
        setPost(resp.data.post);
      } else {
        toast.error(resp.data.message);
      }
      setLoading(false);
    };
    getPostDetail();
  }, [token, post_id]);
  return (
    <div className="pb-72 flex flex-col">
      {loading ? (
        <CircularProgress
          size={30}
          thickness={4}
          value={100}
          className="mx-auto mt-8"
        />
      ) : (
        <>
          <SinglePostView post={post} />
          <WoofInput
            user={user}
            isComment={true}
            currentPostContent={currentPostContent}
            setCurrentPostContent={setCurrentPostContent}
          />
          <Comment />
          <Comment />
          <Comment />
        </>
      )}
    </div>
  );
};

export { PostDetail };
