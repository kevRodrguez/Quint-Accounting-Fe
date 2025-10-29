export interface Movimiento {
  id: number;
  cuentaId: number | string;
  debe: number | string;
  haber: number | string;
  descripcion?: string;
}
