import { NextResponse } from "next/server";
import { registerProductView } from "@/services/products";

export async function POST(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    try {
        // This calls the service function, which on string 'server' (here)
        // will use the secure apiClient to talk to Django.
        await registerProductView(slug);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to register view" },
            { status: 500 }
        );
    }
}
