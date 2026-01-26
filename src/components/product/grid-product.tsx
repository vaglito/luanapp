import { Grid2 } from "@mui/material";
import { CardProduct } from "@/components/product/card-product";
import { Products } from "@/types/products.type";

export const GridProduct = ({
  products,
  exchange,
}: {
  products: Products[];
  exchange: number;
}) => {
  return (
    <Grid2 container spacing={2}>
      {products.map((product) => (
        <Grid2 size={{ xs: 6, sm: 4, md: 4, lg: 3, xl: 3 }} key={product.id}>
          <CardProduct product={product} exchange={exchange}/>
        </Grid2>
      ))}
    </Grid2>
  );
};

