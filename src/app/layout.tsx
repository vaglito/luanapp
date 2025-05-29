import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Roboto } from "next/font/google";
import { Header } from "@/app/ui/header/header";
import { Footer } from "./ui/footer/footer";
import { ThemeProvider } from '@mui/material/styles';
import { themeOptions } from "../../theme";
import Alert from '@mui/material/Alert';
import "swiper/css";
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
      <ThemeProvider theme={themeOptions}>
        <AppRouterCacheProvider options={{ key: "css" }}>
          <Header />
          <Alert severity="warning">Esta pagina puede variar el stock y el precio en algunos casos. Contactar con un asesor de ventas.</Alert>
          {children}
          <Footer />
        </AppRouterCacheProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
