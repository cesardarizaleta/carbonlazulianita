# Carbon Zuliana Suite - Guía de Estilos y Colores

## 🎨 Sistema de Colores

Carbon Zuliana Suite utiliza un sistema de diseño moderno basado en variables CSS con soporte para modo claro y oscuro. El esquema de colores está optimizado para accesibilidad y experiencia de usuario profesional.

## 🌈 Paleta de Colores Principal

### Variables CSS (Modo Claro)

```css
/* Fondo y Texto */
--background: 0 0% 98%; /* Blanco crema muy suave */
--foreground: 0 0% 8%; /* Negro casi puro */

/* Componentes */
--card: 0 0% 100%; /* Blanco puro */
--card-foreground: 0 0% 8%; /* Negro casi puro */

--popover: 0 0% 100%; /* Blanco puro */
--popover-foreground: 0 0% 8%; /* Negro casi puro */

/* Colores Primarios */
--primary: 50 100% 50%; /* Amarillo brillante (#FFFF00) */
--primary-foreground: 0 0% 8%; /* Negro para contraste */

--secondary: 0 0% 96%; /* Gris muy claro */
--secondary-foreground: 0 0% 8%; /* Negro */

--muted: 0 0% 94%; /* Gris claro */
--muted-foreground: 0 0% 45%; /* Gris medio */

/* Colores de Acento */
--accent: 0 85% 55%; /* Verde azulado (#00D4AA) */
--accent-foreground: 0 0% 100%; /* Blanco */

/* Estados */
--destructive: 0 84% 60%; /* Rojo coral (#FF6B6B) */
--destructive-foreground: 0 0% 100%; /* Blanco */

--success: 142 76% 36%; /* Verde (#22C55E) */
--success-foreground: 0 0% 100%; /* Blanco */

--warning: 38 92% 50%; /* Naranja (#F97316) */
--warning-foreground: 0 0% 8%; /* Negro */

/* Bordes e Inputs */
--border: 0 0% 90%; /* Gris claro */
--input: 0 0% 90%; /* Gris claro */
--ring: 50 100% 50%; /* Amarillo brillante */

/* Sidebar */
--sidebar-background: 0 0% 8%; /* Negro casi puro */
--sidebar-foreground: 0 0% 95%; /* Blanco casi puro */
--sidebar-primary: 50 100% 50%; /* Amarillo brillante */
--sidebar-primary-foreground: 0 0% 8%; /* Negro */
--sidebar-accent: 0 0% 15%; /* Gris muy oscuro */
--sidebar-accent-foreground: 0 0% 95%; /* Blanco casi puro */
--sidebar-border: 0 0% 18%; /* Gris oscuro */
--sidebar-ring: 50 100% 50%; /* Amarillo brillante */

/* Gráficos */
--chart-1: 50 100% 50%; /* Amarillo */
--chart-2: 0 85% 55%; /* Verde azulado */
--chart-3: 142 76% 36%; /* Verde */
--chart-4: 38 92% 50%; /* Naranja */
--chart-5: 217 91% 60%; /* Morado */
```

### Variables CSS (Modo Oscuro)

```css
/* Fondo y Texto */
--background: 0 0% 6%; /* Negro grisáceo */
--foreground: 0 0% 95%; /* Blanco casi puro */

/* Componentes */
--card: 0 0% 10%; /* Gris muy oscuro */
--card-foreground: 0 0% 95%; /* Blanco casi puro */

--popover: 0 0% 10%; /* Gris muy oscuro */
--popover-foreground: 0 0% 95%; /* Blanco casi puro */

/* Colores Primarios */
--primary: 50 100% 50%; /* Amarillo brillante (mismo) */
--primary-foreground: 0 0% 8%; /* Negro (mismo) */

--secondary: 0 0% 15%; /* Gris oscuro */
--secondary-foreground: 0 0% 95%; /* Blanco casi puro */

--muted: 0 0% 18%; /* Gris medio */
--muted-foreground: 0 0% 60%; /* Gris claro */

/* Colores de Acento */
--accent: 0 85% 55%; /* Verde azulado (mismo) */
--accent-foreground: 0 0% 100%; /* Blanco (mismo) */

/* Estados */
--destructive: 0 62% 50%; /* Rojo más suave */
--destructive-foreground: 0 0% 100%; /* Blanco */

/* Bordes e Inputs */
--border: 0 0% 20%; /* Gris medio */
--input: 0 0% 20%; /* Gris medio */
--ring: 50 100% 50%; /* Amarillo brillante */

/* Sidebar */
--sidebar-background: 0 0% 5%; /* Negro puro */
--sidebar-foreground: 0 0% 95%; /* Blanco casi puro */
--sidebar-primary: 50 100% 50%; /* Amarillo brillante */
--sidebar-primary-foreground: 0 0% 8%; /* Negro */
--sidebar-accent: 0 0% 12%; /* Gris oscuro */
--sidebar-accent-foreground: 0 0% 95%; /* Blanco casi puro */
--sidebar-border: 0 0% 15%; /* Gris medio */
--sidebar-ring: 50 100% 50%; /* Amarillo brillante */
```

## 🎯 Colores por Componente

### Botones

#### Botón Primario

- **Fondo**: `--primary` (Amarillo brillante #FFFF00)
- **Texto**: `--primary-foreground` (Negro #000000)
- **Hover**: Tono más oscuro del amarillo
- **Uso**: Acciones principales (Guardar, Crear, Confirmar)

#### Botón Secundario

- **Fondo**: `--secondary` (Gris muy claro)
- **Texto**: `--secondary-foreground` (Negro)
- **Hover**: Tono ligeramente más oscuro
- **Uso**: Acciones secundarias

#### Botón Destructivo

- **Fondo**: `--destructive` (Rojo coral #FF6B6B)
- **Texto**: `--destructive-foreground` (Blanco)
- **Hover**: Tono más oscuro del rojo
- **Uso**: Eliminar, Cancelar, acciones peligrosas

#### Botón de Éxito

- **Fondo**: `--success` (Verde #22C55E)
- **Texto**: `--success-foreground` (Blanco)
- **Uso**: Confirmaciones, pagos completados

### Estados y Badges

#### Estados de Venta

- **Completado**: Verde (`--success`)
- **Pendiente**: Gris (`--secondary`)
- **Procesando**: Azul (`--accent`)
- **Enviado**: Azul claro
- **Cancelado**: Rojo (`--destructive`)

#### Estados de Cobranza

- **Pagado**: Verde (`--success`)
- **Pendiente**: Gris (`--secondary`)
- **Parcial**: Naranja (`--warning`)
- **Vencido**: Rojo (`--destructive`)

#### Estados de Inventario

- **Stock Normal**: Verde (`--success`)
- **Stock Bajo**: Naranja (`--warning`)
- **Sin Stock**: Rojo (`--destructive`)

### Sidebar de Navegación

#### Fondo

- **Modo Claro**: Negro puro (`--sidebar-background`)
- **Modo Oscuro**: Negro puro (más intenso)

#### Elementos Activos

- **Fondo**: Amarillo brillante (`--sidebar-primary`)
- **Texto**: Negro (`--sidebar-primary-foreground`)

#### Elementos Inactivos

- **Fondo**: Gris muy oscuro (`--sidebar-accent`)
- **Texto**: Blanco casi puro (`--sidebar-accent-foreground`)

#### Bordes

- **Color**: Gris oscuro (`--sidebar-border`)

## 📐 Sistema de Espaciado

### Padding y Margins

- **xs**: 0.25rem (4px)
- **sm**: 0.5rem (8px)
- **md**: 1rem (16px)
- **lg**: 1.5rem (24px)
- **xl**: 2rem (32px)
- **2xl**: 3rem (48px)

### Bordes y Radio

- **Border Radius**: 0.75rem (12px) para componentes principales
- **Border Radius Small**: 0.5rem (8px) para elementos pequeños

## 🔤 Tipografía

### Fuentes

- **Sans (Principal)**: Inter (300, 400, 500, 600, 700, 800)
- **Display (Títulos)**: Space Grotesk (400, 500, 600, 700)

### Jerarquía

- **h1**: 3xl (1.875rem) - Títulos principales
- **h2**: 2xl (1.5rem) - Subtítulos
- **h3**: xl (1.25rem) - Secciones
- **Body**: base (1rem) - Texto normal
- **Small**: sm (0.875rem) - Texto secundario

### Pesos

- **Regular**: 400
- **Medium**: 500
- **Semibold**: 600
- **Bold**: 700

## 🎭 Animaciones y Transiciones

### Transiciones

- **Duration**: 200ms (rápido)
- **Easing**: ease-in-out
- **Propiedades**: color, background-color, transform, opacity

### Animaciones Especiales

- **Fade In**: Opacidad de 0 a 1 con translateY
- **Loading**: Rotación continua para spinners
- **Hover**: Escala ligera (1.02x) en cards

## 📱 Diseño Responsivo

### Breakpoints

- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

### Layout

- **Container**: Centrado con max-width de 1400px
- **Grid**: Sistema de 12 columnas
- **Flexbox**: Layout principal para alineación

## 🌙 Modo Oscuro

### Implementación

- **Toggle**: Switch en la interfaz
- **Persistencia**: LocalStorage
- **Transición**: Suave entre modos

### Diferencias Clave

- Fondos más oscuros
- Textos más claros
- Contrastes ajustados para accesibilidad
- Sidebar mantiene colores vibrantes

## 🎨 Paleta Extendida (Colores Adicionales)

### Azules (para acentos)

- **Blue-50**: #EFF6FF
- **Blue-500**: #3B82F6
- **Blue-600**: #2563EB

### Verdes (éxito y crecimiento)

- **Green-50**: #F0FDF4
- **Green-500**: #22C55E
- **Green-600**: #16A34A

### Amarillos (advertencias)

- **Yellow-50**: #FFFBEB
- **Yellow-500**: #FACC15
- **Yellow-600**: #D97706

### Rojos (errores)

- **Red-50**: #FEF2F2
- **Red-500**: #EF4444
- **Red-600**: #DC2626

## 🛠️ Clases Utilitarias

### Gradientes

- **Gradient Primary**: De amarillo a verde azulado
- **Gradient Success**: De verde claro a verde oscuro

### Sombras

- **Shadow-sm**: Sombra pequeña para cards
- **Shadow-md**: Sombra media para modales
- **Shadow-lg**: Sombra grande para dropdowns

### Bordes

- **Border**: 1px solid con color de borde
- **Border-t**: Solo borde superior
- **Border-b**: Solo borde inferior

## 📊 Gráficos y Visualizaciones

### Colores de Gráfico

1. **Chart-1**: Amarillo brillante (ventas principales)
2. **Chart-2**: Verde azulado (crecimiento)
3. **Chart-3**: Verde (éxito)
4. **Chart-4**: Naranja (advertencias)
5. **Chart-5**: Morado (adicional)

### Tema de Gráficos

- **Background**: Transparente o color de card
- **Grid**: Color muted
- **Labels**: Color foreground
- **Hover**: Color accent

## ♿ Accesibilidad

### Contraste

- **Ratio Mínimo**: 4.5:1 para texto normal
- **Ratio Mejorado**: 7:1 para texto grande

### Focus

- **Outline**: Color ring (amarillo brillante)
- **Width**: 2px
- **Style**: Solid

### ARIA Labels

- **Navigation**: Etiquetas descriptivas
- **Buttons**: Texto accesible
- **Forms**: Labels asociados

---

**Versión**: 1.0.0
**Última Actualización**: Diciembre 2025
**Framework**: Tailwind CSS + shadcn/ui</content>
<parameter name="filePath">c:\Users\Elianis Castillo\Code\carbon-zulianita-suite\STYLE_GUIDE.md
