import { fetchNewProducts } from "@/services/catalog/products";
import { NewProducts } from "@/components/layout/new-products";

export async function SuspenseNewProducts({ exchange }: { exchange: number }) {
  const newProduct = await fetchNewProducts();

  return (
    <NewProducts
      products={newProduct.results}
      exchange={exchange}
    />
  );
}
