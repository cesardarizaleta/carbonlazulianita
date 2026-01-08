import { supabase } from "@/integrations/supabase/client";
import { SupabaseWrapper } from "@/services/supabaseWrapper";
import type { ApiResponse, PaginatedResponse } from "@/services/types";
import type {
  Insumo,
  InsumoFormData,
  MovimientoInsumo,
  MovimientoInsumoFormData,
} from "../types/insumos";

export const insumosService = {
  // === INSUMOS ===

  async getAll(page: number = 1, limit: number = 10): Promise<PaginatedResponse<Insumo>> {
    return SupabaseWrapper.selectPaginated<Insumo>(SupabaseWrapper.from("insumos"), {
      tableName: "insumos",
      operation: "SELECT",
      pagination: { page, limit, orderBy: "fecha_creacion", orderDirection: "desc" },
      queryDescription: "getAll insumos",
    });
  },

  async getById(id: string): Promise<ApiResponse<Insumo>> {
    return SupabaseWrapper.select<Insumo>(
      SupabaseWrapper.from("insumos").select("*").eq("id", id).single(),
      {
        tableName: "insumos",
        operation: "SELECT",
        queryDescription: `getInsumoById id=${id}`,
      }
    );
  },

  async create(data: InsumoFormData, userId: string): Promise<ApiResponse<Insumo>> {
    const insumoData = {
      ...data,
      usuario_id: userId,
      activo: true,
      fecha_creacion: new Date().toISOString(),
      fecha_actualizacion: new Date().toISOString(),
    };

    return SupabaseWrapper.insert<Insumo>(
      SupabaseWrapper.from("insumos").insert(insumoData).select(),
      {
        tableName: "insumos",
        operation: "INSERT",
        queryDescription: "create insumo",
      }
    );
  },

  async update(id: string, data: Partial<InsumoFormData>): Promise<ApiResponse<Insumo>> {
    const updateData = {
      ...data,
      fecha_actualizacion: new Date().toISOString(),
    };

    return SupabaseWrapper.update<Insumo>(
      SupabaseWrapper.from("insumos").update(updateData).eq("id", id).select().single(),
      {
        tableName: "insumos",
        operation: "UPDATE",
        queryDescription: `updateInsumo id=${id}`,
      }
    );
  },

  async delete(id: string): Promise<ApiResponse<null>> {
    return SupabaseWrapper.delete(SupabaseWrapper.from("insumos").delete().eq("id", id), {
      tableName: "insumos",
      operation: "DELETE",
      queryDescription: `deleteInsumo id=${id}`,
    });
  },

  async getByCategoria(categoria: string, userId: string): Promise<ApiResponse<Insumo[]>> {
    return SupabaseWrapper.select<Insumo[]>(
      SupabaseWrapper.from("insumos")
        .select("*")
        .eq("categoria", categoria)
        .eq("usuario_id", userId)
        .eq("activo", true)
        .order("nombre_insumo"),
      {
        tableName: "insumos",
        operation: "SELECT",
        queryDescription: `getInsumosByCategoria categoria=${categoria}`,
      }
    );
  },

  async getStockBajo(userId: string): Promise<ApiResponse<Insumo[]>> {
    return SupabaseWrapper.select<Insumo[]>(
      SupabaseWrapper.from("insumos")
        .select("*")
        .eq("usuario_id", userId)
        .eq("activo", true)
        .lte("stock_actual", SupabaseWrapper.from("insumos").select("stock_minimo"))
        .order("stock_actual"),
      {
        tableName: "insumos",
        operation: "SELECT",
        queryDescription: "getInsumosStockBajo",
      }
    );
  },

  // === MOVIMIENTOS DE INSUMOS ===

  async getMovimientos(
    insumoId: string,
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<MovimientoInsumo>> {
    return SupabaseWrapper.selectPaginated<MovimientoInsumo>(
      SupabaseWrapper.from("movimientos_insumos").eq("insumo_id", insumoId),
      {
        tableName: "movimientos_insumos",
        operation: "SELECT",
        pagination: { page, limit, orderBy: "fecha_movimiento", orderDirection: "desc" },
        queryDescription: `getMovimientosInsumo insumoId=${insumoId}`,
      }
    );
  },

  async createMovimiento(
    data: MovimientoInsumoFormData,
    userId: string
  ): Promise<ApiResponse<MovimientoInsumo>> {
    const movimientoData = {
      ...data,
      usuario_id: userId,
      fecha_movimiento: new Date().toISOString(),
    };

    // Actualizar stock del insumo
    const { data: insumo } = await SupabaseWrapper.select<Insumo>(
      SupabaseWrapper.from("insumos").select("*").eq("id", data.insumo_id).single(),
      { tableName: "insumos", operation: "SELECT", queryDescription: "getInsumoForMovimiento" }
    );

    if (!insumo) {
      throw new Error("Insumo no encontrado");
    }

    let nuevoStock = insumo.stock_actual;
    if (data.tipo_movimiento === "entrada") {
      nuevoStock += data.cantidad;
    } else if (data.tipo_movimiento === "salida") {
      nuevoStock -= data.cantidad;
      if (nuevoStock < 0) {
        throw new Error("Stock insuficiente para la salida");
      }
    }

    // Actualizar stock
    await SupabaseWrapper.update(
      SupabaseWrapper.from("insumos")
        .update({
          stock_actual: nuevoStock,
          fecha_actualizacion: new Date().toISOString(),
        })
        .eq("id", data.insumo_id),
      { tableName: "insumos", operation: "UPDATE", queryDescription: "updateStockInsumo" }
    );

    // Crear movimiento
    return SupabaseWrapper.insert<MovimientoInsumo>(
      SupabaseWrapper.from("movimientos_insumos").insert(movimientoData).select(),
      {
        tableName: "movimientos_insumos",
        operation: "INSERT",
        queryDescription: "createMovimientoInsumo",
      }
    );
  },

  async getMovimientoById(id: string): Promise<ApiResponse<MovimientoInsumo>> {
    return SupabaseWrapper.select<MovimientoInsumo>(
      SupabaseWrapper.from("movimientos_insumos").select("*").eq("id", id).single(),
      {
        tableName: "movimientos_insumos",
        operation: "SELECT",
        queryDescription: `getMovimientoById id=${id}`,
      }
    );
  },

  async getAllMovimientos(
    userId: string,
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<MovimientoInsumo>> {
    return SupabaseWrapper.selectPaginated<MovimientoInsumo>(
      SupabaseWrapper.from("movimientos_insumos").eq("usuario_id", userId),
      {
        tableName: "movimientos_insumos",
        operation: "SELECT",
        pagination: { page, limit, orderBy: "fecha_movimiento", orderDirection: "desc" },
        queryDescription: `getAllMovimientos userId=${userId}`,
      }
    );
  },

  // === ESTADÍSTICAS ===

  async getEstadisticas(userId: string): Promise<
    ApiResponse<{
      total_insumos: number;
      valor_total_inventario: number;
      insumos_stock_bajo: number;
      categorias: { categoria: string; count: number; valor: number }[];
    }>
  > {
    try {
      // Obtener estadísticas básicas
      const { data: insumos, error: insumosError } = await supabase
        .from("insumos")
        .select("*")
        .eq("usuario_id", userId)
        .eq("activo", true);

      if (insumosError) throw insumosError;

      const totalInsumos = insumos?.length || 0;
      const valorTotal =
        insumos?.reduce((sum, insumo) => sum + insumo.stock_actual * insumo.costo_unitario, 0) || 0;
      const stockBajo =
        insumos?.filter(insumo => insumo.stock_actual <= insumo.stock_minimo).length || 0;

      // Agrupar por categorías
      const categoriasMap = new Map<string, { count: number; valor: number }>();
      insumos?.forEach(insumo => {
        const categoria = insumo.categoria;
        const valor = insumo.stock_actual * insumo.costo_unitario;
        if (categoriasMap.has(categoria)) {
          const current = categoriasMap.get(categoria)!;
          categoriasMap.set(categoria, {
            count: current.count + 1,
            valor: current.valor + valor,
          });
        } else {
          categoriasMap.set(categoria, { count: 1, valor });
        }
      });

      const categorias = Array.from(categoriasMap.entries()).map(([categoria, data]) => ({
        categoria,
        count: data.count,
        valor: data.valor,
      }));

      return {
        data: {
          total_insumos: totalInsumos,
          valor_total_inventario: valorTotal,
          insumos_stock_bajo: stockBajo,
          categorias,
        },
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : "Error al obtener estadísticas",
      };
    }
  },

  async getStockBajo(userId: string): Promise<
    ApiResponse<
      Array<{
        id: string;
        nombre_insumo: string;
        stock_actual: number;
        stock_minimo: number;
        diferencia: number;
      }>
    >
  > {
    try {
      const { data, error } = await supabase.rpc("insumos_stock_bajo", { user_id: userId });

      if (error) throw error;

      return {
        data,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : "Error al obtener insumos con stock bajo",
      };
    }
  },
};
