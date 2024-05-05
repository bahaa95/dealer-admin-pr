import * as y from "yup";
import { ITransferSchema } from "../_types";

interface ITransferSchemaOptions {
  maxAmount: number;
}

export const transferSchema = ({ maxAmount }: ITransferSchemaOptions) => {
  return y.object<ITransferSchema>().shape({
    amount: y
      .number()
      .required("هذا الحقل مطلوب")
      .typeError("الرقم غير صالح")
      .max(maxAmount, `الحد الاعلى للتحويل هو ${maxAmount}`)
      .min(1, "الحد الادنى للتحويل هو 1"),
  });
};
