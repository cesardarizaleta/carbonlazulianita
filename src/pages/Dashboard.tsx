import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentSalesTable } from "@/components/dashboard/RecentSalesTable";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { InventoryStatus } from "@/components/dashboard/InventoryStatus";
import { DollarSign, Package, ShoppingCart, AlertCircle, Loader2 } from "lucide-react";
import { ventaService, inventarioService, cobranzaService } from "@/services";

const Dashboard = () => {
  const [stats, setStats] = useState({
    ventasMes: 0,
    inventarioTotal: 0,
    pedidosPendientes: 0,
    cuentasPorCobrar: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load sales data
      const salesResponse = await ventaService.getVentas(1, 100);
      const ventasMes = salesResponse.data?.reduce((acc, venta) => acc + venta.total, 0) || 0;

      // Load inventory data
      const inventoryResponse = await inventarioService.getProductos(1, 100);
      const inventarioTotal =
        inventoryResponse.data?.reduce((acc, item) => acc + item.stock, 0) || 0;

      // Load pending collections
      const cobranzaResponse = await cobranzaService.getCobranzas(1, 100);
      const cuentasPorCobrar =
        cobranzaResponse.data?.reduce((acc, cob) => acc + cob.monto_pendiente, 0) || 0;
      const pedidosPendientes =
        cobranzaResponse.data?.filter(cob => cob.estado !== "pagado").length || 0;

      setStats({
        ventasMes,
        inventarioTotal,
        pedidosPendientes,
        cuentasPorCobrar,
      });
    } catch (err) {
      setError("Error al cargar datos del dashboard");
    } finally {
      setLoading(false);
    }
  };
  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-3xl font-display font-bold text-foreground">
            Bienvenido a <span className="text-primary">La Zulianita</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Resumen general del negocio •{" "}
            {new Date().toLocaleDateString("es-ES", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            <span className="ml-2 text-muted-foreground">Cargando dashboard...</span>
          </div>
        ) : error ? (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            <p className="text-destructive text-sm">{error}</p>
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Ventas del Mes"
                value={`$${stats.ventasMes.toLocaleString()}`}
                change="+12.5% vs mes anterior"
                changeType="positive"
                icon={DollarSign}
                iconColor="primary"
              />
              <StatCard
                title="Inventario Total"
                value={`${stats.inventarioTotal.toLocaleString()} kg`}
                change="82% capacidad"
                changeType="neutral"
                icon={Package}
                iconColor="success"
              />
              <StatCard
                title="Pedidos Pendientes"
                value={stats.pedidosPendientes.toString()}
                change="5 urgentes"
                changeType="negative"
                icon={ShoppingCart}
                iconColor="warning"
              />
              <StatCard
                title="Cuentas por Cobrar"
                value={`$${stats.cuentasPorCobrar.toLocaleString()}`}
                change="8 facturas vencidas"
                changeType="negative"
                icon={AlertCircle}
                iconColor="accent"
              />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <SalesChart />
              </div>
              <div>
                <InventoryStatus />
              </div>
            </div>

            {/* Recent Sales */}
            <RecentSalesTable />
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default Dashboard;
