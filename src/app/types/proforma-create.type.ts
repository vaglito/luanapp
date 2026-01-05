export interface CreateProformaItem {
  productId: number;
  internalCode: string;
  productName: string;
  unitPrice: number;
  quantity: number;
  total: number;
}

export interface CreateProformaPayload {
  customer: string;
  customerDocument: string;
  customerEmail?: string | null;
  mode: "CONTADO" | "CREDITO" | "CREDITO 7 DIAS" | "CREDITO 15 DIAS" | "CREDITO 30 DIAS";
  items: CreateProformaItem[];
}
