import { fetchNewProducts } from "@/services/products";
import { NewProducts } from "@/components/ui/new-products";

export async function SuspenseNewProducts({ exchange }: { exchange: number }) {
  const newProduct = await fetchNewProducts();

  return (
    <NewProducts
      products={newProduct.results}
      exchange={exchange}
    />
  );
}
