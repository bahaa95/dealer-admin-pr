import { privateApi } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ICasher } from "../../_types";
import { UseQueryOptions } from "@/lib/query";

interface UseGetCasherByIdOptions {
  config?: UseQueryOptions<ICasher>;
  casherId: string;
}

export const useGetCasherById = (options: UseGetCasherByIdOptions) => {
  const { config, casherId } = options;

  const getCasherById = async () => {
    const api = privateApi();
    const response = await api.get<ICasher>(`/employees/${casherId}`);

    return response.data;
  };

  return useQuery({
    queryKey: ["casher", { id: casherId }],
    queryFn: getCasherById,
    placeholderData: keepPreviousData,
    ...config,
  });
};
