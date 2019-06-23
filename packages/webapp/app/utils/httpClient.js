import axios from "axios";
import { authenricator, authenticator } from "./authenticator";

const httpClient = axios.create({
  baseURL: "http://localhost:5000/"
});

httpClient.interceptors.request.use(
  async function(config) {
    const token = authenticator.getAccessToken();
    if (token !== null) config.headers["Authorization"] = `${token}`;

    return Promise.resolve(config);
  },
  function(err) {
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  async response => Promise.resolve(response.data),
  async error => {
    const originalRequest = error.config;
    if (!error.response) return Promise.reject(error);
    const status = error.response.status;
    if (status !== 401) return Promise.reject(error);
    var newAccessToken = await getNewAccessToken();

    if (!newAccessToken) return Promise.reject(error);
    originalRequest.headers["Authorization"] = `${newAccessToken}`;
    return axios.request(originalRequest);
  }
);

function getNewAccessToken() {
  const refreshToken = authenticator.getRefreshToken();
  httpClient
    .get("token/" + refreshToken)
    .then(result => {
      authenticator.setTokens(result.token, null);
      return result.token;
    })
    .catch(err => {
      console.log(err);
    });
}

export { httpClient };
