import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      authorized: boolean;
      role: "admin" | "user";
      access_token: string;
    };
    expires: string;
  }
}
