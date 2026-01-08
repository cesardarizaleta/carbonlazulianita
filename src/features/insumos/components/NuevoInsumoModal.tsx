import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useInsumos } from "../hooks/useInsumos";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import type { CategoriaInsumo, UnidadMedida } from "../types/insumos";

const insumoSchema = z.object({
  nombre_insumo: z.string().min(1, "El nombre es requerido"),
  descripcion: z.string().optional(),
  categoria: z.enum([
    "materias_primas",
    "embalaje",
    "etiquetas",
    "quimicos",
    "herramientas",
    "mantenimiento",
    "otros",
  ] as const),
  unidad_medida: z.enum([
    "kg",
    "g",
    "l",
    "ml",
    "unidad",
    "caja",
    "paquete",
    "rollo",
    "botella",
    "saco",
  ] as const),
  stock_actual: z.number().min(0, "El stock debe ser mayor o igual a 0"),
  stock_minimo: z.number().min(0, "El stock mínimo debe ser mayor o igual a 0"),
  costo_unitario: z.number().min(0, "El costo unitario debe ser mayor a 0"),
  moneda: z.enum(["USD", "VES"]),
  fecha_gasto: z.string().min(1, "La fecha de gasto es requerida"),
  proveedor: z.string().optional(),
  ubicacion: z.string().optional(),
  activo: z.boolean().default(true),
});

type InsumoFormData = z.infer<typeof insumoSchema>;

interface NuevoInsumoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const categorias = [
  { display: "Materias Primas", value: "materias_primas" as CategoriaInsumo },
  { display: "Embalaje", value: "embalaje" as CategoriaInsumo },
  { display: "Etiquetas", value: "etiquetas" as CategoriaInsumo },
  { display: "Químicos", value: "quimicos" as CategoriaInsumo },
  { display: "Herramientas", value: "herramientas" as CategoriaInsumo },
  { display: "Mantenimiento", value: "mantenimiento" as CategoriaInsumo },
  { display: "Otros", value: "otros" as CategoriaInsumo },
];

const unidades = [
  { display: "Kilogramos", value: "kg" as UnidadMedida },
  { display: "Gramos", value: "g" as UnidadMedida },
  { display: "Litros", value: "l" as UnidadMedida },
  { display: "Mililitros", value: "ml" as UnidadMedida },
  { display: "Unidad", value: "unidad" as UnidadMedida },
  { display: "Caja", value: "caja" as UnidadMedida },
  { display: "Paquete", value: "paquete" as UnidadMedida },
  { display: "Rollo", value: "rollo" as UnidadMedida },
  { display: "Botella", value: "botella" as UnidadMedida },
  { display: "Saco", value: "saco" as UnidadMedida },
];

export function NuevoInsumoModal({ isOpen, onClose }: NuevoInsumoModalProps) {
  const { create, isCreating } = useInsumos();
  const { toast } = useToast();

  const form = useForm<InsumoFormData>({
    resolver: zodResolver(insumoSchema),
    defaultValues: {
      nombre_insumo: "",
      descripcion: "",
      categoria: "",
      unidad_medida: "",
      stock_actual: 0,
      stock_minimo: 0,
      costo_unitario: 0,
      moneda: "USD",
      fecha_gasto: new Date().toISOString().split("T")[0], // Today's date in YYYY-MM-DD format
      proveedor: "",
      ubicacion: "",
      activo: true,
    },
  });

  const onSubmit = async (data: InsumoFormData) => {
    try {
      await create(data);
      toast({
        title: "Éxito",
        description: "Insumo creado correctamente",
      });
      form.reset();
      onClose();
    } catch {
      toast({
        title: "Error",
        description: "Error al crear el insumo",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nuevo Insumo</DialogTitle>
          <DialogDescription>Agregue un nuevo insumo al inventario</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nombre_insumo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del Insumo</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Harina de trigo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="descripcion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción (Opcional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descripción del insumo..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="categoria"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoría</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar categoría" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categorias.map(categoria => (
                          <SelectItem key={categoria.value} value={categoria.value}>
                            {categoria.display}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="unidad_medida"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unidad de Medida</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar unidad" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {unidades.map(unidad => (
                          <SelectItem key={unidad.value} value={unidad.value}>
                            {unidad.display}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="fecha_gasto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de Gasto</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="stock_actual"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock Actual</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...field}
                        onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stock_minimo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock Mínimo</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...field}
                        onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="costo_unitario"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Costo Unitario</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...field}
                        onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="moneda"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Moneda</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar moneda" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="VES">VES (Bs.)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="fecha_gasto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de Gasto</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="proveedor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Proveedor (Opcional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre del proveedor" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ubicacion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ubicación (Opcional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Ubicación del insumo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="activo"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Estado Activo</FormLabel>
                    <div className="text-sm text-muted-foreground">
                      El insumo estará disponible para uso en producción
                    </div>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isCreating}>
                {isCreating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Crear Insumo
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
