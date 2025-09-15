import { AppSidebar } from '@/components/dashboard/sidebar/app-sidebar'
import { NuevoAsientoForm } from '@/components/dashboard/modals/nuevo-asiento.modal'
import { SiteHeader } from '@/components/dashboard/site-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import React, { useState } from 'react'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { CardTitle } from '@/components/ui/card';

export default function LibroDiario() {

    //valores para controler cierre de modal
    const [open, setOpen] = useState(false)
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

                        {/* le pasamos el estado actual al dialogo y la funcion para cambiar el mismo */}
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
                                    <TableHead className="w-[200px] md:w-[300px] text-white">Descripción</TableHead>
                                    <TableHead className="text-right w-[100px] md:w-[150px] text-white font-bold">Debe</TableHead>
                                    <TableHead className="text-right w-[100px] md:w-[150px] text-white font-bold">Haber</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                <TableRow>
                                    <TableCell className="font-medium">15/09/2023</TableCell>
                                    <TableCell>Por inicio de operaciones</TableCell>
                                    <TableCell className="text-right font-semibold">$1,200.00</TableCell>
                                    <TableCell className="text-right font-semibold">$0.00</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">15/09/2023</TableCell>
                                    <TableCell>Por creacion de cuenta</TableCell>
                                    <TableCell className="text-right font-semibold">$0.00</TableCell>
                                    <TableCell className="text-right font-semibold">$1,200.00</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">18/09/2023</TableCell>
                                    <TableCell>Compra</TableCell>
                                    <TableCell className="text-right font-semibold">$800.00</TableCell>
                                    <TableCell className="text-right font-semibold">$0.00</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">18/09/2023</TableCell>
                                    <TableCell>Venta</TableCell>
                                    <TableCell className="text-right font-semibold">$0.00</TableCell>
                                    <TableCell className="text-right font-semibold">$800.00</TableCell>
                                </TableRow>

                                {/* Fila de totales */}
                                <TableRow className="bg-muted font-bold">
                                    <TableCell colSpan={2} className="text-right">Totales:</TableCell>
                                    <TableCell className="text-right border-t-3 border-primary/30">$2,000.00</TableCell>
                                    <TableCell className="text-right border-t-3 border-primary/30">$2,000.00</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>

            </SidebarInset>
        </SidebarProvider>
    )
}
