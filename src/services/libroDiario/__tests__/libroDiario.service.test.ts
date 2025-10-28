/**
 * Test Suite: LibroDiarioService
 * 
 * Pruebas unitarias para el servicio de libro diario.
 * Se testea la lógica de negocio relacionada con:
 * - Obtención del libro diario completo
 * - Filtrado por rango de fechas
 * - Búsqueda de asientos por descripción
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

import { LibroDiarioService } from '../libroDiario.service';
import type { LibroDiario } from '@/types/libroDiario.interface';
import MockAdapter from 'axios-mock-adapter';
import api from '@/lib/axios';

/**
 * MockAdapter: Intercepta peticiones HTTP y retorna respuestas simuladas
 */
const mock = new MockAdapter(api);

describe('LibroDiarioService', () => {

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
    // TESTS: obtenerLibroDiario()
    // ==========================================

    describe('obtenerLibroDiario()', () => {

        test('debe obtener el libro diario completo exitosamente', async () => {
            // Arrange: Preparar datos mock del libro diario
            const libroDiarioMock: LibroDiario = {
                asientosConTotales: [
                    {
                        id_asiento: 1,
                        descripcion: 'Compra de equipo',
                        fecha: new Date('2025-01-15'),
                        detalle_asiento: [
                            {
                                debe: 1000,
                                haber: 0,
                                cuenta: {
                                    id_cuenta: 101,
                                    nombre_cuenta: 'Caja',
                                    codigo: '1-001'
                                }
                            },
                            {
                                debe: 0,
                                haber: 1000,
                                cuenta: {
                                    id_cuenta: 201,
                                    nombre_cuenta: 'Proveedores',
                                    codigo: '2-001'
                                }
                            }
                        ],
                        total_debe: 1000,
                        total_haber: 1000
                    }
                ],
                asientosConTotalesMayores: {
                    total_debe: 1000,
                    total_haber: 1000
                }
            };

            // Configurar mock
            mock.onGet('libro-diario/asientos/').reply(200, libroDiarioMock);

            // Act
            const resultado = await LibroDiarioService.obtenerLibroDiario();

            // Assert
            expect(resultado).toBeDefined();
            expect(resultado.asientosConTotales).toHaveLength(1);
            expect(resultado.asientosConTotales[0].id_asiento).toBe(1);
            expect(resultado.asientosConTotales[0].descripcion).toBe('Compra de equipo');
            expect(resultado.asientosConTotalesMayores.total_debe).toBe(1000);
        });

        test('debe retornar libro diario vacío cuando no hay asientos', async () => {
            // Arrange
            const libroDiarioVacio: LibroDiario = {
                asientosConTotales: [],
                asientosConTotalesMayores: {
                    total_debe: 0,
                    total_haber: 0
                }
            };

            mock.onGet('libro-diario/asientos/').reply(200, libroDiarioVacio);

            // Act
            const resultado = await LibroDiarioService.obtenerLibroDiario();

            // Assert
            expect(resultado.asientosConTotales).toHaveLength(0);
            expect(resultado.asientosConTotalesMayores.total_debe).toBe(0);
        });

        test('debe lanzar error cuando el servidor no está disponible (500)', async () => {
            // Arrange
            mock.onGet('libro-diario/asientos/').reply(500, {
                message: 'Error interno del servidor'
            });

            // Act & Assert
            await expect(LibroDiarioService.obtenerLibroDiario())
                .rejects
                .toThrow('Error al obtener libro diario');
        });

        test('debe lanzar error cuando hay problemas de autenticación (401)', async () => {
            // Arrange
            mock.onGet('libro-diario/asientos/').reply(401, {
                message: 'No autorizado'
            });

            // Act & Assert
            await expect(LibroDiarioService.obtenerLibroDiario())
                .rejects
                .toThrow('Error al obtener libro diario');
        });

    });

    // ==========================================
    // TESTS: obtenerLibroDiarioPorRangoFechas()
    // ==========================================

    describe('obtenerLibroDiarioPorRangoFechas()', () => {

        test('debe obtener asientos dentro del rango de fechas correctamente', async () => {
            // Arrange
            const fechaInicio = '2025-01-01';
            const fechaFin = '2025-01-31';

            const libroDiarioMock: LibroDiario = {
                asientosConTotales: [
                    {
                        id_asiento: 1,
                        descripcion: 'Asiento enero',
                        fecha: new Date('2025-01-15'),
                        detalle_asiento: [],
                        total_debe: 500,
                        total_haber: 500
                    },
                    {
                        id_asiento: 2,
                        descripcion: 'Asiento enero 2',
                        fecha: new Date('2025-01-20'),
                        detalle_asiento: [],
                        total_debe: 800,
                        total_haber: 800
                    }
                ],
                asientosConTotalesMayores: {
                    total_debe: 1300,
                    total_haber: 1300
                }
            };

            mock.onGet('libro-diario/asientos/rango-fechas', {
                params: { fechaInicio, fechaFin }
            }).reply(200, libroDiarioMock);

            // Act
            const resultado = await LibroDiarioService.obtenerLibroDiarioPorRangoFechas(fechaInicio, fechaFin);

            // Assert
            expect(resultado.asientosConTotales).toHaveLength(2);
            expect(resultado.asientosConTotalesMayores.total_debe).toBe(1300);
        });

        test('debe retornar vacío cuando no hay asientos en el rango de fechas', async () => {
            // Arrange
            const fechaInicio = '2025-12-01';
            const fechaFin = '2025-12-31';

            const libroDiarioVacio: LibroDiario = {
                asientosConTotales: [],
                asientosConTotalesMayores: {
                    total_debe: 0,
                    total_haber: 0
                }
            };

            mock.onGet('libro-diario/asientos/rango-fechas').reply(200, libroDiarioVacio);

            // Act
            const resultado = await LibroDiarioService.obtenerLibroDiarioPorRangoFechas(fechaInicio, fechaFin);

            // Assert
            expect(resultado.asientosConTotales).toHaveLength(0);
        });

        test('debe lanzar error cuando el rango de fechas es inválido (400)', async () => {
            // Arrange
            const fechaInicio = '2025-12-31';
            const fechaFin = '2025-01-01'; // fecha fin menor que inicio

            mock.onGet('libro-diario/asientos/rango-fechas').reply(400, {
                message: 'Rango de fechas inválido'
            });

            // Act & Assert
            await expect(LibroDiarioService.obtenerLibroDiarioPorRangoFechas(fechaInicio, fechaFin))
                .rejects
                .toThrow('Error al obtener libro diario por rango de fechas');
        });

        test('debe lanzar error cuando las fechas tienen formato incorrecto', async () => {
            // Arrange
            const fechaInicio = 'fecha-invalida';
            const fechaFin = '2025-01-31';

            mock.onGet('libro-diario/asientos/rango-fechas').reply(400, {
                message: 'Formato de fecha incorrecto'
            });

            // Act & Assert
            await expect(LibroDiarioService.obtenerLibroDiarioPorRangoFechas(fechaInicio, fechaFin))
                .rejects
                .toThrow('Error al obtener libro diario por rango de fechas');
        });

    });

    // ==========================================
    // TESTS: buscarAsientosPorDescripcion()
    // ==========================================

    describe('buscarAsientosPorDescripcion()', () => {

        test('debe buscar asientos por descripción correctamente', async () => {
            // Arrange
            const descripcion = 'compra';

            const libroDiarioMock: LibroDiario = {
                asientosConTotales: [
                    {
                        id_asiento: 1,
                        descripcion: 'Compra de equipo',
                        fecha: new Date('2025-01-15'),
                        detalle_asiento: [],
                        total_debe: 1000,
                        total_haber: 1000
                    },
                    {
                        id_asiento: 3,
                        descripcion: 'Compra de materiales',
                        fecha: new Date('2025-01-20'),
                        detalle_asiento: [],
                        total_debe: 500,
                        total_haber: 500
                    }
                ],
                asientosConTotalesMayores: {
                    total_debe: 1500,
                    total_haber: 1500
                }
            };

            mock.onGet('libro-diario/asientos/search', {
                params: { descripcion }
            }).reply(200, libroDiarioMock);

            // Act
            const resultado = await LibroDiarioService.buscarAsientosPorDescripcion(descripcion);

            // Assert
            expect(resultado.asientosConTotales).toHaveLength(2);
            expect(resultado.asientosConTotales[0].descripcion).toContain('Compra');
            expect(resultado.asientosConTotales[1].descripcion).toContain('Compra');
        });

        test('debe retornar vacío cuando no hay coincidencias en la búsqueda', async () => {
            // Arrange
            const descripcion = 'texto_que_no_existe';

            const libroDiarioVacio: LibroDiario = {
                asientosConTotales: [],
                asientosConTotalesMayores: {
                    total_debe: 0,
                    total_haber: 0
                }
            };

            mock.onGet('libro-diario/asientos/search').reply(200, libroDiarioVacio);

            // Act
            const resultado = await LibroDiarioService.buscarAsientosPorDescripcion(descripcion);

            // Assert
            expect(resultado.asientosConTotales).toHaveLength(0);
        });

        test('debe lanzar error cuando la descripción está vacía (400)', async () => {
            // Arrange
            const descripcion = '';

            mock.onGet('libro-diario/asientos/search').reply(400, {
                message: 'La descripción no puede estar vacía'
            });

            // Act & Assert
            await expect(LibroDiarioService.buscarAsientosPorDescripcion(descripcion))
                .rejects
                .toThrow('Error al buscar asientos por descripción');
        });

        test('debe manejar búsquedas con caracteres especiales', async () => {
            // Arrange
            const descripcion = 'asiento #123';

            const libroDiarioMock: LibroDiario = {
                asientosConTotales: [
                    {
                        id_asiento: 123,
                        descripcion: 'asiento #123',
                        fecha: new Date('2025-01-15'),
                        detalle_asiento: [],
                        total_debe: 200,
                        total_haber: 200
                    }
                ],
                asientosConTotalesMayores: {
                    total_debe: 200,
                    total_haber: 200
                }
            };

            mock.onGet('libro-diario/asientos/search').reply(200, libroDiarioMock);

            // Act
            const resultado = await LibroDiarioService.buscarAsientosPorDescripcion(descripcion);

            // Assert
            expect(resultado.asientosConTotales).toHaveLength(1);
            expect(resultado.asientosConTotales[0].descripcion).toBe('asiento #123');
        });

    });

});
