import { cx } from "@/utils";
import Link from "next/link";
import React, { FC } from "react";

type ActionButtonProps = {
  children: React.ReactNode;
  href: string;
  className?: string;
};

export const ActionButton: FC<ActionButtonProps> = ({
  children,
  className,
  href,
}) => {
  return (
    <Link
      href={href}
      className={cx(
        "bg-gray-300 rounded-md pt-1 pb-2 px-7 cursor-pointer hover:text-[crimson]",
        className
      )}
    >
      {children}
    </Link>
  );
};
