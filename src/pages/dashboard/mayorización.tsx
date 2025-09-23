import { SectionCards } from "@/components/dashboard/section-cards";
import { AppSidebar } from "@/components/dashboard/sidebar/app-sidebar";
import { SiteHeader } from "@/components/dashboard/site-header";
import { CardTitle } from "@/components/ui/card";
import { Combobox } from "@/components/ui/combobox";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { CuentasService } from "@/services/cuentas/cuentas.service";
import type { Cuenta } from "@/types/libroDiario.interface";
import { useEffect, useState } from "react";

export default function Mayorizacion() {
  const [cuentasSelect, setCuentasSelect] = useState<Cuenta[]>([]);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //mensaje de error para dialog
  const [errorMessage, setErrorMessage] = useState("");

  const obtenerCuentas = async () => {
    try {
      const cuentas = await CuentasService.obtenerCuentas();
      console.log("Cuentas obtenidas:", cuentas);
      setCuentasSelect(cuentas);
    } catch (error) {
      console.log(error);

      let errorMsg = "";
      if (typeof error === "object" && error !== null && "message" in error) {
        errorMsg += ": " + String((error as { message?: string }).message);
      }
      setErrorMessage(errorMsg);
      setIsAlertVisible(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    obtenerCuentas();
  }, []);

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
        <SiteHeader title="Libro Diario" />
        <CardTitle className="justify-center flex text-3xl my-2">
          Mayorización
        </CardTitle>
        <div className="col-span-2">
          <Combobox
            style={{ padding: 30, margin: 5, width: "70vh", fontSize: "small" }}
            title="cuenta"
            items={cuentasSelect as any[]}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 col-span-2">
          <div>
            <h2 className="text-xl font-semibold mb-2 p-5"> Saldo acreedor</h2>
            <SectionCards />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2 p-5"> Saldo deudor</h2>
            <SectionCards />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
