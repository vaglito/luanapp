export interface Brands {
  id: number;
  isActive: boolean;
  description?: string;
  image: string;
  relay: {
    brandCode: string;
    brandName: string;
    brands: string;
  };
}
