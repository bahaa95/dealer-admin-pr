import { usePrivateApi } from "@/lib/api";
import { UseMutationOptions } from "@/lib/query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOne } from "@/utils";
import { ICasher } from "../_types";

interface UseDeleteCasherOptions {
  casherId: string;
  config?: UseMutationOptions<any, string>;
}

export const useDeleteCasher = (options: UseDeleteCasherOptions) => {
  const { config, casherId } = options;
  const client = useQueryClient();
  const api = usePrivateApi();

  const mutationFn = async (id: string) => {
    await api.delete(`/employees/${id}`);

    client.invalidateQueries({
      predicate: (query: any) => query.queryKey[0] === "cashers",
    });
  };

  return useMutation({
    mutationFn: mutationFn as any,
    mutationKey: ["cashers-delete"],
    ...config,
  });
};
