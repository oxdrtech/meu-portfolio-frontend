export interface User {
  id: string;
  name: string;
  authorized: boolean;
  role: "admin" | "user";
  createdAt: string;
}
