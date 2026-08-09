function required(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

function optional(key: string, fallback = ""): string {
  return process.env[key] || fallback;
}

export const env = {
  API_URL: required("API_URL"),
  API_KEY: required("API_KEY"),
  API_URL_EDIC: optional("API_URL_EDIC", process.env.API_URL || ""),
  NEXT_PUBLIC_RESTRICTED_SUBCATEGORIES: optional("NEXT_PUBLIC_RESTRICTED_SUBCATEGORIES"),
} as const;
