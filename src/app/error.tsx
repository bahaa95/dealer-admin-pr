"use client";

import { ErrorComponent } from "@/components/Error";
import { FC } from "react";

export type ErrorBoundryProps = {
  error: Error;
  reset: () => void;
};

const ErrorBoundary: FC<ErrorBoundryProps> = ({ error, reset }) => {
  return (
    <ErrorComponent title={error.name} message={error.message} reset={reset} />
  );
};

export default ErrorBoundary;
