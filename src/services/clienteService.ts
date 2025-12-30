import { supabase } from "@/integrations/supabase/client";
import type { Cliente, ApiResponse, PaginatedResponse } from "./types";

class ClienteService {
  // Obtener todos los clientes (con paginación)
  async getClientes(page: number = 1, limit: number = 10): Promise<PaginatedResponse<Cliente>> {
    try {
      const from = (page - 1) * limit;
      const to = from + limit - 1;

      const { data, error, count } = await supabase
        .from("clientes")
        .select("*", { count: "exact" })
        .range(from, to)
        .order("fecha_creacion", { ascending: false });

      if (error) {
        console.error("Error fetching clientes:", error);
        return { data: [], count: 0, error: error.message };
      }

      return {
        data: data || [],
        count: count || 0,
        error: null,
      };
    } catch (err) {
      console.error("Error in getClientes:", err);
      return { data: [], count: 0, error: "Error al obtener clientes" };
    }
  }

  // Obtener cliente por ID
  async getClienteById(id: string): Promise<ApiResponse<Cliente>> {
    try {
      const { data, error } = await supabase.from("clientes").select("*").eq("id", id).single();

      if (error) {
        console.error("Error fetching cliente:", error);
        return { data: null, error: error.message };
      }

      return { data, error: null };
    } catch (err) {
      console.error("Error in getClienteById:", err);
      return { data: null, error: "Error al obtener cliente" };
    }
  }

  // Crear cliente
  async createCliente(clienteData: Omit<Cliente, "id">): Promise<ApiResponse<Cliente>> {
    try {
      const { data, error } = await supabase
        .from("clientes")
        .insert([clienteData])
        .select()
        .single();

      if (error) {
        console.error("Error creating cliente:", error);
        return { data: null, error: error.message };
      }

      return { data, error: null };
    } catch (err) {
      console.error("Error in createCliente:", err);
      return { data: null, error: "Error al crear cliente" };
    }
  }

  // Actualizar cliente
  async updateCliente(id: string, updates: Partial<Cliente>): Promise<ApiResponse<Cliente>> {
    try {
      const { data, error } = await supabase
        .from("clientes")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Error updating cliente:", error);
        return { data: null, error: error.message };
      }

      return { data, error: null };
    } catch (err) {
      console.error("Error in updateCliente:", err);
      return { data: null, error: "Error al actualizar cliente" };
    }
  }

  // Eliminar cliente
  async deleteCliente(id: string): Promise<ApiResponse<null>> {
    try {
      const { error } = await supabase.from("clientes").delete().eq("id", id);

      if (error) {
        console.error("Error deleting cliente:", error);
        return { data: null, error: error.message };
      }

      return { data: null, error: null };
    } catch (err) {
      console.error("Error in deleteCliente:", err);
      return { data: null, error: "Error al eliminar cliente" };
    }
  }

  // Buscar clientes
  async searchClientes(
    query: string,
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<Cliente>> {
    try {
      const from = (page - 1) * limit;
      const to = from + limit - 1;

      const { data, error, count } = await supabase
        .from("clientes")
        .select("*", { count: "exact" })
        .or(`nombre.ilike.%${query}%,email.ilike.%${query}%,telefono.ilike.%${query}%`)
        .range(from, to)
        .order("fecha_creacion", { ascending: false });

      if (error) {
        console.error("Error searching clientes:", error);
        return { data: [], count: 0, error: error.message };
      }

      return {
        data: data || [],
        count: count || 0,
        error: null,
      };
    } catch (err) {
      console.error("Error in searchClientes:", err);
      return { data: [], count: 0, error: "Error al buscar clientes" };
    }
  }
}

export const clienteService = new ClienteService();
