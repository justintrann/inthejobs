import axios from "axios";
import { getUserInfo, removeUserInfo } from "./localStorage";

const customFetch = axios.create({
  baseURL: "https://jobify-prod.herokuapp.com/api/v1/toolkit",
});

customFetch.interceptors.request.use(
  (config) => {
    const user = getUserInfo();
    if (user) config.headers["Authorization"] = `Bearer ${user.token}`;
    // if (user) config.headers["Authorization"] = `Bearer `;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
customFetch.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      window.location.href = "/";
      removeUserInfo();
    }
    return Promise.reject(error);
  }
);
export default customFetch;
