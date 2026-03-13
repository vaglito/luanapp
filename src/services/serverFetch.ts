import "server-only";

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

export async function serverFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  
  const headers = new Headers(options.headers || {});
  headers.set("x-api-key", API_KEY || "");
  headers.set("Content-Type", "application/json");
  headers.set("Accept", "application/json");

  const fetchOptions: RequestInit = {
    ...options,
    headers,
  };

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    let errorMessage = `API Error: ${response.status} ${response.statusText}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch (e) {
      // Not JSON
      errorMessage = `API Error: ${response.status} ${await response.text()}`;
    }
    throw new Error(errorMessage);
  }

  return response.json() as Promise<T>;
}
