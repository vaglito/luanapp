// middleware.ts
import { auth } from "@/auth";
import { NextResponse } from "next/server";

// Route → required role check
const ROLE_GUARDS: { match: string; check: (u: ReturnType<typeof getUser>) => boolean }[] = [
  { match: "/dashboard/users", check: (u) => !!u?.isAdmin },
  { match: "/dashboard/settings", check: (u) => !!u?.isAdmin },
  { match: "/dashboard/sales", check: (u) => !!u?.isAdmin || !!u?.isSeller },
  { match: "/dashboard/proformas", check: (u) => !!u?.isAdmin || !!u?.isSeller },
  { match: "/dashboard/ordenes", check: (u) => !!u?.isAdmin || !!u?.isSeller },
  { match: "/dashboard/tech", check: (u) => !!u?.isAdmin || !!u?.isTechnician },
  { match: "/dashboard/invoices", check: (u) => !!u?.isAdmin || !!u?.isCustomer || !!u?.isSuperuser },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getUser(token: any) {
  return token as {
    isAdmin?: boolean;
    isSuperuser?: boolean;
    isStaff?: boolean;
    isSeller?: boolean;
    isTechnician?: boolean;
    isCustomer?: boolean;
    isEditor?: boolean;
  } | null;
}

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isDashboardRoute = nextUrl.pathname.startsWith("/dashboard");
  const isAuthRoute = nextUrl.pathname.startsWith("/login");

  // Si intenta entrar al login estando ya logueado, mandarlo al dashboard
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/dashboard", nextUrl));
    }
    return NextResponse.next();
  }

  // Si intenta entrar al dashboard sin estar logueado, mandarlo al login
  if (isDashboardRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  // Verificar rol por ruta protegida
  if (isDashboardRoute && isLoggedIn) {
    const user = getUser(req.auth?.user ?? null);
    const guard = ROLE_GUARDS.find((g) => nextUrl.pathname.startsWith(g.match));
    if (guard && !guard.check(user)) {
      // Redirigir al dashboard principal si no tiene el rol requerido
      return NextResponse.redirect(new URL("/dashboard", nextUrl));
    }
  }

  return NextResponse.next();
});

// 3. El Matcher (Filtro)
export const config = {
  // Esta expresión regular filtra qué rutas deben pasar por el middleware
  // Evita archivos estáticos, imágenes y favicon para mejorar el rendimiento
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};