import { env } from "process";

const API_BASE_URL = import.meta.env.BASE_URL;

export interface AsientoRequest {
    descripcion: string,
    fecha: string,
    movimientos: {
        cuentaId: number,
        debe: number,
        haber: number
    }
}