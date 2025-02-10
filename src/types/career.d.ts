export interface Career {
  id: string;
  CAREER_NAME: string;
  CAREER_COMPANY: string;
  CAREER_COMPANY_LOGO: string;
  CAREER_COMPANY_SITE: string;
  CAREER_START_DATE: string;
  CAREER_END_DATE: string;
  CAREER_TYPE: string;
  CAREER_DESCRIPTION: string;
  CAREER_STATUS: "PENDING" | "APPROVED" | "DISABLED";
  createdAt: string;
  updatedAt: string;
}

export interface CareerPost {
  CAREER_NAME?: string;
  CAREER_COMPANY?: string;
  CAREER_COMPANY_LOGO?: string;
  CAREER_COMPANY_SITE?: string;
  CAREER_START_DATE?: string;
  CAREER_END_DATE?: string;
  CAREER_TYPE?: string;
  CAREER_DESCRIPTION?: string;
  CAREER_STATUS?: "PENDING" | "APPROVED" | "DISABLED";
}
