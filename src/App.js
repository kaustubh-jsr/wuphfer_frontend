import React from "react";
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
import ProfilePosts from "./components/Home/ProfilePosts";
import ProfileMedia from "./components/Home/ProfileMedia";
import ProfileLikes from "./components/Home/ProfileLikes";
import UserNotifications from "./components/Home/UserNotifications";
import { Bookmarks } from "./components/Home/Bookmarks";
import Explore from "./components/Home/Explore";

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
          <Route path=":username/status/:post_id" element={<PostDetail />} />
          <Route path=":username" element={<Profile />}>
            <Route index element={<ProfilePosts />} />
            <Route path="media" element={<ProfileMedia />} />
            <Route path="likes" element={<ProfileLikes />} />
          </Route>
          <Route path="notifications" element={<UserNotifications />} />
          <Route path="bookmarks" element={<Bookmarks />} />
          <Route path="explore" element={<Explore />} />
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
