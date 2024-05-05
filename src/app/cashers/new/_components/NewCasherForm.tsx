"use client";
import { Button, Form, InputField } from "@/components";
import React from "react";
import { IAddCahserSchema } from "../_types";
import { addCasherSchema } from "../_validation";
import { useAddCahser } from "../_api";
import { toast } from "react-toastify";

export const NewCasherForm = () => {
  const { mutateAsync: addCasher, isPending } = useAddCahser();

  const handleSubmit = async (values: IAddCahserSchema) => {
    try {
      await addCasher(values);
      toast.success("تم ألاضافة بنجاح");
    } catch (error) {
      toast.error("حصل خطأ اثناء ألاضافة, يرجى المحاولة مرة أخرى");
    }
  };

  return (
    <div className="bg-white/40 p-9 rounded-2xl md:w-5/12">
      <div className="py-5">
        <h1 className="text-lg font-bold text-center">أضافة كاشير</h1>
      </div>
      <Form<IAddCahserSchema, IAddCahserSchema>
        schema={addCasherSchema() as any}
        resetOnSuccess
        onFormSubmit={handleSubmit}
        options={{
          defaultValues: { fullName: "", username: "", password: "" },
        }}
      >
        {({ control }) => (
          <div className="flex flex-col gap-2">
            <InputField
              name="fullName"
              control={control}
              label="الاسم"
              placeholder="الاسم"
            />
            <InputField
              name="username"
              control={control}
              label="أسم المستخدم"
              placeholder="أسم المستخدم"
            />
            <InputField
              name="password"
              control={control}
              label="كلمة السر"
              placeholder="كلمة السر"
            />
            <div className="pt-5 flex justify-end">
              <Button
                className="bg-red-600 text-white rounded-lg w-[125px]"
                loading={isPending}
              >
                أضافة
              </Button>
            </div>
          </div>
        )}
      </Form>
    </div>
  );
};
