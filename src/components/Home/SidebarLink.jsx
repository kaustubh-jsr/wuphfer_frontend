import React from "react";
import { useNavigate } from "react-router-dom";

const SidebarLink = ({ Icon, text, active, unread, path }) => {
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate(path);
  };
  return (
    <div
      className="flex justify-between gap-4 p-3 hover-effect relative"
      onClick={clickHandler}
    >
      <Icon className="text-2xl dark:text-white" />
      {unread && (
        <span className="flex h-2 w-2 absolute left-8">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
        </span>
      )}
      <p className={`text-lg ${active && "font-bold"} hidden xl:inline`}>
        {text}
      </p>
    </div>
  );
};

export default SidebarLink;
