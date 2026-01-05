import { ProformaComponents } from "@/app/components/proformas/ProformaComponents";
import { getProformas } from "@/app/services/dashboard/seller/proformas";

export default async function SellerDashboard() {
  const proformas = await getProformas();
  return <ProformaComponents proformas={proformas.results} />;
}
