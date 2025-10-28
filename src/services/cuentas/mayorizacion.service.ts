import type {
  DetalleAsientoBackend,
  MayorizacionItem,
} from "@/types/mayorizacion.interface";
import api from "@/lib/axios";

export class mayorizacionServices {
  public static async obtenerMayorizacion(
    fechaInicio: Date,
    fechaFinal: Date
  ): Promise<MayorizacionItem[]> {
    try {
      const { data } = await api.get<MayorizacionItem[]>(
        "libro-diario/mayorizacion/",
        {
          params: {
            fechaInicio: fechaInicio.toISOString().split("T")[0],
            fechaFinal: fechaFinal.toISOString().split("T")[0],
          },
        }
      );
      return data;
    } catch (error: any) {
      if (error.response) {
        const message =
          (error.response?.status || 'Error') + " " + (error.response?.data?.message || error.message || 'Error desconocido');
        throw new Error(
          `Error al obtener la mayorización de cuentas: ${message}`
        );
      }
      throw new Error("Error al obtener la mayorización de cuentas");
    }
  }

  public static async obtenerDetalleMayorizacion(
    codigo: string,
    fechaInicio: Date,
    fechaFinal: Date
  ): Promise<DetalleAsientoBackend> {
    try {
      const { data } = await api.get<DetalleAsientoBackend>(
        "libro-diario/mayorizacion/detalles/",
        {
          params: {
            codigo,
            fechaInicio: fechaInicio.toISOString().split("T")[0],
            fechaFinal: fechaFinal.toISOString().split("T")[0],
          },
        }
      );
      return data;
    } catch (error: any) {
      if (error.response) {
        const message =
          (error.response?.status || 'Error') + " " + (error.response?.data?.message || error.message || 'Error desconocido');
        throw new Error(
          `Error al obtener la mayorización de esta cuenta: ${message}`
        );
      }
      throw new Error("Error al obtener la mayorización de esta cuenta");
    }
  }
}
