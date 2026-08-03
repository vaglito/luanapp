export interface ComplaintPayload {
  fullName: string;
  documentType: "DNI" | "CE" | "RUC";
  documentNumber: string;
  email: string;
  phone: string;
  address: string;
  goodType: "PRODUCTO" | "SERVICIO";
  amount: string;
  goodDescription: string;
  claimType: "RECLAMO" | "QUEJA";
  detail: string;
  request: string;
}

export interface ComplaintResponse {
  id: number;
  tracking_number: string;
  status: string;
  created_at: string;
}
