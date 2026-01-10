import { NextResponse } from "next/server";
import { auth } from "@/auth";

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.accessToken) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const payload = await request.json();

    const response = await fetch(`${API_URL}/api/proformas/proforma/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": `${API_KEY}`,
        Authorization: `Bearer ${session.user.accessToken}`,
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (!response.ok) {
      console.error("Error del Backend Externo:", data);
      return NextResponse.json(
        { error: data.detail || "Error en el servidor externo" },
        { status: response.status }
      );
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error("Proforma Error: ", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
