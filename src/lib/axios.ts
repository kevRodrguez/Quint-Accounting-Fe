import axios from "axios";
import { supabase } from "./client";
import { authService } from "@/services/api/auth.service";

const STAGE = import.meta.env.VITE_STAGE;

const API_URL =
  STAGE === "production"
    ? import.meta.env.VITE_PUBLIC_API_URL
    : import.meta.env.VITE_API_URL;

if (STAGE !== "production") {
  console.log("🔧 API Configuration:", {
    STAGE,
    API_URL,
    VITE_API_URL: import.meta.env.VITE_API_URL,
    VITE_PUBLIC_API_URL: import.meta.env.VITE_PUBLIC_API_URL,
  });
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // permite envío de cookies
});

api.interceptors.request.use(async (config) => {
  // Verificar si tenemos un token en supabase.auth

  const { data } = await supabase.auth.getSession();

  const token = data.session?.access_token;

  if (token !== null) {
    // console.log('Token en el interceptor:', token); //,token
  }
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Interceptor para manejar errores 401 y refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Usar el servicio de autenticación para refrescar el token
        const newToken = await authService.refreshToken();

        if (newToken) {
          // Reintentar la petición original con el nuevo token
          originalRequest.headers.Authorization = `Bearer ${newToken}`;

          if (STAGE !== "production") {
            console.log("Reintentando la petición con el nuevo token");
          }

          return api(originalRequest);
        } else {
          // El refresh token falló - se requiere nuevo login
          authService.logout();
        }
      } catch (refreshError) {
        console.error("Error al refrescar el token:", refreshError);
        authService.logout();
      }
    }

    return Promise.reject(error);
  }
);
export default api;
