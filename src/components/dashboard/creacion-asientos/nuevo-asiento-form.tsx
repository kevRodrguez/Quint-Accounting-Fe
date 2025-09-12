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

import CurrencyInput from 'react-currency-input-field';
export function NuevoAsientoForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {

    const [isLoading, setIsLoading] = useState(false);
    const [descripcion, setDescripcion] = useState('');
    const [fecha, setFecha] = useState<Date | undefined>(new Date());

    const cuentaItems = [
        { label: '001-Caja', value: '001-Caja' },
        { label: '002-Banco', value: '002-Banco' },
        { label: '003-Ventas', value: '003-Ventas' },
        { label: '004-Compras', value: '004-Compras' },
        { label: '005-Capital', value: '005-Capital' },
        { label: '006-Proveedores', value: '006-Proveedores' },
        { label: '007-Clientes', value: '007-Clientes' },
        { label: '008-Gastos', value: '008-Gastos' },
        { label: '009-Ingresos', value: '009-Ingresos' },
    ];

    const [idCounter, setIdCounter] = useState(3); // Estado para llevar el conteo de IDs

    const [movimientos, setMovimientos] = useState([
        { id: 1, cuenta: 'Caja', debe: 1000, haber: 0, },
        { id: 2, cuenta: 'Ventas', debe: 0, haber: 1000, }
    ]);

    const [nuevoMovimiento, setNuevoMovimiento] = useState({ cuenta: '', debe: 0, haber: 0, descripcion: '' });


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
                                        <Combobox style={{ width: '100%' }} title="cuenta" items={cuentaItems} onSelect={(value) => setNuevoMovimiento({ ...nuevoMovimiento, cuenta: value })} />
                                    </div>
                                    <div className='col-span-2'>
                                        <CurrencyInput
                                            id="debe-input"
                                            name="debe"
                                            placeholder="$0.00"
                                            defaultValue={0}
                                            decimalsLimit={2}
                                            prefix="$"
                                            value={nuevoMovimiento.debe}
                                            onValueChange={(value) => setNuevoMovimiento({ ...nuevoMovimiento, debe: Number(value) || 0 })}
                                            style={{ border: 'none' }}
                                            className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                                        />
                                    </div>
                                    <div className='col-span-2 flex' style={{ alignItems: 'center' }}>
                                        <CurrencyInput
                                            id="haber-input"
                                            name="haber"
                                            placeholder="$0.00"
                                            defaultValue={0}
                                            decimalsLimit={2}
                                            prefix="$"
                                            value={nuevoMovimiento.haber}
                                            onValueChange={(value) => setNuevoMovimiento({ ...nuevoMovimiento, haber: Number(value) || 0 })}
                                            style={{ border: 'none' }}
                                            className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                                        />

                                    </div>
                                    <div className='col-span-1' style={{ display: 'flex', justifyContent: 'center' }} >
                                        <Button type='button' onClick={() => {
                                            console.log(nuevoMovimiento);

                                            setMovimientos([...movimientos, { id: idCounter, cuenta: nuevoMovimiento.cuenta, debe: nuevoMovimiento.debe, haber: nuevoMovimiento.haber }])
                                            setIdCounter(idCounter + 1); // Incrementar el contador de IDs
                                            setNuevoMovimiento({ cuenta: '', debe: 0, haber: 0, descripcion: '' })
                                        }}>+</Button>
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
                                                    <Combobox style={{ width: '100%' }} title="cuenta" items={cuentaItems} selected={movimiento.cuenta} />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        style={{ border: 'none' }}
                                                        value={movimiento.debe}
                                                        onChange={(e) => console.log(e.target.value)}
                                                        placeholder="debe"
                                                        className="w-full"
                                                    />
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
                                                    onChange={(e) => {
                                                        setMovimientos
                                                    }
                                                    }
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
