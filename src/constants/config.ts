// Configuración general de la aplicación
export const APP_CONFIG = {
  NAME: "La Zulianita",
  VERSION: "1.0.0",
  DESCRIPTION: "Sistema de gestión para La Zulianita",

  // Configuración de inventario
  INVENTORY: {
    MIN_STOCK_ALERT: 5,
    DEFAULT_WEIGHT_UNIT: "kg",
    CAPACITY_MULTIPLIER: 1.5,
    MIN_CAPACITY_KG: 50000,
  },

  // Configuración de dashboard
  DASHBOARD: {
    RECENT_SALES_LIMIT: 10,
    CHART_MONTHS: 6,
    INVENTORY_CATEGORIES_LIMIT: 4,
  },

  // Configuración de formularios
  FORMS: {
    DEBOUNCE_DELAY: 300,
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  },

  // Configuración de API
  API: {
    DEFAULT_TIMEOUT: 30000,
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000,
  },
} as const;

// Unidades de medida
export const UNITS = {
  WEIGHT: {
    KG: "kg",
    GRAM: "g",
    TON: "ton",
  },
  CURRENCY: {
    USD: "USD",
    VES: "VES",
  },
} as const;

// Categorías por defecto de productos
export const DEFAULT_CATEGORIES = [
  "Carbón Vegetal",
  "Carbón Mineral",
  "Briquetas",
  "Carbón para Parrilla",
  "Otros",
] as const;
