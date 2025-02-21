import * as yup from 'yup'

export const schemaContact = yup.object().shape({
  contact_name: yup
    .string()
    .required('Obrigatório'),
  contact_phoneNumber: yup
    .string()
    .required('Obrigatório'),
  contact_projectDescription: yup
    .string()
});
