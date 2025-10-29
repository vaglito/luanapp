import dynamic from "next/dynamic";
import { Metadata } from "next";
import { Container, Box, Skeleton } from "@mui/material";
import { fetchDetailProduct } from "@/app/services/products";
import { ProductSpecifications1 } from "@/app/components/product/detail/ProductSpecifications";
import { ProductSpecificationsContainer } from "@/app/components/product/detail/product-spec";
import { ProductDetailDescription } from "@/app/components/product/detail/product-detail-description";
import { ProductDetail } from "@/app/types/products.type";
import { ProductDetailMore } from "@/app/components/product/detail/product-detail-more";
import { fetchExchangeRate } from "@/app/services/exchangeRate";

// --- SEO dinámico con Open Graph + Twitter ---
export async function generateMetadata({
  params,
}: {
  params: { productSLUG: string };
}): Promise<Metadata> {
  const product = await fetchDetailProduct(params.productSLUG);

  const title = product.relay.productName;
  const description =
    product.resumen?.replace(/(<([^>]+)>)/gi, "").slice(0, 150) ||
    "Compra este producto con descuento.";
  const image = product.productsimages?.[0]?.images;
  const url = `https://corporacionluana.pe/productos/detalle/${params.productSLUG}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "Corporacion Luana",
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : [],
      locale: "es_PE",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : [],
    },
  };
}

interface ProductDetailProps {
  params: {
    productSLUG: string;
  };
}

export const revalidate = 0;

const ProductImageCarousel = dynamic<{ product: ProductDetail }>( // 👈 especifica los props que recibe
  () => import("@/app/components/product/detail/ProductImageCarousel"),
  {
    ssr: false,
    loading: () => (
      <Skeleton
        variant="rectangular"
        animation="wave"
        sx={{ width: "100%", height: 500, borderRadius: "12px" }}
      />
    ),
  }
);

export default async function ProductDetailPage({
  params,
}: ProductDetailProps) {
  const { productSLUG } = params;
  const product = await fetchDetailProduct(productSLUG);
  const exchange = await fetchExchangeRate();

  return (
    <Container maxWidth="xl" sx={{ marginY: 4}}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "column", md: "row", lg: "row" },
          gap: 3,
          alignItems: "stretch",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: { xs: "100%", md: "50%", lg: "50%" },
          }}
        >
          <ProductImageCarousel product={product} />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: { xs: "100%", md: "50%", lg: "50%" },
          }}
        >
          <ProductDetailDescription
            title={product.relay.productName}
            resumen={product.resumen}
            stock={product.relay.totalStock}
            prices={product.relay.priceSale}
            priceb={product.relay.priceBulk}
            exchange={exchange.exchange}
          />
        </Box>
      </Box>

      {/* specs and pay methods */}
      <Box
        sx={{
          marginY: 4,
          display: "flex",
          flexDirection: {
            xs: "column-reverse",
            sm: "column-reverse",
            md: "row",
            lg: "row",
          },
          backgroundColor: "#fff",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          borderRadius: "12px",
          paddingY: 3,
          paddingX: 3,
          height: "100%",
          gap: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: { xs: "100%", sm: "%50", md: "50%", lg: "50%" },
          }}
        >
          <ProductDetailMore />
        </Box>
        <Box
          sx={{
            display: "flex",
            width: { xs: "100%", sm: "%50", md: "50%", lg: "50%" },
          }}
        >
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
