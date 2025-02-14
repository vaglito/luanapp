export interface Brands {
  id: number;
  sopsub2: Sopsub2;
  is_active: boolean;
  description: string;
  image: string;
  slug: string;
}

export interface Sopsub2 {
  cod_sub2: string;
  nom_sub2: string;
  trademark: {
    slug: string;
  };
}
