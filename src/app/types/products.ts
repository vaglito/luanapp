export interface Product {
  count: number;
  next?: number;
  previous?: number;
  results: Result[];
}

export interface ResponseFilterType {
  count: number;
  next?: number;
  previous?: number;
  results: Result[];
  subcategories: CodCate[];
}

export interface Result {
  pk: number;
  is_active: boolean;
  condition: null;
  sopprod: Sopprod;
  slug: string;
  productimage_set: ProductimageSet[];
}

export interface ProductimageSet {
  images: string;
}

export interface Sopprod {
  cod_prod: string;
  nom_prod: string;
  stock_index: number;
  cod_clasi: CodClasi;
  cod_cate: CodCate;
  cod_subc: CodSubc;
  cod_prod_relation_precios: CodProdRelationPrecio[];
}

export interface CodCate {
  cod_sub1: string;
  nom_sub1: string;
  subcategory: {
    slug: string;
  };
}

export interface CodClasi {
  cod_line: string;
  nom_line: string;
}

export interface CodProdRelationPrecio {
  precio_decimal: number;
  precio_local: number;
  precio_dolar_5: number;
  precio_local_5: number;
  precio_oferta_d: number;
  precio_oferta: number;
  precio_oferta_5: number;
  precio_oferta_d_5: number;
}

export interface CodSubc {
  cod_sub2: string;
  nom_sub2: string;
  trademark: {
    slug: string;
  };
}
