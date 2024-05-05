import * as yup from "yup";

export const loginSchema = () => {
  return yup.object().shape({
    username: yup.string().required("هذا الحقل مطلوب"),
    password: yup.string().required("هذا الحقل مطلوب"),
  });
};
