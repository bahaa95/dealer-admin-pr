"use client";
import Axios from "axios";
import { CONFIG } from "@/config";
import cookie from "js-cookie";
import { redirect } from "next/navigation";
import { isValidToken, useAuth } from "../auth";
import { useRefreshToken } from "@/app/(auth)/login/_api";

export const usePrivateApi = () => {
  const { setAuth } = useAuth();
  const token = cookie.get("token");
  const { mutateAsync: refreshToken } = useRefreshToken();

  const axiosPrivate = Axios.create({
    baseURL: CONFIG.API_URL,
    headers: {
      "Content-Type": "application/json",
      "x-sas": "wifi",
      Authorization: `Bearar ${token}`,
    },
  });

  axiosPrivate.interceptors.request.use(
    async (request) => {
      request.headers.Authorization = `Bearer ${token}`;
      // let refreshTokenResponse: any | undefined;

      // //* generate new token if the current token is invalid
      // if (!isValidToken(token)) {
      //   refreshTokenResponse = await refreshToken();
      // }

      // await refreshToken();
      // request.headers.Authorization = `Bearar ${
      //   refreshTokenResponse?.accessToken || token
      // }`;

      return request;
    },
    (error) => Promise.reject(error)
  );

  axiosPrivate.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error?.response?.status == 401) {
        cookie.remove("token");
        setAuth((prev) => ({
          ...prev,
          isAuthenticated: false,
          token: null,
          username: null,
        }));
        redirect("/login");
      }
      return Promise.reject(error);
    }
  );
  return axiosPrivate;
};
