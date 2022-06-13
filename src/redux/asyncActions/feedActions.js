import toast from "react-hot-toast";
import {
  addPost as addPostApi,
  getFeedPosts as getFeedPostsApi,
} from "../../api/homePage";
import { feedActions } from "../slices/feedSlice";

// write a postAdded action creator thunk to save the post to backend
export const postAdded = (token, newPost) => async (dispatch) => {
  // here formData is post values like content, image etc, as form
  try {
    const resp = await addPostApi(token, newPost);
    if (resp.status === 200) {
      toast.success("Your Wuphf has been sent.");
      newPost = {
        ...newPost,
        timestamp: resp.data.new_post.timestamp,
        id: resp.data.new_post.id,
      };
      dispatch(feedActions.postAdded({ newPost }));
      // callback()
    } else {
      console.error("error from server in adding post");
    }
  } catch (e) {
    console.error(e);
  }
};

export const setFeedPostsFromDB = (token) => async (dispatch) => {
  try {
    const resp = await getFeedPostsApi(token);
    if (resp.status === 200) {
      dispatch(
        feedActions.setFeedPosts({ postsFromDB: resp.data.postsFromDB })
      );
    } else {
      console.error("Problem getting feed from DB.");
    }
  } catch (e) {
    console.error(e);
  }
};
