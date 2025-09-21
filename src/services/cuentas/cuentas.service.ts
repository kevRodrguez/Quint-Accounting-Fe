import api from "@/lib/axios";
import axios from "axios";
import type { Cuenta, LibroDiario } from "@/types/libroDiario.interface";


export class CuentasService {
  public static async obtenerLibroDiario(): Promise<LibroDiario[]> {
    try {
      const { data } = await api.get<LibroDiario[]>("libro-diario/asientos/");
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          (error.status ? String(error.status) + " " : "") +
          (error.response?.data?.message || error.message);
        throw new Error(`Error al obtener libro diario: ${message}`);
      }
      throw new Error("Error desconocido al obtener libro diario");
    }
  }

  public static async obtenerCuentas(): Promise<Cuenta[]> {
    try {
      const { data } = await api.get<Cuenta[]>("catalogo-cuentas/select");
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          (error.status ? String(error.status) + " " : "") +
          (error.response?.data?.message || error.message);
        throw new Error(`Error al obtener cuentas: ${message}`);
      }
      throw new Error("Error desconocido al obtener cuentas");
    }

  }
}
