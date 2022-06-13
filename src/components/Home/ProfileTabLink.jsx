import React from "react";
import { NavLink } from "react-router-dom";

const ProfileTabLink = ({ tabHeader, linkAddres, end }) => {
  return (
    <NavLink
      to={linkAddres}
      className={({ isActive }) =>
        `${
          isActive
            ? "text-md font-extrabold border-b-4 border-blue-500 hover:bg-slate-100  dark:hover:bg-hover-dark-bg flex-grow pt-4 flex justify-center pb-2"
            : "font-normal text-md hover:bg-slate-100  dark:hover:bg-hover-dark-bg flex-grow pt-4 flex justify-center pb-2"
        }`
      }
      end
    >
      {tabHeader}
    </NavLink>
  );
};

export default ProfileTabLink;
