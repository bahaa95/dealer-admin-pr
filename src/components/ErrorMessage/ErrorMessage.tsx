import { cx } from "@/utils";
import React from "react";

interface ErrorMessageProps {
  error?: string;
}

export const ErrorMessage = ({ error }: ErrorMessageProps) => {
  if (!error) {
    return null;
  } else if (typeof error === "string") {
    return <p className={cx("text-danger text-xs mt-1")}>{error}</p>;
  }
};
