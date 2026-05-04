import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // 1. Obtenemos el estado de la sesión
  const isLoggedIn = !!req.auth;
  const hasTokenError = req.auth?.error === "RefreshAccessTokenError";

  // 2. Clasificamos las rutas
  const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/registro");
  const isProtectedRoute = pathname.startsWith("/dashboard"); // La ÚNICA ruta privada

  // 3. Manejo de error de token (El Backend rechazó el token y la sesión quedó "fantasma")
  if (hasTokenError) {

    // Si es una ruta protegida, enviamos al login inmediatamente
    if (isProtectedRoute) {
      const response = NextResponse.redirect(new URL("/login", req.nextUrl));
      req.cookies.getAll().forEach((cookie) => {
        if (cookie.name.includes("session-token") || cookie.name.includes("authjs") || cookie.name.includes("next-auth")) {
          response.cookies.delete(cookie.name);
        }
      });
      return response;
    }

    // Si es ruta pública, NO redirigimos (eso causa ERR_TOO_MANY_REDIRECTS).
    // Clonamos los headers y quitamos las cookies de Auth para que el servidor 
    // renderice el Header de esta página en estado "deslogueado".
    const requestHeaders = new Headers(req.headers);
    const cookiesHeader = requestHeaders.get("cookie");
    if (cookiesHeader) {
      const filteredCookies = cookiesHeader
        .split(";")
        .filter((c) => {
          const name = c.split("=")[0].trim();
          return !(name.includes("session-token") || name.includes("authjs") || name.includes("next-auth"));
        })
        .join("; ");
      requestHeaders.set("cookie", filteredCookies);
    }

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    // Borramos las cookies en la respuesta para limpiar el navegador
    req.cookies.getAll().forEach((cookie) => {
      if (
        cookie.name.includes("session-token") ||
        cookie.name.includes("authjs") ||
        cookie.name.includes("next-auth")
      ) {
        response.cookies.delete(cookie.name);
      }
    });

    return response;
  }

  // 4. Proteger la ruta del Dashboard para usuarios NO logueados
  if (!isLoggedIn && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // 5. Evitar que usuarios logueados regresen al Login/Registro
  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  // 6. Permitir el acceso libre a todas las demás rutas (son públicas por defecto)
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)"],
};