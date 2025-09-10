import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { useNavigate } from 'react-router-dom';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { AuthContext } from '../../context/AuthContext';
import React from 'react';

export default function Reportes() {
    const navigate = useNavigate();
    const { isLoggedIn } = React.useContext(AuthContext);

    return (
        <div style={{ backgroundColor: 'rgb(10 10 10)', padding: 0 }} className='grid grid-cols-4 gap-4'>
            <div className='col-span-4  justify-center '>
                <NavigationMenu className='w-full max-w-none'>
                    <NavigationMenuList className='grid grid-cols-10' style={{ color: 'white', borderBottom: '1px solid gray', borderTop: 'none', borderRadius: '8px', backgroundColor: '#1a1a1a' }}>

                        <NavigationMenuItem className='md:col-span-2 col-span-3' >

                            <NavigationMenuLink style={{ fontSize: 'xx-large', fontWeight: 'bold' }} href='/home'>Quint</NavigationMenuLink>

                        </NavigationMenuItem>

                        <NavigationMenuItem className='md:col-span-1 col-span-3' >

                            <NavigationMenuLink href="#servicios">Servicios</NavigationMenuLink>

                        </NavigationMenuItem>
                        <NavigationMenuItem className='md:col-span-1 col-span-3' >

                            <NavigationMenuLink href='https://www.asamblea.gob.sv/sites/default/files/documents/decretos/171117_072920482_archivo_documento_legislativo.pdf'>Código de comercio</NavigationMenuLink>

                        </NavigationMenuItem>

                        <NavigationMenuItem className='md:col-span-1 col-span-3' >

                            <NavigationMenuLink onClick={() => navigate('/libros-diarios')}>Libros diarios</NavigationMenuLink>

                        </NavigationMenuItem>
                        <NavigationMenuItem className='md:col-span-1 col-span-3' >

                            <NavigationMenuLink onClick={() => navigate('/libros-mayores')}>Libros mayores</NavigationMenuLink>

                        </NavigationMenuItem>
                        <NavigationMenuItem className='md:col-span-1 col-span-3' >

                            <NavigationMenuLink onClick={() => navigate('/reportes')}>Reportes</NavigationMenuLink>

                        </NavigationMenuItem>

                        <NavigationMenuItem className='md:col-span-3 md:col-start-10 col-span-4 col-start-4' >
                            {isLoggedIn ? (
                                <Button style={{ color: 'black' }} variant="outline" onClick={() => navigate('/dashboard')}>Dashboard</Button>
                            ) : (
                                <Button style={{ color: 'black' }} variant="outline" onClick={() => navigate('/login')}>Login</Button>
                            )}

                        </NavigationMenuItem>



                    </NavigationMenuList>
                </NavigationMenu>
            </div>

            <div className='col-span-4 justify-center'>
                <Badge style={{ backgroundColor: '#262626' }}>Sistema de Reportes Financieros</Badge>
            </div>

            <h1 style={{ color: 'white', fontSize: 'xxx-large' }} className='font-bold col-span-4'>
                Reportes Financieros
            </h1>

            <p style={{ color: 'white' }} className='col-span-2 col-start-2'>
                Genera reportes financieros precisos y personalizados al instante. Obtén balances, estados de resultados, flujos de caja y otros informes clave para la toma de decisiones estratégicas.
            </p>


            <div className='col-span-4 mt-10 mr-15 ml-15 grid grid-cols-2 gap-6'>
                <div className='col-span-2 md:col-span-1 p-5'>
                    <Card style={{ justifyContent: 'center', backgroundColor: '#1a1a1a' }}>
                        <CardHeader>
                            <CardTitle style={{ color: 'white' }}>Estados Financieros</CardTitle>
                            <CardDescription>Balance general y estado de resultados</CardDescription>
                        </CardHeader>
                        <CardContent style={{ color: 'white' }}>
                            <p>Genera estados financieros completos con información actualizada. Visualiza la situación patrimonial y los resultados de tu empresa de manera clara y profesional.</p>

                        </CardContent>
                    </Card>
                </div>
                <div className='col-span-2 md:col-span-1 p-5'>
                    <Card style={{ justifyContent: 'center', backgroundColor: '#1a1a1a' }}>
                        <CardHeader>
                            <CardTitle style={{ color: 'white' }}>Análisis de Cuentas</CardTitle>
                            <CardDescription>Desglose detallado por cuenta</CardDescription>
                        </CardHeader>
                        <CardContent style={{ color: 'white' }}>
                            <p>Analiza el comportamiento de cada cuenta contable con reportes detallados que incluyen movimientos, saldos y evolución temporal.</p>

                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className='col-span-4 mt-5 mr-15 ml-15 grid grid-cols-3 gap-4'>
                <div className='col-span-3 md:col-span-1 p-5'>
                    <Card style={{ justifyContent: 'center', backgroundColor: '#1a1a1a' }}>
                        <CardHeader>
                            <CardTitle style={{ color: 'white' }}>Reportes Personalizados</CardTitle>
                            <CardDescription>Diseña tus propios informes</CardDescription>
                        </CardHeader>
                        <CardContent style={{ color: 'white' }}>
                            <p>Crea reportes personalizados según las necesidades específicas de tu negocio. Selecciona cuentas, períodos y formatos.</p>
                        </CardContent>
                    </Card>
                </div>
                <div className='col-span-3 md:col-span-1 p-5'>
                    <Card style={{ justifyContent: 'center', backgroundColor: '#1a1a1a' }}>
                        <CardHeader>
                            <CardTitle style={{ color: 'white' }}>Exportación de Datos</CardTitle>
                            <CardDescription>Múltiples formatos disponibles</CardDescription>
                        </CardHeader>
                        <CardContent style={{ color: 'white' }}>
                            <p>Exporta tus reportes en PDF, Excel, CSV o Word para compartir con contadores, inversores o autoridades fiscales.</p>
                        </CardContent>
                    </Card>
                </div>
                <div className='col-span-3 md:col-span-1 p-5'>
                    <Card style={{ justifyContent: 'center', backgroundColor: '#1a1a1a' }}>
                        <CardHeader>
                            <CardTitle style={{ color: 'white' }}>Comparativas Temporales</CardTitle>
                            <CardDescription>Análisis de tendencias</CardDescription>
                        </CardHeader>
                        <CardContent style={{ color: 'white' }}>
                            <p>Compara períodos anteriores para identificar tendencias, crecimiento y áreas de oportunidad en tu negocio.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}