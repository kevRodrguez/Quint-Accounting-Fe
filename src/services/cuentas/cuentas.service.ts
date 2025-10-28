import api from "@/lib/axios";
import type { Cuenta, LibroDiario } from "@/types/libroDiario.interface";
import type { actualizarCuentaResponse } from "@/types/actualizarCuentaResponse.interface";
import type { eliminarCuentaResponse } from "@/types/eliminarCuentaResponse.interface copy";
import type { InsertarCuentaResponse } from "@/types/insertarCuentaResponse.interface";

export class CuentasService {
  public static async obtenerLibroDiario(): Promise<LibroDiario[]> {
    try {
      const { data } = await api.get<LibroDiario[]>("libro-diario/asientos/");
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

  public static async obtenerCuentas(): Promise<Cuenta[]> {
    try {
      const { data } = await api.get<Cuenta[]>("catalogo-cuentas/select");
      return data;
    } catch (error: any) {
      if (error.response) {
        const message =
          (error.response?.status || 'Error') + " " + (error.response?.data?.message || error.message || 'Error desconocido');
        throw new Error(`Error al obtener cuentas: ${message}`);
      }
      throw new Error("Error desconocido al obtener cuentas");
    }

  }

  public static async obtenerCuentasGet(): Promise<Cuenta[]> {
    try {
      const { data } = await api.get<Cuenta[]>("catalogo-cuentas/get");
      return data;
    } catch (error: any) {
      if (error.response) {
        const message =
          (error.response?.status || 'Error') + " " + (error.response?.data?.message || error.message || 'Error desconocido');
        throw new Error(`Error al obtener el catálogo de cuentas: ${message}`);
      }
      throw new Error("Error al obtener el catálogo de cuentas");
    }
  }

  public static async insertarCuenta(codigo: string, nombre: string): Promise<InsertarCuentaResponse> {
    try {
      const { data } = await api.post<InsertarCuentaResponse>("catalogo-cuentas", { codigo, nombre_cuenta: nombre });
      console.log("Cuenta insertada:", data);
      return data;
    } catch (error: any) {
      if (error.response) {
        const message =
          (error.response?.status || 'Error') + " " + (error.response?.data?.message || error.message || 'Error desconocido');
        throw new Error(`Error al actualizar cuenta: ${message}`);
      }
      throw new Error("Error desconocido al actualizar cuenta");
    }

  }
  public static async actualizarCuenta(id_cuenta: number, codigo: string, nombre: string): Promise<actualizarCuentaResponse> {
    try {
      const { data } = await api.put<actualizarCuentaResponse>("catalogo-cuentas/" + id_cuenta,
        { codigo, nombre_cuenta: nombre }
      );
      return data;
    } catch (error: any) {
      if (error.response) {
        const message =
          (error.response?.status || 'Error') + " " + (error.response?.data?.message || error.message || 'Error desconocido');
        throw new Error(`Error al actualizar cuenta: ${message}`);
      }
      throw new Error("Error desconocido al actualizar cuenta");
    }

  }

  public static async importarCuentas(base64File: string): Promise<void> {
    try {
      await api.post("catalogo-cuentas/importar", {
        fileBase64: base64File,
      });
    } catch (error: any) {
      if (error.response) {
        const message =
          (error.response?.status || 'Error') + " " + (error.response?.data?.message || error.message || 'Error desconocido');
        throw new Error(`Error al importar el catálogo: ${message}`);
      }
      throw new Error("Error al importar el catálogo");
    }
  }

  public static async eliminarCuenta(id_cuenta: number): Promise<eliminarCuentaResponse> {
    try {
      const { data } = await api.delete<eliminarCuentaResponse>("catalogo-cuentas/" + id_cuenta);
      return data;
    } catch (error: any) {
      if (error.response) {
        const message =
          (error.response?.status || 'Error') + " " + (error.response?.data?.message || error.message || 'Error desconocido');
        throw new Error(`Error al actualizar cuenta: ${message}`);
      }
      throw new Error("Error desconocido al actualizar cuenta");
    }

  }
}
