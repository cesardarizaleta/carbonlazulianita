import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthGuard } from "@/components/AuthGuard";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { StoreInitializer } from "@/components/StoreInitializer";
import Dashboard from "./features/dashboard/pages/Dashboard";
import Inventario from "./features/inventario/pages/Inventario";
import Ventas from "./features/ventas/pages/Ventas";
import Cobranza from "./features/cobranza/pages/Cobranza";
import Clientes from "./features/clientes/pages/Clientes";
import Configuracion from "./features/configuracion/pages/Configuracion";
import Logs from "./features/logs/pages/Logs";
import Gastos from "./features/gastos/pages/Gastos";
import Login from "./features/auth/pages/Login";
import NotFound from "./features/error/pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache inteligente basado en el tipo de dato
      staleTime: query => {
        // Datos que cambian muy frecuentemente (ventas recientes, stock)
        if (query.queryKey[0] === "ventas" && query.queryKey.includes("recent")) {
          return 30 * 1000; // 30 segundos
        }
        // Datos que cambian frecuentemente (ventas, productos, cobranzas)
        if (["ventas", "productos", "cobranzas"].includes(query.queryKey[0] as string)) {
          return 2 * 60 * 1000; // 2 minutos
        }
        // Datos que cambian poco (clientes, configuraciones)
        if (["clientes", "config"].includes(query.queryKey[0] as string)) {
          return 10 * 60 * 1000; // 10 minutos
        }
        // Datos históricos/gráficos (cambian muy poco)
        if (query.queryKey.includes("chart") || query.queryKey.includes("statistics")) {
          return 30 * 60 * 1000; // 30 minutos
        }
        // Default
        return 5 * 60 * 1000; // 5 minutos
      },
      // Mantener en cache
      gcTime: 60 * 60 * 1000, // 1 hora
      // Reintentar 2 veces en caso de error
      retry: 2,
      // Reintentar con delay exponencial
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      // Refetch inteligente
      refetchOnWindowFocus: query => {
        // Solo refetch datos críticos cuando vuelve el foco
        return ["ventas", "productos"].includes(query.queryKey[0] as string);
      },
      refetchOnReconnect: query => {
        // Refetch datos importantes al reconectar
        return ["ventas", "productos", "clientes"].includes(query.queryKey[0] as string);
      },
      // Refetch en intervalos para datos críticos
      refetchInterval: query => {
        // Actualizar ventas recientes cada 2 minutos
        if (query.queryKey[0] === "ventas" && query.queryKey.includes("recent")) {
          return 2 * 60 * 1000;
        }
        return false;
      },
    },
    mutations: {
      // Reintentar mutaciones 1 vez
      retry: 1,
      // Invalidar queries relacionadas después de mutaciones
      onSuccess: () => {
        // Esto se maneja en hooks específicos
      },
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <StoreInitializer />
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <Routes>
            {/* Rutas públicas */}
            <Route
              path="/login"
              element={
                <AuthGuard requireAuth={false}>
                  <Login />
                </AuthGuard>
              }
            />

            {/* Rutas protegidas */}
            <Route
              path="/"
              element={
                <AuthGuard>
                  <Dashboard />
                </AuthGuard>
              }
            />
            <Route
              path="/inventario"
              element={
                <AuthGuard>
                  <Inventario />
                </AuthGuard>
              }
            />
            <Route
              path="/ventas"
              element={
                <AuthGuard>
                  <Ventas />
                </AuthGuard>
              }
            />
            <Route
              path="/cobranza"
              element={
                <AuthGuard>
                  <Cobranza />
                </AuthGuard>
              }
            />
            <Route
              path="/clientes"
              element={
                <AuthGuard>
                  <Clientes />
                </AuthGuard>
              }
            />
            <Route
              path="/configuracion"
              element={
                <AuthGuard>
                  <Configuracion />
                </AuthGuard>
              }
            />
            <Route
              path="/logs"
              element={
                <AuthGuard>
                  <Logs />
                </AuthGuard>
              }
            />
            <Route
              path="/gastos"
              element={
                <AuthGuard>
                  <Gastos />
                </AuthGuard>
              }
            />

            {/* Ruta 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
