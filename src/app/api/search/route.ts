import { NextResponse } from "next/server";

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  try {
    const response = await fetch(
      `${API_URL}/api/products/products/search/?search=${query}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "applications/json",
          "x-api-key": `${API_KEY}`,
        },
      }
    );
    if (!response.ok) {
      return NextResponse.json(
        { error: "Error en el servidor" },
        { status: response.status }
      );
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Fallo la conexion" }, { status: 500 });
  }
}
