import * as y from "yup";
import { IOdoSchema } from "../_types";

export const odoSchema = () => {
  return y.object<IOdoSchema>().shape({
    username: y.string().required("هذا الحقل مطلوب"),
    password: y
      .string()
      .required("هذا الحقل مطلوب")
      .min(8, "كلمة المرور يجب ان تكون على الاقل 8 رموز"),
  });
};
