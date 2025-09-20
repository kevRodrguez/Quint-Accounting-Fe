export interface LibroDiario {
    asientosConTotales:        AsientosConTotale[];
    asientosConTotalesMayores: AsientosConTotalesMayores;
}

export interface AsientosConTotale {
    id_asiento:      number;
    descripcion:     string;
    fecha:           Date;
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

export interface AsientosConTotalesMayores {
    total_debe:  number;
    total_haber: number;
}
