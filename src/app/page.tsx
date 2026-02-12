import { Container } from "@mui/material";
// Components
import { NewProducts } from "@/components/ui/new-products";
import { SectionLaptop } from "@/components/ui/category-product";
import { HomeCategory } from "@/components/ui/home-category";
import { BannerHome } from "@/components/ui/banner/BannerHome";
import { fetchBannerHome } from "@/services/siteInfo";
import { fetchCategories } from "@/services/categories";
import { fetchNewProducts } from "@/services/products";
import { fetchExchangeRate } from "@/services/exchangeRate";
import { fetchProductList } from "@/services/products";
import { TopFooter } from "@/components/layout/footer/top-footer";
import { ComputerHome } from "@/components/computer/ComputerHome";
import { PopularProducts } from "@/components/ui/popular-products";

export const revalidate = 360;

export const generateMetadata = () => {
  const image = "../social.jpg";
  return {
    title: "Corporación Luana | Seguridad, confianza e innovación",
    description:
      "Bienvenido a Corporación Luana, tu tienda online de confianza en Perú. Descubre laptops con video dedicada e integrada, productos tecnológicos, computadoras gamer y para ingenería, accesorios y más. Envíos rápidos y atención personalizada.",
    keywords: [
      "Corporación Luana",
      "tienda online Perú",
      "laptops con video dedicada",
      "laptops con video integrada",
      "computadora gamer",
      "computadora para ingeneria",
      "tecnología Perú",
      "comprar laptops online",
      "accesorios tecnológicos",
      "ecommerce Perú",
    ],
    openGraph: {
      title: "Corporación Luana | Seguridad, confianza e innovación",
      description:
        "Explora las últimas novedades en laptops, computadoras y tecnología en Corporación Luana. Compra online con envío rápido y atención personalizada.",
      url: "https://corporacionluana.pe",
      siteName: "Corporacion luana",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: "Corporación Luana | Seguridad, confianza e innovación",
        },
      ],
      locale: "es_PE",
      type: "website",
      twitter: {
        card: "summary_large_image",
        title: "Corporación Luana | Seguridad, confianza e innovación",
        description:
          "Descubre laptops, accesorios y más en Corporación Luana. Compra online con envío rápido.",
        images: [image],
      },
    },
  };
};

export default async function Home() {
  const banners = await fetchBannerHome();
  const categories = await fetchCategories();
  const newProduct = await fetchNewProducts();
  const exchange = await fetchExchangeRate();
  const productsLaptop = await fetchProductList({
    subcategory: ["laptop-cvideo-dedicada", "laptop-c-video-integrada"],
  });
  return (
    <>
      <BannerHome banners={banners} />
      <Container maxWidth="xl">
        <HomeCategory categories={categories} />
      </Container>
      <Container maxWidth="xl">
        <NewProducts
          products={newProduct.results}
          exchange={exchange.exchange}
        />
        <PopularProducts exchange={exchange.exchange} />
      </Container>
      <ComputerHome />
      <SectionLaptop
        products={productsLaptop.results}
        exchange={exchange.exchange}
      />
      <TopFooter />
    </>
  );
}

