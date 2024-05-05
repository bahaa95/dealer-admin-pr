import { cx } from "@/utils";
import React, { FC } from "react";

type ColumnProps = {
  children: React.ReactNode;
  className?: string;
};

export const Column: FC<ColumnProps> = ({ children, className }) => {
  return (
    <div className={cx("flex items-center  text-right", className)}>
      {children}
    </div>
  );
};
