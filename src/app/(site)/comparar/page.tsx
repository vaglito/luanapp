import { fetchExchangeRate } from "@/services/catalog/exchangeRate";
import { ComparePageClient } from "./compare-page-client";

export default async function ComparePage() {
  const exchange = await fetchExchangeRate();

  return <ComparePageClient exchange={exchange.exchange} />;
}
