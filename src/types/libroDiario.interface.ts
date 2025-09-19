export interface LibroDiario {
    id_asiento:      number;
    descripcion:     string;
    //  Fecha en formato ISO 8601 ej. "2025-09-18T00:00:00.000Z"
    fecha:           string;
    detalle_asiento: DetalleAsiento[];
    total_debe:      number;
    total_haber:     number;
}

export interface DetalleAsiento {
    debe:   number;
    haber:  number;
    cuenta: Cuenta;
}

export interface Cuenta {
    id_cuenta:     number;
    nombre_cuenta: string;
    codigo:        string;
}