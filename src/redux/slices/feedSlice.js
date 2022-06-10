import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

// the feed reducers should be able to
// set the complete feed from a payload sent from db
// add a post to starting of the feed (generally when user tweets on home page)
const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    postAdded(state, { payload }) {
      state.posts.unshift(payload.newPost);
    },
    clearFeedOnLogout(state) {
      state.posts = [];
    },
    setFeedPosts(state, { payload }) {
      state.posts = payload.postsFromDB;
    },
  },
});

export const feedActions = feedSlice.actions;
export const feedReducer = feedSlice.reducer;

// tweetAdded: (state, { payload }) => {
//     state.tweets.unshift(payload);
//   },
//   tweetDetail: (state, { payload }) => {
//     state.singleTweet = payload;
//   },
//   deletedSuccess: (state, { payload }) => {
//     state.tweets = state.tweets.filter((i) => i.id !== payload);
//   },
//   deletedMarkSuccess: (state, { payload }) => {
//     state.bookmarksList = state.bookmarksList.filter((i) => i.id !== payload);
//   },
//   setMeta:(state, { payload }) => {
//     state.meta = payload;
//   },
//   loadedMore:(state, { payload }) => {
//     state.tweets.push(...payload);
//   },
