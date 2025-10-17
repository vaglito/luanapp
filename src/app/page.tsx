import { Container } from "@mui/material";
import { getNewProductList, getProductList } from "./lib/api/products";
// Components
import { NewProducts } from "./components/ui/new-products";
import { SectionLaptop } from "./components/ui/category-product";
import { HomeCategory } from "./components/ui/home-category";
import { getCategoryList } from "./lib/api/categorys";
import { getBannerList } from "./lib/api/common";
import { BannerHome } from "./components/ui/banner/BannerHome";
import { ComputerHome } from "./components/computer/computer-home";

export const revalidate = 0;

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
  const newProduct = await getNewProductList();
  const productsLaptop = await getProductList({
    subcategorySlug: ["laptop-cvideo-dedicada", "laptop-c-video-integrada"],
  });
  const categories = await getCategoryList();
  const banners = await getBannerList();

  return (
    <>
      <BannerHome banners={banners} />
      <Container maxWidth="xl">
        <HomeCategory categories={categories} />
      </Container>
      <Container maxWidth="xl">
        <NewProducts products={newProduct.results} />
      </Container>
      <SectionLaptop products={productsLaptop.results} />
      <ComputerHome />
    </>
  );
}
