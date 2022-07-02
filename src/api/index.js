import axios from "axios";
export const BASE_URL = "https://wuphfer-backend-api.herokuapp.com";
// export const BASE_URL = "http://127.0.0.1:8000";

export const apiClient = axios.create({
  xsrfHeaderName: "X-CSRFToken",
  xsrfCookieName: "csrftoken",
});

export const uploadMedia = async ({ type, preset, file }) => {
  const formData = new FormData();
  formData.append("upload_preset", preset);
  formData.append("file", file);

  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/kaustubh-apps/${type}/upload`,
    formData
  );

  return response.data.secure_url;
};
