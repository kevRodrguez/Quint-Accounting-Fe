import api from "@/lib/axios";
import type { AxiosResponse } from "axios";

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
      throw error;
    }
  }
}

export default DetalleAsientosService;
