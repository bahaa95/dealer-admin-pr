"use client";
import React from "react";
import { Form } from "../../../../../components/Form";
import { ILoginSchema } from "@/app/(auth)/login/_types";
import { loginSchema } from "@/app/(auth)/login/_validation/loginSchema";
import { Button, InputField, PasswordField } from "@/components";
import { cx } from "@/utils";
import { useLoginin } from "../../_api";
import { useAuth } from "@/lib/auth";

export const LoginForm = () => {
  const { auth, setSas } = useAuth();
  const { mutateAsync: login, isPending, isError, isSuccess } = useLoginin();

  const submitForm = async (values: ILoginSchema) => {
    try {
      await login(values);
    } catch (error) {}
  };

  return (
    <div>
      {isError && (
        <div className="bg-red-100/70 text-xs p-4 rounded-2xl mb-8 text-red-600">
          فشل عملية تسجيل الدخول, الرجاء التأكد من المعلومات ادناه
        </div>
      )}
      {isSuccess ? (
        <div className="bg-green-100/70 text-xs p-4 rounded-2xl mb-8 text-green-600">
          تم تسجيل الدخول بنجاح
        </div>
      ) : null}
      <Form<ILoginSchema, ILoginSchema>
        onFormSubmit={submitForm}
        schema={loginSchema()}
      >
        {({ control }) => (
          <div className={cx("flex flex-col gap-3")}>
            <InputField
              control={control}
              name="username"
              placeholder="ادخل اسم المستخدم"
              label="اسم المستخدم"
            />
            <PasswordField
              control={control}
              name="password"
              placeholder="ادخل كلمة المرور"
              label="كلمة المرور"
            />

            <Button
              loading={isPending}
              type="submit"
              className="mb-2 me-2 mt-5 rounded-lg bg-gradient-to-b px-5 py-4 text-center bg-red-600 h-[56px] text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
            >
              تسجيل الدخول
            </Button>
          </div>
        )}
      </Form>
    </div>
  );
};
