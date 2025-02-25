import { Auth } from '@/types/auth';
import { AuthResponse } from '@/types/authResponse';
import { Payload } from '@/types/payload';
import { User } from '@/types/user';
import { API_BASE_URL } from '@/utils/apiBaseUrl';
import axios, { AxiosError } from 'axios';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authenticateUser = async (credentials: Auth) => {
  try {
    const { data: { access_token } } = await axios.post<AuthResponse>(
      `${API_BASE_URL}/auth/login`,
      {
        name: credentials.name,
        password: credentials.password,
      }
    );

    const payload: Payload = JSON.parse(Buffer.from(access_token.split('.')[1], 'base64').toString());

    if (!payload.name) throw new Error("Token inválido: ID do usuário não encontrado.");

    const { data: user } = await axios.get<User>(
      `${API_BASE_URL}/users/${payload.name}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );

    return { ...user, access_token };
  } catch (error: AxiosError | any) {
    const errorMessage = error?.response?.data?.message || error.message || "Erro desconhecido";
    throw new Error(`Falha na autenticação: ${errorMessage}`);
  }
};

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        name: { label: 'Nome', type: 'text' },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) throw new Error('Credencias não fornecidas.');
        return authenticateUser(credentials);
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, user };
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        const { user } = token;
        return {
          ...session,
          user,
        };
      }
      return session;
    },
  },
  pages: { signIn: '/auth' },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
