import { auth } from "@/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isAuthRoute = req.nextUrl.pathname.startsWith("/login");

  // Si el usuario no está logueado y no está intentando acceder a la página de login,
  // lo redirigimos a "/login".
  if (!isLoggedIn && !isAuthRoute) {
    return Response.redirect(new URL("/login", req.nextUrl));
  }

  // Si el usuario ya está logueado e intenta acceder al login,
  // lo redirigimos a la página principal (o a un dashboard).
  if (isLoggedIn && isAuthRoute) {
    return Response.redirect(new URL("/", req.nextUrl));
  }
});

// Configura en qué rutas se ejecutará el middleware
export const config = {
  // Excluye las rutas internas de Next.js, archivos estáticos, la API y recursos públicos
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)"],
};