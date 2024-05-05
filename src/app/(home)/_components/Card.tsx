"use client";
import { cn, formatMoney } from "@/utils";
import React, { FC } from "react";

type CardProps = {
  title: string;
  value: number;
  className?: string;
};

export const Card: FC<CardProps> = ({ title, value, className }) => {
  return (
    <div
      className={cn(
        "py-12 px-4 bg-white/50 flex flex-col gap-2 flex-1 rounded-xl",className
      )}
    >
      <span className="text-lg font-medium text-gray-600">{title}</span>
      <span className="text-[22px] font-medium">{formatMoney(value)}</span>
    </div>
  );
};
