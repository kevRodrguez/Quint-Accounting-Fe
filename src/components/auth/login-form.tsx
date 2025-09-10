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

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { logIn, error, clearError, session } = useContext(AuthContext);
  const navigate = useNavigate();

  // Si ya hay una sesión activa, redirigir al dashboard
  if (session) {
    navigate('/dashboard');
  }


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    clearError()

    try {
      await logIn({ email, password });
      // Si llegamos aquí, el login fue exitoso
      // La navegación se maneja automáticamente en el AuthContext
      console.log('Login successful');

    } catch (error: unknown) {
      // El error ya está manejado en el contexto, no necesitamos hacer nada aquí
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false)
    }
  }

  return (

    <div className='flex flex-col items-center justify-center bg-black min-h-screen'>
      <div className='w-full text-center mb-6 ' style={{ color: '#fafafa' }}>
        <h1 style={{ fontWeight: 'bold', fontSize: 'xxx-large' }}>Quint Accounting</h1>
        <p style={{ color: "D9D9D9" }}>Tu mejor elección contable</p>
      </div>
      <div className={cn('w-full max-w-[500px] min-w-[300px] flex flex-col gap-6 px-4', className)} {...props}>
        <Card style={{ color: '#fafafa', backgroundColor: '#171717' }} className='m-3'>
          <CardHeader>
            <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
            <CardDescription>Ingresa tu correo electrónico a continuación para iniciar sesión en tu cuenta</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Contraseña</Label>
                    <a
                      href="/forgot-password"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
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
    </div>
  )
}
