import { cn } from "@/utils";
import React, { FC } from "react";
import { Spiner } from "./icon/Spiner";

type IconButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  icon: React.ReactNode;
  loading?: boolean;
};

export const IconButton: FC<IconButtonProps> = ({
  icon,
  className,
  loading,
  disabled,
  ...props
}) => {
  return (
    <button
      disabled={disabled || loading}
      type="button"
      className={cn(
        "text-white bg-blue-700/65 hover:bg-blue-800 focus:outline-none font-medium rounded-full text-sm text-center inline-flex items-center transition-colors size-[36px] justify-center",
        (loading || disabled) && "pointer-events-none",
        className
      )}
      {...props}
    >
      {loading ? <Spiner /> : icon}
    </button>
  );
};
