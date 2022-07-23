import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookmarks: [],
};

export const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    addBookmark(state, { payload }) {
      state.bookmarks.unshift(payload.post);
    },
    removeBookmark(state, { payload }) {
      state.bookmarks = state.bookmarks.filter(
        (post) => post.id !== payload.post.id
      );
    },
    clearBookmarksOnLogout(state) {
      state.bookmarks = [];
    },
    setBookmarks(state, { payload }) {
      state.bookmarks = payload.bookmarksFromDB;
    },
  },
});

export const bookmarkActions = bookmarkSlice.actions;
export const bookmarkReducer = bookmarkSlice.reducer;
