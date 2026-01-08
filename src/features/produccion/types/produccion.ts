export interface Produccion {
  id: string; // UUID
  producto_resultado_id: number; // Integer
  cantidad_producida: number;
  fecha_produccion: string;
  notas?: string | null;
  user_id: string;
  // Frontend helpers
  producto_resultado?: {
    nombre_producto: string;
  };
}

export interface ProduccionInsumo {
  id: string; // UUID
  produccion_id: string;
  producto_insumo_id: string; // UUID (changed from number to string for insumos)
  cantidad_usada: number;
}

export interface CreateProduccionData {
  producto_resultado_id: number;
  cantidad_producida: number;
  fecha_produccion: string;
  notas?: string;
  insumos: {
    producto_insumo_id: string; // UUID (changed from number to string for insumos)
    cantidad_usada: number;
  }[];
}
