import * as yup from 'yup';

export const schemaContact = yup.object().shape({
  name: yup
    .string()
    .optional(),

  phoneNumber: yup
    .string()
    .optional(),

  projectDescription: yup
    .string()
    .optional(),

  status: yup
    .string()
    .oneOf(["pending", "responded", "rejected"])
    .optional()
});
