import { privateApi } from "@/lib/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ILoginResponse, IMeResponse } from "../_types";
import { UseQueryOptions } from "@/lib/query";
import cookies from "js-cookie";
import { useAuth } from "@/lib/auth";

interface UseGetInfoOptions {
  config?: UseQueryOptions<IMeResponse>;
}

export const useGetInfo = (options: UseGetInfoOptions = {}) => {
  const { config } = options;
  const client = useQueryClient();
  const { setAuth } = useAuth();

  const getInfo = async () => {
    const api = privateApi();
    const response = await api.get<IMeResponse>("/auth/me");

    // update user
    client.setQueryData(["user"], response.data);

    // // save token to cookie
    // cookies.set("token", response.data.token, { path: "/" });

    // set auth context
    setAuth((prev) => ({
      ...prev,
      isAuthenticated: true,
      token: response.data.token,
      username: response.data?.manager?.username,
      roles: response.data.user?.roles,
    }));

    return response.data;
  };

  return useQuery({
    queryKey: ["user"],
    queryFn: getInfo,
    ...config,
  });
};
