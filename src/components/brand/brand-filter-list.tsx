import { Filter } from "@/components/product/search/Filter";
import { fetchCategoriesBrands } from "@/services/catalog/categories";
import { CategoryFilter } from "@/components/product/search/CategoryFilter";

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

