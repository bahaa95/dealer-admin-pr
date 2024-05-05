"use client";
import { Button, Form, InputField, Loader, MainLayout } from "@/components";
import React from "react";
import { IEditCahserSchema } from "../_types";
import { editCasherSchema } from "../_validation";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { useGetCasherById, useEditCahser } from "../_api";
import { cx } from "@/utils";
import Link from "next/link";

export const EditCasherForm = () => {
  const params = useParams<{ id: string }>();
  const { data: casher, isPending: isLoadingCasher } = useGetCasherById({
    casherId: params.id,
  });
  const { isPending: isEdittingCasher, mutateAsync: editCasher } =
    useEditCahser();

  const handleSubmit = async (values: IEditCahserSchema) => {
    try {
      editCasher({ casherId: params.id, values });
      toast.success("تم التعديل بنجاح");
    } catch (error) {
      toast.error("حصل خطأ اثناء التعديل, يرجى المحاولة مرة أخرى");
    }
  };

  if (isLoadingCasher) {
    return (
      <MainLayout>
        <Loader />
      </MainLayout>
    );
  }

  return (
    <div
      className={cx("bg-white/40 p-9 rounded-2xl w-11/12 sm:w-8/12 lg:w-5/12")}
    >
      <div className="py-5">
        <h1 className="text-lg font-bold text-center">معلومات الكاشير</h1>
      </div>
      <Form<IEditCahserSchema, IEditCahserSchema>
        schema={editCasherSchema() as any}
        onFormSubmit={handleSubmit}
        options={{
          defaultValues: {
            fullName: casher?.fullName,
            username: casher?.username,
          } as any,
        }}
      >
        {({ control, formState: { isDirty } }) => (
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
            <div className="pt-5 flex justify-end">
              <Button
                className="bg-red-600 text-white rounded-lg w-[125px]"
                loading={isEdittingCasher}
                disabled={!isDirty}
              >
                حفظ
              </Button>
            </div>
          </div>
        )}
      </Form>
      {!casher?.oddoAccount ? (
        <div className="pt-9 flex justify-center items-center">
          <Link
            href={`/cashers/${params.id}/odo`}
            className="text-sm font-semibold hover:text-blue-600"
          >
            أضافة حساب أودو
          </Link>
        </div>
      ) : null}
    </div>
  );
};
