# Especificaciones de la API EDOC REST (FastAPI)

Esta documentación proporciona los detalles necesarios para el equipo de Frontend (o consumidores externos) para interactuar correctamente con la API REST desarrollada en FastAPI.

**Base URL**: `http://localhost:8001/api/documents` (o tu servidor de producción / `docker`).
**CORS**: Habilitado globalmente.
**Content-Type**: Automáticamente mapeado a `application/json` (Salvo archivos binarios).
**Estilo de Campos**: Todos los campos de respuesta utilizan notación **`camelCase`**.

---

## 1. Búsqueda de Documentos

Recupera una lista paginada de documentos que cumplan con una o varias condiciones de búsqueda (Filtros).

**Endpoint:**
`GET /search`

### Query Parameters

Todos los parámetros de filtro son **opcionales** y combinables. Sin embargo, para fechas, tanto la inicial como la final deben enviarse juntas.

| Parámetro    | Tipo   | Requerido | Descripción                                                                          |
| :----------- | :----- | :-------- | :----------------------------------------------------------------------------------- |
| `ruc`        | string | No        | RUC exacto del receptor del comprobante.                                             |
| `fecha1`     | string | No\*      | Fecha inicial de emisión en formato `YYYY-MM-DD`. (Requiere `fecha2`).               |
| `fecha2`     | string | No\*      | Fecha final de emisión en formato `YYYY-MM-DD`. (Requiere `fecha1`).                 |
| `COD`        | string | No        | Código del tipo de documento definido por SUNAT (ej. `01` = Factura, `03` = Boleta). |
| `PTOEMI`     | string | No        | Serie del comprobante (ej: `F001`).                                                  |
| `SECUENCIAL` | string | No        | Correlativo exacto del sistema (ej: `0006426`).                                      |
| `TOTAL`      | float  | No        | Monto total exacto de la factura/boleta.                                             |

### Controladores de Paginación Estándar

Los valores por defecto para gestionar los volúmenes de data:

| Parámetro | Por Defecto | Descripción                                                  |
| :-------- | :---------- | :----------------------------------------------------------- |
| `page`    | `1`         | La página específica de los resultados quieres ver.          |
| `size`    | `50`        | El límite de registros que se listará por página solicitada. |

#### Ejemplo de Solicitud (Fetch API - Javascript)

```js
const response = await fetch(
  "http://localhost:8001/api/documents/search?ruc=10410019723&size=15&page=3",
);
const json = await response.json();
console.log(json.data); // Array de documentos
```

#### Schema de Respuesta Exitoso (200 OK)

```json
{
  "success": true,
  "message": "Documentos recuperados exitosamente.",
  "data": [
    {
      "unico": "20543896129-01-F001-0006426",
      "cod": "01",
      "ruc": "10410019723",
      "fecha": "2020-08-13",
      "estab": "01",
      "ptoemi": "F001",
      "total": 1500.0,
      "secuencial": "0006426",
      "claveac": "123456789012345678901234567890123456789012345678cd",
      "numaut": null,
      "descargado": 0,
      "revisado": 0,
      "enviado": 0,
      "tries": 0,
      "logenvio": null,
      "userfnx": null,
      "fvisual": null,
      "tipoDoc": {
        "cod": "01",
        "descripcion": "Factura de Venta"
      }
    }
  ],
  "meta": {
    "total": 69978,
    "page": 3,
    "size": 15,
    "pages": 4666
  }
}
```

---

## 2. Descargas de Archivos (Físicos)

Permite obtener los archivos nativos asociados al documento en disco duro, como los representativos en PDF o los estructurados en XML para SUNAT (Envío o Acuse).

**Endpoint:**
`GET /{id}/download/{type}`

### Propiedades de Recurso (Rutas)

| Parámetro de Ruta | Validación | Descripción                                                                                   |
| :---------------- | :--------- | :-------------------------------------------------------------------------------------------- |
| `id`              | Requerido  | Campo `unico` devuelto por el buscador que enlaza al doc. (ej. `20543896129-01-F001-0006426`) |
| `type`            | Requerido  | Tipo textual del medio solicitado. Soporta: `pdf`, `xml`, `cdr`                               |

#### Ejemplo de Solicitud con Elemento HTML

La forma más directa por frontend para permitir que el explorador del usuario descargue (o visualice, en el caso del PDF) es utilizando anclas `<a>`:

```html
<a
  href="http://localhost:8001/api/documents/20543896129-01-F001-0006426/download/pdf"
  target="_blank"
>
  Ver PDF
</a>
```

### Respuestas de Errores

A diferencia del buscador, el _downloader_ puede devolver errores HTTP si el archivo no está en la base de datos o hubo inconsistencias con su existencia en el disco local:

- **HTTP 400 Bad Request:** `<type>` de extensión propuesto no es equivalente a pdf/xml/cdr.
- **HTTP 404 Not Found:** `id` "unico" no cruza con la base de datos MySQL de comprobantes.
- **HTTP 404 Not Found - `{"detail": "File not found on disk"}`:** El comprobante existe, pero su XML o PDF no constan alojados en la carpeta del repositorio `vfps-edoc`.
