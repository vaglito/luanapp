# Sistema de Diseño - Corporación Luana

Este documento define las reglas de diseño y estándares visuales para asegurar una experiencia de usuario (UX) premium, consistente y moderna en la aplicación `luanapp`.

## 1. Filosofía de Diseño
El diseño debe evocar tecnología, confianza y modernidad. Utilizamos un enfoque **"Glassmorphism Sutil"** combinado con **"Minimalismo Colorido"**.

- **Premium**: Espacios amplios, tipografía clara, bordes sutiles.
- **Dinámico**: Animaciones suaves al pasar el mouse (hover), transiciones fluidas.
- **Nitidez**: Sombras suaves en lugar de bordes duros negros.

## 2. Paleta de Colores

### Colores Principales (Brand)
Estos colores definen la identidad de la marca.

- **Primary (Morado Luana)**: `#5914A3`
  - Uso: Botones primarios, enlaces activos, iconos destacados.
- **Secondary (Magenta)**: `#A3147F`
  - Uso: Botones de acción secundaria, acentos, badges.

### Gradientes (Premium UI)
Utilizar para títulos y fondos destacados para dar profundidad.

- **Hero Text Gradient**: `linear-gradient(45deg, #1a237e 30%, #534bae 90%)`
  - Uso: Títulos principales (H1) en páginas de aterrizaje.
- **Card Background Gradient** (Sutil): `linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)`
  - Uso: Fondos de secciones para romper la monotonía del blanco puro.

### Neutros
- **Texto Principal**: `#111827` (Gris muy oscuro, casi negro)
- **Texto Secundario**: `#545454` or `#6B7280` (Gris medio)
- **Bordes**: `#E5E7EB` o `#f0f0f0`
- **Fondo General**: `#F9FAFB` (Gris muy claro)

## 3. Componentes y Estilos

### Tarjetas (Cards)
El elemento fundamental de la interfaz.

- **Fondo**: `white` (Blanco puro)
- **Borde**: `1px solid #f0f0f0` (Sutil)
- **Radio de Borde (Border Radius)**: `12px` o `24px` (Preferiblemente `3` en escala MUI system).
- **Sombra (Shadow) - Reposo**: Ninguna o muy sutil `none` / `elevation={0}`.
- **Sombra - Hover**: `0 12px 24px -10px rgba(0, 0, 0, 0.15)`
- **Interacción**: `transform: translateY(-5px)` en hover.

### Botones
- **Redondeo**: `50px` (Pill shape) para acciones principales.
- **Tamaño**: Amplio padding horizontal (`px: 4`) para facilitar el clic.

## 4. Tipografía
La fuente principal es **Roboto**.

- **H1 (Títulos de Página)**: Bold (`700`), tamaño responsivo (`2.5rem` mobile, `3.5rem` desktop).
- **H2 (Subtítulos)**: Semi-bold (`600`).
- **Cuerpo**: Legible, alto de línea cómodo (`1.5`).

## 5. Reglas de Comportamiento (UX)

1.  **Feedback Inmediato**: Todos los elementos interactivos deben reaccionar al `hover`.
2.  **Transiciones**: Usar `transition: all 0.3s ease` para suavizar cambios de estado.
3.  **Estados de Carga**: Usar Skeletons pulsantes en lugar de spinners simples cuando sea posible.
4.  **Empty States**: Nunca dejar una lista vacía en blanco; mostrar un mensaje amigable e instrucciones (ej. "No se encontraron resultados").

---

_Actualizado: 21 de Enero, 2026_
