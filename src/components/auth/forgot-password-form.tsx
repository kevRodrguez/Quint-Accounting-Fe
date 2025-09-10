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
import { useState } from 'react'
import { supabase } from '@/lib/client'

export function ForgotPasswordForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // The url which will be included in the email. This URL needs to be configured in your redirect URLs in the Supabase dashboard at https://supabase.com/dashboard/project/_/auth/url-configuration
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'http://localhost:3000/update-password',
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
          <Card style={{ color: '#fafafa', backgroundColor: '#171717' }} className='m-3'>
            <CardHeader>
              <CardTitle className="text-2xl">Revisa tu correo electrónico</CardTitle>
              <CardDescription>Instrucciones para restablecer la contraseña enviadas</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Si te registraste usando tu correo electrónico y contraseña, recibirás un correo electrónico para restablecer la contraseña.
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card style={{ color: '#fafafa', backgroundColor: '#171717' }} className='m-3'>
            <CardHeader>
              <CardTitle className="text-2xl">Restablecer tu contraseña</CardTitle>
              <CardDescription>
                Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleForgotPassword}>
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
                  {error && <p className="text-sm text-red-500">{error}</p>}
                  <Button type="submit" className="w-full bg-white text-black" disabled={isLoading} style={{ backgroundColor: '#e5e5e5', color: 'black' }}>
                    {isLoading ? 'Sending...' : 'Send reset email'}
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  Ya tienes una cuenta?{' '}
                  <a href="/login" className="underline underline-offset-4">
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
