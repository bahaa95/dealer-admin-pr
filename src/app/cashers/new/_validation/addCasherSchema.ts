import * as y from "yup";
import { IAddCahserSchema } from "../_types";

export const addCasherSchema = () => {
  return y.object<IAddCahserSchema>().shape({
    username: y.string().required("هذا الحقل مطلوب"),
    password: y
      .string()
      .required("هذا الحقل مطلوب")
      .min(8, "كلمة المرور يجب ان تكون على الاقل 8 رموز"),
    fullName: y.string().required("هذا الحقل مطلوب"),
    roles: y.array().default(["casher"]),
  });
};
