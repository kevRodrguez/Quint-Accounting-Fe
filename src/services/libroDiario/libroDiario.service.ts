import api from "@/lib/axios";
import type { LibroDiario } from "@/types/libroDiario.interface";

export class LibroDiarioService {
  public static async obtenerLibroDiario(): Promise<LibroDiario> {
    try {
      const { data } = await api.get<LibroDiario>("libro-diario/asientos/");
      return data;
    } catch (error: any) {
      if (error.response) {
        const message =
          (error.response?.status || 'Error') + " " + (error.response?.data?.message || error.message || 'Error desconocido');
        throw new Error(`Error al obtener libro diario: ${message}`);
      }
      throw new Error("Error desconocido al obtener libro diario");
    }
  }

  public static async obtenerLibroDiarioPorRangoFechas(fechaInicio: string, fechaFin: string): Promise<LibroDiario> {
    try {
      const { data } = await api.get<LibroDiario>("libro-diario/asientos/rango-fechas", {
        params: {
          fechaInicio,
          fechaFin
        }
      });
      return data;
    } catch (error: any) {
      if (error.response) {
        const message =
          (error.response?.status || 'Error') + " " + (error.response?.data?.message || error.message || 'Error desconocido');
        throw new Error(`Error al obtener libro diario por rango de fechas: ${message}`);
      }
      throw new Error("Error desconocido al obtener libro diario por rango de fechas");
    }
  }

  public static async buscarAsientosPorDescripcion(descripcion: string): Promise<LibroDiario> {
    try {
      const { data } = await api.get<LibroDiario>("libro-diario/asientos/search", {
        params: { descripcion }
      });
      return data;
    } catch (error: any) {
      if (error.response) {
        const message =
          (error.response?.status || 'Error') + " " + (error.response?.data?.message || error.message || 'Error desconocido');
        throw new Error(`Error al buscar asientos por descripción: ${message}`);
      }
      throw new Error("Error desconocido al buscar asientos por descripción");
    }
  }
}
