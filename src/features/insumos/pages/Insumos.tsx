import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Package, AlertTriangle, TrendingUp, Loader2 } from "lucide-react";
import { useInsumos, useInsumosStats, useLowStockInsumos } from "../hooks/useInsumos";
import { NuevoInsumoModal } from "../components/NuevoInsumoModal";
import { SimplePagination } from "@/components/SimplePagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function InsumosPage() {
  const [page, setPage] = useState(1);
  const { data: insumos, count, isLoading } = useInsumos(page);
  const { stats } = useInsumosStats();
  const { data: lowStock } = useLowStockInsumos();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Insumos</h1>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Insumo
          </Button>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Insumos</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.total_insumos || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bajo Stock</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">
                {stats?.insumos_bajo_stock || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${stats?.valor_total_inventario?.toFixed(2) || "0.00"}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Insumos */}
        <Card>
          <CardHeader>
            <CardTitle>Inventario de Insumos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Unidad</TableHead>
                    <TableHead>Stock Actual</TableHead>
                    <TableHead>Stock Mínimo</TableHead>
                    <TableHead>Costo Unitario</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        <div className="flex justify-center items-center gap-2">
                          <Loader2 className="h-6 w-6 animate-spin" /> Cargando...
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : !insumos || insumos.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No hay insumos registrados
                      </TableCell>
                    </TableRow>
                  ) : (
                    insumos.map(insumo => (
                      <TableRow key={insumo.id}>
                        <TableCell className="font-medium">{insumo.nombre_insumo}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{insumo.categoria}</Badge>
                        </TableCell>
                        <TableCell>{insumo.unidad_medida}</TableCell>
                        <TableCell>
                          <span
                            className={
                              insumo.stock_actual <= insumo.stock_minimo
                                ? "text-red-500 font-medium"
                                : ""
                            }
                          >
                            {insumo.stock_actual}
                          </span>
                        </TableCell>
                        <TableCell>{insumo.stock_minimo}</TableCell>
                        <TableCell>
                          {insumo.moneda === "USD" ? "$" : "Bs."}
                          {insumo.costo_unitario.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Badge variant={insumo.activo ? "default" : "secondary"}>
                            {insumo.activo ? "Activo" : "Inactivo"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
              <div className="p-4 border-t flex justify-center">
                <SimplePagination
                  currentPage={page}
                  totalPages={Math.max(1, Math.ceil(count / 10))}
                  onPageChange={setPage}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alertas de bajo stock */}
        {lowStock && lowStock.length > 0 && (
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="text-orange-800 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Insumos con Stock Bajo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {lowStock.map(insumo => (
                  <div
                    key={insumo.id}
                    className="flex justify-between items-center p-2 bg-white rounded border"
                  >
                    <span className="font-medium">{insumo.nombre_insumo}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        Stock: {insumo.stock_actual} / Mínimo: {insumo.stock_minimo}
                      </span>
                      <Badge variant="destructive">Bajo</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <NuevoInsumoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </MainLayout>
  );
}
