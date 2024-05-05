"use client";
import { Button, Form, InputField, NumberInput } from "@/components";
import React, { FC } from "react";
import { ITransferSchema, IWalletInfo } from "../_types";
import { transferSchema } from "../_validation";
import { useTransfer } from "../_api";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

type TransferFormProps = {
  casherId: string;
  balance: number;
  onSuccess: () => void;
};

export const TransferForm: FC<TransferFormProps> = ({
  onSuccess,
  balance = 0,
  casherId,
}) => {
  
  const { mutateAsync: transfer, isPending } = useTransfer();

  const handleSubmit = async (v: ITransferSchema) => {
    try {
      await transfer({ amount: Number(v.amount), casherId });
      toast.success("تم سحب المبلغ بنجاح");
      onSuccess();
    } catch (error) {
      toast.error("حدثت مشكلة اثناء سحب المبلغ. يرجى المحاولة مرة اخرى");
    }
  };

  return (
    <Form<ITransferSchema, ITransferSchema>
      schema={transferSchema({ maxAmount: balance }) as any}
      onFormSubmit={handleSubmit}
    >
      {({ control, formState: { isDirty } }) => (
        <div className="flex flex-col gap-2">
          <NumberInput
            name="amount"
            control={control}
            label="المبلغ"
            placeholder="المبلغ المراد سحبه"
            className="border-gray-400"
          />
          <div className="pt-5 flex justify-end">
            <Button
              type="submit"
              className="bg-red-600 text-white rounded-lg w-[125px]"
              loading={isPending}
              disabled={!isDirty}
            >
              سحب
            </Button>
          </div>
        </div>
      )}
    </Form>
  );
};
