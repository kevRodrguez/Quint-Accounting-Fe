/**
 * Test Suite: EstadisticasService
 * 
 * Pruebas unitarias para el servicio de estadísticas contables.
 * Se testea la lógica de negocio relacionada con:
 * - Obtención de asientos de los últimos 3 meses
 * - Total de activos del mes
 * - Total de pasivos del mes
 * - Total de capital contable del mes
 * - Total de ingresos del mes
 * - Manejo de errores HTTP
 */

/**
 * Mock el módulo @/lib/axios ANTES de importarlo
 * Esto evita que Jest procese import.meta.env de Vite
 */
jest.mock('@/lib/axios');

/**
 * Mock de axios para que isAxiosError funcione
 */
jest.mock('axios', () => {
    const actualAxios = jest.requireActual('axios');
    return {
        __esModule: true,
        ...actualAxios,
        default: actualAxios.default,
        isAxiosError: actualAxios.default.isAxiosError,
    };
});

import { EstadisticasService } from '../estadisticas.service';
import MockAdapter from 'axios-mock-adapter';
import api from '@/lib/axios';

/**
 * MockAdapter: Intercepta peticiones HTTP y retorna respuestas simuladas
 */
const mock = new MockAdapter(api);

describe('EstadisticasService', () => {

    /**
     * afterEach: Se ejecuta después de cada test
     * Limpia los mocks para evitar interferencias entre tests
     */
    afterEach(() => {
        mock.reset();
    });

    /**
     * afterAll: Se ejecuta una vez al finalizar todos los tests
     * Restaura el comportamiento original de axios
     */
    afterAll(() => {
        mock.restore();
    });

    // ==========================================
    // TESTS: totalAsientosUltimosTresMeses()
    // ==========================================

    describe('totalAsientosUltimosTresMeses()', () => {

        test('debe obtener estadísticas de asientos de los últimos 3 meses exitosamente', async () => {
            // Arrange: Preparar datos mock
            const estadisticasMock = [
                { mes: 'Agosto 2025', total: 15 },
                { mes: 'Septiembre 2025', total: 23 },
                { mes: 'Octubre 2025', total: 18 }
            ];

            mock.onGet('estadisticas/tres-meses').reply(200, estadisticasMock);

            // Act
            const resultado = await EstadisticasService.totalAsientosUltimosTresMeses();

            // Assert
            expect(resultado).toBeDefined();
            expect(resultado).toHaveLength(3);
            expect(resultado[0].mes).toBe('Agosto 2025');
            expect(resultado[0].total).toBe(15);
        });

        test('debe retornar array vacío cuando no hay asientos', async () => {
            // Arrange
            const estadisticasVacias: any[] = [];

            mock.onGet('estadisticas/tres-meses').reply(200, estadisticasVacias);

            // Act
            const resultado = await EstadisticasService.totalAsientosUltimosTresMeses();

            // Assert
            expect(resultado).toEqual([]);
            expect(resultado).toHaveLength(0);
        });

        test('debe lanzar error cuando el servidor falla (500)', async () => {
            // Arrange
            mock.onGet('estadisticas/tres-meses').reply(500, {
                message: 'Error interno del servidor'
            });

            // Act & Assert
            await expect(EstadisticasService.totalAsientosUltimosTresMeses())
                .rejects
                .toThrow('Error al obtener asientos de los ultimos 3 meses');
        });

        test('debe lanzar error cuando no hay autorización (401)', async () => {
            // Arrange
            mock.onGet('estadisticas/tres-meses').reply(401, {
                message: 'No autorizado'
            });

            // Act & Assert
            await expect(EstadisticasService.totalAsientosUltimosTresMeses())
                .rejects
                .toThrow('Error al obtener asientos de los ultimos 3 meses');
        });

    });

    // ==========================================
    // TESTS: totalActivos()
    // ==========================================

    describe('totalActivos()', () => {

        test('debe obtener el total de activos del mes exitosamente', async () => {
            // Arrange
            const activosMock = {
                total: 150000.50,
                cuentas: [
                    { codigo: '1-001', nombre: 'Caja', total: 50000 },
                    { codigo: '1-002', nombre: 'Bancos', total: 100000.50 }
                ]
            };

            mock.onGet('estadisticas/total-activos-mes').reply(200, activosMock);

            // Act
            const resultado = await EstadisticasService.totalActivos();

            // Assert
            expect(resultado).toBeDefined();
            expect(resultado.total).toBe(150000.50);
            expect(resultado.cuentas).toHaveLength(2);
        });

        test('debe retornar cero cuando no hay activos', async () => {
            // Arrange
            const activosVacios = {
                total: 0,
                cuentas: []
            };

            mock.onGet('estadisticas/total-activos-mes').reply(200, activosVacios);

            // Act
            const resultado = await EstadisticasService.totalActivos();

            // Assert
            expect(resultado.total).toBe(0);
            expect(resultado.cuentas).toHaveLength(0);
        });

    });

    // ==========================================
    // TESTS: totalPasivos()
    // ==========================================

    describe('totalPasivos()', () => {

        test('debe obtener el total de pasivos del mes exitosamente', async () => {
            // Arrange
            const pasivosMock = {
                total: 75000.25,
                cuentas: [
                    { codigo: '2-001', nombre: 'Proveedores', total: 50000 },
                    { codigo: '2-002', nombre: 'Préstamos', total: 25000.25 }
                ]
            };

            mock.onGet('estadisticas/total-pasivos-mes').reply(200, pasivosMock);

            // Act
            const resultado = await EstadisticasService.totalPasivos();

            // Assert
            expect(resultado).toBeDefined();
            expect(resultado.total).toBe(75000.25);
            expect(resultado.cuentas).toHaveLength(2);
        });

        test('debe retornar cero cuando no hay pasivos', async () => {
            // Arrange
            const pasivosVacios = {
                total: 0,
                cuentas: []
            };

            mock.onGet('estadisticas/total-pasivos-mes').reply(200, pasivosVacios);

            // Act
            const resultado = await EstadisticasService.totalPasivos();

            // Assert
            expect(resultado.total).toBe(0);
            expect(resultado.cuentas).toHaveLength(0);
        });

    });

    // ==========================================
    // TESTS: totalCapitalContable()
    // ==========================================

    describe('totalCapitalContable()', () => {

        test('debe obtener el total de capital contable del mes exitosamente', async () => {
            // Arrange
            const capitalMock = {
                total: 75000.25,
                componentes: {
                    capital_social: 50000,
                    utilidades_retenidas: 20000,
                    utilidad_ejercicio: 5000.25
                }
            };

            mock.onGet('estadisticas/total-capital-contable-mes').reply(200, capitalMock);

            // Act
            const resultado = await EstadisticasService.totalCapitalContable();

            // Assert
            expect(resultado).toBeDefined();
            expect(resultado.total).toBe(75000.25);
            expect(resultado.componentes.capital_social).toBe(50000);
        });

        test('debe retornar cero cuando no hay capital contable', async () => {
            // Arrange
            const capitalVacio = {
                total: 0,
                componentes: {
                    capital_social: 0,
                    utilidades_retenidas: 0,
                    utilidad_ejercicio: 0
                }
            };

            mock.onGet('estadisticas/total-capital-contable-mes').reply(200, capitalVacio);

            // Act
            const resultado = await EstadisticasService.totalCapitalContable();

            // Assert
            expect(resultado.total).toBe(0);
        });

    });

    // ==========================================
    // TESTS: totalIngresos()
    // ==========================================

    describe('totalIngresos()', () => {

        test('debe obtener el total de ingresos del mes exitosamente', async () => {
            // Arrange
            const ingresosMock = {
                total: 250000.75,
                cuentas: [
                    { codigo: '4-001', nombre: 'Ventas', total: 200000 },
                    { codigo: '4-002', nombre: 'Servicios', total: 50000.75 }
                ],
                periodo: 'Octubre 2025'
            };

            mock.onGet('estadisticas/total-ingresos-mes').reply(200, ingresosMock);

            // Act
            const resultado = await EstadisticasService.totalIngresos();

            // Assert
            expect(resultado).toBeDefined();
            expect(resultado.total).toBe(250000.75);
            expect(resultado.cuentas).toHaveLength(2);
            expect(resultado.periodo).toBe('Octubre 2025');
        });

        test('debe retornar cero cuando no hay ingresos', async () => {
            // Arrange
            const ingresosVacios = {
                total: 0,
                cuentas: [],
                periodo: 'Octubre 2025'
            };

            mock.onGet('estadisticas/total-ingresos-mes').reply(200, ingresosVacios);

            // Act
            const resultado = await EstadisticasService.totalIngresos();

            // Assert
            expect(resultado.total).toBe(0);
            expect(resultado.cuentas).toHaveLength(0);
        });

    });

});
