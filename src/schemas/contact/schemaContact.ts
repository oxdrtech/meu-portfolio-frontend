import * as yup from 'yup'

export const schemaContact = yup.object().shape({
  name: yup
    .string()
    .required('Obrigatório'),
  phoneNumber: yup
    .string()
    .required('Obrigatório'),
  projectDescription: yup
    .string()
});
