export interface User {
  id: string;
  user_name: string;
  user_authorized: boolean;
  user_role: "ADMIN" | "USER";
  createdAt: string;
}
