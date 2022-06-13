import { CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { followUnfollowUser as followUnfollowUserApi } from "../../api/homePage";
import { setFeedPostsFromDB } from "../../redux/asyncActions/feedActions";

const OtherUserWidget = ({ otherUser }) => {
  // The isRecommended flag (now removed ) tells, if the user was recommended by server(meaning we don't follow them yet)
  // In that case no need to check from server to set isFollowing, it is false

  // This flag is useful to reuse this widget in the following and follower list anywhere
  // there users are not recommended and then we can hit the api to check the status

  //   Check if you are following the otherUser, and setIsFollowing accordingly
  const { token } = useSelector((state) => state.auth);
  const [followedByMe, setFollowedByMe] = useState(otherUser.followed_by_me);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {
  // // call the api to see if the user is followed, if the isRecommended is false
  // // if(!isRecommended){
  // //     // apiCall
  // //     // setIsFollowing(true)
  // // }
  // },[])

  // on widget click go the otherUser profile
  const redirectToUserProfile = () => {
    navigate(`/${otherUser.username}`);
  };

  const followUnfollowHandler = async (e) => {
    e.stopPropagation();
    // call the api to follow or unfollow
    // One way to prevent API calls for each and every user widget, just to check if we follow them
    // is to send a flag, say iFollow=true/false from server, while creating the list.
    setLoading(true);
    const resp = await followUnfollowUserApi(token, otherUser.username);
    // if user follows or unfollows another user
    // set the current user feed from DB to reflect the changes
    dispatch(setFeedPostsFromDB(token));
    setLoading(false);
    if (resp === 200) {
      setFollowedByMe((prev) => !prev);
    }
  };
  return (
    <div
      onClick={redirectToUserProfile}
      className="flex justify-between items-center px-2 py-2 gap-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-hover-dark-bg"
    >
      <div className="flex gap-1 items-center">
        <img
          className="w-12 h-12 rounded-full"
          src={otherUser.profile_image}
          alt={otherUser.username}
        />
        <div className="flex flex-col">
          <p className="font-bold">{`${otherUser.first_name} ${otherUser.last_name}`}</p>
          <p className="text-sm text-gray-500">@{otherUser.username}</p>
        </div>
      </div>
      <button
        onClick={followUnfollowHandler}
        className="px-4 py-1 rounded-2xl font-bold bg-black text-white dark:bg-white dark:text-black"
      >
        {loading ? <CircularProgress /> : followedByMe ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default OtherUserWidget;
