import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Roboto, Orbitron, Inter } from "next/font/google";
import { Header } from "@/components/layout/header/header";
import { Footer } from "@/components/layout/footer/footer";
import { ThemeProvider } from "@mui/material/styles";
import { themeOptions } from "../../theme";
import "swiper/css";
import "./globals.css";
import { fetchSiteMetadata } from "@/services/siteInfo";
import { GoogleAnalytics } from "@next/third-parties/google";
import { fetchExchangeRate } from "@/services/exchangeRate";
import { GTMHead } from "@/components/GTMhead";
import { GTMBody } from "@/components/GTMbody";
import { Box } from "@mui/material";
import { Providers } from "./providers";
import { fetchBrands } from "@/services/brands";
import { WhatsAppBubble } from "@/components/ui/whatsapp-bubble";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await fetchSiteMetadata(1);

  return {
    metadataBase: new URL(process.env.API_URL || "http://localhost:3000"),
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
  const brands = await fetchBrands()

  return (
    <html lang="es">
      <head>
        <GoogleAnalytics gaId="G-XELJ23CNWC" />
        <GTMHead />
      </head>
      <body className={`${inter.className} ${orbitron.variable} antialiased`}>
        <GTMBody />
        <ThemeProvider theme={themeOptions}>
          <AppRouterCacheProvider options={{ key: "css" }}>
            <Providers>
              {/* Layout con flex para empujar el footer abajo */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  minHeight: "100vh",
                }}
              >
                <Header logo={site.logo} exchange={exchange.exchange} brands={brands} />

                {/* Contenido principal ocupa el espacio restante */}
                <Box component="main" sx={{ flex: 1 }}>
                  {children}
                </Box>

                <WhatsAppBubble />
                <Footer address={site.address || ""} />
              </Box>
            </Providers>
          </AppRouterCacheProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

