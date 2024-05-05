"use client";
import Axios, { AxiosInstance } from "axios";
import { CONFIG } from "@/config";
import cookie from "js-cookie";

export const privateApi = (): AxiosInstance => {
  const accessToken = cookie.get("token");

  const axiosPrivate = Axios.create({
    baseURL: CONFIG.API_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearar ${accessToken}`,
    },
  });

  axiosPrivate.interceptors.request.use(
    async (request) => {
      request.headers.Authorization = `Bearer ${accessToken}`;
      return request;
    },
    (error) => Promise.reject(error)
  );

  axiosPrivate.interceptors.response.use(
    (response) => response,
    async (error) => {
      return Promise.reject(error);
    }
  );
  return axiosPrivate;
};
