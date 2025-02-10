import * as yup from 'yup';

export const schemaCareer = yup.object().shape({
  CAREER_NAME: yup
    .string()
    .optional(),
  CAREER_COMPANY: yup
    .string()
    .optional(),
  CAREER_COMPANY_LOGO: yup
    .string()
    .optional(),
  CAREER_COMPANY_SITE: yup
    .string()
    .optional(),
  CAREER_START_DATE: yup
    .string()
    .optional(),
  CAREER_END_DATE: yup
    .string()
    .optional(),
  CAREER_TYPE: yup
    .string()
    .optional(),
  CAREER_DESCRIPTION: yup
    .string()
    .optional(),
  CAREER_STATUS: yup
    .string()
    .oneOf(['PENDING', 'APPROVED', 'DISABLED'])
    .optional(),
})
