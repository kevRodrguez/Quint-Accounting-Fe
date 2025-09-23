import api from "@/lib/axios";
import axios from "axios";
import type { Cuenta, LibroDiario } from "@/types/libroDiario.interface";
import type { actualizarCuentaResponse } from "@/types/actualizarCuentaResponde.interface";


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

  public static async actualizarCuenta(id_cuenta: number, codigo: string, nombre: string): Promise<actualizarCuentaResponse> {
    try {
      const { data } = await api.put<actualizarCuentaResponse>("catalogo-cuentas/" + id_cuenta,
        { codigo, nombre }
      );
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          (error.status ? String(error.status) + " " : "") +
          (error.response?.data?.message || error.message);
        throw new Error(`Error al actualizar cuenta: ${message}`);
      }
      throw new Error("Error desconocido al actualizar cuenta");
    }

  }
}
