// import axios from "axios";
// import { jwtDecode } from "jwt-decode";
// import { refreshToken } from "../store/reducers/auth/action-creators";
// import { useAppDispatch } from "../hooks/useAppDispatch";
// import { setupStore } from "../store/store";

// export const API_URL = process.env.REACT_APP_API_URL;

// const store = setupStore();
// const $api = axios.create({
//   withCredentials: true,
//   baseURL: API_URL,
// });

// axios.interceptors.request.use(
//   async (config) => {
//     let accessToken = localStorage.getItem("access_token");

//     if (accessToken) {
//       const decoded: any = jwtDecode(accessToken);
//       const now = Date.now() / 1000;

//       if (decoded.exp < now) {
//         await store.dispatch(refreshToken());
//         accessToken = localStorage.getItem("access_token");
//       }

//       if (accessToken) {
//         config.headers.Authorization = `Bearer ${accessToken}`;
//       }
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default $api;

// import axios from "axios";
// import { jwtDecode } from "jwt-decode";
// import { refreshToken } from "../store/reducers/auth/action-creators";
// import { useAppDispatch } from "../hooks/useAppDispatch";
// import { setupStore } from "../store/store";

// export const API_URL = process.env.REACT_APP_API_URL;

// const store = setupStore();
// const $api = axios.create({
//   withCredentials: true,
//   baseURL: API_URL,
// });

// axios.interceptors.request.use(
//   async (config) => {
//     let accessToken = localStorage.getItem("access_token");

//     if (accessToken) {
//       const decoded: any = jwtDecode(accessToken);
//       const now = Date.now() / 1000;

//       if (decoded.exp < now) {
//         await store.dispatch(refreshToken());
//         accessToken = localStorage.getItem("access_token");
//       }

//       if (accessToken) {
//         config.headers.Authorization = `Bearer ${accessToken}`;
//       }
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default $api;

export const axios = "gpvno";
