import { NuevoAsientoForm } from "@/components/dashboard/modals/nuevo-asiento.modal";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { LibroDiarioService } from "@/services/libroDiario/libroDiario.service";
import type {
  AsientosConTotale,
  AsientosConTotalesMayores,
} from "@/types/libroDiario.interface";
import { useEffect, useState } from "react";

export default function RegistrarAsiento() {
  const [open, setOpen] = useState(false);
  const [totalesMayores, setTotalesMayores] =
    useState<AsientosConTotalesMayores | null>(null);
  const [asientos, setAsientos] = useState<AsientosConTotale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadLibroDiario = async () => {
    try {
      const data = await LibroDiarioService.obtenerLibroDiario();
      setAsientos(data.asientosConTotales);
      setTotalesMayores(data.asientosConTotalesMayores);
    } catch (e: any) {
      console.error("Error al cargar libro diario:", e);
      setError(e?.message || "No se pudo cargar el libro diario");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLibroDiario();
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="bg-primary text-white w-32 rounded-full flex justify-center my-3 p-2">
        Nuevo Asiento
      </DialogTrigger>
      <DialogContent
        className="max-w-4xl w-full h-[90vh] p-0 overflow-auto "
        style={{ scrollbarWidth: "none", minWidth: "45%" }}
      >
        <NuevoAsientoForm setOpen={setOpen} onCreated={loadLibroDiario} />
      </DialogContent>
    </Dialog>
  );
}
