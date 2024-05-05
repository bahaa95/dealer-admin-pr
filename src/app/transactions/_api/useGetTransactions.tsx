"use client";
import { privateApi, usePrivateApi } from "@/lib/api";
import { UseQueryOptions } from "@/lib/query";
import { useQuery } from "@tanstack/react-query";
import { ITransaction } from "../_types";

interface UseGetTransactionsOptions {
  config?: UseQueryOptions<ITransaction[]>;
}

export const useGetTransactions = (options: UseGetTransactionsOptions = {}) => {
  const { config } = options;
  const api = usePrivateApi();

  const getTransactions = async () => {
    const response = await api.get<ITransaction[]>(
      `/casher/transactions/getall`
    );

    return response.data;
  };

  return useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
    ...config,
  });
};
