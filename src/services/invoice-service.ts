import { auth } from "@/auth";

const EDOC_URL = process.env.API_URL_EDIC
const API_KEY = process.env.API_KEY;

export interface InvoiceSearchParams {
    ruc: string;
    page: number;
    size: number;
    secuencial?: string;
    ptoemi?: string;
    cod?: string;
    fecha1?: string;
    fecha2?: string;
}

export interface InvoiceData {
    unico: string;
    cod: string;
    ruc: string;
    fecha: string;
    estab: string;
    ptoemi: string;
    total: number;
    secuencial: string;
    tipoDoc: {
        cod: string;
        descripcion: string;
    };
}

export interface InvoicesResponse {
    success: boolean;
    message: string;
    data: InvoiceData[];
    meta: {
        total: number;
        page: number;
        size: number;
        pages: number;
    };
}

/**
 * Encapsulates the logic to search and paginate electronic invoices.
 * This is a server-only service.
 */
export async function searchInvoices(params: InvoiceSearchParams): Promise<InvoicesResponse> {
    const session = await auth();
    const token = session?.user?.accessToken;

    // Forzamos el uso del RUC del usuario autenticado (desde la sesión).
    // Usamos 'any' por si tu tipo User de NextAuth no tiene tipada la propiedad ruc.
    const currentUser = session?.user as any;
    const userRuc = currentUser?.ruc || currentUser?.username || params.ruc;

    const searchQuery = new URLSearchParams({
        ruc: userRuc || "",
        page: String(params.page),
        size: String(params.size),
    });

    if (params.secuencial) searchQuery.set("SECUENCIAL", params.secuencial);
    if (params.ptoemi) searchQuery.set("PTOEMI", params.ptoemi);
    if (params.cod) searchQuery.set("COD", params.cod);
    if (params.fecha1) searchQuery.set("fecha1", params.fecha1);
    if (params.fecha2) searchQuery.set("fecha2", params.fecha2);

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "Accept": "application/json",
    };

    if (API_KEY) headers["x-api-key"] = API_KEY;
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(`${EDOC_URL}/api/documents/search?${searchQuery.toString()}`, {
        cache: "no-store",
        headers,
    });

    if (!res.ok) {
        const errorBody = await res.text();
        console.error(`Invoice API error: ${res.status} ${res.statusText}`, errorBody);
        throw new Error(`Error al obtener las facturas (HTTP ${res.status})`);
    }

    return await res.json();
}
