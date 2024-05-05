"use client";
import { Button, Form, InputField } from "@/components";
import React, { useEffect } from "react";
import { IOdoSchema } from "../_types";
import { odoSchema } from "../_validation";
// import { useAddCahser } from "../_api";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import { useAddOdo } from "../_api";

export const OdoForm = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { mutateAsync: addOddo, isPending, isSuccess } = useAddOdo();

  const handleSubmit = async (values: IOdoSchema) => {
    try {
      await addOddo({ casherId: params.id, values });
      toast.success("تم ألاضافة بنجاح");
    } catch (error) {
      toast.error("حصل خطأ اثناء ألاضافة, يرجى المحاولة مرة أخرى");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => router.replace(`/cashers/${params.id}`), 100);
    }
  }, [isSuccess]);

  return (
    <div className="bg-white/40 p-9 rounded-2xl md:w-5/12">
      <div className="py-5">
        <h1 className="text-lg font-bold text-center">أضافة حساب أودو</h1>
      </div>
      <Form<IOdoSchema, IOdoSchema>
        schema={odoSchema() as any}
        onFormSubmit={handleSubmit}
      >
        {({ control }) => (
          <div className="flex flex-col gap-2">
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
