import { convertUsdToPen } from "@/lib/currency";
import { Products } from "@/types/products.type";

export const getPrice = (product: Products, exchange: number) => {
    const { priceSale, priceBulk } = product.relay;

    // Logic from PriceCard:
    // priceBulk > 0 means there is an offer (priceBulk is the offer price)
    // priceSale is the regular price
    const hasOffer = priceBulk > 0;

    const finalPriceUsd = hasOffer ? priceBulk : priceSale;
    const originalPriceUsd = priceSale;

    const price = convertUsdToPen(finalPriceUsd, exchange);
    const priceb = convertUsdToPen(originalPriceUsd, exchange); // Original price in PEN

    // Calculate discount percentage if needed
    const discount = hasOffer && priceSale > 0
        ? Math.round(((priceSale - priceBulk) / priceSale) * 100)
        : 0;

    return {
        price,     // The final display price in PEN
        priceb,    // The original price in PEN (for strike-through)
        discount,  // Discount percentage
        hasOffer,  // Boolean flag
    };
};
