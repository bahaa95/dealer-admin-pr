import { privateApi, usePrivateApi } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ICasherFilter, ICasherResponse } from "../_types";
import { UseQueryOptions } from "@/lib/query";
import { toUrl } from "@/utils";

interface UseGetCashersOptions {
  config?: UseQueryOptions<ICasherResponse>;
  filter: ICasherFilter;
}

export const useGetCashers = (options: UseGetCashersOptions) => {
  const { config, filter } = options;
  const api = usePrivateApi();

  const getCashers = async () => {
    const params = toUrl(filter);
    const response = await api.get<ICasherResponse>(`/casher/getall?${params}`);

    return response.data;
  };

  return useQuery({
    queryKey: ["cashers", filter],
    queryFn: getCashers,
    placeholderData: keepPreviousData,
    ...config,
  });
};
