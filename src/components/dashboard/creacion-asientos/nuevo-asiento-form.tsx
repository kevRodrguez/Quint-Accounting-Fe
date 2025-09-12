import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { Combobox } from '@/components/ui/combobox'
import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'


export function NuevoAsientoForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {

    const [isLoading, setIsLoading] = useState(false);
    const [descripcion, setDescripcion] = useState('');
    const [fecha, setFecha] = useState<Date | undefined>(new Date());

    const cuentaItems = [
        { label: 'Caja', value: 'caja' },
        { label: 'Banco', value: 'banco' },
        { label: 'Ventas', value: 'ventas' },
        { label: 'Compras', value: 'compras' },
        { label: 'Capital', value: 'capital' },
        { label: 'Proveedores', value: 'proveedores' },
        { label: 'Clientes', value: 'clientes' },
        { label: 'Gastos', value: 'gastos' },
        { label: 'Ingresos', value: 'ingresos' },
    ];



    const [movimientos, setMovimientos] = useState([
        { id: 1, cuenta: 'Caja', debe: 1000, haber: 0, descripcion: 'Venta de productos' },
        { id: 2, cuenta: 'Ventas', debe: 0, haber: 1000, descripcion: 'Registro de venta' }
    ]);

    return (

        //Modal para nuevo asiento
        <div className={cn('w-full h-full flex flex-col gap-6', className)} {...props}>
            <Card style={{ color: '#000000ff', backgroundColor: 'white' }} className='w-full h-full m-0 border-0'>
                <CardHeader>
                    <CardTitle className="text-2xl">Nuevo Asiento</CardTitle>
                    <CardDescription>Ingresa los detalles del nuevo asiento a continuación</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={() => console.log("enviando")}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="descripcion">Descripcion</Label>
                                <Input
                                    id="descripcion"
                                    type="text"
                                    placeholder="Descripción del asiento"
                                    required
                                    value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="fecha">Fecha</Label>


                                {/* calendario */}
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button

                                            variant="outline"
                                            data-empty={!fecha}
                                            style={{ backgroundColor: 'white', color: 'black', width: '100%' }}
                                            className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
                                        >
                                            <CalendarIcon />
                                            {fecha ? format(fecha, "PPP") : <span>Selecciona una fecha</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar mode="single" selected={fecha} onSelect={setFecha} />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="grid gap-2">


                                {/* form nuevo movimiento */}
                                <div className="grid grid-cols-7 gap-1 p-3" style={{ border: '1px dashed gray', borderRadius: '8px' }}>
                                    <div className='col-span-7 mb-5 font-bold'>Nuevo Movimiento:</div>
                                    <span className='col-span-7' style={{ border: '0.5px solid  gray', marginBottom: '8px', opacity: '0.3' }}></span>
                                    <div className='col-span-2' >
                                        <Combobox style={{ width: '100%' }} title="cuenta" items={cuentaItems} />
                                    </div>
                                    <div className='col-span-2'>
                                        <Input
                                            style={{ border: 'none' }}
                                            value={''}
                                            onChange={(e) => console.log(e.target.value)}
                                            placeholder="debe"
                                            className="w-full"
                                        />
                                    </div>
                                    <div className='col-span-2'>
                                        <Input
                                            style={{ border: 'none' }}
                                            value={''}
                                            onChange={(e) => console.log(e.target.value)}
                                            placeholder="haber"
                                            className="w-full"
                                        />
                                    </div>
                                    <div className='col-span-1' style={{ display: 'flex', justifyContent: 'center' }} >
                                        <Button>+</Button>
                                    </div>
                                </div>

                                {/* tabla movimientos */}
                                <h1 style={{ fontSize: 'large', fontWeight: 'bold' }}>Movimientos del asiento:</h1>
                                <Table >

                                    <TableHeader>
                                        <TableRow >
                                            <TableHead style={{ color: 'white', backgroundColor: 'rgb(254 46 46)' }} className="w-[100px]">cuenta</TableHead>
                                            <TableHead style={{ color: 'white', backgroundColor: 'rgb(254 46 46)' }}>Debe</TableHead>
                                            <TableHead style={{ color: 'white', backgroundColor: 'rgb(254 46 46)' }}>Haber</TableHead>

                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {movimientos.map((movimiento) =>
                                        (
                                            <TableRow key={movimiento.id} style={{ borderBottom: '1px solid gray' }}>

                                                <TableCell>
                                                    <Input
                                                        style={{ border: 'none' }}
                                                        value={movimiento.cuenta}
                                                        onChange={(e) => console.log(e.target.value)}
                                                        placeholder="Seleccionar cuenta"
                                                        className="w-full"
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Combobox style={{ width: '100%' }} title="cuenta" items={cuentaItems} />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        style={{ border: 'none' }}
                                                        value={movimiento.haber}
                                                        onChange={(e) => console.log(e.target.value)}
                                                        placeholder="Seleccionar cuenta"
                                                        className="w-full"
                                                    />
                                                </TableCell>

                                            </TableRow>
                                        ))}
                                        <TableRow style={{ backgroundColor: '#DEDEDE' }} >

                                            <TableCell>
                                                <Label>Total:</Label>
                                            </TableCell>
                                            <TableCell>
                                                <Input
                                                    style={{ border: 'none' }}
                                                    value={10000}
                                                    onChange={(e) => console.log(e.target.value)}
                                                    placeholder="Seleccionar cuenta"
                                                    className="w-full"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Input
                                                    style={{ border: 'none' }}
                                                    value={50000}
                                                    onChange={(e) => console.log(e.target.value)}
                                                    placeholder="Seleccionar cuenta"
                                                    className="w-full"
                                                />
                                            </TableCell>

                                        </TableRow>

                                    </TableBody>

                                </Table>
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isLoading}
                                style={{
                                    backgroundColor: 'black',
                                    color: 'white',
                                    fontWeight: '600'
                                }}
                            >
                                {isLoading ? 'Creando asiento...' : 'Crear Asiento Contable'}
                            </Button>
                        </div>

                    </form>
                </CardContent>
            </Card>
        </div>

    )
}
