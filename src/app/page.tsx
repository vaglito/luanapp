import { Container } from "@mui/material";
import { getNewProductList, getProductList } from "../app/services/products";
// Components
import { NewProducts } from "./components/ui/new-products";
import { SectionLaptop } from "./components/ui/category-product";

export const revalidate = 0;

export const metadata = {
  title: "Corporacion Luana",
  description: "Tienda de corporacion luana",
};

export default async function Home() {
  const newProduct = await getNewProductList();
  const productsLaptop = await getProductList({ subcategorySlug: "laptop" });

  return (
    <>
      <Container maxWidth="xl">
        <NewProducts products={newProduct.results} />
      </Container>
      <SectionLaptop products={productsLaptop.results}/>
    </>
  );
}
