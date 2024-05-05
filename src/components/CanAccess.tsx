"use client"
import { useAuth } from "@/lib/auth";
import React, { FC } from "react";

type CanAccessProps = {
  role: string;
  children: React.ReactNode;
};

export const CanAccess: FC<CanAccessProps> = ({ role, children }) => {
  const auth = useAuth();

  if (auth.auth.roles.includes(role)) {
    return children;
  }

  return null;
};
