import { Filter } from "@/app/components/product/search/Filter";
import { fetchCategoriesBrands } from "@/app/services/categories";
import { CategoryFilter } from "@/app/components/product/search/CategoryFilter";

interface BrandFilterListProps {
    brandSlug: string;
}

export const BrandFilterList = async ({ brandSlug }: BrandFilterListProps) => {
    return (
        <Filter
            query={brandSlug}
            filters={[
                {
                    title: "Categorias",
                    fetchData: fetchCategoriesBrands,
                    Component: CategoryFilter,
                },
            ]}
        />
    );
};
