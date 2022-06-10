import { createSlice } from "@reduxjs/toolkit";

// const initialState = { mode: "light", color: "blue" };
const initialState = JSON.parse(localStorage.getItem("theme"))
  ? JSON.parse(localStorage.getItem("theme"))
  : { mode: "light", color: "blue" };

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleThemeMode(state) {
      state.mode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem(
        "theme",
        JSON.stringify({
          ...state,
          mode: state.mode,
        })
      );
    },
  },
});

export const themeActions = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
