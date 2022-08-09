import toast from "react-hot-toast";
import {
  addPost as addPostApi,
  bookmarkUnbookmarkPost as bookmarkUnbookmarkPostApi,
  getFeedPosts as getFeedPostsApi,
  markNotificationsRead as markNotificationsReadApi,
  deletePost as deletePostApi,
} from "../../api/homePage";
import { bookmarkActions } from "../slices/bookmarkSlice";
import { feedActions } from "../slices/feedSlice";

// write a postAdded action creator thunk to save the post to backend
export const postAdded = (token, newPost) => async (dispatch) => {
  // here formData is post values like content, image etc, as form
  try {
    const resp = await addPostApi(token, newPost);
    if (resp.status === 200) {
      toast.success("Your Wuphf has been sent.", {
        position: "bottom-center",
        duration: 5000,
        style: {
          color: "white",
          backgroundColor: "rgb(14, 165, 233)",
        },
      });
      newPost = {
        ...newPost,
        timestamp: resp.data.new_post.timestamp,
        id: resp.data.new_post.id,
        isBookmark: resp.data.new_post.is_bookmark,
        current_user_username: resp.data.new_post.current_user_username,
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

export const setFeedPostsFromDB = (token, setLoading) => async (dispatch) => {
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
  } finally {
    setLoading(false);
  }
};

export const bookmarkPost = (token, post) => async (dispatch) => {
  try {
    const resp = await bookmarkUnbookmarkPostApi(token, post);
    if (resp.status === 200) {
      dispatch(
        feedActions.bookmarkFeedPost({
          id: post.id,
          is_bookmark: resp.data.status === "removed" ? 0 : 1,
        })
      );
      if (resp.data.status === "removed") {
        dispatch(bookmarkActions.removeBookmark({ post: post }));
      } else {
        dispatch(bookmarkActions.addBookmark({ post: resp.data.post }));
      }
      toast.success(resp.data.message, {
        position: "bottom-center",
        duration: 5000,
        style: {
          color: "white",
          backgroundColor: "rgb(14, 165, 233)",
        },
      });
    } else {
      console.error("Problem updating bookmark.");
    }
  } catch (e) {
    console.error(e);
  }
};

export const markNotificationsRead = (token) => async (dispatch) => {
  try {
    const resp = await markNotificationsReadApi(token);
    if (resp.status === "ok") {
      dispatch(feedActions.notificationsRead({ notificationsRead: true }));
    } else {
      console.error("Problem updating notification read status.");
    }
  } catch (e) {
    console.error(e);
  }
};

export const deletePost = (token, post, setLoading) => async (dispatch) => {
  try {
    setLoading(true);
    const resp = await deletePostApi(token, post);
    if (resp.status === 200) {
      dispatch(feedActions.deletePost({ post_id: post.id }));
      toast.success(resp.data.message, {
        position: "bottom-center",
        duration: 5000,
        style: {
          color: "white",
          backgroundColor: "rgb(14, 165, 233)",
        },
      });
    } else {
      console.error("Problem deleting wuphf.");
    }
  } catch (e) {
    console.error(e);
  } finally {
    setLoading(false);
  }
};
