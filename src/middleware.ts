// middleware.ts
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth; // Verifica si hay sesión

  // 1. Definir rutas
  const isDashboardRoute = nextUrl.pathname.startsWith("/dashboard");
  const isAuthRoute = nextUrl.pathname.startsWith("/login");
  const isPublicRoute = nextUrl.pathname === "/"; // Home o landing

  // 2. Lógica de redirección
  
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

  return NextResponse.next();
});

// 3. El Matcher (Filtro)
export const config = {
  // Esta expresión regular filtra qué rutas deben pasar por el middleware
  // Evita archivos estáticos, imágenes y favicon para mejorar el rendimiento
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};