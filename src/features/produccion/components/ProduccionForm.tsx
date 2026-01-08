import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useInventarioStore } from "@/stores/inventarioStore";
import { inventarioService } from "@/features/inventario/services/inventarioService";
import { useInsumos } from "@/features/insumos";
import { Trash, Plus } from "lucide-react";
import { useEffect, useState } from "react";

const insumoSchema = z.object({
  producto_insumo_id: z.string().min(1, "Seleccione un insumo"),
  cantidad_usada: z.preprocess(
    val => Number(val),
    z.number().min(0.01, "Cantidad debe ser mayor a 0")
  ),
});

const produccionSchema = z.object({
  producto_resultado_id: z.preprocess(
    val => Number(val),
    z.number().min(1, "Seleccione producto producido")
  ),
  cantidad_producida: z.preprocess(
    val => Number(val),
    z.number().min(0.01, "Cantidad debe ser mayor a 0")
  ),
  fecha_produccion: z.string(),
  notas: z.string().optional(),
  insumos: z.array(insumoSchema).min(1, "Agregue al menos un insumo"),
});

export type ProduccionFormData = z.infer<typeof produccionSchema>;

interface ProduccionFormProps {
  onSubmit: (data: ProduccionFormData) => void;
  isLoading: boolean;
  onCancel: () => void;
}

export function ProduccionForm({ onSubmit, isLoading, onCancel }: ProduccionFormProps) {
  const { productos, subscribe, setProductos } = useInventarioStore();
  const { data: insumos = [], isLoading: loadingInsumos } = useInsumos(1, 1000); // Cargar todos los insumos
  const [loadingProductos, setLoadingProductos] = useState(false);

  useEffect(() => {
    // Si no hay productos en el store, cargarlos
    if (productos.length === 0) {
      loadProductos();
    }

    // Suscribirse a cambios en tiempo real
    const unsub = subscribe();
    return () => {
      unsub();
    };
  }, []);

  const loadProductos = async () => {
    try {
      setLoadingProductos(true);
      // Cargar todos los productos (sin paginación para el selector)
      const response = await inventarioService.getProductos(1, 1000); // Cargar hasta 1000 productos
      if (!response.error && response.data) {
        setProductos(response.data);
      }
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoadingProductos(false);
    }
  };

  const form = useForm<ProduccionFormData>({
    resolver: zodResolver(produccionSchema),
    defaultValues: {
      cantidad_producida: 0,
      fecha_produccion: new Date().toISOString(),
      notas: "",
      insumos: [{ cantidad_usada: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "insumos",
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="producto_resultado_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Producto Producido</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={String(field.value)}
                  disabled={loadingProductos}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          loadingProductos ? "Cargando productos..." : "Seleccionar producto"
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {productos.map(prod => (
                      <SelectItem key={prod.id} value={String(prod.id)}>
                        {prod.nombre_producto} (Stock: {prod.stock})
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
            name="cantidad_producida"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cantidad Producida</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4 border p-4 rounded-md">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Materias Primas / Insumos Consumidos</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ cantidad_usada: 0, producto_insumo_id: undefined })}
            >
              <Plus className="w-4 h-4 mr-2" /> Agregar Insumo
            </Button>
          </div>

          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-4 items-end">
              <FormField
                control={form.control}
                name={`insumos.${index}.producto_insumo_id`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className={index !== 0 ? "sr-only" : ""}>Insumo</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={String(field.value)}
                      disabled={loadingInsumos}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              loadingInsumos ? "Cargando insumos..." : "Seleccionar insumo"
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {insumos.map(insumo => (
                          <SelectItem key={insumo.id} value={String(insumo.id)}>
                            {insumo.nombre_insumo} (Stock: {insumo.stock_actual}{" "}
                            {insumo.unidad_medida})
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
                name={`insumos.${index}.cantidad_usada`}
                render={({ field }) => (
                  <FormItem className="w-32">
                    <FormLabel className={index !== 0 ? "sr-only" : ""}>Cantidad</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                <Trash className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          ))}
          {form.formState.errors.insumos?.root && (
            <p className="text-sm font-medium text-destructive">
              {form.formState.errors.insumos.root.message}
            </p>
          )}
        </div>

        <FormField
          control={form.control}
          name="notas"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notas</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Registrando..." : "Registrar Producción"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
