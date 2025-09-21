import type { Cuenta } from "@/types/libroDiario.interface";
import axios from "axios";
import api from "@/lib/axios";

export class CuentasServices {
  public static async obtenerCuentas(): Promise<Cuenta[]> {
    try {
      const { data } = await api.get<Cuenta[]>("catalogo-cuentas/get");
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          (error.status ? String(error.status) + " " : "") +
          (error.response?.data?.message || error.message);
        throw new Error(`Error al obtener el catálogo de cuentas: ${message}`);
      }
      throw new Error("Error al obtener el catálogo de cuentas");
    }
  }
}
