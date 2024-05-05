"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import * as Yup from "yup";
import {
  FieldValues,
  Resolver,
  UseFormProps,
  UseFormReturn,
  useForm,
} from "react-hook-form";

type FormProps<FormValues extends FieldValues, Schema extends FieldValues> = {
  children: (
    methods: Omit<UseFormReturn<FormValues>, "handleSubmit">
  ) => React.ReactNode;
  onFormSubmit: (values: FormValues) => Promise<any>;
  schema?:
    | Yup.ObjectSchema<Schema>
    | ReturnType<typeof Yup.lazy<Yup.ObjectSchema<Schema>>>;
  options?: Omit<UseFormProps<FormValues>, "resolver">;
  className?: string;
  isValidating?: boolean;
  watch?: boolean;
  resetOnSuccess?: boolean;
};

export function Form<
  FormValues extends FieldValues = Record<string, unknown>,
  Schema extends FieldValues = Record<string, unknown>
>({
  children,
  schema,
  onFormSubmit,
  options,
  isValidating = false,
  watch = false,
  resetOnSuccess = false,
  ...props
}: FormProps<FormValues, Schema>) {
  const form = useForm<FormValues>({
    ...options,
    resolver:
      schema && (yupResolver(schema) as unknown as Resolver<FormValues, any>),
  });

  const submitWrapper = (values: FormValues) => {
    onFormSubmit(values).then(() => {
      if (resetOnSuccess) {
        form.reset();
      }
    });
  };

  useEffect(() => {
    if (watch) {
      console.log(form.watch());
    }
  }, [form.watch()]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    form.handleSubmit(submitWrapper)(e);
  };

  return (
    <form onSubmit={handleSubmit} {...props}>
      {children(form)}
    </form>
  );
}
