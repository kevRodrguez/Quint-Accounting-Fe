import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button'
import { useNavigate } from 'react-router-dom'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { ChartAreaInteractive } from './components/ui/areachart';

export default function home() {

    const navigate = useNavigate();
    return (
        <div style={{ backgroundColor: 'rgb(10 10 10)', padding: 0, paddingTop: '4%' }} className='grid grid-cols-4 gap-4'>
            <div className='col-span-4 justify-center'>
                <Badge style={{ backgroundColor: '#262626' }}>Ahora Disponible en la versión 1.1</Badge>
            </div>

            {/* Cambiado el header principal */}
            <h1 style={{ color: 'white', fontSize: 'xxx-large' }} className='font-bold col-span-4'>
                Bienvenido a Quint Accounting!!
            </h1>
            {/* Cambiado el subheader */}
            <p style={{ color: 'white' }} className='col-span-2 col-start-2'>
                Gestiona tus libros contables, genera reportes financieros detallados y mantén el control total de tu contabilidad con Quint Accounting. Solución integral, fácil de usar y diseñada para tu negocio.
            </p>

            <div className='col-span-2 col-start-2 grid grid-cols-4 gap-4 mt-5'>
                <Button className='col-span-4 md:col-start-2  md:col-span-1' onClick={() => navigate('/login')}>Comenzar ahora!</Button>
                <Button className='col-span-4 md:col-start-3 md:col-span-1' onClick={() => navigate('/login')}>Ver Servicios</Button>
            </div>

            <div className='col-span-4 mt-5 mr-15 ml-15'>

                <ChartAreaInteractive></ChartAreaInteractive>
            </div>

            <div className='col-span-4 mt-5 mr-15 ml-15 grid grid-cols-3'>
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
