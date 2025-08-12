import { Grid2 } from "@mui/material";
import { CardProduct } from "@/app/components/product/card-product";
import { Product } from "@/app/types/v2/products-type";


export const GridProduct = ({ products }: { products: Product[] }) => {
  return (
    <Grid2 container spacing={2}>
      {products.map((product) => (
        <Grid2 size={{ xs: 6, sm: 4, md: 3 }} key={product.pk} >
          <CardProduct product={product} />
        </Grid2>
      ))}
    </Grid2>
  );
};
