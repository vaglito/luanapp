import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { isTokenExpired } from "./app/lib/auth/is-token-expired";
import { refreshAccessToken } from "./app/lib/auth/refresh-token";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const res = await fetch(`http://localhost:8000/api/v2.0/auth/login/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "RUC9TfgQ.1gjQczBKXzHuvXD8utSVTURBiX6moaMG",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        if (!res.ok) {
          const errorData = await res.json().catch(() => null);

          throw new Error(
            errorData?.detail || "Correo electrónico o contraseña incorrectos"
          );
        }

        const data = await res.json();

        return {
          id: data.user.id,
          name: data.user.name,
          lastName: data.user.lastName,
          email: data.user.email,

          isSuperuser: data.user.isSuperuser,
          isStaff: data.user.isStaff,
          isAdmin: data.user.isAdmin,
          isTechnician: data.user.isTechnician,
          isCustomer: data.user.isCustomer,
          isEditor: data.user.isEditor,
          isSeller: data.user.isSeller,
          isActive: data.user.isActive,

          accessToken: data.access,
          refreshToken: data.refresh,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // Login inicial
      if (user) {
        return {
          ...token,
          name: user.name,
          lastName: user.lastName,
          email: user.email,

          isSuperuser: user.isSuperuser,
          isStaff: user.isStaff,
          isAdmin: user.isAdmin,
          isTechnician: user.isTechnician,
          isCustomer: user.isCustomer,
          isEditor: user.isEditor,
          isSeller: user.isSeller,
          isActive: user.isActive,

          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
        };
      }

      // Token aún válido
      if (!isTokenExpired(token.accessToken)) {
        return token;
      }

      // Token expirado → refresh
      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.lastName = token.lastName;
      session.user.email = token.email;
      session.user.isSuperuser = token.isSuperuser;
      session.user.isStaff = token.isStaff;
      session.user.isAdmin = token.isAdmin;
      session.user.isTechnician = token.isTechnician;
      session.user.isCustomer = token.isCustomer;
      session.user.isEditor = token.isEditor;
      session.user.isSeller = token.isSeller;
      session.user.isActive = token.isActive;
      session.user.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
