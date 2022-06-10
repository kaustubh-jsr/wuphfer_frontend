import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserDetails as getUserDetailsApi } from "../api/homePage";
import { MainContainer, Sidebar } from "../components";
import RecommendedUsers from "../components/Home/RecommendedUsers";

const MainLayout = () => {
  const { isAuthenticated, token } = useSelector((state) => state.auth);
  const { mode } = useSelector((state) => state.theme);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth", { state: { from: location } });
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
    };
    // this runs if the user is authenticated, but if there is no reload
    // then this should not run on MainContainer outlet change, or url change
    // but it is running when we go from home to profile
    if (isAuthenticated) {
      getUserDetails();
    }
    // get user feed in the Feed Component, User Profile in the Profile Component
  }, [token, isAuthenticated]);

  return (
    <div className={mode}>
      <main className="min-h-screen flex dark:bg-main-dark-bg dark:text-white">
        <Sidebar user={user} />
        <MainContainer user={user} />
        <RecommendedUsers />
      </main>
    </div>
  );
};

export { MainLayout };
