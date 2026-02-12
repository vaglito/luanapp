"use client";

import { useEffect } from "react";
import { registerProductView } from "@/services/products";

export const ProductViewTracker = ({ slug }: { slug: string }) => {
    useEffect(() => {
        // Registra la visita solo una vez al montar el componente
        registerProductView(slug);
    }, [slug]);

    return null; // Este componente no renderiza nada visible
};
