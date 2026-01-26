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
  id: number;
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
  totalPrice: number;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface typeComputerDetail {
  id: number;
  state: boolean;
  title: string;
  image?: string;
  description?: string;
  specifications: {
    CPU: string;
    GPU: string;
    RAM: string;
    SSD: string;
  };
  totalPrice: number;
  slug: string;
  computers: typeProducts[];
}

export interface typeProducts {
  pk: number;
  product: {
    id: number;
    isActive: boolean;
    slug: string;
    condition?: string;
    relay: {
      productId: string;
      productName: number;
      classificationCode: {
        brandCode: string;
        brandName: string;
        brands: string;
      };
      categoryCode: {
        categoryCode: string;
        categoryName: string;
        categoryweb: string;
      };
      subcategoryCode: {
        subcategoryCode: string;
        subcategoryName: string;
        subcategoryweb: string;
      };
      priceSale: number;
      priceBulk: number;
      totalStock: number;
    };
  };
  state: boolean;
  quantity: number;
}
