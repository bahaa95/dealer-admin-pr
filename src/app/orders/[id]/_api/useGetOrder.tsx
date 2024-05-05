import { usePrivateApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { UseQueryOptions } from "@/lib/query";
import { useAuth } from "@/lib/auth";
import { IOrderResponse } from "../../_types";

interface UseGetOrderOptions {
  orderId: string;
  config?: UseQueryOptions<IOrderResponse>;
}

export const useGetOrder = (options: UseGetOrderOptions) => {
  const { config, orderId } = options;
  const { auth } = useAuth();
  const api = usePrivateApi();

  const getOrder = async () => {
    const { data } = await api.get<IOrderResponse>(
      `/casher/order/admin/${orderId}`,
      {
        headers: { "x-sas": auth.sas },
      }
    );

    return data;
  };

  return useQuery({
    queryKey: ["orders", { id: orderId }],
    queryFn: getOrder,
    ...config,
  });
};
