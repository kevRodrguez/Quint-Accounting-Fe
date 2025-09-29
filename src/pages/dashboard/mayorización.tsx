import { AppSidebar } from "@/components/dashboard/sidebar/app-sidebar";
import { SiteHeader } from "@/components/dashboard/site-header";
import { CardTitle } from "@/components/ui/card";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { SectionCards } from "@/components/dashboard/section-cards";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { DetalleMayorizacion } from "@/components/dashboard/modals/detalle-mayorizacion-modal";
import { LoadingScreen } from "@/components/dashboard/LoadingScreen";
import { ErrorScreen } from "@/components/dashboard/ErrorScreen";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import type { DateRange } from "react-day-picker";

export default function Mayorizacion() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCuenta, setSelectedCuenta] = useState<string | null>(null);

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date()
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const initializePage = async () => {
    setLoading(true);
    setError(null);

    try {
      // Simular una pequeña carga inicial o realizar alguna validación
      await new Promise(resolve => setTimeout(resolve, 500));

      // Verificar que las fechas están configuradas correctamente
      if (!dateRange?.from || !dateRange?.to) {
        throw new Error("Las fechas de inicio y final son requeridas");
      }

    } catch (error: any) {
      console.error("Error al inicializar mayorización:", error);
      setError(error?.message || "Error al cargar la página de mayorización");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initializePage();
  }, []);

  // Mostrar pantalla de carga global
  if (loading) {
    return <LoadingScreen title="Mayorización de cuentas" text="Cargando página..." />;
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
          {/* Filtro de rango de fechas */}
          <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center justify-start">
            <div className="flex flex-col">
              <Label className="mb-2">Rango de fechas</Label>
              <DateRangePicker
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
              />
            </div>
          </div>
          <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTitle></DialogTitle>
            <DialogContent className="max-w-4xl w-full h-[80vh] p-0 overflow-auto">
              <DetalleMayorizacion
                codigo={selectedCuenta}
                fechaInicio={dateRange?.from}
                fechaFinal={dateRange?.to}
                setOpen={setModalOpen}
              />
            </DialogContent>
          </Dialog>
          {/* Tarjetas de Debe y Haber */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <Label className="mb-2">Debe</Label>
              <SectionCards
                fechaInicio={dateRange?.from}
                fechaFinal={dateRange?.to}
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
                fechaInicio={dateRange?.from}
                fechaFinal={dateRange?.to}
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
