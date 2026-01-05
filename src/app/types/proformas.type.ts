export interface ProformaItem {
  id: number;
  internalCode: string;
  productName: string;
  unitPrice: string; // backend decimal
  quantity: number;
  total: string;
}

export interface Proforma {
  id: number;
  code: string;
  customer: string;
  customerDocument: string;
  customerEmail: string | null;
  seller: number;
  subtotal: string;
  total: string;
  mode: "CONTADO" | "CREDITO" | "CREDITO 7 DIAS" | "CREDITO 15 DIAS" | "CREDITO 30 DIAS";
  createdAt: string;
  items: ProformaItem[];
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
