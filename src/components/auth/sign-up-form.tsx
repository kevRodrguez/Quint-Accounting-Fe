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
import { supabase } from '@/lib/client'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '@/context/AuthContext'

export function SignUpForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const navigate = useNavigate()
  const { session } = useContext(AuthContext);
  // Si ya hay una sesión activa, redirigir al dashboard
  if (session) {
    navigate('/dashboard');
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password !== repeatPassword) {
      setError('Passwords do not match')
      return
    }
    setIsLoading(true)

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) throw error
      setSuccess(true)
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred')
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
        {success ? (
          <Card >
            <CardHeader>
              <CardTitle className="text-2xl">Gracias por registrarte!!</CardTitle>
              <CardDescription>Revisa tu correo para confirmación</CardDescription>
              <Button onClick={() => navigate('/login')}>Volver a inicio</Button>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Te has registrado con éxito. Por favor, revisa tu correo para confirmar tu cuenta antes de
                iniciar sesión.
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card style={{ backgroundColor: '#171717', color: '#fafafa' }}>
            <CardHeader>
              <CardTitle className="text-2xl">Registrarse</CardTitle>
              <CardDescription>Crear una nueva cuenta</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignUp}>
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
                    </div>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="repeat-password">Repetir Contraseña</Label>
                    </div>
                    <Input
                      id="repeat-password"
                      type="password"
                      required
                      value={repeatPassword}
                      onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                  </div>
                  {error && <p className="text-sm text-red-500">{error}</p>}
                  <Button type="submit" className="w-full" disabled={isLoading} style={{ backgroundColor: '#e5e5e5', color: 'black' }}>
                    {isLoading ? 'Creando cuenta...' : 'Registrarse'}
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  Ya tienes una cuenta?{' '}
                  <a href="/login" className="underline underline-offset-4" >
                    Iniciar sesión
                  </a>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
