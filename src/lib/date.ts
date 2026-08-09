const TIMEZONE = "America/Lima";

export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  return new Date(date).toLocaleDateString("es-PE", { timeZone: TIMEZONE, ...options });
}

export function formatDateTime(date: string | Date): string {
  return new Date(date).toLocaleString("es-PE", { timeZone: TIMEZONE });
}
