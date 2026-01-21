import { Filter } from "@/app/components/product/search/Filter";
import { fetchBrandsCategories } from "@/app/services/brands";
import { BrandFilter } from "@/app/components/product/search/BrandFilter";

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
