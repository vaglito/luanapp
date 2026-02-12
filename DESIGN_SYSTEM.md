# Sistema de Diseño - Corporación Luana

Este documento define las reglas de diseño y estándares visuales para asegurar una experiencia de usuario (UX) **Gamer / Tech Premium**, consistente y moderna en la aplicación `luanapp`.

## 1. Filosofía de Diseño
El diseño fusiona la elegancia del comercio electrónico con una estética **"Tech / Gamer Sutil"**.

- **Tech Premium**: Uso de fuentes futuristas (`Orbitron`) combinadas con legibilidad moderna (`Inter`).
- **Glassmorphism**: Superposiciones translúcidas con desenfoque (`backdrop-filter`) para jerarquía y profundidad.
- **Atmósfera**: Fondos claros (`#F3F4F6`) con patrones de "circuito" o gradientes radiales muy sutiles.

## 2. Paleta de Colores

### Brand Colors
- **Primary (Luana Purple)**: `#5914A3`
  - Uso: Acciones principales, Buy Box, Bordes activos.
- **Secondary (Magenta)**: `#A3147F`
  - Uso: Descuentos, Ofertas, Badges de "Nuevo".
- **Tech Accent (Neon Cyan)**: `#00E5FF`
  - Uso: Destellos, Sombras Glow, Iconos informativos.

### Neutros & Fondos
- **Fondo General**: `#F3F4F6` con patrón radial sutil.
- **Surface (Tarjetas/Glass)**: `rgba(255, 255, 255, 0.8)` a `0.95`.
- **Texto Principal**: `#111827` (Casi negro).
- **Texto Secundario**: `#4B5563` (Gris frío).

## 3. Tipografía
Combinación de **Orbitron** (Carácter) e **Inter** (Lectura).

### Orbitron (Tech Font)
Usada para elementos de alto impacto visual y números.
- **H2 - H6**: Títulos de secciones, Cards, Widgets.
- **Precios**: Para destacar el valor numérico.
- **Botones**: En secciones de marketing o CTA agresivos ("VER DETALLES").

### Inter (Body Font)
Usada para lectura prolongada y UI general.
- **Body**: Descripciones, especificaciones técnicas, menús.
- **H1 (Título de Producto)**: *Excepción estratégica* para máxima legibilidad en títulos largos.
- **Botones (General)**: Navegación, acciones secundarias.

## 4. Componentes y Estilos

### Tarjetas (Cards) - Estilo Glass
- **Border Radius**: `16px`.
- **Fondo**: `rgba(255, 255, 255, 0.95)`.
- **Efecto**: `backdrop-filter: blur(10px)`.
- **Hover**:
  - `transform: translateY(-8px)`
  - **Neon Glow**: `box-shadow: 0 0 20px rgba(0, 229, 255, 0.25)`

### Botones (Buttons)
- **Border Radius**: `12px` (Soft Square).
- **Estilo Global**: Limpio, `text-transform: none`, fuente `Inter`.
- **Estilo Gamer (Product Detail)**:
  - `text-transform: uppercase`.
  - `font-family: Orbitron`.
  - `letter-spacing: 0.05em`.
  - **Primary**: Fondo sólido `#5914A3` con sombra suave.
  - **Glow**: Sombra de color coincidente al hacer hover.

### Product Detail (Buy Box)
Jerarquía optimizada para conversión:
1.  **Título** (Inter ExtraBold)
2.  **Precio** (Orbitron, Grande) & **Actions** (Buy Box)
3.  **Descripción** (Inter, Secundaria)

## 5. Reglas de Comportamiento (UX)

1.  **Feedback Visual**: Glows de neón sutiles al interactuar.
2.  **Imágenes**: `object-fit: contain` siempre. Sin bordes redondeados en las imágenes de producto para mantener nitidez.
3.  **Jerarquía**: La información de compra (Precio/Stock) siempre visible o priorizada en la parte superior.

---
_Actualizado: 12 de Febrero, 2026_
