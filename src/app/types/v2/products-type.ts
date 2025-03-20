export interface Category {
    cod_line: string;
    nom_line: string;
    category: {
        pk: number;
        is_active: boolean;
        image?: string;
        slug: string;
    }
}

export interface SubCategory {
    cod_sub1: string;
    nom_sub1: string;
    subcategory: {
        pk: number;
        is_active: boolean;
        image?: string;
        slug: string;
    }
}

export interface Brands {
    trademarks: {
        pk: number;
        is_active: boolean;
        slug: string;
        sopsub2: {
            cod_sub2: string;
            nom_sub2: string;
        }
        image: string;
        description: string;
    }
}

export interface Price {
    precio_decimal: number;
    precio_local: number;
    precio_dolar_5: number;
    precio_local_5: number;
    precio_oferta_d: number;
    precio_oferta: number;
    precio_oferta_5: number;
    precio_oferta_d_5: number;
}


export interface Sopprod {
    pk: string;
    stock_index: number;
    nom_prod: string;
    cod_clasi: Category[];
    cod_cate: SubCategory[];
    cod_subc: Brands[];
    cod_prod_relation_precios: Price[];
}

export interface ProductImage {
    images: string;
} 

export interface Product {
    pk: number;
    is_active: boolean;
    slug: string;
    keywords: string;
    sopprod: Sopprod[];
    productimage_set: ProductImage[];
}

export interface ResponseProducts {
    count: number;
    next: string | null;
    previous: string | null;
    results: Product[] | [];
}