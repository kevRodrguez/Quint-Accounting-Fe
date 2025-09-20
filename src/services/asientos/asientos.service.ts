import type { AsientoRequest } from "@/types/asientoRequest.interface";
import type { AsientoResponse } from "@/types/asientoResponse.interface";
import api from "@/lib/axios";
import type { AxiosResponse } from "axios";
import axios from "axios";


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
}
