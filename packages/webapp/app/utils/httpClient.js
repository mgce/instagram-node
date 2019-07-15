/* eslint-disable prefer-destructuring */
import axios from 'axios';
import { authenticator } from './authenticator';

const httpClient = axios.create({
  baseURL: 'http://localhost:5000/',
});

function getNewAccessToken() {
  const refreshToken = authenticator.getRefreshToken();
  httpClient
    .get(`tokens/${refreshToken}`)
    .then((result) => {
      authenticator.setTokens(result.token, null);
      return result.token;
    })
    .catch((err) => {
      console.log(err);
    });
}

httpClient.interceptors.request.use(
  async (config) => {
    const token = authenticator.getAccessToken();
    if (token !== null) config.headers.Authorization = `${token}`;

    return Promise.resolve(config);
  },
  (err) => Promise.reject(err),
);

httpClient.interceptors.response.use(
  async (response) => Promise.resolve(response.data),
  async (error) => {
    const originalRequest = error.config;
    if (!error.response) return Promise.reject(error);
    const status = error.response.status;
    if (status !== 401) return Promise.reject(error);
    const newAccessToken = await getNewAccessToken();

    if (!newAccessToken) return Promise.reject(error);
    originalRequest.headers.Authorization = `${newAccessToken}`;
    return axios.request(originalRequest);
  },
);



export { httpClient };
