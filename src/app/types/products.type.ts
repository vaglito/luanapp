type Specifications = {
  [key: string]: string | number; // Definición del tipo
};

export interface Relay {
  productId: string;
  productName: string;
  classificationCode: {
    brandCode: string;
    brandName: string;
    brands: string;
  };
  categoryCode: {
    categoryCode: string;
    categoryName: string;
    categoryWeb: string;
  };
  subcategoryCode: {
    subcategoryCode: string;
    subcategoryName: string;
    subcategoryWeb: string;
  };
  priceSale: number;
  priceBulk: number;
  totalStock: number;
}

export interface Products {
  id: number;
  isActive: boolean;
  slug: string;
  condition?: string;
  relay: Relay;
  productsimages: {
    images: string;
  }[];
}

export interface ProductDetail {
  id: number;
  isActive: boolean;
  slug: string;
  condition?: string;
  keywords?: string;
  relay: Relay;
  description?: string;
  resumen: string;
  specs?: Specifications;
  productsimages: {
    images: string;
  }[];
}
