import type { AsientoRequest } from "@/types/asientoRequest.interface";
import type { AsientoResponse } from "@/types/asientoResponse.interface";
import api from "@/lib/axios";
import type { Movimiento } from "@/types/movimiento.interface";

export class AsientosService {
  public static async crearAsiento(
    asiento: AsientoRequest
  ): Promise<AsientoResponse> {
    try {
      const response = await api.post<AsientoResponse>(
        "libro-diario/asientos/",
        asiento
      );
      console.log("respuesta del api directa", response.data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        // Error de respuesta HTTP
        const message =
          (error.response?.status || 'Error') + " " + (error.response?.data?.message || error.message || 'Error desconocido');
        throw new Error(`Error al crear asiento: ${message}`);
      }
      throw new Error("Error desconocido al crear asiento");
    }
  }

  public static async eliminarAsiento(
    id_asiento: number
  ): Promise<AsientoResponse> {
    try {
      const response = await api.delete<AsientoResponse>(
        `libro-diario/asientos/${id_asiento}`
      );
      console.log("asiento eliminado " + response.data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        // Error de respuesta HTTP
        const message =
          (error.response?.status || 'Error') + " " + (error.response?.data?.message || error.message || 'Error desconocido');
        throw new Error(`Error al eliminar asiento: ${message}`);
      }
      throw new Error("Error desconocido al eliminar asiento");
    }
  }

  public static async actualizarAsiento(
    id: number,
    descripcion: string,
    fecha: Date,
    movimientos: Movimiento[]
  ): Promise<AsientoResponse> {
    try {
      const response = await api.put<AsientoResponse>(
        `libro-diario/asientos/${id}`,
        {
          descripcion,
          fecha,
          movimientos,
        }
      );

      console.log("Respuesta API:", response.data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        const message =
          (error.response?.status || 'Error') + " " + (error.response?.data?.message || error.message || 'Error desconocido');
        throw new Error(`Error al actualizar asiento: ${message}`);
      }
      throw new Error("Error desconocido al actualizar asiento");
    }
  }


}
