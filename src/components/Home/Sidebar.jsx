import React, { useRef, useState } from "react";
import { FaTwitter, FaHashtag, FaRegBookmark, FaEye } from "react-icons/fa";
import { MdMailOutline, MdMoreHoriz } from "react-icons/md";
import { BiHome } from "react-icons/bi";
import { HiOutlineUser } from "react-icons/hi";
import { IoNotificationsOutline } from "react-icons/io5";
import { CgMoreO } from "react-icons/cg";
import SidebarLink from "./SidebarLink";
import useClickOutside from "../../hooks/useClickOutside";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/asyncActions/authActions";
import { feedActions } from "../../redux/slices/feedSlice";

const Sidebar = ({ user }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const logoutModalRef = useRef();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logout(token));
    // dispatch the feed that was in redux store
    // and after login, reset the feed in store from the backend
    dispatch(feedActions.clearFeedOnLogout());
  };

  const onOutsideLogoutModalClick = () => {
    setShowLogoutModal(false);
  };

  useClickOutside(logoutModalRef, onOutsideLogoutModalClick);
  return (
    <header className="hidden sm:flex flex-col flex-[0.3] flex-shrink justify-between items-center overflow-auto xl:ml-[110px] fixed z-40 h-screen dark:text-white xl:px-12 py-1 ">
      <div className="nav-main flex flex-col gap-[2px] items-start ">
        <FaTwitter className="text-[50px] text-sky-500 dark:text-white px-3 hover-effect" />
        <SidebarLink text="Home" Icon={BiHome} active path="/" />
        {/* <div className="flex justify-between gap-4 p-3 hover:bg-slate-200 dark:hover:bg-hover-dark-bg transition duration-200 cursor-pointer rounded-full">
          <FaHashtag className="text-2xl dark:text-white" />
          <p className="text-lg font-normal">Explore</p>
        </div> */}
        <SidebarLink text="Explore" Icon={FaHashtag} path="/explore" />
        <SidebarLink text="Profile Viewers" Icon={FaEye} />
        <SidebarLink
          text="Notifications"
          Icon={IoNotificationsOutline}
          unread
        />
        <SidebarLink text="Messages" Icon={MdMailOutline} />
        <SidebarLink text="Bookmarks" Icon={FaRegBookmark} />
        <SidebarLink text="Profile" Icon={HiOutlineUser} path={user.username} />
        <SidebarLink text="More" Icon={CgMoreO} />

        <div className="mt-2 hidden xl:inline">
          <button className="flex w-44 rounded-full justify-center itms-center py-3 bg-sky-500 hover:bg-sky-600 transition duration-200 ease-out text-white font-bold">
            Woof
          </button>
        </div>
      </div>
      <div className="relative">
        {showLogoutModal && (
          <div
            ref={logoutModalRef}
            className="absolute dark:bg-main-dark-bg dark:text-white flex-col justify-center items-start gap-2 bottom-20 right-2 border-2 shadow-md lg:rounded-md bg-white py-4"
          >
            <p>
              <Link
                className="flex items-center py-2 lg:p-2 hover-effect rounded-none"
                to={user.username}
              >
                Profile
              </Link>
            </p>
            <p>
              <button
                className="flex items-center lg:p-2 hover-effect rounded-none"
                onClick={logoutHandler}
              >
                Logout
              </button>
            </p>
          </div>
        )}
        <div
          className="flex relative justify-start items-center gap-2 p-4 hover-effect"
          onClick={() => setShowLogoutModal((prev) => !prev)}
        >
          <img
            className="w-10 h-10 rounded-full xl:mr-2.5"
            src={user.profile_image}
            alt={user.full_name}
          />
          <div className="hidden xl:flex items-center gap-3">
            <div className="flex flex-col">
              <p className="font-bold leading-5 text-sm">{user.full_name}</p>
              <p className="text-gray-600 text-sm dark:text-gray-400">
                {`@${user.username}`}
              </p>
            </div>
            <MdMoreHoriz />
          </div>
        </div>
      </div>
    </header>
  );
};

export { Sidebar };
