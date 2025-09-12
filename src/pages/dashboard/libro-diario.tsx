import { AppSidebar } from '@/components/dashboard/sidebar/app-sidebar'
import { NuevoAsientoForm } from '@/components/dashboard/modals/nuevo-asiento.modal'
import { SiteHeader } from '@/components/dashboard/site-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import React from 'react'

export default function LibroDiario() {
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

                <div className='flex justify-center'>Libro Diario</div>

                {/* Botón para añadir nuevo asiento */}
                <Dialog >
                    <DialogTrigger>Nuevo Asiento</DialogTrigger>
                    <DialogContent className="max-w-4xl w-full h-[90vh] p-0 overflow-auto " style={{ scrollbarWidth: 'none' }}>
                        <NuevoAsientoForm />
                    </DialogContent>
                </Dialog>

            </SidebarInset>
        </SidebarProvider>
    )
}
