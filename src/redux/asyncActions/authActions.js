import { authActions } from "../slices/authSlice";
import { login as loginApi, logout as logoutApi } from "../../api/auth";

// This functions runs and sets the auth state in store on reloading or refetching the app from localStorage
export const setInitialAuthStatus = () => {
  return (dispatch) => {
    const userAuth = JSON.parse(localStorage.getItem("userAuth"));
    if (userAuth?.isAuthenticated) {
      dispatch(authActions.login({ token: userAuth.token }));
    }
  };
};
// Added extra user fields to auth slice, but then issue, is when profile is update, we need to have a reducer to
// update the values in store, if at all we are using them, and it seems we could use the store user details for
// things like posting a tweet, why?bcoz tweet is posted in WoofInput then, it needs to appear on feed, profile, etc.
//
export const login = (formData, callback, setLoading) => async (dispatch) => {
  try {
    setLoading(true);
    const resp_token = await loginApi(formData);
    if (resp_token) {
      dispatch(authActions.login({ token: resp_token }));
      localStorage.setItem(
        "userAuth",
        JSON.stringify({
          token: resp_token,
          isAuthenticated: true,
        })
      );
      // this callback for successfull login will generally navigate to home page
      callback();
    }
  } catch (e) {
    console.error(e);
  } finally {
    setLoading(false);
  }
};

export const logout = (token) => async (dispatch) => {
  // we have the token, call the api here, if response is succesfull from server,
  // remove the tokens,and dispatch logout
  try {
    const resp = await logoutApi(token);
    if (resp.status === "ok") {
      localStorage.removeItem("userAuth");
      // CAUTION : Due to same name of inbuilt action creator, and custom action creator, you can enter
      // an infinite loop if you do not finally call the inbuilt action creator, and instead incorrectly
      // call the same custom action creator inside itself, inside dispatch
      // here authActions.logout is provided by redux which we declared in slice, and logout is
      // created by us as thunk for API calls.
      dispatch(authActions.logout());
    }
  } catch (e) {
    console.error(e);
  }
};
