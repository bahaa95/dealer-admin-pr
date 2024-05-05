import { UseMutationOptions } from "@/lib/query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import cookies from "js-cookie";
import { ILoginResponse, ILoginSchema } from "../_types";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import cookie from "js-cookie";

interface UseRefreshTokenOptions {
  config?: UseMutationOptions<any, void>;
}

export const useRefreshToken = (options: UseRefreshTokenOptions = {}) => {
  const { config } = options;
  const { auth, setAuth } = useAuth();
  const accessToken = cookie.get("token");

  const mutationFn = async () => {
    const response = await api.post<ILoginResponse>(
      "/auth/refresh",
      { jwt: accessToken },
      {
        headers: { "x-sas": auth.sas, Authorization: `Bearar ${accessToken}` },
      }
    );

    // save token to cookie
    cookies.set("token", response.data?.token, { path: "/" });

    // set auth context
    setAuth((prev) => ({
      ...prev,
      isAuthenticated: true,
      token: response.data?.token,
      username: response.data?.manager?.username,
    }));

    return response.data;
  };

  return useMutation({
    mutationFn,
    mutationKey: ["refresh-token"],
    ...config,
  });
};
