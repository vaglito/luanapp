const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

interface LoginCredentials {
  email: string;
  password: string;
}

export async function verifyUser({ email, password }: LoginCredentials) {
  const res = await fetch(`${API_URL}/api/v2.0/auth/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": `${API_KEY}`,
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    // 🚩 IMPORTANTE: El mensaje que lances aquí es el que buscaremos después
    throw new Error(data?.detail || "Credenciales incorrectas");
  }

  return data;
}
