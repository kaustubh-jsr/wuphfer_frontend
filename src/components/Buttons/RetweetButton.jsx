import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineRetweet } from "react-icons/ai";
import { useSelector } from "react-redux";
import { repostUndoRepost as repostUndoRepostApi } from "../../api/homePage";

// This button is used in Post and SinglePostView components.
const RetweetButton = ({
  post,
  isSinglePostView,
  setPostDetailSharesCount,
}) => {
  const { token } = useSelector((state) => state.auth);
  const [retweetCount, setRetweetCount] = useState(post.share_count);
  const [isRetweetByMe, setIsRetweetByMe] = useState(post.retweeted_by_me);
  const retweetHandler = (e) => {
    e.stopPropagation();
    // update UI temporarily for faster response
    if (isRetweetByMe) {
      setRetweetCount((prev) => prev - 1);
      if (isSinglePostView) {
        setPostDetailSharesCount((prev) => prev - 1);
      }
    } else {
      setRetweetCount((prev) => prev + 1);
      if (isSinglePostView) {
        setPostDetailSharesCount((prev) => prev + 1);
      }
    }
    setIsRetweetByMe((prev) => !prev);

    // call the api to set the changes to DB
    (async () => {
      const { message, retweetStatus, totalShares } = await repostUndoRepostApi(
        token,
        post
      );
      // update the UI from the DB now, so that everything is in sync with DB
      setRetweetCount(totalShares);
      if (isSinglePostView) {
        setPostDetailSharesCount(totalShares);
      }
      toast.success(message, {
        position: "bottom-center",
        duration: 5000,
        style: {
          color: "white",
          backgroundColor: "rgb(14, 165, 233)",
        },
      });
      setIsRetweetByMe(retweetStatus === "retweeted");
    })();

    // 'A tricky issue encountered (Now resolved, but kept here for future reference/clarfication), also checkout the
    // generate_post_json function in the backend code for details'
    // if(isRetweet){
    //   // two types of isRetweet needed, one to check if the post is a repost
    //   // and the other to check if the repost is made by us
    //   // in the former case, we don't green the retweet button
    //   // in the later case we green the repost button.

    //   // Dilemma : What happens to the above marker of "XYZ retweeted" when
    //   // you retweet, the button turns green because button and other actions
    //   // are shown from the original post, but the above marker?
    //   // Nothing it remains as is, since the post you are currently
    //   // on (if it is a retweet) is actually a completely different post
    //   // from the original post, and so any action(retweet/like etc) by you
    //   // should reflect only on the buttons which are displaying info of the original
    //   // post the only thing unique about a retweet by someone else is
    //   // the marker of who retweeted, all else(like, comment, retweet) are shown from the original post
    //   // what about the marker that should appear on retweets by you?, you will have it in your profile
    //   // since it is essentially a new tweet by you, only difference between this retweet and your other tweets
    //   // is that the retweet has a parent tweet and no content,likes,shares,comments etc, instead the
    //   // the api gives the parent's properties to be dispalyed in the client for this retweet.
    // }
  };

  return (
    <button
      onClick={retweetHandler}
      className="flex justify-center items-center gap-1 text-gray-600 dark:text-gray-200"
    >
      {isRetweetByMe ? (
        <AiOutlineRetweet className="w-[40px] h-[40px] p-[12px] rounded-2xl text-green-500 hover:bg-green-100 dark:hover:bg-half-transparent hover:text-green-700" />
      ) : (
        <AiOutlineRetweet className="w-[40px] h-[40px] p-[12px] rounded-2xl hover:bg-green-100 dark:hover:bg-half-transparent hover:text-green-700" />
      )}
      {!isSinglePostView && <p>{retweetCount}</p>}
    </button>
  );
};

export default RetweetButton;
