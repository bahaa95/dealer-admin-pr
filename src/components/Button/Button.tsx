import { cx } from "@/utils";
import React, { FC } from "react";
import { Spiner } from "../icon/Spiner";

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  loading?: boolean;
};

export const Button: FC<ButtonProps> = ({
  children,
  className,
  loading = false,
  disabled = false,
  ...props
}) => {
  return (
    <button
      className={cx(
        " py-2 px-[2.5em] rounded-[24px]  font-bold text-[1rem] hover:opacity-85 transition-opacity",
        disabled && "bg-gray-500 text-white hover:opacity-100",

        className
      )}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? <Spiner /> : children}
    </button>
  );
};
