export interface Soplinea {
    cod_line: string;
    nom_line: string;
}

export interface Sopsub1 {
    cod_sub1: string;
    nom_sub1: string;
}

export interface Subcategory {
    pk: number;
    is_active: boolean;
    image?: string;
    slug: string;
    sopsub1: Sopsub1;
}

export interface Categorys {
    pk: number;
    is_active: boolean;
    image: string;
    slug: string;
    soplinea: Soplinea;
    subcategory: Subcategory[];
}