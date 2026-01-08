import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { insumosService } from "../services/insumosService";
import type { InsumoFormData, MovimientoInsumoFormData } from "../types/insumos";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

export const useInsumos = (page: number = 1, limit: number = 10) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const {
    data: insumosData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["insumos", page, limit],
    queryFn: () => insumosService.getAll(page, limit),
  });

  const createMutation = useMutation({
    mutationFn: (data: InsumoFormData) => {
      if (!user) throw new Error("Usuario no autenticado");
      return insumosService.create(data, user.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["insumos"] });
      queryClient.invalidateQueries({ queryKey: ["insumos-stats"] });
      toast({ title: "Éxito", description: "Insumo creado correctamente" });
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<InsumoFormData> }) =>
      insumosService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["insumos"] });
      queryClient.invalidateQueries({ queryKey: ["insumos-stats"] });
      toast({ title: "Éxito", description: "Insumo actualizado correctamente" });
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => insumosService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["insumos"] });
      queryClient.invalidateQueries({ queryKey: ["insumos-stats"] });
      toast({ title: "Éxito", description: "Insumo eliminado correctamente" });
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  return {
    data: insumosData?.data,
    count: insumosData?.count,
    isLoading,
    error,
    create: createMutation.mutate,
    update: updateMutation.mutate,
    delete: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};

export const useInsumoById = (id: string) => {
  return useQuery({
    queryKey: ["insumo", id],
    queryFn: () => insumosService.getById(id),
    enabled: !!id,
  });
};

export const useInsumosByCategoria = (categoria: string) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["insumos-categoria", categoria, user?.id],
    queryFn: () => insumosService.getByCategoria(categoria, user!.id),
    enabled: !!categoria && !!user,
  });
};

export const useInsumosStats = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["insumos-stats", user?.id],
    queryFn: () => insumosService.getEstadisticas(user!.id),
    enabled: !!user,
  });
};

export const useLowStockInsumos = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["insumos-stock-bajo", user?.id],
    queryFn: async () => {
      const result = await insumosService.getStockBajo(user!.id);
      if (result.error) throw new Error(result.error);
      return result.data || [];
    },
    enabled: !!user,
  });
};

export const useMovimientosInsumo = (insumoId: string, page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ["movimientos-insumo", insumoId, page, limit],
    queryFn: () => insumosService.getMovimientos(insumoId, page, limit),
    enabled: !!insumoId,
  });
};

export const useCreateMovimientoInsumo = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const mutation = useMutation({
    mutationFn: (data: MovimientoInsumoFormData) => {
      if (!user) throw new Error("Usuario no autenticado");
      return insumosService.createMovimiento(data, user.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["insumos"] });
      queryClient.invalidateQueries({ queryKey: ["movimientos-insumo"] });
      queryClient.invalidateQueries({ queryKey: ["insumos-stats"] });
      toast({ title: "Éxito", description: "Movimiento registrado correctamente" });
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  return {
    createMovimiento: mutation.mutate,
    isCreating: mutation.isPending,
  };
};

export const useMovimientosInsumos = (page: number = 1, limit: number = 10) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["movimientos-insumos", user?.id, page, limit],
    queryFn: () => insumosService.getAllMovimientos(user!.id, page, limit),
    enabled: !!user,
  });
};
