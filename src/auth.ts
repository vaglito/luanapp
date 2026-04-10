import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { verifyUser } from "@/services/auth/verify-user";
import { refreshAccessToken } from "@/services/auth/refresh-token";

// Función auxiliar para decodificar la fecha de expiración del JWT
function getJwtExpiration(token: string) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = Buffer.from(base64, "base64").toString("utf-8");
    return JSON.parse(jsonPayload).exp * 1000;
  } catch (error) {
    return 0; // Si falla, forzará el refresco
  }
}

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
        const data = await verifyUser({
          email: credentials.email as string,
          password: credentials.password as string,
        });

        return {
          id: data.user.id,
          name: data.user.name,
          lastName: data.user.lastName,
          email: data.user.email,
          documentNumber: data.user.documentNumber,

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
          accessTokenExpires: getJwtExpiration(data.access),
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
          documentNumber: user.documentNumber,

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
          accessTokenExpires: user.accessTokenExpires,
        };
      }

      // Sesión activa: el token de acceso aún no ha expirado
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      // Token expirado: Intentamos actualizarlo llamando a la API
      try {
        const refreshedTokens = await refreshAccessToken(token.refreshToken as string);

        return {
          ...token,
          accessToken: refreshedTokens.access,
          accessTokenExpires: getJwtExpiration(refreshedTokens.access),
          // Si tu backend rota el refresh token, usamos el nuevo. Si no, mantenemos el actual.
          refreshToken: refreshedTokens.refresh ?? token.refreshToken,
        };
      } catch (error) {
        console.error("Error al refrescar el token de acceso:", error);
        return {
          ...token,
          error: "RefreshAccessTokenError",
        };
      }
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.lastName = token.lastName;
      session.user.email = token.email;
      session.user.documentNumber = token.documentNumber;
      session.user.isSuperuser = token.isSuperuser;
      session.user.isStaff = token.isStaff;
      session.user.isAdmin = token.isAdmin;
      session.user.isTechnician = token.isTechnician;
      session.user.isCustomer = token.isCustomer;
      session.user.isEditor = token.isEditor;
      session.user.isSeller = token.isSeller;
      session.user.isActive = token.isActive;
      session.user.accessToken = token.accessToken;
      // Exponemos el error para poder forzar el cierre de sesión si el refresh falla
      session.error = token.error as string | undefined; 
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
