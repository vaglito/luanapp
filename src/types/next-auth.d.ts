import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      accessToken: string;
      documentNumber: string;
      id: number;
      name: string;
      lastName: string;
      email: string;
      isSuperuser: boolean;
      isStaff: boolean;
      isAdmin: boolean;
      isTechnician: boolean;
      isCustomer: boolean;
      isEditor: boolean;
      isSeller: boolean;
      isActive: boolean;
    } & DefaultSession["user"];
    error?: string;
  }

  interface User {
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
    documentNumber: string;
    id: number;
    name: string;
    lastName: string;
    email: string;
    isSuperuser: boolean;
    isStaff: boolean;
    isAdmin: boolean;
    isTechnician: boolean;
    isCustomer: boolean;
    isEditor: boolean;
    isSeller: boolean;
    isActive: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
    error?: string;
    documentNumber: string;
    id: number;
    name: string;
    lastName: string;
    email: string;
    isSuperuser: boolean;
    isStaff: boolean;
    isAdmin: boolean;
    isTechnician: boolean;
    isCustomer: boolean;
    isEditor: boolean;
    isSeller: boolean;
    isActive: boolean;
  }
}
