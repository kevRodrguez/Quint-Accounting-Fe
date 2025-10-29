import api from "@/lib/axios";
import type { AxiosResponse } from "axios";
import axios from "axios";

export interface DetalleAsientoRequest {
  id_cuenta: number;
  id_asiento: number;
  debe: number;
  haber: number;
}

export interface DetalleAsientoResponse {
  id: number;
  id_cuenta: number;
  id_asiento: number;
  debe: number;
  haber: number;
}

export class DetalleAsientosService {
  public static async crearDetalleAsiento(
    detalleAsiento: DetalleAsientoRequest
  ): Promise<DetalleAsientoResponse> {
    try {
      const response: AxiosResponse<DetalleAsientoResponse> = await api.post(
        "detalle-asientos/",
        detalleAsiento
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.status + " " + error.response?.data?.message || error.message;
        throw new Error(`Error al crear el detalle del asiento: ${message}`);
      }

      throw new Error("Error desconocido al crear el detalle del asiento");
    }
  }
}

export default DetalleAsientosService;
