import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { mayorizacionServices } from "@/services/cuentas/mayorizacion.service";

import type { DetalleAsientoBackend } from "@/types/mayorizacion.interface";

export function DetalleMayorizacion({
  codigo,
  fechaInicio,
  fechaFinal,
  setOpen,
}: {
  codigo: string | null;
  fechaInicio: Date | undefined;
  fechaFinal: Date | undefined;
  setOpen?: (open: boolean) => void;
}) {
  const [detalles, setDetalles] = useState<DetalleAsientoBackend[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Convertimos la estructura al formato que espera el modal
  const movimientos = detalles.map((det) => ({
    Fecha: det.asiento?.fecha || null,
    Descripcion: det.asiento?.descripcion || "",
    Debe: det.debe || 0,
    Haber: det.haber || 0,
  }));

  useEffect(() => {
    const fetchData = async () => {
      if (!codigo) {
        setDetalles([]);
        return;
      }
      try {
        setIsLoading(true);
        const data = await mayorizacionServices.obtenerDetalleMayorizacion(
          codigo,
          fechaInicio!,
          fechaFinal!
        );
        setDetalles(Array.isArray(data) ? data : [data]);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [codigo, fechaInicio, fechaFinal]);

  return (
    <div className="w-full h-full flex flex-col gap-6">
      <Card
        style={{ color: "#000000ff", backgroundColor: "white" }}
        className="w-full h-full m-0 border-0"
      >
        <CardHeader>
          <CardTitle className="text-2xl">Detalle de Mayorización</CardTitle>
          <CardDescription>
            Movimientos de la cuenta seleccionada
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && <p>Cargando...</p>}
          {error && <p className="text-red-600">{error}</p>}
          {!isLoading && !error && detalles.length > 0 && (
            <>
              <h1 className="text-lg font-bold mb-2">
                {detalles[0]?.cuenta?.codigo} -{" "}
                {detalles[0]?.cuenta?.nombre_cuenta}
              </h1>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead
                      style={{
                        color: "white",
                        backgroundColor: "rgb(254 46 46)",
                      }}
                    >
                      Fecha
                    </TableHead>
                    <TableHead
                      style={{
                        color: "white",
                        backgroundColor: "rgb(254 46 46)",
                      }}
                    >
                      Descripción
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
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {movimientos.map((m, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        {m.Fecha ? new Date(m.Fecha).toLocaleDateString() : ""}
                      </TableCell>
                      <TableCell>{m.Descripcion}</TableCell>
                      <TableCell>{m.Debe.toFixed(2)}</TableCell>
                      <TableCell>{m.Haber.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}

          <div className="mt-6">
            <Button
              onClick={() => setOpen && setOpen(false)}
              style={{
                fontWeight: "600",
                backgroundColor: "black",
                color: "white",
              }}
            >
              Cerrar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
