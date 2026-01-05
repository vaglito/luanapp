import { Box } from "@mui/material";
import { ProformaComponents } from "@/app/components/proformas/ProformaComponents";
import { getProformas } from "@/app/services/dashboard/seller/proformas";
import { CreateProformaForm } from "@/app/components/proformas/create/CreateProformaForm";

export default async function SellerDashboard() {
  const proformas = await getProformas();
  return (
    <Box>
      <Box>
        <CreateProformaForm />
      </Box>
      <Box>
        <ProformaComponents proformas={proformas.results} />;
      </Box>
    </Box>
  )
}
