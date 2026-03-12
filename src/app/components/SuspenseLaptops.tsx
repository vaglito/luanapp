import { fetchProductList } from "@/services/products";
import { SectionLaptop } from "@/components/ui/category-product";

export async function SuspenseLaptops({ exchange }: { exchange: number }) {
  const productsLaptop = await fetchProductList({
    subcategory: ["laptop-cvideo-dedicada", "laptop-c-video-integrada"],
  });

  return (
    <SectionLaptop
      products={productsLaptop.results}
      exchange={exchange}
    />
  );
}
