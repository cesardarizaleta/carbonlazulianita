// Tipos específicos para Insumos
export interface Insumo {
  id: string;
  nombre_insumo: string;
  descripcion?: string;
  categoria: CategoriaInsumo;
  unidad_medida: UnidadMedida;
  stock_actual: number;
  stock_minimo: number;
  costo_unitario: number;
  moneda: "VES" | "USD";
  proveedor?: string;
  ubicacion?: string;
  fecha_gasto: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
  usuario_id: string;
  activo: boolean;
}

// Categorías de insumos
export type CategoriaInsumo =
  | "materias_primas" // Materias primas
  | "embalaje" // Materiales de embalaje
  | "etiquetas" // Etiquetas y empaques
  | "quimicos" // Productos químicos
  | "herramientas" // Herramientas y equipos
  | "mantenimiento" // Repuestos y mantenimiento
  | "otros"; // Otros insumos

// Unidades de medida
export type UnidadMedida =
  | "kg" // Kilogramos
  | "g" // Gramos
  | "l" // Litros
  | "ml" // Mililitros
  | "unidad" // Unidades
  | "caja" // Cajas
  | "paquete" // Paquetes
  | "rollo" // Rollos
  | "botella" // Botellas
  | "saco"; // Sacos

// Tipos adicionales para formularios
export interface InsumoFormData {
  nombre_insumo: string;
  descripcion?: string;
  categoria: CategoriaInsumo;
  unidad_medida: UnidadMedida;
  stock_actual: number;
  stock_minimo: number;
  costo_unitario: number;
  moneda: "VES" | "USD";
  proveedor?: string;
  ubicacion?: string;
  fecha_gasto: string;
}

export interface MovimientoInsumo {
  id: string;
  insumo_id: string;
  tipo_movimiento: "entrada" | "salida";
  cantidad: number;
  motivo: string;
  referencia?: string; // ID de producción, compra, etc.
  fecha_movimiento: string;
  usuario_id: string;
  costo_unitario?: number;
  notas?: string;
}

export interface MovimientoInsumoFormData {
  insumo_id: string;
  tipo_movimiento: "entrada" | "salida";
  cantidad: number;
  motivo: string;
  referencia?: string;
  costo_unitario?: number;
  notas?: string;
}
