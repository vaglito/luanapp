export interface ResponseBrands {
  count: number;
  next?: string;
  previous?: string;
  results: BrandsSearch[];
}

export interface BrandsSearch {
  pk: number;
  is_active: boolean;
  slug: string;
  sopsub2: {
    cod_sub2: string;
    nom_sub2: string;
  };
}
