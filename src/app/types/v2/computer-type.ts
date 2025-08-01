export interface typeComputer {
  id: number;
  title: string;
  state: boolean;
  description: string;
  image: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface typeResponse<T> {
  count: number;
  next?: string;
  previous?: string;
  results: T[];
}

export interface typeComputerSerie {
  id: number;
  type: string;
  title: string;
  state: boolean;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface Computer {
  pk: number;
  title: string;
  state: boolean;
  computer_serie: typeComputerSerie;
  image?: string;
  description: string;
  specifications: {
    CPU: string;
    GPU: string;
    RAM: string;
    SSD: string;
  };
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface typeComputerDetail {
  pk: number;
  state: boolean;
  image?: string;
  description?: string;
  specifications: {
    CPU: string;
    GPU: string;
    RAM: string;
    SSD: string;
  };
  slug: string;
  computers: typeProducts[];
}

export interface typeProducts {
  pk: number;
  product: {
    pk: number;
    is_active: boolean;
    sopprod: {
      nom_prod: string;
      stock_index: number;
      cod_prod_relation_precios: {
        precio_decimal: number;
        precio_local: number;
        precio_dolar_5: number;
        precio_local_5: number;
        precio_oferta_d: number;
        precio_oferta: number;
        precio_oferta_5: number;
        precio_oferta_d_5: number;
      }[];
    };
    state: boolean;
    quantity: number;
  };
}
