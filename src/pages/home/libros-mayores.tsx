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

export default function LibrosMayores() {
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
                <Badge style={{ backgroundColor: '#262626' }}>Sistema de Libros Mayores</Badge>
            </div>

            <h1 style={{ color: 'white', fontSize: 'xxx-large' }} className='font-bold col-span-4'>
                Libros Mayores
            </h1>

            <p style={{ color: 'white' }} className='col-span-2 col-start-2'>
                Consolida y organiza todas las transacciones por cuenta contable. Los libros mayores te permiten visualizar el historial completo de movimientos, saldos acumulados y el estado actual de cada cuenta.
            </p>



            <div className='col-span-4 mt-10 mr-15 ml-15 grid grid-cols-2 gap-6'>
                <div className='col-span-2 md:col-span-1 p-5'>
                    <Card style={{ justifyContent: 'center', backgroundColor: '#1a1a1a' }}>
                        <CardHeader>
                            <CardTitle style={{ color: 'white' }}>Mayor General</CardTitle>
                            <CardDescription>Vista consolidada de todas las cuentas</CardDescription>
                        </CardHeader>
                        <CardContent style={{ color: 'white' }}>
                            <p>Accede al mayor general completo con todas las cuentas contables, sus saldos actuales y el histórico de movimientos organizados cronológicamente.</p>

                        </CardContent>
                    </Card>
                </div>
                <div className='col-span-2 md:col-span-1 p-5'>
                    <Card style={{ justifyContent: 'center', backgroundColor: '#1a1a1a' }}>
                        <CardHeader>
                            <CardTitle style={{ color: 'white' }}>Mayor por Cuenta</CardTitle>
                            <CardDescription>Detalle específico de cada cuenta</CardDescription>
                        </CardHeader>
                        <CardContent style={{ color: 'white' }}>
                            <p>Consulta el mayor individual de cualquier cuenta contable con todos sus movimientos, débitos, créditos y saldo actualizado en tiempo real.</p>

                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className='col-span-4 mt-5 mr-15 ml-15 grid grid-cols-3 gap-4'>
                <div className='col-span-3 md:col-span-1 p-5'>
                    <Card style={{ justifyContent: 'center', backgroundColor: '#1a1a1a' }}>
                        <CardHeader>
                            <CardTitle style={{ color: 'white' }}>Balance de Comprobación</CardTitle>
                            <CardDescription>Verificación de saldos</CardDescription>
                        </CardHeader>
                        <CardContent style={{ color: 'white' }}>
                            <p>Genera automáticamente el balance de comprobación con todos los saldos deudores y acreedores para verificar la exactitud contable.</p>
                        </CardContent>
                    </Card>
                </div>
                <div className='col-span-3 md:col-span-1 p-5'>
                    <Card style={{ justifyContent: 'center', backgroundColor: '#1a1a1a' }}>
                        <CardHeader>
                            <CardTitle style={{ color: 'white' }}>Filtros Avanzados</CardTitle>
                            <CardDescription>Búsqueda personalizada</CardDescription>
                        </CardHeader>
                        <CardContent style={{ color: 'white' }}>
                            <p>Utiliza filtros por fecha, tipo de cuenta, rango de saldos o categorías para encontrar exactamente la información que necesitas.</p>
                        </CardContent>
                    </Card>
                </div>
                <div className='col-span-3 md:col-span-1 p-5'>
                    <Card style={{ justifyContent: 'center', backgroundColor: '#1a1a1a' }}>
                        <CardHeader>
                            <CardTitle style={{ color: 'white' }}>Conciliación Bancaria</CardTitle>
                            <CardDescription>Verificación con extractos</CardDescription>
                        </CardHeader>
                        <CardContent style={{ color: 'white' }}>
                            <p>Herramientas integradas para facilitar la conciliación bancaria comparando los mayores con los extractos bancarios.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}