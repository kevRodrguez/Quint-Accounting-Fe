/**
 * Mock de axios para tests
 * 
 * Este archivo reemplaza '@/lib/axios' durante los tests.
 * Evita que Jest intente procesar import.meta.env de Vite.
 */

import axios from 'axios';

// Crear instancia de axios con configuración básica para tests
const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Exportar la instancia y también las utilidades de axios
export default api;
export { axios };
