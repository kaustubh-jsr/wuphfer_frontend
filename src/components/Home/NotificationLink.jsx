import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillHeart, AiOutlineRetweet } from "react-icons/ai";
import { HiOutlineUser } from "react-icons/hi";
import moment from "moment";
import { FaRegComment } from "react-icons/fa";

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
  notificationForContent,
}) => {
  let notificationIcon;
  if (type === "like") {
    notificationIcon = <AiFillHeart className="h-8 w-8 text-pink-600" />;
  } else if (type === "rewuphf") {
    notificationIcon = <AiOutlineRetweet className="h-8 w-8 text-green-500" />;
  } else if (type === "comment") {
    notificationIcon = <FaRegComment className="h-8 w-8 text-green-500" />;
  } else if (type === "follow") {
    notificationIcon = <HiOutlineUser className="h-8 w-8 text-sky-500" />;
  }

  if (!seen) {
    console.log(seen, id);
  }

  const navigate = useNavigate();

  const goToUserProfile = (e) => {
    e.stopPropagation();
    navigate(userProfileLink);
  };
  return (
    <div
      onClick={() => navigate(postLink)}
      className={`${
        !seen && "bg-slate-200 dark:bg-slate-900"
      } flex gap-4 py-6 pl-8 border-b border-light-border dark:border-dark-border duration-200 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800`}
    >
      {notificationIcon}
      <div className="flex flex-col gap-2">
        <img
          src={userProfilePhoto}
          alt="User"
          className="h-10 w-10 rounded-full mr-4"
        />
        <p>
          <span onClick={goToUserProfile} className="font-bold hover:underline">
            {userFullName}
          </span>{" "}
          {text}
          <span className="text-gray-500">
            {" "}
            . {moment(time).startOf("second").fromNow()}
          </span>
        </p>
        {type !== "follow" && (
          <p className="pt-4 font-normal text-sm text-gray-500 dark:text-gray-300">
            {notificationForContent}
          </p>
        )}
      </div>
    </div>
  );
};

export default NotificationLink;
