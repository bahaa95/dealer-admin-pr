"use client";
import { Button, Container, Form, InputField, MainLayout } from "@/components";
import React, { useState } from "react";

import { IWalletSchema } from "../_types";
import { walletSchema } from "../_validation";
import { cx } from "@/utils";
import { usePrivateApi } from "@/lib/api";
import { toast } from "react-toastify";

export const WalletPage = () => {
  const [submiting, setSubmiting] = useState(false);
  const api = usePrivateApi();
  const handleSubmit = async (values: IWalletSchema) => {
    try {
      setSubmiting(true);
      await api.post("/manger-api/zain/rigster-wallet", values, {
        headers: { "x-sas": "wifi" },
      });
      toast.success("تم الحفظ بنجاح");
    } catch {
      toast.error("حدثت مشكلة ما اثناء الحفظ, لم يتم حفظ المعلومات");
    } finally {
      setSubmiting(false);
    }
  };

  return (
    <MainLayout>
      <Container>
        <div className={cx("min-h-[85vh] flex items-center justify-center")}>
          <Form<IWalletSchema, IWalletSchema>
            schema={walletSchema()}
            onFormSubmit={handleSubmit}
            className="width-[98%] sm:w-[75%] bg-gray-200 px-5 py-8 rounded-lg shadow-lg"
          >
            {({ control }) => (
              <div>
                <div className="mb-4">
                  <h2 className="text-l font-bold ">ادخل معلومات المحفظة</h2>
                </div>
                <div className="mb-4 ">
                  <InputField
                    label="msdn"
                    name="msdn"
                    control={control}
                    className="!bg-gray-300 !border-1 !border-gray-400 !text-black"
                  />
                </div>
                <div className="mb-4">
                  <InputField
                    label="secret"
                    name="secret"
                    control={control}
                    className="!bg-gray-300 !border-1 !border-gray-400 !text-black"
                  />
                </div>
                <div className="mb-4">
                  <InputField
                    label="merchantId"
                    name="merchantId"
                    control={control}
                    className="!bg-gray-300 !border-1 !border-gray-400 !text-black"
                  />
                </div>
                <div className="flex justify-center pt-5">
                  <Button
                    type="submit"
                    className="bg-primary rounded-lg w-[10em] text-white "
                    loading={submiting}
                  >
                    حفظ
                  </Button>
                </div>
              </div>
            )}
          </Form>
        </div>
      </Container>
    </MainLayout>
  );
};
