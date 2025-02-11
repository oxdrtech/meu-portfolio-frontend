export interface User {
  id: string;
  USER_NAME: string;
  USER_AUTHORIZED: boolean;
  USER_ROLE: "ADMIN" | "USER";
  createdAt: string;
}

export interface UserPost {
  USER_NAME: string;
  USER_PASSWORD: string;
}
