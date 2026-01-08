import { supabase } from "@/integrations/supabase/client";
import { SupabaseWrapper } from "@/services/supabaseWrapper";
import type { Produccion, CreateProduccionData } from "../types/produccion";
import type { PaginatedResponse, ApiResponse } from "@/services/types";

export const produccionService = {
  async getAll(page: number = 1, limit: number = 10): Promise<PaginatedResponse<Produccion>> {
    return SupabaseWrapper.selectPaginated<Produccion>(
      SupabaseWrapper.from("produccion").select(`
          *,
          producto_resultado:inventario(nombre_producto)
        `),
      {
        tableName: "produccion",
        operation: "SELECT",
        pagination: { page, limit, orderBy: "fecha_produccion", orderDirection: "desc" },
        queryDescription: "getAll productions",
      }
    );
  },

  async create(data: CreateProduccionData, userId: string): Promise<ApiResponse<string>> {
    try {
      const { data: resultId, error } = await supabase.rpc("registrar_produccion", {
        p_producto_resultado_id: data.producto_resultado_id,
        p_cantidad_producida: data.cantidad_producida,
        p_fecha_produccion: data.fecha_produccion,
        p_notas: data.notas,
        p_user_id: userId,
        p_insumos: data.insumos,
      });

      if (error) {
        console.error("Error creating produccion:", error);
        return { data: null, error: error.message };
      }

      return { data: resultId, error: null };
    } catch (err: any) {
      console.error("Error creating produccion:", err);
      return { data: null, error: err.message };
    }
  },
};
