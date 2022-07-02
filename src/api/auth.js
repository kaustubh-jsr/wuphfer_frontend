import { apiClient, BASE_URL } from "./";
import toast from "react-hot-toast";

export const signup = async (formData, callback) => {
  try {
    console.log(formData.get("email"));
    const resp = await apiClient({
      method: "POST",
      url: `${BASE_URL}/signup`,
      data: formData,
    });
    if (resp.status === 201) {
      toast.success(resp.data.message, {
        position: "top-right",
        duration: 5000,
        style: {
          color: "white",
          backgroundColor: "rgb(14, 165, 233)",
        },
      });
      callback();
    } else if (resp.status === 400) {
      toast.error(resp.data.message, {
        position: "top-right",
        duration: 5000,
      });
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
    } else if (error.request) {
      console.log(error.request);
      console.log(error.request);
    }
    toast.error(error.response.data.message, {
      position: "top-right",
      duration: 5000,
    });
  }
};

export const login = async (formData) => {
  try {
    const resp = await apiClient({
      method: "POST",
      url: `${BASE_URL}/login`,
      data: formData,
    });
    if (resp.status === 201) {
      toast.success(resp.data.message, {
        position: "top-right",
        duration: 5000,
        style: {
          color: "white",
          backgroundColor: "rgb(14, 165, 233)",
        },
      });
      //   the callback can be passed to thunk and called there after successfull login
      //   callback();
      return resp.data.auth_token;
    } else if (resp.status === 400 || resp.status === 401) {
      toast.error(resp.data.message, {
        position: "top-right",
        duration: 5000,
      });
      return "";
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
    } else if (error.request) {
      console.log(error.request);
      console.log(error.request);
    }
    toast.error(error.response.data.message, {
      position: "top-right",
      duration: 5000,
    });
  }
  return "";
};

export const logout = async (token) => {
  console.log("inside lgout Api");
  try {
    const resp = await apiClient({
      method: "GET",
      headers: {
        "Auth-Token": token ? token : "",
      },
      url: `${BASE_URL}/logout`,
    });
    if (resp.status === 200) {
      console.log("success from server");
      toast.success(resp.data.message, {
        position: "top-right",
        duration: 5000,
        style: {
          color: "white",
          backgroundColor: "rgb(14, 165, 233)",
        },
      });
    } else {
      toast.error(resp.data.message, {
        position: "top-right",
        duration: 5000,
      });
    }
    return resp.data;
  } catch (error) {
    console.log(`after signout resp in error auth token is ${token}`);
    if (error.response) {
      console.error(error.response.data);
      console.error(error.response.data.non_field_errors[0]);
      console.error(error.response.status);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
    console.log(error.config);
  }
};
