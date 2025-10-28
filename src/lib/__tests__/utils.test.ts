/**
 * Test Suite: Utilidades (utils.ts)
 * 
 * Pruebas unitarias para funciones de utilidad.
 * Este es un test básico para verificar que Jest está configurado correctamente.
 */

import { cn } from '../utils';

/**
 * describe: Agrupa tests relacionados en un "suite"
 * Ayuda a organizar y documentar qué estamos testeando
 */
describe('utils.ts - Función cn()', () => {

    /**
     * test (o it): Define un caso de prueba individual
     * Debe tener un nombre descriptivo que explique qué se está probando
     */
    test('debe combinar clases CSS correctamente', () => {
        // Arrange (Preparar): Definir datos de entrada
        const resultado = cn('clase-1', 'clase-2');

        // Assert (Verificar): Comprobar que el resultado es el esperado
        expect(resultado).toBe('clase-1 clase-2');
    });

    test('debe manejar clases condicionales', () => {
        // cn() usa clsx, que permite condicionales
        const resultado = cn('base', false && 'no-aparece', 'final');

        expect(resultado).toBe('base final');
    });

    test('debe manejar valores undefined y null', () => {
        const resultado = cn('clase', undefined, null, 'otra-clase');

        expect(resultado).toBe('clase otra-clase');
    });

    test('debe fusionar clases de Tailwind conflictivas', () => {
        // twMerge elimina clases duplicadas/conflictivas de Tailwind
        const resultado = cn('px-2', 'px-4');

        // twMerge debe mantener solo la última (px-4)
        expect(resultado).toBe('px-4');
    });

});
