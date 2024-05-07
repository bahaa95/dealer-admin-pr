"use client";
import { Button, Form, InputField, NumberInput } from "@/components";
import React, { FC, useState } from "react";
import { ITransferSchema, IWalletInfo } from "../_types";
import { transferSchema } from "../_validation";
import { useTransfer } from "../_api";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { formatMoney } from "@/utils";

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
  const [transformAll, setTransformAll] = useState(false);

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
          <div className="flex text-xs">
            <p className="text-gray-500">الدين الكلي للكاشير</p>
            <span className="px-[2px]">:</span>
            <p className="font-bold text-red-600">{formatMoney(balance)}</p>
          </div>
          <NumberInput
            name="amount"
            control={control}
            label="المبلغ"
            placeholder="المبلغ المراد سحبه"
            className="border-gray-400"
          />
          <div className="pt-5 flex gap-3 justify-end">
            <Button
              type="submit"
              className="bg-blue-600 text-white rounded-lg w-[125px]"
              loading={!transformAll && isPending}
              disabled={!isDirty}
            >
              سحب
            </Button>
            <Button
              type="button"
              className="bg-red-600 text-white rounded-lg w-[200px]"
              loading={transformAll && isPending}
              onClick={async () => {
                setTransformAll(true);
                await handleSubmit({ amount: balance });
              }}
            >
              سحب كل المبلغ
            </Button>
          </div>
        </div>
      )}
    </Form>
  );
};
