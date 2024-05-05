import { IOrderResponse } from "@/app/order/_types";
import { cx } from "@/utils";
import React, { FC } from "react";

function statusColors(status: IOrderResponse["Payment"]["paymentStatus"]) {
  const colors = {
    PENDING: "text-yellow-600",
    COMPLETED: "text-green-600",
    FAILED: "text-red-600",
  };

  return colors[status];
}

function statusTranslator(status: IOrderResponse["Payment"]["paymentStatus"]) {
  const translate = {
    PENDING: "قيد الانتظار",
    COMPLETED: "مكتمل",
    FAILED: "فشل",
  };

  return translate[status];
}

type StatusProps = {
  status: IOrderResponse["Payment"]["paymentStatus"];
};

export const Status: FC<StatusProps> = ({ status }) => {
  return (
    <span className={cx(" text-center font-normal", statusColors(status))}>
      {statusTranslator(status)}
    </span>
  );
};
