import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import {
  Feed,
  ForgotPassword,
  Login,
  Signup,
  PostDetail,
  Profile,
} from "./components";
import Authentication from "./pages/Authentication";
import { MainLayout } from "./pages/MainLayout";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setInitialAuthStatus } from "./redux/asyncActions/authActions";
import SelfTweets from "./components/Home/SelfTweets";
import SelfMedia from "./components/Home/SelfMedia";
import SelfLikes from "./components/Home/SelfLikes";

const App = () => {
  // const dispatch = useDispatch();

  // here check for authentication using useEffect or somethin and dispatch appropriate actions
  // useEffect(() => {
  //   dispatch(setInitialAuthStatus());
  // }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Feed />} />
          <Route path=":username/:post_id" element={<PostDetail />} />
          <Route path=":username" element={<Profile />}>
            <Route index element={<SelfTweets />} />
            <Route path="media" element={<SelfMedia />} />
            <Route path="likes" element={<SelfLikes />} />
          </Route>
        </Route>
        <Route path="auth" element={<Authentication />}>
          <Route index element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="forgot_password" element={<ForgotPassword />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
