import { cn, cx } from "@/utils";
import React, { FC } from "react";
import { Controller, useFormState } from "react-hook-form";
import { ErrorMessage } from "../ErrorMessage";

type InputFieldProps = {
  control: any;
  name: string;
  label: string;
} & Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "nameReact.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>"
>;

export const InputField: FC<InputFieldProps> = ({
  control,
  name,
  label,
  className,
  ...props
}) => {
  const { errors } = useFormState({ control, name });
  const error = errors[name]?.message;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div>
          <label className="text-sm opacity-70" htmlFor={name}>
            {label}
          </label>
          <div className="relative text-white-dark mb-1 ">
            <input
              {...props}
              className={cn(
                "bg-white/50 mt-2 border border-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4  r-gray-400 ",
                className
              )}
              {...field}
            />
          </div>
          {error ? <ErrorMessage error={error.toString()} /> : null}
        </div>
      )}
    />
  );
};
