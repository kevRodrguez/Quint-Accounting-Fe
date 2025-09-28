import { AppSidebar } from "@/components/dashboard/sidebar/app-sidebar";
import { SiteHeader } from "@/components/dashboard/site-header";
import { CardTitle } from "@/components/ui/card";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { SectionCards } from "@/components/dashboard/section-cards";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DetalleMayorizacion } from "@/components/dashboard/modals/detalle-mayorizacion-modal";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function Mayorizacion() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCuenta, setSelectedCuenta] = useState<string | null>(null);

  const [fechaInicio, setFechaInicio] = useState<Date | undefined>(new Date());
  const [fechaFinal, setFechaFinal] = useState<Date | undefined>(new Date());

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
        <SiteHeader title="Catálogo de Cuentas" />
        <CardTitle className="justify-center flex text-3xl my-4">
          Catálogo de Cuentas
        </CardTitle>

        <div className="w-full max-w-[1400px] mx-auto px-6 overflow-x-auto">
          {/* Filtros de fechas y combobox */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="flex flex-col">
              <Label htmlFor="fecha">Fecha inicio</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!fechaInicio}
                    className="w-full justify-start text-left mt-1 font-normal"
                  >
                    <CalendarIcon className="mr-2" />
                    {fechaInicio ? (
                      format(fechaInicio, "PPP")
                    ) : (
                      <span>Selecciona una fecha</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={fechaInicio}
                    onSelect={setFechaInicio}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex flex-col">
              <Label htmlFor="fecha">Fecha final</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!fechaFinal}
                    className="w-full justify-start text-left mt-1 font-normal"
                  >
                    <CalendarIcon className="mr-2" />
                    {fechaFinal ? (
                      format(fechaFinal, "PPP")
                    ) : (
                      <span>Selecciona una fecha</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={fechaFinal}
                    onSelect={setFechaFinal}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTitle>holaxd</DialogTitle>
            <DialogContent className="max-w-4xl w-full h-[80vh] p-0 overflow-auto">
              <DetalleMayorizacion
                codigo={selectedCuenta}
                fechaInicio={fechaInicio}
                fechaFinal={fechaFinal}
                setOpen={setModalOpen}
              />
            </DialogContent>
          </Dialog>
          {/* Tarjetas de Debe y Haber */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <Label className="mb-2">Debe</Label>
              <SectionCards
                fechaInicio={fechaInicio}
                fechaFinal={fechaFinal}
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
                fechaInicio={fechaInicio}
                fechaFinal={fechaFinal}
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
