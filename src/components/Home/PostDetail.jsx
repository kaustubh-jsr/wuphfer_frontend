import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import { WoofInput } from "./WoofInput";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { SinglePostView } from "./SinglePostView";
import { useSelector } from "react-redux";
import { getPostDetail as getPostDetailApi } from "../../api/homePage";
import { CircularProgress } from "@mui/material";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { AnimatePresence } from "framer-motion";
// component renders the single post with all details and comments
//  on that post
const PostDetail = () => {
  const { post_id } = useParams();
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  // const { posts } = useSelector((state) => state.feed);
  // problem with below line when the u checkout feed of user u don't follow, his
  // posts are not in store, so u can't get the single detail view, since u are not hitting db here/
  // const post = posts.find((post) => post.id === Number(params.post_id));
  const user = useOutletContext();
  const [currentPostContent, setCurrentPostContent] = useState("");
  const [post, setPost] = useState();
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  useDocumentTitle("Wuphf / Wuphfer");
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    const getPostDetail = async () => {
      const resp = await getPostDetailApi(token, post_id);
      if (resp.status === 200) {
        setPost(resp.data.post);
        setComments(resp.data.comments);
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
      ) : post ? (
        <>
          <SinglePostView post={post} />
          <WoofInput
            user={user}
            isComment={true}
            currentPostContent={currentPostContent}
            setCurrentPostContent={setCurrentPostContent}
            setComments={setComments}
            parentPostId={post.id}
          />
          <AnimatePresence>
            {comments &&
              comments.map((comment) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  setComments={setComments}
                />
              ))}
          </AnimatePresence>

          {/* <Comment />
          <Comment />
          <Comment /> */}
        </>
      ) : (
        <p className="flex flex-col justify-center items-center gap-10">
          Hmm...this page doesn't exist. Try another page.
          <button
            onClick={() => navigate("/")}
            className="flex w-44 rounded-full justify-center itms-center py-3 bg-sky-500 hover:bg-sky-600 transition duration-200 ease-out text-white font-bold"
          >
            Home
          </button>
        </p>
      )}
    </div>
  );
};

export { PostDetail };
