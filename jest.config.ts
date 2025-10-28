/**
 * Configuración de Jest para Testing de Lógica de Negocio
 * 
 * Este archivo configura Jest para ejecutar pruebas unitarias
 * enfocadas únicamente en servicios y funciones de utilidad,
 * sin incluir componentes de React.
 */

import type { Config } from 'jest';

const config: Config = {
    /**
     * preset: 'ts-jest'
     * Utiliza ts-jest como preprocesador, permitiendo escribir
     * tests en TypeScript sin necesidad de compilar manualmente.
     */
    preset: 'ts-jest',

    /**
     * testEnvironment: 'node'
     * Ejecuta los tests en entorno Node.js puro (sin simular navegador).
     * Suficiente para lógica de negocio que no depende del DOM.
     * Alternativas: 'jsdom' (si necesitaras window, document, etc.)
     */
    testEnvironment: 'node',

    /**
     * transform: Configuración de transformadores
     * Define cómo procesar diferentes tipos de archivos
     */
    transform: {
        '^.+\\.tsx?$': ['ts-jest', {
            tsconfig: {
                module: 'esnext',
                esModuleInterop: true,
                allowSyntheticDefaultImports: true,
            },
        }],
    },

    /**
     * roots: Directorios raíz donde Jest buscará archivos de test
     * '<rootDir>' es reemplazado automáticamente por la ruta del proyecto
     */
    roots: ['<rootDir>/src'],

    /**
     * testMatch: Patrones glob que identifican archivos de test
     * Solo busca archivos .test.ts dentro de carpetas __tests__
     * Ejemplo: src/services/__tests__/asientos.service.test.ts
     */
    testMatch: ['**/__tests__/**/*.test.ts'],

    /**
     * moduleNameMapper: Mapea alias de importación
     * Permite usar '@/...' en tests igual que en el código fuente
     * Ejemplo: import api from '@/lib/axios' funcionará correctamente
     */
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },

    /**
     * automock: false (por defecto)
     * Pero configuramos para que use mocks manuales cuando existan
     */
    modulePathIgnorePatterns: [],

    /**
     * Decirle a Jest que busque mocks automáticamente
     */
    automock: false,

    /**
     * setupFilesAfterEnv: Archivos que se ejecutan antes de cada test
     * Útil para configurar variables de entorno y mocks globales
     */
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

    /**
     * collectCoverageFrom: Archivos incluidos en el reporte de cobertura
     * - Incluye: todos los .ts en services/ y utils.ts
     * - Excluye (con !): archivos de definición de tipos (.d.ts, .interface.ts, .types.ts)
     */
    collectCoverageFrom: [
        'src/services/**/*.ts',
        'src/lib/utils.ts',
        '!src/**/*.d.ts',
        '!src/**/*.interface.ts',
        '!src/**/*.types.ts',
    ],

    /**
     * coverageThreshold: Umbrales mínimos de cobertura requeridos
     * Si no se alcanza el 60% en cualquiera, Jest fallará
     * - branches: cobertura de ramas condicionales (if/else, switch)
     * - functions: porcentaje de funciones testeadas
     * - lines: líneas de código ejecutadas
     * - statements: declaraciones ejecutadas
     */
    coverageThreshold: {
        global: {
            branches: 60,
            functions: 60,
            lines: 60,
            statements: 60,
        },
    },
};

export default config;
