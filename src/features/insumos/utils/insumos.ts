// Utilidades para el módulo de insumos

export const formatStockStatus = (actual: number, minimo: number): string => {
  if (actual <= 0) return "Sin stock";
  if (actual <= minimo) return "Bajo stock";
  return "En stock";
};

export const getStockStatusColor = (actual: number, minimo: number): string => {
  if (actual <= 0) return "text-red-600";
  if (actual <= minimo) return "text-orange-600";
  return "text-green-600";
};

export const calculateTotalValue = (stock: number, costoUnitario: number): number => {
  return stock * costoUnitario;
};

export const formatCurrency = (amount: number, currency: "USD" | "VES"): string => {
  const symbol = currency === "USD" ? "$" : "Bs.";
  return `${symbol}${amount.toFixed(2)}`;
};

export const insumoCategories = [
  "Materias Primas",
  "Embalaje",
  "Etiquetas",
  "Químicos",
  "Herramientas",
  "Otros",
] as const;

export const measurementUnits = [
  "kg",
  "g",
  "l",
  "ml",
  "unidades",
  "metros",
  "cm",
  "m²",
  "m³",
  "piezas",
  "cajas",
  "paquetes",
] as const;

export type InsumoCategory = (typeof insumoCategories)[number];
export type MeasurementUnit = (typeof measurementUnits)[number];
