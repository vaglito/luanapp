import { Metadata } from "next";
import { Container, Box } from "@mui/material";
import { fetchDetailProduct } from "@/services/products";
import { ProductSpecifications1 } from "@/components/product/detail/ProductSpecifications";
import { ProductSpecificationsContainer } from "@/components/product/detail/product-spec";
import { ProductDetailDescription } from "@/components/product/detail/product-detail-description";
import { ProductDetail } from "@/types/products.type";
import { ProductDetailMore } from "@/components/product/detail/product-detail-more";
import { fetchExchangeRate } from "@/services/exchangeRate";
import { notFound } from "next/navigation";
import { CarouselWrapper } from "@/components/product/detail/CarouselWrapper"; // 👈 Importa el nuevo wrapper
import { ProductViewTracker } from "@/components/product/product-view-tracker";

export const revalidate = 0;

// En Next 15, params en generateMetadata también es una Promesa
export async function generateMetadata({
  params,
}: {
  params: Promise<{ productSLUG: string }>; // 👈 Cambiado a Promise
}): Promise<Metadata> {
  const { productSLUG } = await params; // 👈 Await obligatorio
  const product = await fetchDetailProduct(productSLUG);

  if (!product) return { title: "Producto no encontrado" };

  const title = product.relay.productName;
  const description =
    product.resumen?.replace(/(<([^>]+)>)/gi, "").slice(0, 150) ||
    "Compra este producto.";
  const image = product.productsimages?.[0]?.images;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: image ? [{ url: image }] : [],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ productSLUG: string }>; // 👈 Cambiado a Promise para Next 15.5
}) {
  const { productSLUG } = await params; // 👈 Await de params

  const [product, exchange] = await Promise.all([
    fetchDetailProduct(productSLUG).catch(() => null),
    fetchExchangeRate(),
  ]);

  if (!product) notFound();

  return (
    <Container maxWidth="xl" sx={{ marginY: 4 }}>
      <ProductViewTracker slug={productSLUG} />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
          alignItems: "stretch",
        }}
      >
        <Box sx={{ width: { xs: "100%", md: "50%" } }}>
          {/* Usamos el Wrapper de Cliente aquí */}
          <CarouselWrapper product={product} />
        </Box>

        <Box sx={{ width: { xs: "100%", md: "50%" } }}>
          <ProductDetailDescription
            title={product.relay.productName}
            resumen={product.resumen}
            stock={product.relay.totalStock}
            prices={product.relay.priceSale}
            priceb={product.relay.priceBulk}
            exchange={exchange.exchange}
            subCategories={product.relay.subcategoryCode.subcategoryweb}
            product={product} // 🔹 Pasamos el producto completo
          />
        </Box>
      </Box>

      {/* ... Resto de tu código (Especificaciones, etc) ... */}
      <Box
        sx={{
          marginY: 4,
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" },
          bgcolor: "#fff",
          p: 3,
          borderRadius: "12px",
          boxShadow: 1,
          gap: 4,
        }}
      >
        <Box sx={{ width: { xs: "100%", md: "50%" } }}>
          <ProductDetailMore />
        </Box>
        <Box sx={{ width: { xs: "100%", md: "50%" } }}>
          {product.specs ? (
            <ProductSpecificationsContainer specifications={product.specs} />
          ) : (
            <ProductSpecifications1 specifications={product.description} />
          )}
        </Box>
      </Box>
    </Container>
  );
}
