/**
 * Archivo de Configuración Inicial de Jest
 * 
 * Este archivo se ejecuta ANTES de cada suite de tests.
 * Sirve para configurar el entorno global de testing.
 */

/**
 * Mock de Variables de Entorno de Vite
 * 
 * Vite usa import.meta.env, que no existe en Node.js/Jest.
 * Necesitamos mockear import.meta.env para que los tests funcionen.
 */

// Mock de import.meta para Jest
(global as any).import = {
    meta: {
        env: {
            VITE_STAGE: 'test',
            VITE_API_URL: 'http://localhost:3000/api',
            VITE_PUBLIC_API_URL: 'http://localhost:3000/api',
        }
    }
};

/**
 * También configuramos process.env como respaldo
 */
process.env.VITE_STAGE = 'test';
process.env.VITE_API_URL = 'http://localhost:3000/api';
process.env.VITE_PUBLIC_API_URL = 'http://localhost:3000/api';

