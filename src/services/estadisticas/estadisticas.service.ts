import api from "@/lib/axios";
import axios from "axios";

export class EstadisticasService {
  public static async totalAsientosUltimosTresMeses(): Promise<any> {
    try {
      const response = await api.get("estadisticas/tres-meses");

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.status + " " + error.response?.data?.message || error.message;
        throw new Error(
          `Error al obtener asientos de los ultimos 3 meses: ${message}`
        );
      }
      throw new Error(
        "Error desconocido al consultar estadisticas de asientos"
      );
    }
  }

  public static async totalActivos(): Promise<any> {
    const response = await api.get("estadisticas/total-activos-mes");

    return response.data;
  }

  public static async totalPasivos(): Promise<any> {
    const response = await api.get("estadisticas/total-pasivos-mes");
    return response.data;
  }

  public static async totalCapitalContable(): Promise<any> {
    const response = await api.get("estadisticas/total-capital-contable-mes");

    return response.data;
  }

  public static async totalIngresos(): Promise<any> {
    const response = await api.get("estadisticas/total-ingresos-mes");

    return response.data;
  }
}
