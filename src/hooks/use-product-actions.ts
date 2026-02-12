import { useState } from "react";
import { showToast } from "nextjs-toast-notify";
import { useCart } from "@/hooks/use-cart";
import { ProductDetail } from "@/types/products.type";
import { SELLERS } from "@/config/sellers";

interface UseProductActionsProps {
    product: ProductDetail;
    stock: number;
    subCategory: string;
    title: string;
}

export function useProductActions({ product, stock, subCategory, title }: UseProductActionsProps) {
    const [counter, setCounter] = useState(1);
    const { addItem } = useCart();

    const restrictedSubcategories =
        process.env.NEXT_PUBLIC_RESTRICTED_SUBCATEGORIES?.split(",") || [];
    const isRestricted = restrictedSubcategories.includes(subCategory);

    const increment = () => {
        if (counter < stock) {
            setCounter((prev) => prev + 1);
        }
    };

    const decrement = () => {
        if (counter > 1) {
            setCounter((prev) => prev - 1);
        }
    };

    const addToCart = () => {
        if (isRestricted) {
            showToast.error("❌ Este producto solo se vende en computadoras completas");
            return;
        }
        if (stock === 0) {
            showToast.error("❌ No hay stock disponible");
            return;
        }

        // @ts-ignore: Adapter or compatible type expected
        addItem(product, counter);
        showToast.success("✅ Producto agregado al carrito");
    };

    const contactWhatsApp = () => {
        if (isRestricted) {
            showToast.error("❌ Este producto solo se vende en computadoras completas", {
                duration: 3000,
                position: "top-right",
            });
            return;
        }

        if (stock === 0) {
            showToast.error("❌ No hay stock disponible", {
                duration: 3000,
                position: "top-right",
            });
            return;
        }

        const randomSeller = SELLERS[Math.floor(Math.random() * SELLERS.length)];
        const message = `Hola, quiero comprar ${counter} unidad(es) del producto.\n${title}`;
        const whatsappUrl = `https://wa.me/${randomSeller.phone}?text=${encodeURIComponent(message)}`;

        window.open(whatsappUrl, "_blank");

        showToast.success(`✅ Contactando con ${randomSeller.name}`, {
            duration: 3000,
            position: "top-right",
        });
    };

    return {
        counter,
        isRestricted,
        increment,
        decrement,
        addToCart,
        contactWhatsApp,
    };
}
