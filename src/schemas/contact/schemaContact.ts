import * as yup from 'yup';

export const schemaContact = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(50, 'Nome deve ter no máximo 50 caracteres')
    .required('Nome é obrigatório'),
    
    phoneNumber: yup
    .string()
    .trim()
    .min(8, 'Telefone deve ter pelo menos 8 caracteres')
    .matches(/^\+?[1-9]\d{1,14}$/, 'Número de telefone inválido')
    .required('Número de telefone é obrigatório'),

  projectDescription: yup
    .string()
    .trim()
    .min(10, 'A descrição do projeto deve ter pelo menos 10 caracteres')
    .max(500, 'A descrição do projeto deve ter no máximo 500 caracteres')
    .required('A descrição do projeto é obrigatória'),
});
