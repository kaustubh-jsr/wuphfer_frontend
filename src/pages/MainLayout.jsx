import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserDetails as getUserDetailsApi } from "../api/homePage";
import { MainContainer, Sidebar } from "../components";
import RecommendedUsers from "../components/Home/RecommendedUsers";
import { toast } from "react-hot-toast";
import { feedActions } from "../redux/slices/feedSlice";
import { HiOutlineUser } from "react-icons/hi";
import ReconnectingWebSocket from "reconnecting-websocket";
import { AiFillHeart } from "react-icons/ai";

// const prodEndpoint = 'wss://127.0.0.1:8000/ws/notifications'

// const socketClient = new WebSocket(endpoint)
const MainLayout = () => {
  const { isAuthenticated, token } = useSelector((state) => state.auth);
  const { unreadNotifications } = useSelector((state) => state.feed);
  const { mode } = useSelector((state) => state.theme);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const localEndpoint = "ws://127.0.0.1:8000/ws/notifications";
  const prodEndpoint =
    "wss://wuphfer-backend-api.herokuapp.com/ws/notifications";
  let client;

  const websocketCon = () => {
    let notificationIcon;
    client = new WebSocket(`${localEndpoint}?token=${token}`);
    client.onopen = () => {
      console.log("Websocket connected");
    };

    client.onmessage = (event) => {
      const notification = JSON.parse(event.data).notification;

      console.log(notification, notification.type, notification.text);
      if (notification.type === "follow") {
        notificationIcon = <HiOutlineUser className="text-white h-6 w-6" />;
      } else if (notification.type === "like") {
        notificationIcon = <AiFillHeart className="text-pink-600 h-6 w-6" />;
      }
      dispatch(
        feedActions.notificationsRead({
          notificationsRead: false,
        })
      );
      const NotificationToast = (
        <div className="flex gap-2">
          {notificationIcon}
          <p>
            <span className="font-bold">{notification.userFullName}</span>{" "}
            {notification.text}
          </p>
        </div>
      );
      toast(NotificationToast, {
        id: notification.id,
        position: "top-left",
        duration: 5000,
        style: {
          color: "white",
          backgroundColor: "rgb(14, 165, 233)",
        },
      });
    };

    client.onclose = (e) => {
      console.log("Websocket disconnected.");
      console.log(e.reason);
    };

    client.onerror = (err) => {
      console.error(
        `Socket encountered error : ${err.message}, Closing socket`
      );
      client.close();
    };
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth", { state: { from: location } });
      window.location.reload();
    }
  }, [isAuthenticated, navigate, location]);

  useEffect(() => {
    // get user data like name, handle,avatar,cover,bio,created at
    const getUserDetails = async () => {
      const resp = await getUserDetailsApi(token);
      setUser((prev) => {
        return {
          first_name: resp.first_name,
          last_name: resp.last_name ? resp.last_name : "",
          full_name:
            resp.first_name + " " + (resp.last_name ? resp.last_name : ""),
          profile_image: resp.profile_image,
          cover_image: resp.cover_image,
          bio: resp.bio,
          username: resp.username,
        };
      });
      dispatch(
        feedActions.notificationsRead({
          notificationsRead: !resp.unread_notifications,
        })
      );
    };
    // this runs if the user is authenticated, but if there is no reload
    // then this should not run on MainContainer outlet change, or url change
    // but it is running when we go from home to profile
    if (isAuthenticated) {
      getUserDetails();
    }

    // get user feed in the Feed Component, User Profile in the Profile Component
  }, [token, isAuthenticated, dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      websocketCon();
    }
    return () => {
      if (client && client?.readyState === 1) {
        console.log(client);
        client.close();
      } else {
        console.log("no client socket open found, got this as client");
        console.log(client);
      }
    };
  }, [isAuthenticated]);

  return (
    <div className={mode}>
      <main className="min-h-screen flex dark:bg-main-dark-bg dark:text-white">
        <Sidebar user={user} unreadNotifications={unreadNotifications} />
        <MainContainer user={user} />
        <RecommendedUsers />
      </main>
    </div>
  );
};

export { MainLayout };
