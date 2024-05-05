"use client"
import React, { FC, useRef } from "react";

type DateInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const DateInput: FC<DateInputProps> = (props) => {
  const ref = useRef<null | HTMLInputElement>(null);

  return (
    <input
      {...props}
      type="text"
      ref={ref}
      onFocus={() => {
        if (ref.current) {
          ref.current.type = "date";
        }
      }}
      onBlur={() => {
        if (ref.current) {
          ref.current.type = "text";
        }
      }}
    />
  );
};
