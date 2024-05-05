import { UseMutationOptions } from "@/lib/query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ITransferValues } from "../_types";
import { usePrivateApi } from "@/lib/api";

interface UseTransferOptions {
  config?: UseMutationOptions<any, ITransferValues>;
}

export const useTransfer = (options: UseTransferOptions = {}) => {
  const { config } = options;
  const api = usePrivateApi();
  const client = useQueryClient();

  const mutationFn = async (data: ITransferValues) => {
    const res = await api.post<any>(`/casher/wallet/transfer`, data);

    client.invalidateQueries({
      predicate: (query: any) =>
        (query.queryKey[0] === "wallet" &&
          query.queryKey[1] &&
          query.queryKey[1]?.id == data.casherId) ||
        query.queryKey[0] === "cashers",
    });

    return res.data;
  };

  return useMutation({
    mutationFn,
    mutationKey: ["transfer"],
    ...config,
  });
};
