import { UseMutationOptions } from "@/lib/query";
import { useMutation } from "@tanstack/react-query";
import { IAddCahserSchema } from "../_types";
import { usePrivateApi } from "@/lib/api";

interface UseAddCahserOptions {
  config?: UseMutationOptions<void, IAddCahserSchema>;
}

export const useAddCahser = (options: UseAddCahserOptions = {}) => {
  const { config } = options;
  const api = usePrivateApi();

  const mutationFn = async (values: IAddCahserSchema) => {
    await api.post<void>("/employees", values);
  };

  return useMutation({
    mutationFn,
    mutationKey: ["cashers-new"],
    ...config,
  });
};
