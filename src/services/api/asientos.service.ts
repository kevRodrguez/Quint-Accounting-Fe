
import axios, { type AxiosResponse } from 'axios'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


//creacion instancia de axios

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000, //10 segundos para timeout
})


// ✅ Interceptor para requests (opcional - para agregar auth token)
api.interceptors.request.use(
    (config) => {
        // const token = localStorage.getItem('authToken');
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


// ✅ Interceptor para responses (manejo de errores global)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);
export interface AsientoRequest {
    descripcion: string,
    fecha: Date | any,

}

export interface AsientoResponse {
    id: Number
    descripcion: string,
    fecha: Date,

}

//TODO: mover interfaz a un archivo adecuado
export interface Movimiento {
    id: number;
    cuentaId: string;
    debe: number;
    haber: number;
    descripcion?: string;
}


export class AsientosService {
    public static async crearAsiento(asiento: AsientoRequest): Promise<AsientoResponse> {
        try {
            const response: AxiosResponse<AsientoResponse> = await api.post('libro-diario/asientos/', asiento);
            console.log("respuesta del api directa", response.data)
            return response.data

        } catch (error) {
            if (axios.isAxiosError(error)) {
                const message = error.status + ' ' + error.response?.data?.message || error.message;
                throw new Error(`Error al crear asiento: ${message}`);
            }
            throw new Error('Error desconocido al crear asiento');
        }
    }
}

