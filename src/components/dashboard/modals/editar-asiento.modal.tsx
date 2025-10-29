import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, MoreVertical, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Combobox } from "@/components/ui/combobox";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import CurrencyInput from "react-currency-input-field";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { AsientosService } from "@/services/asientos/asientos.service";
import type { Movimiento } from "@/types/movimiento.interface";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CuentasService } from "@/services/cuentas/cuentas.service";
import type { AsientosConTotale, Cuenta } from "@/types/libroDiario.interface";
import { toast } from "react-toastify";

export function EditarAsientoForm({
  asiento,
  className,
  setOpen,
  onCreated,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  asiento: AsientosConTotale | null;
  setOpen?: (open: boolean) => void;
  onCreated?: () => void;
  onUpdated?: () => void;
}) {
  // Función para parsear fecha evitando problemas de zona horaria
  const parsearFecha = (fechaString: any): Date | undefined => {
    if (!fechaString) return undefined;
    if (fechaString instanceof Date) return fechaString;

    // Si viene como string ISO, parsearlo correctamente
    const fechaStr = fechaString.toString();
    if (fechaStr.includes("T")) {
      // Crear fecha usando solo la parte de fecha (YYYY-MM-DD)
      const soloFecha = fechaStr.split("T")[0];
      const [year, month, day] = soloFecha.split("-").map(Number);
      return new Date(year, month - 1, day); // month - 1 porque Date usa 0-indexado
    }

    return new Date(fechaString);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [descripcion, setDescripcion] = useState(asiento?.descripcion || "");
  const [fecha, setFecha] = useState<Date | undefined>(
    parsearFecha(asiento?.fecha)
  );

  // const [movimientos, setMovimientos] = useState<Movimiento[]>(
  //   asiento?.detalle_asiento?.map((d, index) => ({
  //     id: index + 1,
  //     cuentaId: d.cuenta.id_cuenta,
  //     debe: d.debe,
  //     haber: d.haber,
  //     descripcion: d.cuenta.nombre_cuenta,
  //   })) || []
  // );

  const [movimientos, setMovimientos] = useState<Movimiento[]>(
    asiento?.detalle_asiento?.map((d, index) => ({
      id: index + 1,
      cuentaId: d.cuenta.id_cuenta,
      debe: d.debe,
      haber: d.haber,
      descripcion: d.cuenta.nombre_cuenta,
    })) || []
  );

  const [idCounter, setIdCounter] = useState(
    asiento?.detalle_asiento ? asiento.detalle_asiento.length + 1 : 1
  );

  const [nuevoMovimiento, setNuevoMovimiento] = useState<
    Omit<Movimiento, "id">
  >({ cuentaId: "", debe: 0, haber: 0, descripcion: "" });

  const [totalDebe, setTotalDebe] = useState(0);
  const [totalHaber, setTotalHaber] = useState(0);

  //para manejar estados de inputs de debe y haber
  const [DebeIsDisabled, setDebeIsDisabled] = useState(false);
  const [HaberIsDisabled, setHaberIsDisabled] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  //mensaje de error para dialog
  const [errorMessage, setErrorMessage] = useState("");

  const [cuentasSelect, setCuentasSelect] = useState<Cuenta[]>([]);

  const actualizarMovimiento = (
    id: number,
    cuentaId: number | string,
    debe: number | string,
    haber: number | string
  ) => {
    debe = Number(debe);
    haber = Number(haber);

    //mapea los movimientos, si el id coincide, retorna el objeto modificado
    const nuevosMovimientos = movimientos.map((m) => {
      if (m.id === id) {
        return { ...m, cuentaId, debe, haber };
      }

      return m;
    });
    setMovimientos(nuevosMovimientos);
  };

  const eliminarMovimiento = (id: number) => {
    const movimientosRestantes = movimientos.filter((m) => m.id !== id);
    setMovimientos(movimientosRestantes);
  };

  const validarMovimientos = () => {
    for (let movimiento of movimientos) {
      if (movimiento.debe == 0 && movimiento.haber == 0) {
        return false;
      }
    }
    return true;
  };

  const editarAsiento = async () => {
    if (!asiento) return;
    setIsLoading(true);

    if (!validarMovimientos()) {
      setErrorMessage(
        "Todos los movimientos deben tener un monto mayor a $0 en el debe o haber"
      );
      setIsAlertVisible(true);
      setIsLoading(false);
      return;
    }

    try {
      // Agregar T00:00:00 a la fecha para evitar problemas de zona horaria
      const fechaFormat = fecha
        ? new Date(fecha.toISOString().split("T")[0] + "T00:00:00")
        : asiento.fecha;

      await AsientosService.actualizarAsiento(
        asiento.id_asiento,
        descripcion,
        fechaFormat,
        movimientos
      );

      if (onCreated) onCreated();
      if (setOpen) setOpen(false);
      toast.success("Asiento actualizado con éxito");
    } catch (error) {
      toast.error("Error al actualizar el asiento", { autoClose: false });
    } finally {
      setIsLoading(false);
    }
  };

  const obtenerCuentas = async () => {
    try {
      const cuentas = await CuentasService.obtenerCuentas();
      setCuentasSelect(cuentas);
    } catch (error) {
      let errorMsg = "";

      if (typeof error === "object" && error !== null && "message" in error) {
        errorMsg += ": " + String((error as { message?: string }).message);
      }

      setErrorMessage(errorMsg);
      setIsAlertVisible(true);
      setIsLoading(false);
    }
  };

  const actualizarTotales = () => {
    let debe = 0,
      haber = 0;
    movimientos.map((m) => {
      debe += Number(m.debe);
      haber += Number(m.haber);
    });

    setTotalDebe(debe);
    setTotalHaber(haber);
  };

  useEffect(() => {
    actualizarTotales();

    if (Number(nuevoMovimiento.debe) > 0) {
      setHaberIsDisabled(true);
    } else {
      setHaberIsDisabled(false);
    }

    if (Number(nuevoMovimiento.haber) > 0) {
      setDebeIsDisabled(true);
    } else {
      setDebeIsDisabled(false);
    }
  }, [movimientos, nuevoMovimiento]);

  //el array vacio hace que se ejecute solo una vez al montar el componente
  useEffect(() => {
    obtenerCuentas();
  }, []);

  return (
    <>
      {isAlertVisible && (
        <AlertDialog open={isAlertVisible} onOpenChange={setIsAlertVisible}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Alerta</AlertDialogTitle>
              <AlertDialogDescription>{errorMessage}.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction>Continuar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* //Modal para nuevo asiento */}
      <div
        className={cn("w-full h-full flex flex-col gap-6", className)}
        {...props}
      >
        <Card
          style={{ color: "#000000ff", backgroundColor: "white" }}
          className="w-full h-full m-0 border-0"
        >
          <CardHeader>
            <CardTitle className="text-2xl">Editar Asiento</CardTitle>
            <CardDescription>
              Ingresa los detalles del nuevo asiento a continuación
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={() => console.log("Enviando")}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="descripcion">Descripcion</Label>
                  <Input
                    id="descripcion"
                    type="text"
                    placeholder="Descripción del asiento"
                    required
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="fecha">Fecha</Label>

                  {/* calendario */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        data-empty={!fecha}
                        style={{
                          backgroundColor: "white",
                          color: "black",
                          width: "100%",
                        }}
                        className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
                      >
                        <CalendarIcon />
                        {fecha ? (
                          format(fecha, "PPP")
                        ) : (
                          <span>Selecciona una fecha</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={fecha}
                        onSelect={setFecha}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid gap-2">
                  {/* form nuevo movimiento */}
                  <div
                    className="grid grid-cols-5 gap-1 p-3"
                    style={{ border: "1px dashed gray", borderRadius: "8px" }}
                  >
                    <div className="col-span-5 mb-5 font-bold">
                      Nuevo Movimiento:
                    </div>
                    <span
                      className="col-span-5"
                      style={{
                        border: "0.5px solid  gray",
                        marginBottom: "8px",
                        opacity: "0.3",
                      }}
                    ></span>
                    <div className="col-span-2">
                      <Combobox
                        style={{ width: "100%", fontSize: "small" }}
                        title="cuenta"
                        items={cuentasSelect as any[]}
                        onSelect={(value) =>
                          setNuevoMovimiento({
                            ...nuevoMovimiento,
                            cuentaId: value,
                          })
                        }
                      />
                    </div>
                    <div className="col-span-1">
                      <CurrencyInput
                        disabled={DebeIsDisabled}
                        id="debe-input"
                        name="debe"
                        placeholder="$0.00"
                        defaultValue={0}
                        decimalsLimit={2}
                        prefix="$"
                        intlConfig={{ locale: "en-US", currency: "USD" }}
                        allowDecimals
                        decimalSeparator="."
                        value={nuevoMovimiento.debe}
                        onValueChange={(value) =>
                          setNuevoMovimiento({
                            ...nuevoMovimiento,
                            debe: Number(value) || 0, // <-- fuerza a número
                          })
                        }
                        style={{ border: "none", width: "100%" }}
                        className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                      />
                    </div>
                    <div
                      className="col-span-1 flex"
                      style={{ alignItems: "center" }}
                    >
                      <CurrencyInput
                        disabled={HaberIsDisabled}
                        id="haber-input"
                        name="haber"
                        placeholder="$0.00"
                        defaultValue={0}
                        decimalsLimit={2}
                        prefix="$"
                        intlConfig={{ locale: "en-US", currency: "USD" }}
                        allowDecimals
                        decimalSeparator="."
                        value={nuevoMovimiento.haber}
                        onValueChange={(value) =>
                          setNuevoMovimiento({
                            ...nuevoMovimiento,
                            haber: Number(value) || 0,
                          })
                        }
                        style={{ border: "none" }}
                        className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                      />
                    </div>
                    <div
                      className="col-span-1"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <Button
                        type="button"
                        onClick={() => {
                          if (
                            nuevoMovimiento.debe == 0 &&
                            nuevoMovimiento.haber == 0
                          ) {
                            setErrorMessage(
                              "El monto del debe o haber debe ser mayor a 0"
                            );
                            setIsAlertVisible(true);
                          } else {
                            setMovimientos([
                              ...movimientos,
                              {
                                id: idCounter,
                                cuentaId: nuevoMovimiento.cuentaId,
                                debe: nuevoMovimiento.debe,
                                haber: nuevoMovimiento.haber,
                              },
                            ]);
                            setIdCounter(idCounter + 1); // Incrementar el contador de IDs
                            setNuevoMovimiento({
                              cuentaId: "",
                              debe: 0,
                              haber: 0,
                              descripcion: "",
                            });
                            //!! si se llama acá, la actutualizacion sufre delay, se reocmienda su uso en un useeffect
                            // actualizarTotales();
                          }
                        }}
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  {/* tabla movimientos */}
                  <h1 style={{ fontSize: "large", fontWeight: "bold" }}>
                    Movimientos del asiento:
                  </h1>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead
                          style={{
                            color: "white",
                            backgroundColor: "rgb(254 46 46)",
                          }}
                          className="w-[100px]"
                        >
                          cuenta
                        </TableHead>
                        <TableHead
                          style={{
                            color: "white",
                            backgroundColor: "rgb(254 46 46)",
                          }}
                        >
                          Debe
                        </TableHead>
                        <TableHead
                          style={{
                            color: "white",
                            backgroundColor: "rgb(254 46 46)",
                          }}
                        >
                          Haber
                        </TableHead>
                        {/* <TableHead style={{ color: 'white', backgroundColor: 'rgb(254 46 46)' }}>Acciones</TableHead> */}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {movimientos.map((movimiento) => (
                        <TableRow
                          key={movimiento.id}
                          style={{ borderBottom: "1px solid gray" }}
                        >
                          <TableCell>
                            <Combobox
                              style={{ width: "100%" }}
                              title="cuenta"
                              items={cuentasSelect as any[]}
                              selected={movimiento.cuentaId}
                              onSelect={(value) => {
                                actualizarMovimiento(
                                  movimiento.id,
                                  value,
                                  Number(movimiento.debe),
                                  Number(movimiento.haber)
                                );
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              style={{ border: "none" }}
                              value={movimiento.debe}
                              onChange={(e) => {
                                actualizarMovimiento(
                                  movimiento.id,
                                  movimiento.cuentaId,
                                  Number(e.target.value), // <-- fuerza a número
                                  Number(movimiento.haber)
                                );
                              }}
                              placeholder="debe"
                              className="w-full"
                              // disabled={!(movimiento.haber === 0)}
                            />
                          </TableCell>

                          <TableCell style={{ display: "flex" }}>
                            <Input
                              type="number"
                              style={{ border: "none" }}
                              value={movimiento.haber}
                              onChange={(e) => {
                                actualizarMovimiento(
                                  movimiento.id,
                                  movimiento.cuentaId,
                                  Number(movimiento.debe),
                                  Number(e.target.value) // <-- fuerza a número
                                );
                              }}
                              placeholder="Seleccionar cuenta"
                              className="w-full"
                              //si el monto del debe es diferente a 0, el haber no se puede editar
                              // disabled={!(movimiento.debe === 0)}
                            />
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="w-8 h-8 p-0"
                                >
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem
                                  onClick={() =>
                                    eliminarMovimiento(movimiento.id)
                                  }
                                  className="text-red-600"
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Eliminar
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow
                        style={
                          totalDebe !== totalHaber
                            ? {
                                backgroundColor: "#DEDEDE",
                                color: "red",
                                border: "3px solid red",
                              }
                            : { backgroundColor: "#DEDEDE" }
                        }
                      >
                        <TableCell>
                          <Label>Total:</Label>
                        </TableCell>
                        <TableCell>
                          <Label>{totalDebe}</Label>
                        </TableCell>
                        <TableCell>
                          <Label>{totalHaber}</Label>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading || totalDebe !== totalHaber}
                  style={{
                    fontWeight: "600",
                    backgroundColor: "black",
                  }}
                  onClick={editarAsiento}
                >
                  {isLoading
                    ? "Editando asiento..."
                    : totalDebe !== totalHaber
                    ? "Advertencia:El total y el debe no coindicen!!!"
                    : "Editar Asiento Contable"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
