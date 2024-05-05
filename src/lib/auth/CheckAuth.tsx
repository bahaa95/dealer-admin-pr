"use client";

import { useGetInfo } from "@/app/(auth)/login/_api";
import { Loader } from "@/components";
import { usePathname, useRouter } from "next/navigation";
import React, { FC, useEffect } from "react";

export type CheckAuthProps = {
  children: React.ReactNode;
};

/**
 * This component executes only once when user first inter to the app, it
 * will check if the user is logged in and have valid token then it will
 * navigate user to home page, otherwise navigate to sign in page
 */
export const CheckAuth: FC<CheckAuthProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { isError, isSuccess, isPending } = useGetInfo();

  useEffect(() => {
    if (isSuccess) {
      router.push(pathname);
    }

    if (isError) {
      router.push("/login");
    }
  }, [isSuccess, isError]);

  if (isPending) {
    return <Loader />;
  }

  return <>{children}</>;
};
