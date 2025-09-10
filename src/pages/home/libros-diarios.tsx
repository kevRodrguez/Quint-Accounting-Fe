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

export default function LibrosDiarios() {
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
                <Badge style={{ backgroundColor: '#262626' }}>Sistema de Libros Diarios</Badge>
            </div>

            <h1 style={{ color: 'white', fontSize: 'xxx-large' }} className='font-bold col-span-4'>
                Libros Diarios
            </h1>

            <p style={{ color: 'white' }} className='col-span-2 col-start-2'>
                Gestiona y automatiza tus registros contables diarios. Registra transacciones, genera asientos automáticos y mantén un control detallado de todas las operaciones financieras de tu empresa.
            </p>



            <div className='col-span-4 mt-10 mr-15 ml-15 grid grid-cols-2 gap-6'>
                <div className='col-span-2 md:col-span-1 p-5'>
                    <Card style={{ justifyContent: 'center', backgroundColor: '#1a1a1a' }}>
                        <CardHeader>
                            <CardTitle style={{ color: 'white' }}>Registro de Transacciones</CardTitle>
                            <CardDescription>Captura todas tus operaciones diarias</CardDescription>
                        </CardHeader>
                        <CardContent style={{ color: 'white' }}>
                            <p>Registra ventas, compras, gastos e ingresos de manera rápida y precisa. Nuestro sistema valida automáticamente los asientos para garantizar el balance contable.</p>

                        </CardContent>
                    </Card>
                </div>
                <div className='col-span-2 md:col-span-1 p-5'>
                    <Card style={{ justifyContent: 'center', backgroundColor: '#1a1a1a' }}>
                        <CardHeader>
                            <CardTitle style={{ color: 'white' }}>Consulta de Asientos</CardTitle>
                            <CardDescription>Busca y revisa registros anteriores</CardDescription>
                        </CardHeader>
                        <CardContent style={{ color: 'white' }}>
                            <p>Accede fácilmente a todos tus asientos contables. Filtra por fecha, cuenta o tipo de transacción para encontrar exactamente lo que necesitas.</p>

                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className='col-span-4 mt-5 mr-15 ml-15 grid grid-cols-3 gap-4'>
                <div className='col-span-3 md:col-span-1 p-5'>
                    <Card style={{ justifyContent: 'center', backgroundColor: '#1a1a1a' }}>
                        <CardHeader>
                            <CardTitle style={{ color: 'white' }}>Asientos Automáticos</CardTitle>
                            <CardDescription>Automatización inteligente</CardDescription>
                        </CardHeader>
                        <CardContent style={{ color: 'white' }}>
                            <p>Configura reglas para generar asientos automáticos basados en patrones recurrentes, ahorrando tiempo y reduciendo errores.</p>
                        </CardContent>
                    </Card>
                </div>
                <div className='col-span-3 md:col-span-1 p-5'>
                    <Card style={{ justifyContent: 'center', backgroundColor: '#1a1a1a' }}>
                        <CardHeader>
                            <CardTitle style={{ color: 'white' }}>Validación de Balance</CardTitle>
                            <CardDescription>Control de integridad contable</CardDescription>
                        </CardHeader>
                        <CardContent style={{ color: 'white' }}>
                            <p>Sistema automático de validación que verifica que todos los asientos estén balanceados antes de su registro definitivo.</p>
                        </CardContent>
                    </Card>
                </div>
                <div className='col-span-3 md:col-span-1 p-5'>
                    <Card style={{ justifyContent: 'center', backgroundColor: '#1a1a1a' }}>
                        <CardHeader>
                            <CardTitle style={{ color: 'white' }}>Backup Automático</CardTitle>
                            <CardDescription>Seguridad de tus datos</CardDescription>
                        </CardHeader>
                        <CardContent style={{ color: 'white' }}>
                            <p>Respaldo automático de todos tus registros contables para garantizar la seguridad y disponibilidad de tu información financiera.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}