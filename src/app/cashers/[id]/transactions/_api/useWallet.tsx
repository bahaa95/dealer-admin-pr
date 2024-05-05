import { usePrivateApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { UseQueryOptions } from "@/lib/query";
import { IWalletInfo } from "../_types";

interface UseWalletOptions {
  casherId: string;
  config?: UseQueryOptions<IWalletInfo>;
}

export const useWallet = (options: UseWalletOptions) => {
  const { casherId, config } = options;
  const api = usePrivateApi();

  const myWallet = async () => {
    const { data } = await api.get<IWalletInfo>(
      `/casher/wallet/transactions/${casherId}`
    );

    return data;
  };

  return useQuery({
    queryKey: ["wallet", { id: casherId }],
    queryFn: myWallet,
    ...config,
  });
};
