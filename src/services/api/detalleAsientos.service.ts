import axios, { type AxiosResponse } from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, //10 segundos para timeout
});

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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export interface DetalleAsientoRequest {
  id_cuenta: number;
  id_asiento: number;
  debe: number;
  haber: number;
}

export interface DetalleAsientoResponse {
  id: number;
  id_cuenta: number;
  id_asiento: number;
  debe: number;
  haber: number;
}

export class DetalleAsientosService {
  public static async crearDetalleAsiento(
    detalleAsiento: DetalleAsientoRequest
  ): Promise<DetalleAsientoResponse> {
    try {
      const response: AxiosResponse<DetalleAsientoResponse> = await api.post(
        "detalle-asientos/",
        detalleAsiento
      );
      return response.data;
    } catch (error) {
      console.error("Error creando detalle de asiento:", error);
      throw error;
    }
  }
}

export default DetalleAsientosService;
