import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Eye, ShoppingCart, Loader2 } from "lucide-react";
import { ventaService } from "@/services";
import type { Venta } from "@/services";

interface Sale extends Venta {
  cliente_nombre?: string;
}

const estadoBadgeVariant = {
  completado: "default",
  pendiente: "secondary",
  procesando: "outline",
  enviado: "outline",
  cancelado: "destructive",
} as const;

const Ventas = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEstado, setFilterEstado] = useState<string>("todos");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    loadSales();
  }, []);

  const loadSales = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ventaService.getVentas();
      if (response.error) {
        setError(response.error);
      } else {
        setSales(response.data || []);
      }
    } catch (err) {
      setError("Error al cargar ventas");
    } finally {
      setLoading(false);
    }
  };

  const filteredSales = sales.filter((sale) => {
    const matchesSearch =
      (sale.cliente?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
      sale.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterEstado === "todos" || sale.estado === filterEstado;
    return matchesSearch && matchesFilter;
  });

  const totalVentas = filteredSales.reduce((acc, sale) => acc + sale.total, 0);

  const handleAddSale = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const saleData = {
      cliente_id: formData.get("cliente") as string,
      total: Number(formData.get("total")),
      estado: "pendiente",
    };

    try {
      // For now, create a simple sale without items
      const response = await ventaService.createVenta(saleData, []);
      if (response.error) {
        setError(response.error);
      } else {
        setSales([response.data!, ...sales]);
        setIsDialogOpen(false);
      }
    } catch (err) {
      setError("Error al crear venta");
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">Ventas</h1>
            <p className="text-muted-foreground">Gestión de pedidos y transacciones</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Nueva Venta
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="font-display">Registrar Nueva Venta</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddSale} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cliente">Cliente ID</Label>
                  <Input id="cliente" name="cliente" placeholder="ID del cliente" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="total">Total ($)</Label>
                  <Input id="total" name="total" type="number" step="0.01" required />
                </div>
                <Button type="submit" className="w-full">Registrar Venta</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters and Stats */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por cliente o ID..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={filterEstado} onValueChange={setFilterEstado}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="pendiente">Pendiente</SelectItem>
              <SelectItem value="procesando">Procesando</SelectItem>
              <SelectItem value="enviado">Enviado</SelectItem>
              <SelectItem value="completado">Completado</SelectItem>
              <SelectItem value="cancelado">Cancelado</SelectItem>
            </SelectContent>
          </Select>
          <Badge variant="outline" className="px-4 py-2 h-10 flex items-center">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Total: ${totalVentas.toLocaleString()}
          </Badge>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            <p className="text-destructive text-sm">{error}</p>
          </div>
        )}

        {/* Loading or Table */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            <span className="ml-2 text-muted-foreground">Cargando ventas...</span>
          </div>
        ) : (
          <div className="bg-card rounded-xl border border-border shadow-sm animate-slide-up overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[80px]">ID</TableHead>
                  <TableHead className="min-w-[120px]">Fecha</TableHead>
                  <TableHead className="min-w-[150px]">Cliente</TableHead>
                  <TableHead className="min-w-[100px]">Total</TableHead>
                  <TableHead className="min-w-[100px]">Estado</TableHead>
                  <TableHead className="min-w-[120px] text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSales.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                      No se encontraron ventas
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSales.map((sale) => (
                    <TableRow key={sale.id} className="hover:bg-muted/50 transition-colors">
                      <TableCell className="font-mono text-sm">{sale.id}</TableCell>
                      <TableCell>{new Date(sale.fecha_venta).toLocaleDateString()}</TableCell>
                      <TableCell className="font-medium">{sale.cliente_nombre || sale.cliente_id || "N/A"}</TableCell>
                      <TableCell className="font-semibold">${sale.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={estadoBadgeVariant[sale.estado] || "secondary"}>{sale.estado}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Ventas;
