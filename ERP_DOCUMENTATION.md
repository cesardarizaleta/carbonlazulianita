# Carbon Zuliana Suite - Documentación del ERP

## 📋 Descripción General

Carbon Zuliana Suite es un sistema ERP (Enterprise Resource Planning) completo diseñado para la gestión integral de inventarios, ventas y cobranzas. Desarrollado con tecnologías modernas web, ofrece una interfaz intuitiva y potente para pequeñas y medianas empresas que requieren control preciso sobre sus operaciones comerciales.

## 🎯 Funcionalidades Principales

### 1. Gestión de Clientes 👥
- **Registro completo de clientes**: Nombre, email, teléfono, dirección
- **Clasificación automática**: Regular, Mayorista, VIP (basado en historial de compras)
- **Búsqueda y filtrado**: Localización rápida de clientes por nombre o email
- **Historial de compras**: Seguimiento de totales y últimas compras

### 2. Gestión de Inventario 📦
- **Catálogo de productos**: Nombre, descripción, precio (USD/BS), stock
- **Control de stock**: Seguimiento automático de inventario en tiempo real
- **Alertas de stock bajo**: Notificaciones visuales para productos con stock crítico
- **Precios duales**: Sistema de precios en USD y Bolívares con conversión automática

### 3. Gestión de Ventas 🛒
- **Creación de ventas**: Selección de cliente, productos y cantidades
- **Cálculo automático**: Subtotales, totales en USD/BS con tasa de cambio actual
- **Deducción automática de inventario**: Actualización inmediata del stock disponible
- **Estados de venta**: Pendiente, Procesando, Enviado, Completado, Cancelado
- **Historial detallado**: Vista completa de productos vendidos por transacción

### 4. Gestión de Cobranza 💰
- **Facturación automática**: Generación de facturas por ventas realizadas
- **Estados de pago**: Pagado, Pendiente, Parcial, Vencido
- **Registro de pagos**: Control detallado de pagos parciales y completos
- **Alertas de vencimiento**: Identificación visual de facturas vencidas

### 5. Dashboard y Analytics 📊
- **Métricas en tiempo real**: Ventas totales, productos más vendidos, clientes activos
- **Gráficos interactivos**: Visualización de tendencias de venta por período
- **Indicadores clave**: Inventario disponible, cobranzas pendientes, rendimiento mensual
- **Resumen ejecutivo**: Vista general del estado del negocio

### 6. Sistema de Logs 📝
- **Auditoría completa**: Registro de todas las operaciones del sistema
- **Filtrado por fecha**: Búsqueda de eventos por rango temporal
- **Categorización**: Diferentes tipos de eventos (ventas, inventario, usuarios)
- **Paginación**: Navegación eficiente a través de grandes volúmenes de logs

### 7. Sistema de Configuración ⚙️
- **Gestión de tasas de cambio**: Actualización manual de tasas USD/BS
- **Configuraciones del sistema**: Parámetros generales de operación
- **Preferencias de usuario**: Personalización de la experiencia

## 🔄 Flujos de Trabajo

### Flujo de Venta Completo
1. **Selección de Cliente**: Búsqueda o creación de nuevo cliente
2. **Selección de Productos**: Búsqueda en catálogo y selección de items
3. **Configuración de Cantidades**: Especificación de cantidades por producto
4. **Cálculo Automático**: Sistema calcula totales con conversión de moneda
5. **Confirmación de Venta**: Validación final y creación de la transacción
6. **Actualización de Inventario**: Deducción automática del stock disponible
7. **Generación de Factura**: Creación automática de registro de cobranza

### Flujo de Cobranza
1. **Identificación de Facturas**: Visualización de facturas pendientes
2. **Registro de Pago**: Captura del monto pagado
3. **Actualización de Estado**: Cambio automático del estado de la factura
4. **Validación de Saldos**: Verificación de pagos completos vs pendientes

### Flujo de Inventario
1. **Recepción de Productos**: Registro de nuevos productos o actualización de stock
2. **Actualización de Precios**: Mantenimiento de precios en ambas monedas
3. **Monitoreo de Stock**: Alertas automáticas para productos con stock bajo
4. **Ajustes de Inventario**: Correcciones manuales cuando sea necesario

## 🏗️ Arquitectura Técnica

### Frontend
- **Framework**: React 18 con TypeScript
- **UI Library**: shadcn/ui + Radix UI
- **Styling**: Tailwind CSS
- **State Management**: React Hooks + Context API
- **Routing**: React Router
- **Build Tool**: Vite

### Backend
- **Platform**: Supabase (PostgreSQL + Auth + Real-time)
- **Database**: PostgreSQL con Row Level Security (RLS)
- **Authentication**: Supabase Auth
- **API**: RESTful API con Supabase Client

### Características Técnicas
- **Responsive Design**: Optimizado para desktop y mobile
- **Real-time Updates**: Sincronización automática de datos
- **Offline Support**: Funcionalidad básica sin conexión
- **Security**: Autenticación robusta y autorización granular
- **Performance**: Paginación, lazy loading y optimización de queries

## 📊 Base de Datos

### Tablas Principales
- **users**: Usuarios del sistema
- **clientes**: Información de clientes
- **productos**: Catálogo de productos
- **ventas**: Registro de transacciones de venta
- **venta_items**: Detalle de productos por venta
- **cobranza**: Registro de facturas y pagos
- **logs**: Auditoría del sistema
- **config**: Configuraciones del sistema

### Relaciones
- Un cliente puede tener múltiples ventas
- Una venta puede tener múltiples productos (venta_items)
- Una venta genera una cobranza
- Todas las tablas incluyen user_id para multi-tenancy

## 🔐 Seguridad y Permisos

### Autenticación
- Login seguro con email/password
- Sesiones persistentes
- Protección de rutas

### Autorización
- Row Level Security (RLS) en todas las tablas
- Políticas de acceso basadas en usuario
- Validación de permisos en operaciones sensibles

## 📱 Interfaz de Usuario

### Diseño
- **Tema**: Moderno y minimalista
- **Colores**: Esquema profesional con acentos en amarillo/verde
- **Tipografía**: Inter (sans) + Space Grotesk (display)
- **Componentes**: Reutilizables y consistentes

### Navegación
- **Sidebar**: Navegación lateral con iconos
- **Breadcrumbs**: Indicadores de ubicación
- **Responsive**: Adaptable a diferentes tamaños de pantalla

### Interacciones
- **Modales**: Confirmaciones y formularios emergentes
- **Toast Notifications**: Feedback inmediato de acciones
- **Loading States**: Indicadores de carga en operaciones
- **Error Handling**: Mensajes claros de error

## 🚀 Despliegue y Mantenimiento

### Requisitos del Sistema
- Node.js 18+
- npm o bun
- Supabase account

### Variables de Entorno
- `VITE_SUPABASE_URL`: URL del proyecto Supabase
- `VITE_SUPABASE_ANON_KEY`: Clave anónima de Supabase

### Comandos de Desarrollo
```bash
npm install          # Instalar dependencias
npm run dev         # Servidor de desarrollo
npm run build       # Build de producción
npm run preview     # Vista previa del build
npm run lint        # Verificación de código
npm run format      # Formateo automático
```

## 📈 Métricas y KPIs

### Ventas
- Total de ventas por período
- Promedio de venta por cliente
- Productos más vendidos
- Tendencias de crecimiento

### Inventario
- Rotación de inventario
- Productos con stock bajo
- Valor total del inventario
- Eficiencia de reposición

### Cobranza
- Tasa de cobranza
- Promedio de días de cobro
- Facturas vencidas
- Flujo de caja

## 🔄 Integraciones Futuras

### APIs Externas
- **Tasas de Cambio**: Integración con APIs de divisas
- **Pagos**: Integración con pasarelas de pago
- **Envíos**: Integración con servicios de logística
- **Contabilidad**: Sincronización con sistemas contables

### Módulos Adicionales
- **Compras**: Gestión de proveedores y órdenes de compra
- **Producción**: Control de procesos productivos
- **RRHH**: Gestión de empleados y nómina
- **CRM**: Gestión avanzada de relaciones con clientes

---

**Versión**: 1.0.0
**Fecha**: Diciembre 2025
**Desarrollador**: Carbon Zuliana Suite Team</content>
<parameter name="filePath">c:\Users\Elianis Castillo\Code\carbon-zulianita-suite\ERP_DOCUMENTATION.md