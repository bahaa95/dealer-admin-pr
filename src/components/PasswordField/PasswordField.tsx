"use client";

import { cx } from "@/utils";
import React, { FC, useState } from "react";
import { Controller, useFormState } from "react-hook-form";
import { FaRegEyeSlash } from "react-icons/fa";
import { LuEye } from "react-icons/lu";
import { ErrorMessage } from "../ErrorMessage";

type PasswordFieldProps = {
  control: any;
  name: string;
  label: string;
} & Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "type"
>;

export const PasswordField: FC<PasswordFieldProps> = ({
  control,
  name,
  label,
  className,
  ...props
}) => {
  const { errors } = useFormState({ control, name });
  const error = errors[name]?.message;
  const [hidePassword, setHidePassword] = useState(true);

  const togglePasswordHidden = () => setHidePassword((prev) => !prev);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div>
          <label className="text-sm opacity-70" htmlFor={name}>
            {label}
          </label>
          <div className="relative text-white-dark mb-4 ">
            <input
              type={hidePassword ? "password" : "text"}
              {...props}
              className={cx(
                "bg-white/50 mt-2 border border-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4  r-gray-400 ",
                className
              )}
              {...field}
            />
            {/* <div
              className="absolute top-3 left-3 z-30 cursor-pointer text-gray-500"
              onClick={togglePasswordHidden}
            >
              {hidePassword ? <FaRegEyeSlash /> : <LuEye />}
            </div> */}
          </div>
          {error ? <ErrorMessage error={error.toString()} /> : null}
        </div>
      )}
    />
  );
};
