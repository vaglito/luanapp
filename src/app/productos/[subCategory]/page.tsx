import { Container } from "@mui/material";

interface ListProductSubCategoryPageProps {
  params: {
    subCategory: string;
  };
}

export default function ListProductSubCategoryPage({
  params,
}: ListProductSubCategoryPageProps) {
  const { subCategory } = params;
  return (
    <Container maxWidth="xl">
      <div>{subCategory}</div>
    </Container>
  );
}
