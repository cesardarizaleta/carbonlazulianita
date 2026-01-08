import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Loader2 } from "lucide-react";
import { useProduccion } from "../hooks/useProduccion";
import { ProduccionForm, ProduccionFormData } from "../components/ProduccionForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SimplePagination } from "@/components/SimplePagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ProduccionPage() {
  const [page, setPage] = useState(1);
  const { data, count, isLoading, create, isCreating } = useProduccion(page);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreate = async (formData: ProduccionFormData) => {
    await create(formData);
    setIsModalOpen(false);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Producción</h1>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Registrar Producción
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Historial de Producción</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[180px]">Fecha</TableHead>
                    <TableHead>Producto</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead>Notas</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center">
                        <div className="flex justify-center items-center gap-2">
                          <Loader2 className="h-6 w-6 animate-spin" /> Cargando...
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : data.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center">
                        No hay registros de producción
                      </TableCell>
                    </TableRow>
                  ) : (
                    data.map(item => (
                      <TableRow key={item.id}>
                        <TableCell>{new Date(item.fecha_produccion).toLocaleString()}</TableCell>
                        <TableCell className="font-medium">
                          {item.producto_resultado?.nombre_producto || "Producto Desconocido"}
                        </TableCell>
                        <TableCell>{item.cantidad_producida}</TableCell>
                        <TableCell>{item.notas}</TableCell>
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

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Registrar Nueva Producción</DialogTitle>
            </DialogHeader>
            <ProduccionForm
              onSubmit={handleCreate}
              isLoading={isCreating}
              onCancel={() => setIsModalOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
