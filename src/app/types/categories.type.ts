export interface Categories {
  id: number;
  isActive: boolean;
  image: string;
  relay: {
    categoryCode: string;
    categoryName: string;
    categoryweb: string;
  };
  categoriesWeb: SubCategories[];
}

export interface SubCategories {
  id: number;
  isActive: boolean;
  image?: string;
  relay: {
    subcategoryCode: string;
    subcategoryName: string;
    subcategoryweb: string;
  };
}
