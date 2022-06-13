import React from "react";
import { Outlet } from "react-router-dom";

const Authentication = () => {
  return (
    <div className="flex flex-col-reverse sm:flex-row h-full justify-center">
      <div className="sm:w-1/2 h-screen flex justify-center items-center">
        <img src="/auth-page-image.svg" alt="Login/Signup" />
      </div>
      <div className="flex flex-col justify-center items-center bg-slate-50 h-screen sm:w-1/2">
        <h1 className="font-bold text-[32px]">Welcome to Wuphfer</h1>
        <Outlet />
      </div>
    </div>
  );
};

export default Authentication;
