# Seguridad Frontend

## Protección de Credenciales API

Para evitar exponer `API_KEY` y `API_URL` en el navegador, utilizamos dos patrones principales:

### 1. Server Actions (Recomendado)
Las Server Actions se ejecutan exclusivamente en el servidor.
- **Uso:** Importa `apiClient` (que usa variables de entorno privadas) dentro de la acción.
- **Ejemplo:** `src/actions/auth-actions.ts`

### 2. Next.js Proxy Route (Para Client Components)
Si un Client Component (ej. `useEffect`) necesita datos del backend, **NO** debe llamar a la API externa directamente.
- **Patrón:** Llama a un Route Handler interno de Next.js.
- **Implementación:**
    - Frontend: `fetch('/api/mi-ruta-proxy')`
    - Backend (Route Handler): Recibe la petición y la reenvía a Django usando las credenciales privadas.
- **Ejemplo:** `src/app/api/stats/view/[slug]/route.ts`

## Reglas
- 🚫 **Nunca** usar `NEXT_PUBLIC_` para credenciales sensibles.
- ✅ Usar `process.env.API_KEY` solo en archivos que corren en el servidor.
