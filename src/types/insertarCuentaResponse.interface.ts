export interface InsertarCuentaResponse {
    message: string;
    data: Data;
}

export interface Data {
    id_cuenta: number;
    codigo: string;
    nombre_cuenta: string;
    is_active: boolean;
}
