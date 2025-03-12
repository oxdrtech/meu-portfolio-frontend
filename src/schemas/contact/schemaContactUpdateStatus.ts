import * as yup from 'yup';

export const schemaContactUpdateStatus = yup.object().shape({
  status: yup
    .string()
    .oneOf(["pending", "responded", "rejected"])
    .optional()
});
