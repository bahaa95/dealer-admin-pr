"use client";
import { privateApi, usePrivateApi } from "@/lib/api";
import { UseQueryOptions } from "@/lib/query";
import { useQuery } from "@tanstack/react-query";
import { IDashboardSummery } from "../_types";

interface UseGetDashboardSummeryOptions {
  config?: UseQueryOptions<IDashboardSummery>;
}

export const useGetDashboardSummery = (
  options: UseGetDashboardSummeryOptions = {}
) => {
  const { config } = options;
  const api = usePrivateApi()

  const getDashboardSummery = async () => {
    const response = await api.get<IDashboardSummery>(
      `/casher/dashboard/summary`
    );

    return response.data;
  };

  return useQuery({
    queryKey: ["dashboard-summery"],
    queryFn: getDashboardSummery,
    ...config,
  });
};
