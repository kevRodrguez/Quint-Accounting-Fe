import { AppSidebar } from "@/components/dashboard/sidebar/app-sidebar";
import { SiteHeader } from "@/components/dashboard/site-header";
import { CardTitle } from "@/components/ui/card";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SectionCards } from "@/components/dashboard/section-cards";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { DetalleMayorizacion } from "@/components/dashboard/modals/detalle-mayorizacion-modal";
import { LoadingScreen } from "@/components/dashboard/LoadingScreen";
import { ErrorScreen } from "@/components/dashboard/ErrorScreen";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import type { DateRange } from "react-day-picker";
import { toast } from "react-toastify";

export default function Mayorizacion() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCuenta, setSelectedCuenta] = useState<string | null>(null);

  // calcular rango por defecto: desde 1 de enero del año anterior hasta 31 de diciembre del año actual
  const today = new Date();
  // ahora: 1 de enero del año actual hasta 31 de diciembre del año actual
  const defaultStart = new Date(today.getFullYear(), 0, 1); // 1 Jan current year
  const defaultEnd = new Date(today.getFullYear(), 11, 31); // 31 Dec current year

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: defaultStart,
    to: defaultEnd,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingFiltro, setLoadingFiltro] = useState(false);

  // Estado para controlar las fechas filtradas que se pasan a los componentes
  const [fechasFiltradas, setFechasFiltradas] = useState<{
    fechaInicio: Date | undefined;
    fechaFinal: Date | undefined;
  }>({
    fechaInicio: defaultStart,
    fechaFinal: defaultEnd,
  });

  const initializePage = async () => {
    setLoading(true);
    setError(null);

    try {
      // Simular una pequeña carga inicial o realizar alguna validación
      await new Promise((resolve) => setTimeout(resolve, 300));

      // La página se inicializa correctamente, las fechas se validarán al filtrar
    } catch (error: any) {
      console.error("Error al inicializar mayorización:", error);
      setError(error?.message || "Error al cargar la página de mayorización");
    } finally {
      setLoading(false);
    }
  };

  const filtrarPorFechas = async (rango: DateRange | undefined) => {
    if (!rango || !rango.from || !rango.to) {
      toast.error("Debe seleccionar un rango de fechas válido");
      return;
    }

    setLoadingFiltro(true);
    setError(null);

    try {
      // Actualizar las fechas filtradas que se pasan a los componentes
      setFechasFiltradas({
        fechaInicio: rango.from,
        fechaFinal: rango.to,
      });

      toast.success(`Filtros aplicados correctamente`);
    } catch (error: any) {
      console.error("Error al filtrar por fechas:", error);
      setError(error?.message || "No se pudo filtrar por el rango de fechas");
      toast.error(error?.message || "Error al filtrar por fechas");
    } finally {
      setLoadingFiltro(false);
    }
  };

  const limpiarFiltros = async () => {
    setDateRange(undefined);
    setFechasFiltradas({
      fechaInicio: undefined,
      fechaFinal: undefined,
    });
    toast.info("Filtros limpiados");
  };

  useEffect(() => {
    initializePage();
  }, []);

  // Mostrar pantalla de carga global
  if (loading) {
    return (
      <LoadingScreen
        title="Mayorización de cuentas"
        text="Cargando página..."
      />
    );
  }

  // Mostrar pantalla de error global
  if (error) {
    return <ErrorScreen title="Error en mayorización" error={error} />;
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title="Mayorización de cuentas" />
        <CardTitle className="justify-center flex text-3xl my-4">
          Mayorización de cuentas
        </CardTitle>

        <div className="w-full max-w-[1400px] mx-auto px-6 overflow-x-auto">
          {/* Filtros de fecha */}
          <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center justify-start">
            <DateRangePicker
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
            />
            <div className="flex gap-2">
              <Button
                onClick={() => filtrarPorFechas(dateRange)}
                disabled={loadingFiltro || !dateRange?.from || !dateRange?.to}
                variant="default"
                size="sm"
              >
                {loadingFiltro ? "Filtrando..." : "Filtrar"}
              </Button>
              <Button
                onClick={limpiarFiltros}
                variant="outline"
                size="sm"
                disabled={loadingFiltro}
              >
                Limpiar
              </Button>
            </div>
          </div>
          <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTitle></DialogTitle>
            <DialogContent className="max-w-4xl w-full h-[80vh] p-0 overflow-auto">
              <DetalleMayorizacion
                codigo={selectedCuenta}
                fechaInicio={fechasFiltradas.fechaInicio}
                fechaFinal={fechasFiltradas.fechaFinal}
                setOpen={setModalOpen}
              />
            </DialogContent>
          </Dialog>
          {/* Tarjetas de Debe y Haber */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <Label className="mb-2">Debe</Label>
              <SectionCards
                fechaInicio={fechasFiltradas.fechaInicio}
                fechaFinal={fechasFiltradas.fechaFinal}
                onCardClick={(codigoCuenta: string) => {
                  setSelectedCuenta(codigoCuenta);
                  setModalOpen(true);
                }}
              />
            </div>
            <div className="flex flex-col">
              <Label className="mb-2">Haber</Label>
              <SectionCards
                haber
                fechaInicio={fechasFiltradas.fechaInicio}
                fechaFinal={fechasFiltradas.fechaFinal}
                onCardClick={(codigoCuenta: string) => {
                  setSelectedCuenta(codigoCuenta);
                  console.log("Set selected cuenta", codigoCuenta);
                  setModalOpen(true);
                }}
              />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
