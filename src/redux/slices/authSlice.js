// createSlice
// regular function

import { createSlice } from "@reduxjs/toolkit";
// isAuthenticated variable is used for client side work, like route handling
// token is used for api calls to server.

// const initialState = {
//   isAuthenticated: false,
//   token: "",
//   // first_name: "",
//   // last_name: "",
//   // username: "",
//   // profile_image: "",
//   // bio: "",
//   // cover_image: "",
// };
// In the above approach we had a dispatch(setInitialAuthStatus()) in App.js so it rendered after complete app was rendered
// and then set the token
// in the below, we set for token as soon as it is found in localStorage, here during initialization
// the above approach can be useful, when we need initial data from server, and cannot store in localStorage,
//  like setInitialFeed

const initialState = JSON.parse(localStorage.getItem("userAuth"))
  ? JSON.parse(localStorage.getItem("userAuth"))
  : {
      isAuthenticated: false,
      token: "",
    };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      // state.username = action.payload.username;
      // state.first_name = action.payload.first_name;
      // state.last_name = action.payload.last_name;
      // state.profile_image = action.payload.profile_image;
      // state.bio = action.payload.bio;
      // state.cover_image = action.payload.cover_image;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.token = "";
      state.isAuthenticated = false;
    },
  },
});

// login Action Creator which is passed to dispatch in the Login component,
// this action creator calls the loginApi and if succesfull dispatches the auth token
// to the redux store and sets isAuthenticated true, now the login state can be accessed anywhere
// using the redux store.

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
