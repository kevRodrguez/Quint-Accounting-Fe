# Quint Accounting — Frontend (ATC-software-contable-fe)

guía para levantar el proyecto, entender el flujo de autenticación con Supabase y resolver los problemas más comunes detectados durante el desarrollo.

## Requisitos
- Node.js (>=16)
- npm o pnpm/yarn
- Cuenta y proyecto de Supabase (URL + anon key)

## Archivos relevantes
- `src/lib/client.ts` - fábrica del cliente de Supabase (se recomienda singleton)
- `src/context/AuthContext.tsx` - proveedor de autenticación y lógica principal
- `src/store/useAuthStore.tsx` - store (Zustand) que mantiene `session`, `isLoading`, `isLoggedIn`, `error`
- `src/components/auth/ProtectedRoute.tsx` - envoltorio para rutas privadas
- `src/components/auth/login-form.tsx` - formulario de login que usa `AuthContext`
- `src/App.tsx` - punto de entrada donde **debe** envolver las rutas con `AuthProvider`

## Variables de entorno
Rellena las variables en un archivo `.env.local` (puedes copiar `.env.local.template`):

```bash
VITE_SUPABASE_URL=<your-supabase-url>
VITE_SUPABASE_PUBLISHABLE_OR_ANON_KEY=<your-anon-key>
```

## Instalación y ejecución (macOS / zsh)
Instala dependencias:

```bash
npm install
```

Arrancar en modo desarrollo:

```bash
npm run dev
```

Construir para producción:

```bash
npm run build
npm run preview
```

## Flujo de autenticación (resumen de contrato)
- Input: `email` y `password` en el formulario (`login-form.tsx`).
- Output: Supabase crea sesión; `AuthContext`/`useAuthStore` guardan `session` y `isLoggedIn`.
- Error modes: credenciales inválidas, problemas de red, token expirado.

Comportamiento esperado:
- Al iniciar la app, `AuthProvider` realiza `supabase.auth.getSession()` y actualiza `useAuthStore`.
- Mientras se verifica la sesión, el UI debe mostrar un estado `isLoading` (pantalla de loading).
- Si existe sesión válida, `isLoggedIn` = true y el usuario puede acceder a rutas protegidas.
- Si no existe sesión o está vencida, se redirige a `/login`.

## Buenas prácticas y notas importantes
- Asegúrate de crear un único cliente de Supabase (singleton). Si llamas a `createClient()` muchas veces en el mismo contexto de navegador verás: `Multiple GoTrueClient instances detected...` y comportamiento indefinido. Revisa `src/lib/client.ts` si utilizaras algún método que contenga el cliente de supabase, importar supabase de `src/lib/client.ts`, no crear un cliente nuevo.
- El `AuthProvider` debe envolver las rutas antes de consumir el `AuthContext`. No uses `useContext(AuthContext)` fuera del proveedor o leerás valores por defecto que provocan pantalla de carga infinita.
- Evita navegar directamente desde el callback `onAuthStateChange` salvo que sepas controlar bucles; en muchos casos basta con actualizar el estado y dejar que la UI (o el componente de rutas) decida la navegación.
- Siempre desuscribirse de `onAuthStateChange` en el cleanup del `useEffect`.
- Mantén el estado de `isLoading` en el store y cámbialo a `false` una vez se recupere la sesión inicial (o en caso de error).