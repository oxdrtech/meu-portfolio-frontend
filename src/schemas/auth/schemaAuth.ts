import * as yup from 'yup'

export const schemaAuth = yup.object().shape({
  user_name: yup
    .string()
    .required('Obrigatório'),
  user_password: yup
    .string()
    .required('Obrigatório')
});
