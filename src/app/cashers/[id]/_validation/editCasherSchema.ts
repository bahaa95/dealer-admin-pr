import * as y from "yup";
import { IEditCahserSchema } from "../_types";

export const editCasherSchema = () => {
  return y.object<IEditCahserSchema>().shape({
    username: y.string().required("هذا الحقل مطلوب"),
    fullName: y.string().required("هذا الحقل مطلوب"),
    roles: y.array().default(["casher"]),
  });
};
