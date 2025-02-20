import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      user_name: string;
      user_role: 'ADMIN' | 'USER';
      user_authorized: boolean;
      access_token: string;
    };
    expires: string;
  }
}
