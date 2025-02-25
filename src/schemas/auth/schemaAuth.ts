import * as yup from 'yup'

export const schemaAuth = yup.object().shape({
  name: yup
    .string()
    .required('Obrigatório'),
  password: yup
    .string()
    .required('Obrigatório')
});
