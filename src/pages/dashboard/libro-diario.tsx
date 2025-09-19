import { AppSidebar } from '@/components/dashboard/sidebar/app-sidebar'
import { NuevoAsientoForm } from '@/components/dashboard/modals/nuevo-asiento.modal'
import { SiteHeader } from '@/components/dashboard/site-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import React, { useEffect, useState } from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CardTitle } from '@/components/ui/card';

import { LibroDiarioService } from '@/services/libroDiario/libroDiario.service'
import type { LibroDiario as LibroDiarioType, DetalleAsiento } from '@/types/libroDiario.interface'
import { LoadingScreen } from '@/components/dashboard/LoadingScreen';
import { ErrorScreen } from '@/components/dashboard/ErrorScreen';

export default function LibroDiario() {

  //valores para controler cierre de modal
  const [open, setOpen] = useState(false)

  const [asientos, setAsientos] = useState<LibroDiarioType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fmtCurrency = new Intl.NumberFormat('es-SV', { style: 'currency', currency: 'USD' })
  const fmtDate = (iso: string) => new Intl.DateTimeFormat('es-SV').format(new Date(iso))

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const data = await LibroDiarioService.obtenerLibroDiario()
        if (mounted) setAsientos(data)
      } catch (e: any) {
        if (mounted) setError(e?.message || 'No se pudo cargar el libro diario')
      } finally {
        if (mounted) setLoading(false)
      }
    })()

    return () => { mounted = false }
  }, [])

  return (

    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title="Libro Diario" />

        <CardTitle className='justify-center flex text-3xl my-4'>Libro Diario</CardTitle>


        {/* Contenedor responsivo para la tabla con scroll horizontal cuando sea necesario */}
        <div className="w-full max-w-[1400px] mx-auto px-4 overflow-x-auto">
          <div className="py-4">
            {/* Botón para añadir nuevo asiento */}
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger className='bg-primary text-white w-32 rounded-full flex justify-center my-3 p-2' >Nuevo Asiento</DialogTrigger>
              <DialogContent className="max-w-4xl w-full h-[90vh] p-0 overflow-auto " style={{ scrollbarWidth: 'none' }}>

                {/* le pasamos el metodo setOpen al fomrulario, para que se pueda cerrar desde dentro */}
                <NuevoAsientoForm setOpen={setOpen} />
              </DialogContent>
            </Dialog>

            <Table className="min-w-full">
              <TableHeader>
                <TableRow className='bg-primary'>
                  <TableHead className="w-[100px] md:w-[120px] text-white">Fecha</TableHead>
                  <TableHead className="w-[200px] md:w-[300px] text-white">Descripción / Cuenta</TableHead>
                  <TableHead className="text-right w-[100px] md:w-[150px] text-white font-bold">Debe</TableHead>
                  <TableHead className="text-right w-[100px] md:w-[150px] text-white font-bold">Haber</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {loading && (
                  <TableRow>
                    {/* <TableCell colSpan={4} className="text-center py-6">Cargando libro diario...</TableCell> */}
                    <TableCell colSpan={4} className="p-0 m-0 border-0">
                      <LoadingScreen title="Cargando libro diario..." text="Por favor espera." />
                    </TableCell>
                  </TableRow>
                )}

                {!loading && error && (
                  <TableRow>
                    {/* <TableCell colSpan={4} className="text-center text-red-600 py-6">{error}</TableCell> */}
                    <TableCell colSpan={4} className="text-center text-red-600 py-6">
                      <ErrorScreen title="Error al cargar libro diario" error={error} />
                    </TableCell>
                  </TableRow>
                )}

                {!loading && !error && asientos.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-6">
                      <ErrorScreen title="Sin asientos registrados" />
                    </TableCell>
                  </TableRow>
                )}

                {!loading && !error && asientos.map((asiento) => {
                  const detalles = (asiento.detalle_asiento?.length
                    ? asiento.detalle_asiento
                    : [{ debe: 0, haber: 0, cuenta: { id_cuenta: 0, nombre_cuenta: '', codigo: '' } }] as DetalleAsiento[])

                  return (
                    // React fragment es una especie de div invisible que no añade nodos extra al DOM
                    <React.Fragment key={asiento.id_asiento}>
                      {/* Fila para la fecha y descripción */}
                      <TableRow className="bg-muted/30">
                        <TableCell className="font-medium">
                          {fmtDate(asiento.fecha)}
                        </TableCell>
                        <TableCell colSpan={3}>
                          <span className="font-semibold">'{asiento.descripcion}'</span>
                        </TableCell>
                      </TableRow>

                      {/* Filas para los detalles del asiento */}
                      {detalles.map((det) => (
                        <TableRow key={asiento.id_asiento} className="border-l-4 border-l-muted">
                            {/* Celda vacía para alineación */}
                          <TableCell>
                          </TableCell>

                          <TableCell>
                            <div className="flex flex-col pl-4">
                              <span className="text-muted-foreground text-sm">{det.cuenta.codigo} - {det.cuenta.nombre_cuenta}</span>
                            </div>
                          </TableCell>
                          
                          <TableCell className="text-right font-semibold">{fmtCurrency.format(det.debe || 0)}</TableCell>
                          <TableCell className="text-right font-semibold">{fmtCurrency.format(det.haber || 0)}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="bg-muted font-bold">
                        <TableCell colSpan={2} className="text-right">Totales:</TableCell>
                        <TableCell className="text-right border-t-3 border-primary/30">
                          {fmtCurrency.format(
                            (asiento.total_debe ?? detalles.reduce((s, d) => s + (d.debe || 0), 0))
                          )}
                        </TableCell>
                        <TableCell className="text-right border-t-3 border-primary/30">
                          {fmtCurrency.format(
                            (asiento.total_haber ?? detalles.reduce((s, d) => s + (d.haber || 0), 0))
                          )}
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </div>

      </SidebarInset>
    </SidebarProvider>
  )
}
