import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Corporacion luana",
  description:
    "Corporacion Luana lo mejor en computo y accesorios con las mejores marcas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${roboto.className} antialiased`}>
        <AppRouterCacheProvider options={{ key: "css" }}>
          {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
