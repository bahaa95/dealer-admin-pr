import * as yup from "yup";

export const walletSchema = () => {
  return yup.object().shape({
    msdn: yup.string().required("هذا الحقل مطلوب"),
    secret: yup.string().required("هذا الحقل مطلوب"),
    merchantId: yup.string().required("هذا الحقل مطلوب"),
  });
};
