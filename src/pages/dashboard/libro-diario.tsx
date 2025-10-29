import { AppSidebar } from "@/components/dashboard/sidebar/app-sidebar";
import { NuevoAsientoForm } from "@/components/dashboard/modals/nuevo-asiento.modal";
import { SiteHeader } from "@/components/dashboard/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Input } from "@/components/ui/input";
import React, { useCallback, useEffect, useState } from "react";
import type { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CardTitle } from "@/components/ui/card";

import { LibroDiarioService } from "@/services/libroDiario/libroDiario.service";
import type {
  AsientosConTotale,
  DetalleAsiento,
  AsientosConTotalesMayores,
  LibroDiario,
} from "@/types/libroDiario.interface";
import { LoadingScreen } from "@/components/dashboard/LoadingScreen";
import { ErrorScreen } from "@/components/dashboard/ErrorScreen";
import { Button } from "@/components/ui/button";
import { AsientosService } from "@/services/asientos/asientos.service";
import { toast } from "react-toastify";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { EditarAsientoForm } from "@/components/dashboard/modals/editar-asiento.modal";

//sweet-alerts
const mySwal = withReactContent(Swal);

export default function LibroDiario() {
  //Valores para controlar cierre de modal
  const [open, setOpen] = useState(false);

  const [selectedAsiento, setSelectedAsiento] =
    useState<AsientosConTotale | null>(null);
  const [asientos, setAsientos] = useState<AsientosConTotale[]>([]);
  const [totalesMayores, setTotalesMayores] =
    useState<AsientosConTotalesMayores | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [eliminandoAsiento, setEliminandoAsiento] = useState<number | null>(
    null
  );
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [loadingFiltro, setLoadingFiltro] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingBusqueda, setLoadingBusqueda] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const fmtCurrency = new Intl.NumberFormat("es-SV", {
    style: "currency",
    currency: "USD",
  });
  const fmtDate = (iso: string) => {
    // Evitar problemas de zona horaria parseando solo la fecha
    if (iso.includes("T")) {
      const soloFecha = iso.split("T")[0];
      const [year, month, day] = soloFecha.split("-").map(Number);
      const fecha = new Date(year, month - 1, day); // month - 1 porque Date usa 0-indexado
      return new Intl.DateTimeFormat("es-SV").format(fecha);
    }
    return new Intl.DateTimeFormat("es-SV").format(new Date(iso));
  };

  const loadLibroDiario = async () => {
    try {
      const data = await LibroDiarioService.obtenerLibroDiario();
      setAsientos(data.asientosConTotales);
      setTotalesMayores(data.asientosConTotalesMayores);

      // Limpiar errores cuando la carga es exitosa
      setError(null);
    } catch (e: any) {
      console.error("Error al cargar libro diario:", e);
      setError(e?.message || "No se pudo cargar el libro diario");
    } finally {
      setLoading(false);
    }
  };

  const recargarDatos = async () => {
    try {
      const data = await LibroDiarioService.obtenerLibroDiario();

      setAsientos(data.asientosConTotales);
      setTotalesMayores(data.asientosConTotalesMayores);

      setError(null);
      console.log("Estados actualizados correctamente");
    } catch (e: any) {
      console.error("Error al recargar libro diario:", e);
      setError(e?.message || "No se pudo recargar el libro diario");
      throw e;
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
      const fechaInicio = format(rango.from, "yyyy-MM-dd");
      const fechaFin = format(rango.to, "yyyy-MM-dd");

      const data = await LibroDiarioService.obtenerLibroDiarioPorRangoFechas(
        fechaInicio,
        fechaFin
      );
      setAsientos(data.asientosConTotales);
      setTotalesMayores(data.asientosConTotalesMayores);

      if (data.asientosConTotales.length === 0) {
        toast.info(
          "No se encontraron asientos en el rango de fechas seleccionado"
        );
      } else {
        toast.success(
          `Se encontraron ${data.asientosConTotales.length} asientos en el rango seleccionado`
        );
      }
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
    setSearchTerm("");
    setLoading(true);
    await loadLibroDiario();
  };

  const buscarAsientos = async (descripcion: string) => {
    if (!descripcion.trim()) {
      // Si está vacío, cargar todos los asientos
      await loadLibroDiario();
      return;
    }

    setLoadingBusqueda(true);
    setError(null);

    try {
      const data = await LibroDiarioService.buscarAsientosPorDescripcion(
        descripcion
      );
      setAsientos(data.asientosConTotales);
      setTotalesMayores(data.asientosConTotalesMayores);

      if (data.asientosConTotales.length === 0) {
        toast.info("No se encontraron asientos con esa descripción");
      } else {
        toast.success(
          `Se encontraron ${data.asientosConTotales.length} asientos`
        );
      }
    } catch (error: any) {
      console.error("Error al buscar asientos:", error);
      setError(error?.message || "No se pudo realizar la búsqueda");
      toast.error(error?.message || "Error al buscar asientos");
    } finally {
      setLoadingBusqueda(false);
    }
  };

  // Implementar debounce para la búsqueda
  const debouncedSearch = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout;
      return (searchValue: string) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          buscarAsientos(searchValue);
        }, 500); // 500ms de delay
      };
    })(),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const eliminarAsiento = async (id_asiento: number) => {
    const result = await mySwal.fire({
      title: "¿Estás seguro que deseas eliminar este asiento??",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#fe2e2e",
      confirmButtonColor: "#0a0a0a",
      iconColor: "#fe2e2e",
    });

    if (!result.isConfirmed) return;
    if (eliminandoAsiento !== null) return;

    console.log("Iniciando eliminación del asiento:", id_asiento);
    setEliminandoAsiento(id_asiento);

    try {
      const data = await AsientosService.eliminarAsiento(id_asiento);
      console.log("Asiento eliminado exitosamente:", data);
      toast.success("Asiento eliminado con éxito: " + data.descripcion);

      console.log("Recargando datos del libro diario...");
      // Pequeño delay para asegurar que la eliminación se complete en el backend
      await new Promise((resolve) => setTimeout(resolve, 100));

      await recargarDatos();
      console.log("Datos recargados exitosamente");
    } catch (error: any) {
      console.error("Error al eliminar asiento:", error);
      toast.error(
        "Error al eliminar el asiento: " +
          (error?.message || "Error desconocido")
      );
      // No establecer setError aquí ya que recargarDatos ya lo maneja
    } finally {
      setEliminandoAsiento(null);
    }
  };

  useEffect(() => {
    loadLibroDiario();
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
          Libro Diario
        </CardTitle>

        {/* Contenedor responsivo para la tabla con scroll horizontal cuando sea necesario */}
        <div className="w-full max-w-[1400px] mx-auto px-4 overflow-x-auto">
          <div className="py-2">
            {/* Controles superiores */}
            <div className="flex flex-col gap-4 mb-4">
              {/* Primera fila: Botón y búsqueda */}
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                {/* Botón para añadir nuevo asiento */}
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger className="bg-primary text-white w-32 rounded-full flex justify-center p-2">
                    Nuevo Asiento
                  </DialogTrigger>
                  <DialogContent
                    className="max-w-4xl w-full h-[90vh] p-0 overflow-auto "
                    style={{ scrollbarWidth: "none", minWidth: "45%" }}
                  >
                    {/* le pasamos el metodo setOpen al fomrulario, para que se pueda cerrar desde dentro */}
                    <NuevoAsientoForm
                      setOpen={setOpen}
                      onCreated={recargarDatos}
                    />
                  </DialogContent>
                </Dialog>
                <Dialog open={openEditar} onOpenChange={setOpenEditar}>
                  <DialogContent
                    className="max-w-4xl w-full h-[90vh] p-0 overflow-auto "
                    style={{ scrollbarWidth: "none", minWidth: "45%" }}
                  >
                    {/* le pasamos el metodo setOpen al fomrulario, para que se pueda cerrar desde dentro */}
                    <EditarAsientoForm
                      asiento={selectedAsiento}
                      setOpen={setOpenEditar}
                      onCreated={recargarDatos}
                    />
                  </DialogContent>
                </Dialog>
                {/* Barra de búsqueda */}
                <div className="flex-1 max-w-md">
                  <Input
                    type="text"
                    placeholder="Buscar por descripción..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    disabled={loading || loadingBusqueda}
                    className="w-full"
                  />
                  {loadingBusqueda && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Buscando...
                    </p>
                  )}
                </div>
              </div>

              {/* Segunda fila: Filtros de fecha */}
              <div className="flex flex-col md:flex-row gap-2 items-start md:items-center justify-end">
                <DateRangePicker
                  dateRange={dateRange}
                  onDateRangeChange={setDateRange}
                />
                <div className="flex gap-2">
                  <Button
                    onClick={() => filtrarPorFechas(dateRange)}
                    disabled={
                      loadingFiltro || !dateRange?.from || !dateRange?.to
                    }
                    variant="default"
                    size="sm"
                  >
                    {loadingFiltro ? "Filtrando..." : "Filtrar"}
                  </Button>
                  <Button
                    onClick={limpiarFiltros}
                    variant="outline"
                    size="sm"
                    disabled={loading || loadingFiltro || loadingBusqueda}
                  >
                    Limpiar
                  </Button>
                </div>
              </div>
            </div>

            <Table className="min-w-full">
              <TableHeader>
                <TableRow className="bg-primary">
                  <TableHead className="w-[100px] md:w-[120px] text-white">
                    Fecha
                  </TableHead>
                  <TableHead className="w-[200px] md:w-[300px] text-white">
                    Descripción / Cuenta
                  </TableHead>
                  <TableHead className="text-right w-[100px] md:w-[150px] text-white font-bold">
                    Debe
                  </TableHead>
                  <TableHead className="text-right w-[100px] md:w-[150px] text-white font-bold">
                    Haber
                  </TableHead>
                  <TableHead className="text-right w-[100px] md:w-[150px] text-white font-bold">
                    Acciones
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {loading && (
                  <TableRow>
                    {/* <TableCell colSpan={4} className="text-center py-6">Cargando libro diario...</TableCell> */}
                    <TableCell colSpan={4} className="p-0 m-0 border-0">
                      <LoadingScreen
                        title="Cargando libro diario..."
                        text="Por favor espera."
                      />
                    </TableCell>
                  </TableRow>
                )}

                {!loading && error && (
                  <TableRow>
                    {/* <TableCell colSpan={4} className="text-center text-red-600 py-6">{error}</TableCell> */}
                    <TableCell
                      colSpan={4}
                      className="text-center text-red-600 py-6"
                    >
                      <ErrorScreen
                        title="Error al cargar libro diario"
                        error={error}
                      />
                    </TableCell>
                  </TableRow>
                )}

                {!loading && !error && asientos?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-6">
                      <ErrorScreen title="Sin asientos registrados" />
                    </TableCell>
                  </TableRow>
                )}

                {!loading &&
                  !error &&
                  asientos &&
                  asientos.length > 0 &&
                  asientos.map((asiento) => {
                    const detalles = asiento.detalle_asiento?.length
                      ? asiento.detalle_asiento
                      : ([
                          {
                            debe: 0,
                            haber: 0,
                            cuenta: {
                              id_cuenta: 0,
                              nombre_cuenta: "",
                              codigo: "",
                            },
                          },
                        ] as DetalleAsiento[]);

                    return (
                      // React fragment es una especie de div invisible que no añade nodos extra al DOM
                      <React.Fragment key={asiento.id_asiento}>
                        {/* Fila para la fecha y descripción */}
                        <TableRow className="bg-muted/30">
                          <TableCell className="font-medium">
                            {fmtDate(asiento.fecha.toString())}
                          </TableCell>
                          <TableCell colSpan={3}>
                            <span className="font-semibold">
                              {asiento.descripcion}
                            </span>
                          </TableCell>

                          <TableCell>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                gap: "0.5rem",
                              }}
                            >
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedAsiento(asiento);
                                  setOpenEditar(true);
                                }}
                              >
                                <IconPencil size={16} />
                              </Button>

                              <Button
                                variant="destructive"
                                size="sm"
                                disabled={
                                  eliminandoAsiento === asiento.id_asiento
                                }
                                onClick={() => {
                                  console.log(
                                    "Eliminar asiento",
                                    asiento.id_asiento
                                  );
                                  eliminarAsiento(asiento.id_asiento);
                                }}
                              >
                                {eliminandoAsiento === asiento.id_asiento ? (
                                  "Eliminando..."
                                ) : (
                                  <IconTrash size={16} />
                                )}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>

                        {/* Filas para los detalles del asiento */}
                        {detalles.map((det: DetalleAsiento) => (
                          <TableRow className="border-l-4 border-l-muted">
                            {/* Celda vacía para alineación */}
                            <TableCell></TableCell>

                            <TableCell>
                              <div className="flex flex-col pl-4">
                                <span className="text-muted-foreground text-sm">
                                  {det.cuenta.codigo} -{" "}
                                  {det.cuenta.nombre_cuenta}
                                </span>
                              </div>
                            </TableCell>

                            <TableCell className="text-right font-semibold">
                              {fmtCurrency.format(det.debe || 0)}
                            </TableCell>
                            <TableCell className="text-right font-semibold">
                              {fmtCurrency.format(det.haber || 0)}
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow className="bg-muted font-bold">
                          <TableCell colSpan={2} className="text-right">
                            Totales:
                          </TableCell>
                          <TableCell className="text-right border-t-3 border-primary/30">
                            {fmtCurrency.format(
                              asiento.total_debe ??
                                detalles.reduce(
                                  (s: number, d: DetalleAsiento) =>
                                    s + (d.debe || 0),
                                  0
                                )
                            )}
                          </TableCell>
                          <TableCell className="text-right border-t-3 border-primary/30">
                            {fmtCurrency.format(
                              asiento.total_haber ??
                                detalles.reduce(
                                  (s: number, d: DetalleAsiento) =>
                                    s + (d.haber || 0),
                                  0
                                )
                            )}
                          </TableCell>
                          <TableCell className="text-right border-t-3 border-primary/30 text-white"></TableCell>
                        </TableRow>
                      </React.Fragment>
                    );
                  })}
              </TableBody>

              {/* Footer con los totales mayores */}
              <TableFooter className="p-4">
                <TableRow className="bg-primary font-bold">
                  <TableCell colSpan={2} className="text-right text-white">
                    Total Libro Diario:
                  </TableCell>
                  <TableCell className="text-right border-t-3 border-primary/30 text-white">
                    {totalesMayores && totalesMayores.total_debe !== undefined
                      ? fmtCurrency.format(totalesMayores.total_debe)
                      : "$0.00"}
                  </TableCell>
                  <TableCell className="text-right border-t-3 border-primary/30 text-white">
                    {totalesMayores && totalesMayores.total_haber !== undefined
                      ? fmtCurrency.format(totalesMayores.total_haber)
                      : "$0.00"}
                  </TableCell>
                  <TableCell className="text-right border-t-3 border-primary/30 text-white"></TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
