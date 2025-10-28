/**
 * Test Suite: DetalleAsientosService
 * 
 * Pruebas unitarias para el servicio de detalle de asientos contables.
 * Se testea la lógica de negocio relacionada con:
 * - Creación de detalles de asientos (movimientos)
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

import { DetalleAsientosService } from '../detalleAsientos.service';
import type { DetalleAsientoRequest, DetalleAsientoResponse } from '../detalleAsientos.service';
import MockAdapter from 'axios-mock-adapter';
import api from '@/lib/axios';

/**
 * MockAdapter: Intercepta peticiones HTTP y retorna respuestas simuladas
 * Evita hacer llamadas reales al servidor durante los tests
 */
const mock = new MockAdapter(api);

describe('DetalleAsientosService', () => {

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
    // TESTS: crearDetalleAsiento()
    // ==========================================

    describe('crearDetalleAsiento()', () => {

        test('debe crear un detalle de asiento (movimiento débito) exitosamente', async () => {
            // Arrange: Preparar datos de entrada
            const nuevoDetalle: DetalleAsientoRequest = {
                id_cuenta: 101,
                id_asiento: 1,
                debe: 1000,
                haber: 0
            };

            const respuestaEsperada: DetalleAsientoResponse = {
                id: 1,
                id_cuenta: 101,
                id_asiento: 1,
                debe: 1000,
                haber: 0
            };

            // Configurar mock para interceptar POST
            mock.onPost('detalle-asientos/').reply(200, respuestaEsperada);

            // Act: Ejecutar la función a testear
            const resultado = await DetalleAsientosService.crearDetalleAsiento(nuevoDetalle);

            // Assert: Verificar que el resultado es correcto
            expect(resultado).toEqual(respuestaEsperada);
            expect(resultado.id).toBe(1);
            expect(resultado.debe).toBe(1000);
            expect(resultado.haber).toBe(0);
        });

        test('debe crear un detalle de asiento (movimiento crédito) exitosamente', async () => {
            // Arrange: Preparar datos de entrada
            const nuevoDetalle: DetalleAsientoRequest = {
                id_cuenta: 201,
                id_asiento: 1,
                debe: 0,
                haber: 1000
            };

            const respuestaEsperada: DetalleAsientoResponse = {
                id: 2,
                id_cuenta: 201,
                id_asiento: 1,
                debe: 0,
                haber: 1000
            };

            // Configurar mock para interceptar POST
            mock.onPost('detalle-asientos/').reply(200, respuestaEsperada);

            // Act: Ejecutar la función a testear
            const resultado = await DetalleAsientosService.crearDetalleAsiento(nuevoDetalle);

            // Assert: Verificar que el resultado es correcto
            expect(resultado).toEqual(respuestaEsperada);
            expect(resultado.id).toBe(2);
            expect(resultado.debe).toBe(0);
            expect(resultado.haber).toBe(1000);
        });

        test('debe lanzar error cuando la cuenta no existe (404)', async () => {
            // Arrange: Detalle con cuenta inexistente
            const detalleInvalido: DetalleAsientoRequest = {
                id_cuenta: 9999,
                id_asiento: 1,
                debe: 500,
                haber: 0
            };

            // Mock de respuesta de error
            mock.onPost('detalle-asientos/').reply(404, {
                message: 'Cuenta no encontrada'
            });

            // Act & Assert: Verificar que se lanza un error
            await expect(DetalleAsientosService.crearDetalleAsiento(detalleInvalido))
                .rejects
                .toThrow();
        });

        test('debe lanzar error cuando el asiento no existe (404)', async () => {
            // Arrange: Detalle con asiento inexistente
            const detalleInvalido: DetalleAsientoRequest = {
                id_cuenta: 101,
                id_asiento: 9999,
                debe: 500,
                haber: 0
            };

            // Mock de respuesta de error
            mock.onPost('detalle-asientos/').reply(404, {
                message: 'Asiento no encontrado'
            });

            // Act & Assert: Verificar que se lanza un error
            await expect(DetalleAsientosService.crearDetalleAsiento(detalleInvalido))
                .rejects
                .toThrow();
        });

        test('debe lanzar error cuando debe y haber son inválidos (400)', async () => {
            // Arrange: Detalle con valores negativos
            const detalleInvalido: DetalleAsientoRequest = {
                id_cuenta: 101,
                id_asiento: 1,
                debe: -500,
                haber: 0
            };

            // Mock de respuesta de error
            mock.onPost('detalle-asientos/').reply(400, {
                message: 'Los valores de debe y haber no pueden ser negativos'
            });

            // Act & Assert: Verificar que se lanza un error
            await expect(DetalleAsientosService.crearDetalleAsiento(detalleInvalido))
                .rejects
                .toThrow();
        });

        test('debe lanzar error cuando ambos debe y haber tienen valor (400)', async () => {
            // Arrange: Detalle inválido (no puede tener ambos valores)
            const detalleInvalido: DetalleAsientoRequest = {
                id_cuenta: 101,
                id_asiento: 1,
                debe: 500,
                haber: 500
            };

            // Mock de respuesta de error
            mock.onPost('detalle-asientos/').reply(400, {
                message: 'Un movimiento debe tener valor en debe O haber, no ambos'
            });

            // Act & Assert: Verificar que se lanza un error
            await expect(DetalleAsientosService.crearDetalleAsiento(detalleInvalido))
                .rejects
                .toThrow();
        });

        test('debe lanzar error cuando el servidor no está disponible (500)', async () => {
            // Arrange
            const detalle: DetalleAsientoRequest = {
                id_cuenta: 101,
                id_asiento: 1,
                debe: 1000,
                haber: 0
            };

            // Mock de error de servidor
            mock.onPost('detalle-asientos/').reply(500, {
                message: 'Error interno del servidor'
            });

            // Act & Assert
            await expect(DetalleAsientosService.crearDetalleAsiento(detalle))
                .rejects
                .toThrow();
        });

        test('debe lanzar error cuando hay un error de red', async () => {
            // Arrange
            const detalle: DetalleAsientoRequest = {
                id_cuenta: 101,
                id_asiento: 1,
                debe: 1000,
                haber: 0
            };

            // Mock de error de red
            mock.onPost('detalle-asientos/').networkError();

            // Act & Assert
            await expect(DetalleAsientosService.crearDetalleAsiento(detalle))
                .rejects
                .toThrow();
        });

    });

});
