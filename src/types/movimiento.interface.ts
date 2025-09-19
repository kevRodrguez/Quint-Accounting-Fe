export interface Movimiento {
    id: number;
    cuentaId: number | string;
    debe: number;
    haber: number;
    descripcion?: string;
}