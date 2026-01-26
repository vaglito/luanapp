import { Filter } from "./Filter";
import { fetchBrandsSearch } from "@/services/brands";
import { fetchCategoriesSearch } from "@/services/categories";
import { BrandFilter } from "./BrandFilter";
import { CategoryFilter } from "./CategoryFilter";

export const FilterList = async ({ query }: { query: string }) => {
    return (
        <Filter
            query={query}
            filters={[
                {
                    title: "Marcas",
                    fetchData: fetchBrandsSearch,
                    Component: BrandFilter,
                },
                {
                    title: "Categorías",
                    fetchData: fetchCategoriesSearch,
                    Component: CategoryFilter,
                },
            ]}
        />
    );
};

