import React, { useEffect, useState } from "react";
import { BiCalendar, BiLink } from "react-icons/bi";
import { useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import {
  getUserProfile as getUserProfileApi,
  followUnfollowUser as followUnfollowUserApi,
  getProfilePosts as getProfilePostsApi,
} from "../../api/homePage";
import EditProfileModal from "./EditProfileModal";
import moment from "moment";
import { CircularProgress } from "@mui/material";
import ProfileTabLink from "./ProfileTabLink";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

const Profile = () => {
  const { token, isAuthenticated } = useSelector((state) => state.auth);
  const user = useOutletContext();
  const { username } = useParams();
  const [profileUser, setProfileUser] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  useDocumentTitle(`${profileUser?.full_name} / Wuphfer`);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth", { state: { from: location } });
    } else {
      // api call to get profile data from server, including tweets, media tweets , likes
      // followedByMe determines the state of follow/unfollow button
      // follows me shows a small tag of FOLLOWS YOU
      const getUserProfile = async () => {
        const { status, profile_user_details } = await getUserProfileApi(
          token,
          username
        );
        if (status === "ok") {
          setProfileUser({
            first_name: profile_user_details.first_name,
            last_name: profile_user_details.last_name,
            full_name:
              profile_user_details.first_name +
              " " +
              (profile_user_details.last_name
                ? profile_user_details.last_name
                : ""),
            profile_image: profile_user_details.profile_image,
            cover_image: profile_user_details.cover_image,
            username: profile_user_details.username,
            email: profile_user_details.email,
            bio: profile_user_details.bio,
            website: profile_user_details.website,
            doj: moment(profile_user_details.doj).format("MMMM Do YYYY"),
            num_of_followers: profile_user_details.num_of_followers,
            num_of_following: profile_user_details.num_of_following,
            followed_by_me: profile_user_details.followed_by_me,
            follows_me: profile_user_details.follows_me,
          });
        } else {
          setProfileUser({
            full_name: "",
            profile_image: "",
            cover_image: "",
            username: username,
          });
        }
        setLoading(false);
      };

      getUserProfile();
    }

    // if no such user exists display no such user @username
  }, [username, token, isAuthenticated, location, navigate]);

  const followUnfollowHandler = async (e) => {
    e.stopPropagation();
    // call the api to follow or unfollow
    // One way to prevent API calls for each and every user widget, just to check if we follow them
    // is to send a flag, say iFollow=true/false from server, while creating the list.
    setBtnLoading(true);
    const resp = await followUnfollowUserApi(token, profileUser.username);
    setBtnLoading(false);
    if (resp === 200) {
      setProfileUser((prev) => {
        return {
          ...prev,
          followed_by_me: !prev.followed_by_me,
          num_of_followers: !prev.followed_by_me
            ? prev.num_of_followers + 1
            : prev.num_of_followers - 1,
        };
      });
    }
  };

  const [showEditModal, setShowEditModal] = useState(false);
  // check for profileUser full_name,will give true, only when the user is found
  // but will give falsy value in two cases during data fetching, this is undefined
  // and when user is actually not found from server, to tackle the former case
  // where we might show user not exist even for valid user when data is loading
  // check if the loading is true, when profileuser full name is falsy.
  return profileUser?.full_name !== "" &&
    profileUser?.full_name !== undefined ? (
    <div className="flex flex-col">
      {/* Profile header with images, bio and following */}
      <div className="flex flex-col">
        {/* cover image */}
        <img
          src={profileUser.cover_image}
          alt="Cover"
          className="h-48 object-cover"
        />
        {/* profile pic (absolute ?)  name, handle edit profile bio date etc.*/}
        <div className="flex flex-col">
          {/* avatar and edit profile button at the two extremes */}
          <div className="flex relative">
            <img
              src={profileUser.profile_image}
              alt="Avatar"
              className="absolute top-[-64px] left-2 h-36 w-36 rounded-full object-cover border-4 border-white"
            />
            {user.username === profileUser.username ? (
              <button
                onClick={() => setShowEditModal((prev) => !prev)}
                className="bg-white dark:bg-secondary-dark-bg dark:hover:bg-hover-dark-bg dark:text-white border-2 font-semibold rounded-full hover:bg-slate-100 h-12 py-1 px-4 ml-auto mr-2 mt-4"
              >
                Edit Profile
              </button>
            ) : (
              <button
                onClick={followUnfollowHandler}
                disabled={btnLoading}
                className="rounded-full disabled:cursor-not-allowed disabled:opacity-75 font-bold bg-black text-white dark:bg-secondary-dark-bg dark:hover:bg-hover-dark-bg dark:text-white border-2 h-12 py-1 px-4 ml-auto mr-2 mt-4"
              >
                {profileUser.followed_by_me ? "Unfollow" : "Follow"}
              </button>
            )}
          </div>
          {/* Name, handle bio, date, following followers */}
          <div className="flex flex-col mt-8 mx-4 gap-3">
            {/* Name and handle */}
            <div className="flex flex-col">
              <h2 className="font-bold">{profileUser.full_name}</h2>
              <p className="text-gray-500 dark:text-gray-300 font-light">
                {`@${username}`}{" "}
                {profileUser.follows_me ? (
                  <span className="text-xs ml-2 bg-gray-200 dark:bg-gray-600 p-1 rounded-md">
                    Follows you
                  </span>
                ) : (
                  <span></span>
                )}
              </p>
            </div>
            {/* Bio */}
            <p>{profileUser.bio}</p>
            {/* date of joining */}
            <div className="flex gap-4 text-gray-500 dark:text-gray-300 items-center">
              {profileUser.website && (
                <div className="flex gap-1 items-center">
                  <BiLink />
                  <a
                    href={`https://${profileUser.website}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {profileUser.website}
                  </a>
                </div>
              )}
              <div className="flex gap-1 items-center">
                <BiCalendar />
                <p>Joined {profileUser.doj}</p>
              </div>
            </div>
            {/* Followers Following */}
            <div className="flex gap-4">
              <div
                // to={`/${username}/following`}
                className="font-extralight text-sm"
              >
                <span className="font-bold">
                  {profileUser.num_of_following}
                </span>{" "}
                Following
              </div>
              <div
                // to={`/${username}/followers`}
                className="font-extralight text-sm"
              >
                <span className="font-bold">
                  {profileUser.num_of_followers}
                </span>{" "}
                Followers
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Tabs which navigate to tweets and likes nad in future media */}

      <div className="flex border-b-2 mt-2 dark:border-dark-border justify-evenly h-12 items-end">
        {/* The end prop ensures the link is not active is child paths are active,
          specially important for index links since, other links are always child of them. */}
        <ProfileTabLink linkAddres="" tabHeader="Wuphfs" end={true} />
        <ProfileTabLink linkAddres="media" tabHeader="Media" />
        <ProfileTabLink linkAddres="likes" tabHeader="Likes" end={true} />
      </div>

      {/* The below outlet is for tab switched between tweets, media and likes */}
      {/* You can get all the data, like profile and tweets at once, and then outlet them, so that, when u switch between tabs it is wmooth */}
      <Outlet />
      <EditProfileModal
        user={profileUser}
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        setProfileUser={setProfileUser}
      />
    </div>
  ) : loading ? (
    <div className="flex justify-center mt-4">
      <CircularProgress />
    </div>
  ) : (
    <div className="flex flex-col justify-center items-center w-screen">
      <h2 className="flex ml-48 text-xl font-bold w-full">
        @{username} No such user found.
      </h2>
    </div>
  );
};

export { Profile };
