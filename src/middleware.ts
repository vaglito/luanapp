import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";
import { ROLE_ROUTES } from "@/config/roles";
import { getUserRoles } from "./app/lib/roles";

export async function middleware(req: NextRequest) {
  const session = await auth();
  const { pathname } = req.nextUrl;

  /* ---------------------------------------------------------------------- */
  /* 1️⃣ Rutas públicas                                                     */
  /* ---------------------------------------------------------------------- */
  const publicRoutes = ["/login", "/register"];

  if (publicRoutes.includes(pathname)) {
    if (session) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  /* ---------------------------------------------------------------------- */
  /* 2️⃣ Rutas protegidas (requieren login)                                 */
  /* ---------------------------------------------------------------------- */
  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  /* ---------------------------------------------------------------------- */
  /* 3️⃣ Protección por roles                                               */
  /* ---------------------------------------------------------------------- */
  const requiredRoles = Object.entries(ROLE_ROUTES).find(([route]) =>
    pathname.startsWith(route)
  )?.[1];

  if (requiredRoles) {
    const userRoles = getUserRoles(session);

    const hasAccess = requiredRoles.some((role) =>
      userRoles.includes(role)
    );

    if (!hasAccess) {
      return NextResponse.redirect(
        new URL("/unauthorized", req.url)
      );
    }
  }

  return NextResponse.next();
}

/* -------------------------------------------------------------------------- */
/* MATCHER                                                                    */
/* -------------------------------------------------------------------------- */

export const config = {
  matcher: ["/dashboard/:path*"],
};
