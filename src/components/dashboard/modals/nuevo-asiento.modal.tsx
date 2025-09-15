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
import { format, set } from "date-fns";
import { Combobox } from "@/components/ui/combobox";
import { use, useEffect, useState } from "react";
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

import {
  AsientosService,
  type Movimiento,
} from "@/services/api/asientos.service";

export function NuevoAsientoForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [isLoading, setIsLoading] = useState(false);
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState<Date | undefined>(new Date());

  const cuentaItems = [
    { value: 1, label: "001-Caja" },
    { value: 2, label: "002-Banco" },
    { value: 3, label: "003-Ventas" },
    { value: 4, label: "004-Compras" },
    { value: 5, label: "005-Capital" },
    { value: 6, label: "006-Proveedores" },
    { value: 7, label: "007-Clientes" },
    { value: 8, label: "008-Gastos" },
    { value: 9, label: "009-Ingresos" },
  ];

  const [idCounter, setIdCounter] = useState(3); // Estado para llevar el conteo de IDs

  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);

  const [nuevoMovimiento, setNuevoMovimiento] = useState<
    Omit<Movimiento, "id">
  >({ cuentaId: "", debe: 0, haber: 0, descripcion: "" });

  const [totalDebe, setTotalDebe] = useState(0);
  const [totalHaber, setTotalHaber] = useState(0);

  //para manejar estados de inputs de debe y haber
  const [DebeIsDisabled, setDebeIsDisabled] = useState(false);
  const [HaberIsDisabled, setHaberIsDisabled] = useState(false);
  const actualizarMovimiento = (
    id: number,
    cuenta: string,
    debe: number,
    haber: number
  ) => {
    const nuevosMovimientos = movimientos.map((m) => {
      if (m.id === id) {
        return { ...m, cuenta, debe, haber }; // Retorna un nuevo objeto con las modificaciones
      }

      return m;
    });
    setMovimientos(nuevosMovimientos);
  };

  const eliminarMovimiento = (id: number) => {
    //trae los movimientos que que no coinciden con el id seleccionado
    const movimientosRestantes = movimientos.filter((m) => m.id !== id);
    setMovimientos(movimientosRestantes);
  };

  const crearAsiento = async () => {
    setIsLoading(true);

    try {
      const payload = {
        descripcion,
        fecha,
        movimientos: movimientos.map((m) => ({
          cuentaId: Number(m.cuentaId),
          debe: m.debe,
          haber: m.haber,
        })),
      };

      const asientoCreado = await AsientosService.crearAsiento(payload);

      console.log("Asiento creado con detalles:", asientoCreado);

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const actualizarTotales = () => {
    let debe = 0,
      haber = 0;
    movimientos.map((m) => {
      debe += m.debe;
      haber += m.haber;
    });

    setTotalDebe(debe);
    setTotalHaber(haber);
  };

  useEffect(() => {
    console.log("Movimientos actualizados:", movimientos);
    actualizarTotales();

    if (nuevoMovimiento.debe > 0) {
      setHaberIsDisabled(true);
    } else {
      setHaberIsDisabled(false);
    }

    if (nuevoMovimiento.haber > 0) {
      setDebeIsDisabled(true);
    } else {
      setDebeIsDisabled(false);
    }
  });

  return (
    //Modal para nuevo asiento
    <div
      className={cn("w-full h-full flex flex-col gap-6", className)}
      {...props}
    >
      <Card
        style={{ color: "#000000ff", backgroundColor: "white" }}
        className="w-full h-full m-0 border-0"
      >
        <CardHeader>
          <CardTitle className="text-2xl">Nuevo Asiento</CardTitle>
          <CardDescription>
            Ingresa los detalles del nuevo asiento a continuación
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={() => console.log("enviando")}>
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
                  className="grid grid-cols-7 gap-1 p-3"
                  style={{ border: "1px dashed gray", borderRadius: "8px" }}
                >
                  <div className="col-span-7 mb-5 font-bold">
                    Nuevo Movimiento:
                  </div>
                  <span
                    className="col-span-7"
                    style={{
                      border: "0.5px solid  gray",
                      marginBottom: "8px",
                      opacity: "0.3",
                    }}
                  ></span>
                  <div className="col-span-2">
                    <Combobox
                      style={{ width: "100%" }}
                      title="cuenta"
                      items={cuentaItems}
                      onSelect={(value) =>
                        setNuevoMovimiento({
                          ...nuevoMovimiento,
                          cuentaId: value,
                        })
                      }
                    />
                  </div>
                  <div className="col-span-2">
                    <CurrencyInput
                      disabled={DebeIsDisabled}
                      id="debe-input"
                      name="debe"
                      placeholder="$0.00"
                      defaultValue={0}
                      decimalsLimit={2}
                      prefix="$"
                      value={nuevoMovimiento.debe}
                      onValueChange={(value) =>
                        setNuevoMovimiento({
                          ...nuevoMovimiento,
                          debe: Number(value) || 0,
                        })
                      }
                      style={{ border: "none" }}
                      className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                    />
                  </div>
                  <div
                    className="col-span-2 flex"
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
                        console.log(nuevoMovimiento);

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
                            items={cuentaItems}
                            selected={movimiento.cuentaId}
                            onSelect={(value) => {
                              actualizarMovimiento(
                                movimiento.id,
                                value,
                                movimiento.debe,
                                movimiento.haber
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
                                Number(e.target.value),
                                movimiento.haber
                              );
                            }}
                            placeholder="debe"
                            className="w-full"
                            disabled={!(movimiento.haber === 0)}
                          />
                        </TableCell>

                        <TableCell style={{ display: "flex" }}>
                          <Input
                            type="number"
                            style={{ border: "none" }}
                            value={movimiento.haber}
                            onChange={(e) =>
                              actualizarMovimiento(
                                movimiento.id,
                                movimiento.cuentaId,
                                movimiento.debe,
                                Number(e.target.value)
                              )
                            }
                            placeholder="Seleccionar cuenta"
                            className="w-full"
                            //si el monto del debe es diferente a 0, el haber no se puede editar
                            disabled={!(movimiento.debe === 0)}
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
                    <TableRow style={{ backgroundColor: "#DEDEDE" }}>
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
                disabled={isLoading}
                style={{
                  backgroundColor: "black",
                  color: "white",
                  fontWeight: "600",
                }}
                onClick={crearAsiento}
              >
                {isLoading ? "Creando asiento..." : "Crear Asiento Contable"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
