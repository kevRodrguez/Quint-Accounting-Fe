
import { AppSidebar } from '@/components/dashboard/sidebar/app-sidebar';
import { ChartAreaInteractive } from '@/components/dashboard/chart-area-interactive';
// import { SectionCards } from '@/components/dashboard/section-cards';
import { SiteHeader } from '@/components/dashboard/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import React, { useEffect } from 'react'
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { IconTrendingUp } from '@tabler/icons-react';
import { Badge } from 'lucide-react';
import { EstadisticasService } from '@/services/estadisticas/estadisticas.service';
export default function Dashboard() {

    return (

        <SidebarProvider
            style={{
                "--sidebar-width": "calc(var(--spacing) * 72)",
                "--header-height": "calc(var(--spacing) * 12)",
            } as React.CSSProperties}
        >
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader title='Dashboard' />

                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            {/* <SectionCards /> */}
                            <div className="px-4 lg:px-6">
                                <ChartAreaInteractive />

                                {/* cards para estadisticas */}

                                <div className='grid grid-cols-2 gap-4'>

                                    {/* Total de Activos en el último mes */}
                                    <Card className="@container/card mt-2">
                                        <CardHeader>
                                            <CardDescription>Total de Activos</CardDescription>
                                            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                                $1,250.00
                                            </CardTitle>
                                            <CardAction>
                                                <Badge>
                                                    <IconTrendingUp />
                                                    +12.5%
                                                </Badge>
                                            </CardAction>
                                        </CardHeader>
                                        <CardFooter className="flex-col items-start gap-1.5 text-sm">
                                            <div className="line-clamp-1 flex gap-2 font-medium">
                                                Han aumentado un 12.5% este último mes <IconTrendingUp className="size-4" />
                                            </div>
                                            <div className="text-muted-foreground">
                                                Total de activos registrados en el último mes
                                            </div>
                                        </CardFooter>
                                    </Card>

                                    {/* Total de Pasivos en el último mes */}
                                    <Card className="@container/card mt-2">
                                        <CardHeader>
                                            <CardDescription>Total de Pasivos</CardDescription>
                                            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                                $800.00
                                            </CardTitle>
                                            <CardAction>
                                                <Badge>
                                                    <IconTrendingUp />
                                                    +8.2%
                                                </Badge>
                                            </CardAction>
                                        </CardHeader>
                                        <CardFooter className="flex-col items-start gap-1.5 text-sm">
                                            <div className="line-clamp-1 flex gap-2 font-medium">
                                                Han aumentado un 8.2% este último mes <IconTrendingUp className="size-4" />
                                            </div>
                                            <div className="text-muted-foreground">
                                                Total de pasivos registrados en el último mes
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </div>

                                {/* Total de Capital Contable e Ingresos en el último mes */}
                                <div className='grid grid-cols-2 gap-4 mt-4'>

                                    {/* Total de Capital Contable */}
                                    <Card className="@container/card mt-2">
                                        <CardHeader>
                                            <CardDescription>Total de Capital Contable</CardDescription>
                                            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                                $450.00
                                            </CardTitle>
                                            <CardAction>
                                                <Badge>
                                                    <IconTrendingUp />
                                                    +5.0%
                                                </Badge>
                                            </CardAction>
                                        </CardHeader>
                                        <CardFooter className="flex-col items-start gap-1.5 text-sm">
                                            <div className="line-clamp-1 flex gap-2 font-medium">
                                                Ha aumentado un 5% este último mes <IconTrendingUp className="size-4" />
                                            </div>
                                            <div className="text-muted-foreground">
                                                Capital contable acumulado en el último mes
                                            </div>
                                        </CardFooter>
                                    </Card>

                                    {/* Total de Ingresos en el último mes */}
                                    <Card className="@container/card mt-2">
                                        <CardHeader>
                                            <CardDescription>Total de Ingresos</CardDescription>
                                            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                                $2,000.00
                                            </CardTitle>
                                            <CardAction>
                                                <Badge>
                                                    <IconTrendingUp />
                                                    +15.3%
                                                </Badge>
                                            </CardAction>
                                        </CardHeader>
                                        <CardFooter className="flex-col items-start gap-1.5 text-sm">
                                            <div className="line-clamp-1 flex gap-2 font-medium">
                                                Han aumentado un 15.3% este último mes <IconTrendingUp className="size-4" />
                                            </div>
                                            <div className="text-muted-foreground">
                                                Ingresos totales generados en el último mes
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>


    )
}


