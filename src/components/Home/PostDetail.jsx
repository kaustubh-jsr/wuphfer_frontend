import React, { useEffect } from "react";
import Comment from "./Comment";
import { Post } from "..";
import { WoofInput } from "./WoofInput";

const PostDetail = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <div className="pb-72">
      <Post id={1} post="aplha beta" postPage={true} />
      <WoofInput isComment={true} />
      <Comment />
      <Comment />
      <Comment />
    </div>
  );
};

export { PostDetail };
