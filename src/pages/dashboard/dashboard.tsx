
import { AppSidebar } from '@/components/dashboard/app-sidebar';
import { ChartAreaInteractive } from '@/components/dashboard/chart-area-interactive';
import { SectionCards } from '@/components/dashboard/section-cards';
import { SiteHeader } from '@/components/dashboard/site-header';
import { Button } from '@/components/ui/button';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import React from 'react'
import Modal from 'react-modal';
import { LoginForm } from '../auth/login-form';
import { NuevoAsientoForm } from '@/components/dashboard/creacion-asientos/nuevo-asiento-form';
export default function Dashboard() {
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',

        },
    };
    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        console.log("cerrando modal")
    }

    function closeModal() {
        setIsOpen(false);
    }
    return (
        //Modal para nuevo asiento
        <><Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={{
                ...customStyles,
                content: {
                    ...customStyles.content,
                    backgroundColor: 'transparent',
                    border: 'none', // Cambia aquí el color de fondo
                },
            }}
            contentLabel="Example Modal"
        >
            <NuevoAsientoForm />
        </Modal><>

                <SidebarProvider
                    style={{
                        "--sidebar-width": "calc(var(--spacing) * 72)",
                        "--header-height": "calc(var(--spacing) * 12)",
                    } as React.CSSProperties}
                >
                    <AppSidebar variant="inset" />
                    <SidebarInset>
                        <SiteHeader />

                        {/* Botón provisional para añadir nuevo asiento */}
                        <Button style={{ width: "10%", marginLeft: '4%', marginTop: '4%' }} onClick={openModal}>Añadir asiento</Button>
                        <div className="flex flex-1 flex-col">
                            <div className="@container/main flex flex-1 flex-col gap-2">
                                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                                    <SectionCards />
                                    <div className="px-4 lg:px-6">
                                        <ChartAreaInteractive />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SidebarInset>
                </SidebarProvider></></>


    )
}


