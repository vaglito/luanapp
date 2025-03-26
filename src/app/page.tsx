import { Container } from "@mui/material";
import { getNewProductList } from "../app/services/products";
// Components
import { NewProducts } from "./components/ui/new-products";

export const revalidate = 0;

export const metadata = {
  title: "Corporacion Luana",
  description: "Tienda de corporacion luana",
};

export default async function Home() {
  const newProduct = await getNewProductList();

  return (
    <Container maxWidth="xl">
      <NewProducts products={newProduct.results} />
    </Container>
  );
}
