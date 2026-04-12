import { Filter } from "@/components/catalog/product/search/Filter";
import { fetchBrandsCategories } from "@/services/catalog/brands";
import { BrandFilter } from "@/components/catalog/product/search/BrandFilter";

interface SubCategoryFilterListProps {
    subcategorySlug: string;
}

export const SubCategoryFilterList = async ({
    subcategorySlug,
}: SubCategoryFilterListProps) => {
    return (
        <Filter
            query={subcategorySlug}
            filters={[
                {
                    title: "Marcas",
                    fetchData: fetchBrandsCategories,
                    Component: BrandFilter,
                },
            ]}
        />
    );
};

