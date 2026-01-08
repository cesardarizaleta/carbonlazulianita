import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { produccionService } from "../services/produccionService";
import type { CreateProduccionData } from "../types/produccion";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

export const useProduccion = (page: number = 1, enabled: boolean = true) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const {
    data: productionsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["producciones", page],
    queryFn: () => produccionService.getAll(page),
    enabled,
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateProduccionData) => {
      if (!user) throw new Error("Usuario no autenticado");
      return produccionService.create(data, user.id);
    },
    onSuccess: resp => {
      if (resp.error) throw new Error(resp.error);
      queryClient.invalidateQueries({ queryKey: ["producciones"] });
      // Also invalidate inventory because stocks changed
      queryClient.invalidateQueries({ queryKey: ["inventario"] });
      toast({ title: "Éxito", description: "Producción registrada correctamente" });
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  return {
    data: productionsData?.data || [],
    count: productionsData?.count || 0,
    isLoading,
    error,
    create: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
  };
};
