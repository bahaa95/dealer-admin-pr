import { UseMutationOptions } from "@/lib/query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import cookies from "js-cookie";
import { ILoginResponse, ILoginSchema } from "../_types";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth";

interface UseLoginOptions {
  config?: UseMutationOptions<ILoginResponse, ILoginSchema>;
}

export const useLoginin = (options: UseLoginOptions = {}) => {
  const { config } = options;
  const client = useQueryClient();
  const { auth, setAuth } = useAuth();
  const router = useRouter();

  const mutationFn = async (values: ILoginSchema) => {
    const response = await api.post<ILoginResponse>("/auth/login", values, {
      headers: { "x-sas": auth.sas },
    });

    // update user
    client.setQueryData(["user"], response.data);

    // save token to cookie
    cookies.set("token", response.data.token, { path: "/" });

    // set auth context
    setAuth((prev) => ({
      ...prev,
      isAuthenticated: true,
      token: response.data.token,
      username: response.data?.manager?.username,
      roles: response.data.roles,
    }));

    // navigate to home page
    setTimeout(() => router.push("/"), 750);

    return response.data;
  };

  return useMutation({
    mutationFn,
    mutationKey: ["user"],
    ...config,
  });
};
