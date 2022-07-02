import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillHeart, AiOutlineRetweet } from "react-icons/ai";
import { HiOutlineUser } from "react-icons/hi";
import moment from "moment";

const NotificationLink = ({
  id,
  type,
  text,
  postLink,
  userFullName,
  userProfileLink,
  userProfilePhoto,
  time,
  seen,
}) => {
  const notificationIcon =
    type === "like" ? (
      <AiFillHeart className="h-8 w-8 text-pink-600" />
    ) : type === "rewuphf" ? (
      <AiOutlineRetweet className="h-8 w-8 text-green-500" />
    ) : (
      <HiOutlineUser className="h-8 w-8 text-sky-500" />
    );
  if (!seen) {
    console.log(seen, id);
  }
  const notificationLink =
    type === "like"
      ? "/status/400"
      : type === "rewuphf"
      ? "/status/500"
      : userProfileLink;

  const navigate = useNavigate();
  return (
    <div
      to={notificationLink}
      onClick={() => navigate(postLink)}
      className={`${
        !seen && "bg-slate-200 dark:bg-slate-900"
      } flex gap-4 py-6 pl-8 border-b border-light-border dark:border-dark-border duration-200 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800`}
    >
      {notificationIcon} {seen}
      <div className="flex flex-col gap-2">
        <img
          src={userProfilePhoto}
          alt="User"
          className="h-10 w-10 rounded-full mr-4"
        />
        <p>
          <Link to={userProfileLink} className="font-bold hover:underline">
            {userFullName}
          </Link>{" "}
          {text}
          <span className="text-gray-500">
            {" "}
            . {moment(time).startOf("second").fromNow()}
          </span>
        </p>
      </div>
    </div>
  );
};

export default NotificationLink;
