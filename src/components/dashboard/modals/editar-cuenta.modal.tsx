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

import {
  AsientosService
} from "@/services/asientos/asientos.service";
import type { Movimiento } from "@/types/movimiento.interface";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { CuentasService } from "@/services/cuentas/cuentas.service";
import type { Cuenta } from "@/types/libroDiario.interface";
import { toast } from "react-toastify";


export function EditarCuentaForm({
  className,
  setOpen,
  onCreated,
  cuentaSeleccionada,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  setOpen?: (open: boolean) => void //se define el metodo setOpen en las props del modal
  onCreated?: () => void //callback para recargar datos en el padre
  cuentaSeleccionada?: Cuenta // agrega la propiedad cuentaSeleccionada a las props
}) {


  const [isLoading, setIsLoading] = useState(false);
  const [id_cuenta, setIdCuenta] = useState(cuentaSeleccionada?.id_cuenta || 0);
  const [codigo, setCodigo] = useState(cuentaSeleccionada?.codigo || "");
  const [nombre, setNombre] = useState(cuentaSeleccionada?.nombre_cuenta || "");

  async function actualizarCuenta() {
    setIsLoading(true);
    console.log("Actualizando cuenta:", { id_cuenta, codigo, nombre });
    try {
      const response = await CuentasService.actualizarCuenta(id_cuenta, codigo, nombre);

      console.log("Cuenta actualizada:", response);
      if (onCreated) onCreated(); //llama al callback para recargar datos en el padre

      if (setOpen) setOpen(false); //cierra el modal
      toast.success("Cuenta actualizada con éxito");
    } catch (error) {
      console.error("Error al actualizar la cuenta:", error);
      toast.error("Error al actualizar la cuenta", { autoClose: false });
    }
    setIsLoading(false);
  }
  return (
    <>



      {/* //Modal para editar cuenta */}
      < div
        className={cn("w-full h-full flex flex-col gap-6", className)}
        {...props}
      >
        <Card
          style={{ color: "#000000ff", backgroundColor: "white" }}
          className="w-full h-full m-0 border-0"
        >
          <CardHeader>
            <CardTitle className="text-2xl">Editar cuenta</CardTitle>
            <CardDescription>
              Ingresa los nuevos detalles de la cuenta contable
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={() => console.log("enviando")}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="codigo">código</Label>
                  <Input
                    id="codigo"
                    type="text"
                    placeholder="código de la cuenta contable"
                    required
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                    disabled={true}  // El campo código está deshabilitado para edición
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="nombre">Nombre</Label>
                  <Input
                    id="nombre"
                    type="text"
                    placeholder="nuevo nombre de la cuenta contable"
                    required
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                  onClick={() => actualizarCuenta()}
                  style={
                    {
                      fontWeight: "600",
                      backgroundColor: "black"
                    }

                  }

                >
                  {isLoading ?
                    "Actualizando cuenta..." :
                    "Actualizar cuenta"}

                </Button>

              </div>
            </form>
          </CardContent>
        </Card>
      </div >
    </>
  );
}