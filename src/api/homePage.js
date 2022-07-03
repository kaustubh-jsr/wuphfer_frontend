import { apiClient, BASE_URL } from "./";
import toast from "react-hot-toast";

// API calls for generating Home Feed, Recommended Users
export const getUserDetails = async (token) => {
  try {
    const resp = await apiClient({
      method: "GET",
      headers: {
        "Auth-Token": token ? token : "",
      },
      url: `${BASE_URL}/get_user_details`,
    });
    if (resp.status === 200) {
      return resp.data.user_details;
    } else {
      toast.error(resp.data.message, {
        position: "top-right",
        duration: 5000,
      });
    }
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
      console.error(error.response.data);
      console.error(error.response.status);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
    console.log(error.config);
  }
};

export const getUserProfile = async (token, username) => {
  try {
    const resp = await apiClient({
      method: "GET",
      url: `${BASE_URL}/get_user_profile`,
      headers: {
        "Auth-Token": token ? token : "",
      },
      params: {
        username,
      },
    });
    if (resp.status === 200) {
      return resp.data;
    } else {
      toast.error(resp.data.message, {
        position: "top-right",
        duration: 5000,
      });
    }
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
      console.error(error.response.status);
    }
    // } else if (error.request) {
    //   console.log(error.request);
    // } else {
    //   console.log("Error", error.message);
    // }
    console.log(error.config);
  }
};
export const updateUserProfile = async (token, formData) => {
  try {
    const resp = await apiClient({
      method: "POST",
      url: `${BASE_URL}/user_profile`,
      headers: {
        "Auth-Token": token ? token : "",
      },
      data: formData,
    });
    if (resp.status === 200) {
      return resp.data;
    } else {
      toast.error(resp.data.message, {
        position: "top-right",
        duration: 5000,
      });
    }
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
      console.error(error.response.status);
    }
    // } else if (error.request) {
    //   console.log(error.request);
    // } else {
    //   console.log("Error", error.message);
    // }
    console.log(error.config);
  }
};

export const getRecommendedUsers = async (token) => {
  try {
    const resp = await apiClient({
      method: "GET",
      url: `${BASE_URL}/get_recommended_users`,
      headers: {
        "Auth-Token": token ? token : "",
      },
    });
    if (resp.status === 200) {
      return resp.data.data;
    } else {
      toast.error(resp.data.message, {
        position: "top-right",
        duration: 5000,
      });
    }
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
      console.error(error.response.status);
    }
    // } else if (error.request) {
    //   console.log(error.request);
    // } else {
    //   console.log("Error", error.message);
    // }
    console.log(error.config);
  }
};

export const followUnfollowUser = async (token, otherUserName) => {
  try {
    const formData = new FormData();
    formData.append("other_username", otherUserName);
    const resp = await apiClient({
      method: "POST",
      url: `${BASE_URL}/follow_unfollow_user`,
      headers: {
        "Auth-Token": token ? token : "",
      },
      data: formData,
    });
    return resp.status;
  } catch (e) {
    toast.error("Something went wrong! It's not you it's us.");
  }
};

export const addPost = async (token, newPost) => {
  try {
    const formData = new FormData();
    for (let key in newPost) {
      formData.append(key, newPost[key]);
    }
    const resp = await apiClient({
      method: "POST",
      url: `${BASE_URL}/add_post`,
      headers: {
        "Auth-Token": token ? token : "",
      },
      data: formData,
    });
    return resp;
  } catch (e) {
    console.error(e.response);
  }
};

export const getFeedPosts = async (token) => {
  try {
    const resp = await apiClient({
      method: "GET",
      url: `${BASE_URL}/get_feed_posts`,
      headers: {
        "Auth-Token": token ? token : "",
      },
    });
    return resp;
  } catch (e) {
    console.error(e);
  }
};

export const getProfilePosts = async (token, username) => {
  try {
    const resp = await apiClient({
      method: "GET",
      url: `${BASE_URL}/get_profile_data`,
      headers: {
        "Auth-Token": token ? token : "",
      },
      params: {
        username,
      },
    });
    return resp;
  } catch (e) {
    console.error(e);
  }
};

export const getMediaPosts = async (token, username) => {
  try {
    const resp = await apiClient({
      method: "GET",
      url: `${BASE_URL}/get_profile_media_posts`,
      headers: {
        "Auth-Token": token ? token : "",
      },
      params: {
        username,
      },
    });
    return resp;
  } catch (e) {
    console.error(e);
  }
};

export const getLikedPosts = async (token, username) => {
  try {
    const resp = await apiClient({
      method: "GET",
      url: `${BASE_URL}/get_profile_liked_posts`,
      headers: {
        "Auth-Token": token ? token : "",
      },
      params: {
        username,
      },
    });
    return resp;
  } catch (e) {
    console.error(e);
  }
};

export const getPostDetail = async (token, post_id) => {
  try {
    const resp = await apiClient({
      method: "GET",
      url: `${BASE_URL}/get_post_detail`,
      headers: {
        "Auth-Token": token ? token : "",
      },
      params: {
        post_id,
      },
    });
    return resp;
  } catch (e) {
    console.error(e);
    return e.response.data;
  }
};

export const bookmarkUnbookmarkPost = async (token, post) => {
  const formData = new FormData();
  formData.append("post_id", post.id);
  const resp = await apiClient({
    method: "POST",
    url: `${BASE_URL}/bookmark_unbookmark_post`,
    headers: {
      "Auth-token": token,
    },
    data: formData,
  });
  return resp;
};

export const getNotifications = async (token) => {
  try {
    const resp = await apiClient({
      method: "GET",
      url: `${BASE_URL}/get_notifications`,
      headers: {
        "Auth-Token": token ? token : "",
      },
    });
    return resp.data.notifications;
  } catch (e) {
    console.error(e);
  }
};

export const markNotificationsRead = async (token) => {
  try {
    const resp = await apiClient({
      method: "GET",
      url: `${BASE_URL}/mark_notification_read`,
      headers: {
        "Auth-Token": token ? token : "",
      },
    });
    return resp.data;
  } catch (e) {
    console.error(e);
  }
};

export const likeUnlikePost = async (token, post) => {
  try {
    const formData = new FormData();
    formData.append("post_id", post.id);
    const resp = await apiClient({
      method: "POST",
      url: `${BASE_URL}/like_unlike_post`,
      headers: {
        "Auth-token": token,
      },
      data: formData,
    });
    return resp.data;
  } catch (e) {
    toast.error(e.response.data.message, {
      position: "bottom-center",
      duration: 5000,
      style: {
        color: "white",
        backgroundColor: "rgb(14, 165, 233)",
      },
    });
    return { status: "failed" };
  }
};

export const addComment = async (token, postId, text) => {
  try {
    const formData = new FormData();
    formData.append("postId", postId);
    formData.append("text", text);
    const resp = await apiClient({
      method: "POST",
      url: `${BASE_URL}/add_comment`,
      headers: {
        "Auth-Token": token ? token : "",
      },
      data: formData,
    });
    if (resp.status === 200) {
      return resp.data;
    }
  } catch (e) {
    console.error(e.response);
    toast.error(e.response.data.message, {
      position: "bottom-center",
      duration: 5000,
      style: {
        color: "white",
        backgroundColor: "rgb(14, 165, 233)",
      },
    });
  }
};

export const likeUnlikeComment = async (token, comment) => {
  try {
    const formData = new FormData();
    formData.append("comment_id", comment.id);
    const resp = await apiClient({
      method: "POST",
      url: `${BASE_URL}/like_unlike_comment`,
      headers: {
        "Auth-token": token,
      },
      data: formData,
    });
    return resp.data;
  } catch (e) {
    toast.error(e.response.data.message, {
      position: "bottom-center",
      duration: 5000,
      style: {
        color: "white",
        backgroundColor: "rgb(14, 165, 233)",
      },
    });
    return { status: "failed" };
  }
};
