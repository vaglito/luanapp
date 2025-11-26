import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Roboto } from "next/font/google";
import { Header } from "./components/layout/header/header";
import { Footer } from "./components/layout/footer/footer";
import { ThemeProvider } from "@mui/material/styles";
import { themeOptions } from "../../theme";
import "swiper/css";
import "./globals.css";
import { fetchSiteMetadata } from "./services/siteInfo";
import { GoogleAnalytics } from "@next/third-parties/google";
import { fetchExchangeRate } from "./services/exchangeRate";
import { GTMHead } from "./components/GTMhead";
import { GTMBody } from "./components/GTMbody";
import { Box } from "@mui/material";


const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await fetchSiteMetadata(1);

  return {
    title: `${site.siteName} | ${site.slogan}`,
    description: site.metaDescription,
    keywords: ["computadoras", "accesorios", "envío rápido"],
    openGraph: {
      title: `${site.siteName} | ${site.slogan}`,
      description: site.metaDescription,
      images: [site.logo],
    },
    icons: {
      icon: site.favicon,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const site = await fetchSiteMetadata(1);
  const exchange = await fetchExchangeRate();

  return (
    <html lang="es">
      <head>
        <GoogleAnalytics gaId="G-XELJ23CNWC" />
        <GTMHead />
      </head>
      <body className={`${roboto.className} antialiased`}>
        <GTMBody />
        <ThemeProvider theme={themeOptions}>
          <AppRouterCacheProvider options={{ key: "css" }}>
            {/* Layout con flex para empujar el footer abajo */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
              }}
            >
              <Header logo={site.logo} exchange={exchange.exchange} />

              {/* Contenido principal ocupa el espacio restante */}
              <Box component="main" sx={{ flex: 1 }}>
                {children}
              </Box>

              <Footer address={site.address || ""} />
            </Box>
          </AppRouterCacheProvider>
        </ThemeProvider>
      </body>
    </html>

  );
}
