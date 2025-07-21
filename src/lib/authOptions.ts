import ApiHelper from '@/api/client/api';
import { ISignInResponse } from '@/entities/auth/model/auth.interface';
import { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
interface ExtendedUser extends User {
  accessToken?: string;
  refreshToken?: string;
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 30,
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
        accessToken: { type: 'text' },
        refreshToken: { type: 'text' },
      },
      async authorize(credentials) {
        try {
          console.log('credentials', credentials);
          if (credentials?.accessToken && credentials?.refreshToken) {
            return {
              id: 'social-login',
              accessToken: credentials.accessToken,
              refreshToken: credentials.refreshToken,
            } as ExtendedUser;
          }

          const loginData = {
            email: credentials?.email,
            password: credentials?.password,
          };

          const response = await ApiHelper.post<ISignInResponse>(`/auth/signin`, loginData);

          const data = response.data;

          if (data.status === 200) {
            return {
              id: credentials?.email || '',
              email: credentials?.email || '',
              accessToken: data.result.accessToken,
              refreshToken: data.result.refreshToken,
            } as ExtendedUser;
          }
          return null;
        } catch (error: unknown) {
          throw new Error((error as Error).message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as ExtendedUser).accessToken;
        token.refreshToken = (user as ExtendedUser).refreshToken;
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/signin',
  },
};
