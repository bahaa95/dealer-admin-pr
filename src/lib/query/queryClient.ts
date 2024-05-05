"use client"
import { QueryClient, DefaultOptions } from '@tanstack/react-query';

const queryConfig: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
    // retryDelay: ms.seconds(30),
    refetchInterval: false,
    refetchOnReconnect: true,
    refetchOnMount: true,
  },
  mutations: {
    retry: false,
  },
};

export const queryClient = new QueryClient({ defaultOptions: queryConfig });
