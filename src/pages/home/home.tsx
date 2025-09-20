import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartAreaInteractive } from '@/components/ui/areachart';
import { useNavigate } from 'react-router-dom';
import QuintLogoBlackBG from '@/assets/quint-logos/quint-logo-blackbg.png';
import QuintIconRed from '@/assets/quint-icons/quint-icon-red.png';






// Importaciones para el menú de navegación
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { AuthContext } from '../../context/AuthContext';
import React from 'react';

export default function Home() {
    const navigate = useNavigate();
    const { isLoggedIn } = React.useContext(AuthContext);
    return (
        <div style={{ backgroundColor: 'black', padding: '2rem', textAlign: 'center', margin: '0 auto' }} className='grid grid-cols-4 gap-4'>
            <div className='col-span-4  justify-center '>
                <NavigationMenu className='w-full max-w-none'>
                    <NavigationMenuList className='grid grid-cols-10' style={{ color: 'white', borderBottom: '1px solid gray', borderTop: 'none', borderRadius: '8px', backgroundColor: '#1a1a1a' }}>

                        <NavigationMenuItem className='md:col-span-2 col-span-3' >


                            <NavigationMenuLink style={{ fontSize: 'xx-large', fontWeight: 'bold', padding: '1rem' }} href='/home' className='hover:bg-[#282828] hover:text-white focus:hover:bg-[#282828]'>

                                <img src={QuintLogoBlackBG} alt="Logo" width={180} height={180} style={{ borderRadius: '8px' }}/>
                            </NavigationMenuLink>

                        </NavigationMenuItem>

                        <NavigationMenuItem className='md:col-span-1 col-span-3' >

                            <NavigationMenuLink className="hover:bg-[#282828] hover:text-white" href="#servicios">Servicios</NavigationMenuLink>

                        </NavigationMenuItem>
                        <NavigationMenuItem className='md:col-span-1 col-span-3' >

                            <NavigationMenuLink className="hover:bg-[#282828] hover:text-white" href='https://www.asamblea.gob.sv/sites/default/files/documents/decretos/171117_072920482_archivo_documento_legislativo.pdf'>Código de comercio</NavigationMenuLink>

                        </NavigationMenuItem>

                        <NavigationMenuItem className='md:col-span-1 col-span-3' >

                            <NavigationMenuLink className="hover:bg-[#282828] hover:text-white" onClick={() => navigate('/libros-diarios')}>Libros diarios</NavigationMenuLink>

                        </NavigationMenuItem>
                        <NavigationMenuItem className='md:col-span-1 col-span-3' >

                            <NavigationMenuLink className="hover:bg-[#282828] hover:text-white" onClick={() => navigate('/libros-mayores')}>Libros mayores</NavigationMenuLink>

                        </NavigationMenuItem>
                        <NavigationMenuItem className='md:col-span-1 col-span-3' >

                            <NavigationMenuLink className="hover:bg-[#282828] hover:text-white" onClick={() => navigate('/reportes')}>Reportes</NavigationMenuLink>

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
                <Badge style={{ backgroundColor: '#262626' }}>Ahora Disponible en la versión 1.1</Badge>
            </div>

            {/* imagen logo */}
            <div className='col-span-4 justify-center flex'>
                <img src={QuintIconRed} alt="Logo" width={100} height={100} style={{ borderRadius: '8px' }} />
            </div>

            {/* Cambiado el header principal */}
            <h1 style={{ color: 'white', fontSize: 'xx-large' }} className='font-bold col-span-4'>
                ¡Bienvenido a Quint Accounting!
            </h1>
            {/* Cambiado el subheader */}
            <p style={{ color: 'white' }} className='col-span-2 col-start-2'>
                Gestiona tus libros contables, genera reportes financieros detallados y mantén el control total de tu contabilidad con Quint Accounting. Solución integral, fácil de usar y diseñada para tu negocio.
            </p>

            <div className='col-span-2 col-start-2 grid grid-cols-4 gap-4 mt-5'>
                <Button className='col-span-4 md:col-start-2  md:col-span-1' onClick={() => navigate('/sign-up')}>Regístrate</Button>
                <Button className='col-span-4 md:col-start-3 md:col-span-1' onClick={() => navigate('/login')}>Inicia Sesión</Button>
            </div>

            <div className='col-span-4 mt-5 mr-15 ml-15'>

                <ChartAreaInteractive></ChartAreaInteractive>
            </div>

            <div className='col-span-4 mt-5 mr-15 ml-15 grid grid-cols-3' id='servicios'>
                <div className='col-span-3 md:col-span-1 p-5'>
                    <Card style={{ justifyContent: 'center', backgroundColor: '#1a1a1a' }}>
                        <CardHeader>
                            <CardTitle style={{ color: 'white' }}>Libros Diarios y Mayores</CardTitle>
                            <CardDescription>Gestión completa de registros contables</CardDescription>
                        </CardHeader>
                        <CardContent style={{ color: 'white' }}>
                            <p>Automatiza tus registros contables con nuestro sistema de libros diarios y mayores. Genera asientos automáticos, consulta balances en tiempo real y mantén tu contabilidad siempre actualizada y organizada.</p>
                        </CardContent>
                    </Card>
                </div>
                <div className='col-span-3 md:col-span-1 p-5'>
                    <Card style={{ justifyContent: 'center', backgroundColor: '#1a1a1a' }}>
                        <CardHeader>
                            <CardTitle style={{ color: 'white' }}>Creación de Libros Contables</CardTitle>
                            <CardDescription>Organiza y gestiona tus libros contables fácilmente</CardDescription>
                        </CardHeader>
                        <CardContent style={{ color: 'white' }}>
                            <p>Crea y administra tus libros contables de manera intuitiva. Personaliza tus registros, agrega nuevas cuentas y mantén toda tu información financiera centralizada y segura.</p>
                        </CardContent>
                    </Card>
                </div>
                <div className='col-span-3 md:col-span-1 p-5'>
                    <Card style={{ justifyContent: 'center', backgroundColor: '#1a1a1a' }}>
                        <CardHeader>
                            <CardTitle style={{ color: 'white' }}>Generación de Reportes</CardTitle>
                            <CardDescription>Obtén reportes financieros detallados al instante</CardDescription>
                        </CardHeader>
                        <CardContent style={{ color: 'white' }}>
                            <p>Genera reportes financieros precisos y personalizados en segundos. Visualiza balances, estados de resultados y otros informes clave para tomar mejores decisiones.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

