import { Filter } from "@/components/product/search/Filter";
import { fetchBrandsCategories } from "@/services/brands";
import { BrandFilter } from "@/components/product/search/BrandFilter";

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

