import { UseMutationOptions } from "@/lib/query";
import { useMutation } from "@tanstack/react-query";
import { IOdoSchema } from "../_types";
import { usePrivateApi } from "@/lib/api";

interface UseAddOdoOptions {
  config?: UseMutationOptions<
    void,
    {
      casherId: string;
      values: IOdoSchema;
    }
  >;
}

export const useAddOdo = (options: UseAddOdoOptions = {}) => {
  const { config } = options;
  const api = usePrivateApi();

  const mutationFn = async (data: { casherId: string; values: IOdoSchema }) => {
    await api.post<void>(
      `/employees/oddo/setAccount/${data.casherId}`,
      data.values
    );
  };

  return useMutation({
    mutationFn,
    mutationKey: ["cashers-oddo"],
    ...config,
  });
};
