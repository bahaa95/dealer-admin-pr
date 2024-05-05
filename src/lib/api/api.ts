import Axios from "axios";
import { CONFIG } from "@/config";

export const api = Axios.create({
  baseURL: CONFIG.API_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);
