import { Container, Box } from "@mui/material";
import { fetchFilterProductCategorySubCategory } from "./utils/products";

// Components
import { BannerMain } from "./ui/banner";
import { ProductNew } from "./ui/product/new-products";
import { CategorySlider } from "./ui/category/categorySlider";
import { AdsHome } from "./ui/aside/ads-index";
import { FeaturedProduct } from "./ui/product/product-types/featured-product";
import { BrandProducts } from "./ui/product/product-types/brand-products";
import { TopFooter } from "./ui/footer/top-footer";

export const revalidate = 0;

export const metadata = {
  title: "Corporacion Luana",
  description: "Tienda de corporacion luana",
};

export default async function Home() {
  const filterProduct = await fetchFilterProductCategorySubCategory(
    "02",
    "095"
  );

  return (
    <>
      <Container maxWidth="xl">
        <Box>
          <BannerMain />
        </Box>
        {/* Categorias */}
        <CategorySlider />

        {/* Nuevos productos */}
        <ProductNew />
        {/* Imagenes ADS */}
        <AdsHome />
        {/* Laptops */}
      </Container>
      <FeaturedProduct filteredProduct={filterProduct} />
      {/* Productos categorias */}
      <Container maxWidth="xl">
        <BrandProducts />
      </Container>
      {/* Info */}
      <TopFooter />
    </>
  );
}
