import React, { useEffect, useState } from "react";
import { BsSun, BsMoonStars } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { themeActions } from "../../redux/slices/themeSlice";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const MainContainer = ({ user }) => {
  const [containerTitle, setContainerTitle] = useState("Home");
  const { mode } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleTheme = () => {
    dispatch(themeActions.toggleThemeMode());
  };

  useEffect(() => {
    if (location.pathname === "/") {
      setContainerTitle("Home");
    } else if (location.pathname.split("/")[2] === "status") {
      setContainerTitle("Tweet");
    } else {
      setContainerTitle("Profile");
    }
  }, [location.pathname]);

  const goBackHandler = () => {
    navigate(-1);
  };
  return (
    <div className="grow max-w-2xl sm:ml-[73px] xl:ml-[420px] border-x-2 border-light-border dark:border-dark-border">
      <div className="flex items-center bg-white bg-opacity-20 backdrop-blur-xl dark:bg-main-dark-bg dark:bg-opacity-20 sm:justify-between py-2 px-3 sticky top-0 z-50 border-b border-light-border dark:border-dark-border">
        {containerTitle !== "Home" && (
          <BiArrowBack
            onClick={goBackHandler}
            className="hover-effect w-10 h-10 p-2 mr-6"
          />
        )}
        <h2 className="text-lg sm:text-xl font-semibold">{containerTitle}</h2>
        <div
          onClick={toggleTheme}
          className="p-3 flex justify-center items-center ml-auto rounded-full hover-bg cursor-pointer hover:bg-slate-200 dark:hover:bg-hover-dark-bg transition duration-200"
        >
          {mode === "dark" ? (
            <BsSun className="h-5 w-5" />
          ) : (
            <BsMoonStars className="h-5 w-5" />
          )}
        </div>
      </div>
      {/* This is outlet for the mid section which will render profile, feed, single tweet etc. as per url */}
      <Outlet context={user} />
    </div>
  );
};

export { MainContainer };
