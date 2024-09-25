export interface Categories {
  id: number;
  is_active: boolean;
  slug: string;
  soplinea: SopLinea;
  subcategory: Subcategory[];
}

// Interfaz para la línea
export interface SopLinea {
  cod_line: string;
  nom_line: string;
}

// Interfaz para la subcategoría
export interface Subcategory {
  sopsub1: SopSub1;
  is_active: boolean;
  image: string | null;
  slug: string;
}

// Interfaz para los detalles de subcategoría
export interface SopSub1 {
  cod_sub1: string;
  nom_sub1: string;
}
