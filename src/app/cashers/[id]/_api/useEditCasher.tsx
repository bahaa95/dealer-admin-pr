import { UseMutationOptions } from "@/lib/query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IEditCahserSchema } from "../_types";
import { usePrivateApi } from "@/lib/api";
import { ICasher } from "../../_types";

interface UseEditCahserOptions {
  config?: UseMutationOptions<
    ICasher,
    {
      casherId: string;
      values: IEditCahserSchema;
    }
  >;
}

export const useEditCahser = (options: UseEditCahserOptions = {}) => {
  const { config } = options;
  const api = usePrivateApi();
  const client = useQueryClient();

  const mutationFn = async (data: {
    casherId: string;
    values: IEditCahserSchema;
  }) => {
    const res = await api.patch<ICasher>(
      `/employees/${data.casherId}`,
      data.values
    );

    client.setQueryData(["casher", { id: data.casherId }], res.data);

    return res.data;
  };

  return useMutation({
    mutationFn,
    mutationKey: ["cashers-edit"],
    ...config,
  });
};
