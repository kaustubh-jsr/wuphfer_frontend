import React from "react";
import { Post } from "./Post";

const SelfLikes = () => {
  return (
    <div className="pb-72">
      <Post id={1} post="aplha beta" postPage={false} />
      <Post id={1} post="aplha beta" postPage={false} />
      <Post id={1} post="aplha beta" postPage={false} />
    </div>
  );
};

export default SelfLikes;
