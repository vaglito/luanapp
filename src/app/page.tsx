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

export const metadata = {
  title: "Corporacion Luana",
  description: "Tienda de corporacion luana",
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
        <NewProducts products={newProduct.results} />
      </Container>
      <ComputerHome />
      <SectionLaptop products={productsLaptop.results} />
      <HomeCategory categories={categories} />
    </>
  );
}
