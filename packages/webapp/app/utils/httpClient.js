import axios from "axios";
import { authenricator, authenticator } from "./authenticator";

const httpClient = axios.create({
  baseURL: "http://localhost:5000/"
});

httpClient.interceptors.request.use(
  async function(config) {
    const token = authenticator.getAccessToken();
    if (token !== null) config.headers["Authorization"] = `Bearer ${token}`;

    return Promise.resolve(config);
  },
  function(err) {
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(undefined, async error => {
  const originalRequest = error.config;
  const status = error.response.status;
  if (status !== 401) return Promise.reject(error);
  var refreshToken = authenticator.getRefreshToken();

  if (!refreshToken) return Promise.reject(error);
  originalRequest.headers["Authorization"] = `Bearer ${refreshToken}`;
  return axios.request(originalRequest.data);
});



export {httpClient};