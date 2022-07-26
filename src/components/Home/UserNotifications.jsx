import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getNotifications as getNotificationsApi } from "../../api/homePage";
import NotificationLink from "./NotificationLink";
import { markNotificationsRead } from "../../redux/asyncActions/feedActions";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

const UserNotifications = () => {
  const dispatch = useDispatch();
  const initialNotifications = [
    {
      id: 1,
      type: "like",
      text: "liked your reply",
      userFullName: "Michael",
      postLink: "/status/405",
      userProfileLink: "/michael_scott",
      userProfilePhoto:
        "https://res.cloudinary.com/kaustubh-apps/image/upload/v1655066288/e8x4hpsttdwlbuhl7y4j.jpg",
      time: "2 days ago",
    },
    {
      id: 2,
      type: "rewuphf",
      text: "rewuphfed your wuphf",
      userFullName: "Michael",
      postLink: "/status/405",
      userProfileLink: "/michael_scott",
      userProfilePhoto:
        "https://res.cloudinary.com/kaustubh-apps/image/upload/v1655066288/e8x4hpsttdwlbuhl7y4j.jpg",
      time: "6 days ago",
    },
    {
      id: 3,
      type: "follow",
      text: "followed you",
      userFullName: "Ryan",
      postLink: "/status/405",
      userProfileLink: "/ryan_howard",
      userProfilePhoto:
        "https://res.cloudinary.com/kaustubh-apps/image/upload/v1654781366/owemuzdrr1mknmhld9xo.jpg",
      time: "2 days ago",
    },
  ];

  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState(initialNotifications);
  useDocumentTitle("Notifications / Wuphfer");
  useEffect(() => {
    // get the notifications from server
    (async () => {
      const notifications_list = await getNotificationsApi(token);
      setNotifications(notifications_list);
      setLoading(false);
    })();

    const timerId = setTimeout(() => {
      dispatch(markNotificationsRead(token));
      setNotifications((prevNotifs) =>
        prevNotifs.map((notif) => {
          if (!notif.seen) {
            notif.seen = true;
          }
          return notif;
        })
      );
    }, 2500);

    return () => clearTimeout(timerId);
  }, [token, dispatch]);
  return (
    <div className="pb-72">
      {loading ? (
        <div className="flex justify-center items-center w-full">
          <CircularProgress
            size={30}
            thickness={4}
            value={100}
            className="mx-auto mt-8 text-center"
          />
        </div>
      ) : notifications.length ? (
        notifications.map((notification) => (
          <NotificationLink
            key={notification.id}
            id={notification.id}
            type={notification.type}
            text={notification.text}
            postLink={notification.postLink}
            userFullName={notification.userFullName}
            userProfileLink={notification.userProfileLink}
            userProfilePhoto={notification.userProfilePhoto}
            notificationForContent={notification.notificationForContent}
            time={notification.time}
            seen={notification.seen}
          />
        ))
      ) : (
        <p className="pt-2 text-lg flex justify-center items-center w-full">
          Your notifications will appear here
        </p>
      )}
    </div>
  );
};

export default UserNotifications;
