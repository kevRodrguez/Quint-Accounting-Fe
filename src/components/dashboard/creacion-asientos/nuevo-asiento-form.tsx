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
import { useContext, useState } from 'react'
import { AuthContext } from '@/context/AuthContext'
import { useNavigate } from 'react-router-dom'
import QuintIconRed from '@/assets/quint-icons/quint-icon-red.png';
import { Calendar } from '@/components/ui/calendar'
import { DatePicker } from '@/components/ui/date-picker'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { date } from 'zod'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export function NuevoAsientoForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const [descripcion, setDescripcion] = useState('');
    const [fecha, setFecha] = useState<Date | undefined>(new Date());

    const navigate = useNavigate();

    // Si ya hay una sesión activa, redirigir al dashboard



    return (


        <div className={cn('w-full max-w-[500px] min-w-[300px] flex flex-col gap-6 px-4', className)} {...props}>
            <Card style={{ color: '#fafafa', backgroundColor: '#171717' }} className='m-3'>
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
                                            style={{ backgroundColor: 'rgb(23 23 23)', color: 'rgb(229 229 229)' }}
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
                                <Table>
                                    <TableCaption>A list of your recent invoices.</TableCaption>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px]">Invoice</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Method</TableHead>
                                            <TableHead className="text-right">Amount</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="font-medium">INV001</TableCell>
                                            <TableCell>Paid</TableCell>
                                            <TableCell>Credit Card</TableCell>
                                            <TableCell className="text-right">$250.00</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>


                            <Button type="submit" className="w-full" disabled={isLoading} style={{ backgroundColor: '#e5e5e5', color: 'black' }}>
                                {isLoading ? 'Logging in...' : 'Login'}
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            No tienes una cuenta?{' '}
                            <a href="/sign-up" className="underline underline-offset-4">
                                Registrarse
                            </a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>

    )
}
