import { CircularProgress } from "@mui/material";
import React from "react";
import { Post } from "./Post";

const ProfileLikes = () => {
  return (
    <div className="pb-72 flex">
      <CircularProgress
        size={30}
        thickness={4}
        value={100}
        className="mx-auto mt-8"
      />
    </div>
  );
};

export default ProfileLikes;
