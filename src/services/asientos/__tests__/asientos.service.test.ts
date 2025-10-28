/**
 * Test Suite: AsientosService
 * 
 * Pruebas unitarias para el servicio de asientos contables.
 * Se testea la lógica de negocio relacionada con:
 * - Creación de asientos
 * - Eliminación de asientos
 * - Actualización de asientos
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

import { AsientosService } from '../asientos.service';
import type { AsientoRequest } from '@/types/asientoRequest.interface';
import type { Movimiento } from '@/types/movimiento.interface';
import MockAdapter from 'axios-mock-adapter';
import api from '@/lib/axios';

/**
 * MockAdapter: Intercepta peticiones HTTP y retorna respuestas simuladas
 * Evita hacer llamadas reales al servidor durante los tests
 */
const mock = new MockAdapter(api);

describe('AsientosService', () => {

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
    // TESTS: crearAsiento()
    // ==========================================

    describe('crearAsiento()', () => {

        test('debe crear un asiento exitosamente', async () => {
            // Arrange: Preparar datos de entrada según la interfaz AsientoRequest
            const nuevoAsiento: AsientoRequest = {
                descripcion: 'Compra de equipo de oficina',
                fecha: new Date('2025-01-15')
            };

            // Mock de respuesta exitosa - MockAdapter retorna strings para fechas
            const respuestaEsperada = {
                id: 1,
                descripcion: 'Compra de equipo de oficina',
                fecha: new Date('2025-01-15')
            };

            // Configurar mock para interceptar POST
            mock.onPost('libro-diario/asientos/').reply(200, respuestaEsperada);

            // Act: Ejecutar la función a testear
            const resultado = await AsientosService.crearAsiento(nuevoAsiento);

            // Assert: Verificar que el resultado es correcto
            expect(resultado.id).toBe(1);
            expect(resultado.descripcion).toBe('Compra de equipo de oficina');
            // Comparar solo el valor ISO de la fecha ya que viene como string
            expect(new Date(resultado.fecha as any).toISOString()).toBe(new Date('2025-01-15').toISOString());
        });

        test('debe lanzar error cuando el API retorna 400 (Bad Request)', async () => {
            // Arrange: Crear asiento inválido
            const asientoInvalido: AsientoRequest = {
                descripcion: '',
                fecha: undefined
            };

            // Mock de respuesta de error
            mock.onPost('libro-diario/asientos/').reply(400, {
                message: 'Descripción y fecha son requeridos'
            });

            // Act & Assert: Verificar que se lanza un error
            await expect(AsientosService.crearAsiento(asientoInvalido))
                .rejects
                .toThrow('Error al crear asiento');
        });

        test('debe lanzar error cuando el API no está disponible (500)', async () => {
            // Arrange
            const asiento: AsientoRequest = {
                descripcion: 'Test',
                fecha: new Date('2025-01-20')
            };

            // Mock de error de servidor
            mock.onPost('libro-diario/asientos/').reply(500, {
                message: 'Error interno del servidor'
            });

            // Act & Assert
            await expect(AsientosService.crearAsiento(asiento))
                .rejects
                .toThrow();
        });

        test('debe lanzar error genérico cuando no es un AxiosError', async () => {
            // Arrange
            const asiento: AsientoRequest = {
                descripcion: 'Test',
                fecha: new Date()
            };

            // Mock de error NO Axios
            mock.onPost('libro-diario/asientos/').reply(() => {
                throw new Error('Error de red');
            });

            // Act & Assert
            await expect(AsientosService.crearAsiento(asiento))
                .rejects
                .toThrow('Error desconocido al crear asiento');
        });

    });

    // ==========================================
    // TESTS: eliminarAsiento()
    // ==========================================

    describe('eliminarAsiento()', () => {

        test('debe eliminar un asiento exitosamente', async () => {
            // Arrange
            const idAsiento = 5;
            const respuestaEsperada = {
                id: 5,
                descripcion: 'Asiento eliminado',
                fecha: new Date('2025-01-15')
            };

            mock.onDelete(`libro-diario/asientos/${idAsiento}`).reply(200, respuestaEsperada);

            // Act
            const resultado = await AsientosService.eliminarAsiento(idAsiento);

            // Assert
            expect(resultado.id).toBe(5);
            expect(resultado.descripcion).toBe('Asiento eliminado');
            expect(new Date(resultado.fecha as any).toISOString()).toBe(new Date('2025-01-15').toISOString());
        });

        test('debe lanzar error cuando el asiento no existe (404)', async () => {
            // Arrange
            const idInexistente = 999;

            mock.onDelete(`libro-diario/asientos/${idInexistente}`).reply(404, {
                message: 'Asiento no encontrado'
            });

            // Act & Assert
            await expect(AsientosService.eliminarAsiento(idInexistente))
                .rejects
                .toThrow('Error al eliminar asiento');
        });

        test('debe manejar error de permisos (403)', async () => {
            // Arrange
            const id = 10;

            mock.onDelete(`libro-diario/asientos/${id}`).reply(403, {
                message: 'No tienes permisos para eliminar este asiento'
            });

            // Act & Assert
            await expect(AsientosService.eliminarAsiento(id))
                .rejects
                .toThrow('Error al eliminar asiento');
        });

    });

    // ==========================================
    // TESTS: actualizarAsiento()
    // ==========================================

    describe('actualizarAsiento()', () => {

        test('debe actualizar un asiento correctamente', async () => {
            // Arrange
            const id = 3;
            const descripcion = 'Asiento actualizado - Venta de producto';
            const fecha = new Date('2025-02-20');

            // Crear movimientos según la interfaz Movimiento
            const movimientos: Movimiento[] = [
                {
                    id: 1,
                    cuentaId: 101,
                    debe: 500,
                    haber: 0,
                    descripcion: 'Cuenta de activo'
                },
                {
                    id: 2,
                    cuentaId: 201,
                    debe: 0,
                    haber: 500,
                    descripcion: 'Cuenta de pasivo'
                }
            ];

            const respuestaEsperada = {
                id: 3,
                descripcion: 'Asiento actualizado - Venta de producto',
                fecha: new Date('2025-02-20')
            };

            mock.onPut(`libro-diario/asientos/${id}`).reply(200, respuestaEsperada);

            // Act
            const resultado = await AsientosService.actualizarAsiento(
                id,
                descripcion,
                fecha,
                movimientos
            );

            // Assert
            expect(resultado.id).toBe(3);
            expect(resultado.descripcion).toBe('Asiento actualizado - Venta de producto');
            expect(new Date(resultado.fecha as any).toISOString()).toBe(new Date('2025-02-20').toISOString());
        }); test('debe manejar error de validación (400)', async () => {
            // Arrange
            const id = 1;
            const descripcion = 'Test';
            const fecha = new Date();
            const movimientos: Movimiento[] = [];

            mock.onPut(`libro-diario/asientos/${id}`).reply(400, {
                message: 'Los movimientos no pueden estar vacíos'
            });

            // Act & Assert
            await expect(
                AsientosService.actualizarAsiento(id, descripcion, fecha, movimientos)
            ).rejects.toThrow('Error al actualizar asiento');
        });

        test('debe manejar error cuando el asiento no existe (404)', async () => {
            // Arrange
            const id = 999;
            const descripcion = 'Test';
            const fecha = new Date();
            const movimientos: Movimiento[] = [];

            mock.onPut(`libro-diario/asientos/${id}`).reply(404, {
                message: 'Asiento no encontrado'
            });

            // Act & Assert
            await expect(
                AsientosService.actualizarAsiento(id, descripcion, fecha, movimientos)
            ).rejects.toThrow('Error al actualizar asiento');
        });

    });

});
