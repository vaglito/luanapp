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
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => null);

    throw new Error(
      errorData?.detail || "Correo electrónico o contraseña incorrectos"
    );
  }

  const data = await res.json();
  return data;
}
