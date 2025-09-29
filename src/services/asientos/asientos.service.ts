import type { AsientoRequest } from "@/types/asientoRequest.interface";
import type { AsientoResponse } from "@/types/asientoResponse.interface";
import api from "@/lib/axios";
import type { AxiosResponse } from "axios";
import axios from "axios";
import { toast } from "react-toastify";
import type {
  AsientoEdit,
  AsientosConTotale,
  DetalleAsiento,
} from "@/types/libroDiario.interface";
import type { Movimiento } from "@/types/movimiento.interface";

export class AsientosService {
  public static async crearAsiento(
    asiento: AsientoRequest
  ): Promise<AsientoResponse> {
    try {
      const response: AxiosResponse<AsientoResponse> = await api.post(
        "libro-diario/asientos/",
        asiento
      );
      console.log("respuesta del api directa", response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.status + " " + error.response?.data?.message || error.message;
        throw new Error(`Error al crear asiento: ${message}`);
      }
      throw new Error("Error desconocido al crear asiento");
    }
  }

  public static async eliminarAsiento(
    id_asiento: number
  ): Promise<AsientoResponse> {
    try {
      const response: AxiosResponse<AsientoResponse> = await api.delete(
        `libro-diario/asientos/${id_asiento}`
      );
      console.log("asiento eliminado " + response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.status + " " + error.response?.data?.message || error.message;
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
      const response: AxiosResponse<AsientoResponse> = await api.put(
        `libro-diario/asientos/${id}`,
        {
          descripcion,
          fecha,
          movimientos,
        }
      );

      console.log("Respuesta API:", response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.status +
          " " +
          (error.response?.data?.message || error.message);
        throw new Error(`Error al actualizar asiento: ${message}`);
      }
      throw new Error("Error desconocido al actualizar asiento");
    }
  }

  
}
