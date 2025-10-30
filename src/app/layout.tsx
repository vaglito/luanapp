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
      icon: site.favicon
    }
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const site = await fetchSiteMetadata(1)
  return (
    <html lang="es">
      <body className={`${roboto.className} antialiased`}>
        <ThemeProvider theme={themeOptions}>
          <AppRouterCacheProvider options={{ key: "css" }}>
            <Header logo={site.logo}/>
            {children}
            <Footer address={site.address || ""}/>
          </AppRouterCacheProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
