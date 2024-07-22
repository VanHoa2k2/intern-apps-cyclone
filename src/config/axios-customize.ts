import axios from "axios";
import { Mutex } from "async-mutex";
import { store } from "@/redux/store";
import { setRefreshTokenAction } from "@/redux/slice/accountSlice";

const instance = axios.create({
  baseURL: process.env.BACKEND_URL as string,
});

const mutex = new Mutex();
const NO_RETRY_HEADER = "x-no-retry";

const handleRefreshToken = async (): Promise<any> => {
  const refreshToken = window.localStorage.getItem("refresh_token");
  try {
    return await mutex.runExclusive(async () => {
      const res = await instance.post("refresh", {
        refreshToken,
      });
      if (res) return res;
      else return null;
    });
  } catch (error) {
    console.log("Error refreshing token:", error);
    throw error; // Rethrow the error after logging
  }
};

instance.interceptors.request.use(function (config) {
  if (
    typeof window !== "undefined" &&
    window &&
    window.localStorage &&
    window.localStorage.getItem("access_token")
  ) {
    config.headers.Authorization =
      "Bearer " + window.localStorage.getItem("access_token");
  }
  if (!config.headers.Accept && config.headers["Content-Type"]) {
    config.headers.Accept = "application/json";
    config.headers["Content-Type"] = "application/json; charset=utf-8";
  }
  return config;
});

instance.interceptors.response.use(
  (res) => {
    return res.data;
  },
  async (error) => {
    if (
      error.config &&
      error.response &&
      +error.response.status === 401 &&
      error.config.url !== "login" &&
      !error.config.headers[NO_RETRY_HEADER]
    ) {
      try {
        const token = await handleRefreshToken();
        error.config.headers[NO_RETRY_HEADER] = "true";
        if (token) {
          error.config.headers["Authorization"] = `Bearer ${token.accessToken}`;
          localStorage.setItem("access_token", token.accessToken);
          localStorage.setItem("refresh_token", token.refreshToken);
          return instance.request(error.config);
        }
      } catch (error) {
        console.log("Error in response interceptor:", error);
      }
    }

    if (
      error.config &&
      error.response &&
      +error.response.status === 400 &&
      error.config.url === "refresh" &&
      location.pathname.startsWith("/admin")
    ) {
      const message =
        error?.response?.message ?? "Có lỗi xảy ra, vui lòng login.";
      import("@/redux/store").then(({ store }) => {
        import("@/redux/slice/accountSlice").then(
          ({ setRefreshTokenAction }) => {
            store.dispatch(setRefreshTokenAction({ status: true, message }));
          }
        );
      });
    }

    return error?.response ?? Promise.reject(error);
  }
);

/**
 * Replaces main `axios` instance with the custom-one.
 *
 * @param cfg - Axios configuration object.
 * @returns A promise object of a response of the HTTP request with the 'data' object already
 * destructured.
 */
// const axios = <T>(cfg: AxiosRequestConfig) => instance.request<any, T>(cfg);

// export default axios;

export default instance;
