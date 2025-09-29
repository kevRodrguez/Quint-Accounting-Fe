// src/types/mayorizacion.ts
export interface MovimientoResumen {
  Fecha: string;
  Descripcion: string;
  Debe: number;
  Haber: number;
}

export interface TotalesMayorizacion {
  Debe: number;
  Haber: number;
  Saldo: number;
}

export interface MayorizacionItem {
  Codigo: string;
  Cuenta: string;
  Movimientos: MovimientoResumen[];
  Totales: TotalesMayorizacion;
}

export interface DetalleAsientoBackend {
  debe: number | null;
  haber: number | null;
  asiento: {
    descripcion: string;
    fecha: string;
  };
  cuenta: {
    codigo: string;
    nombre_cuenta: string;
  };
}
