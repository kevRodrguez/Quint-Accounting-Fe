import { createContext, useEffect, type PropsWithChildren } from "react";
import type { Session } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import type { LoginRequest } from "@/types/auth.types";
import { useAuthStore } from "@/store/useAuthStore";
import { supabase } from "@/lib/client";

export interface AuthContextProps {
  session: Session | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  error: string | null;
  logOut: () => Promise<void>;
  logIn: (credentials: LoginRequest) => Promise<void>;
  clearError: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  session: null,
  isLoading: true,
  isLoggedIn: false,
  error: null,
  logOut: async () => {},
  logIn: async () => {},
  clearError: () => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
  const navigate = useNavigate();

  // Obtener estados del store
  const session = useAuthStore((state) => state.session);
  const isLoading = useAuthStore((state) => state.isLoading);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const error = useAuthStore((state) => state.error);

  // Obtener funciones del store
  const setSession = useAuthStore((state) => state.setSession);
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
  const setIsLoading = useAuthStore((state) => state.setIsLoading);
  const setError = useAuthStore((state) => state.setError);

  const clearError = () => setError(null);

  useEffect(() => {
    setIsLoading(true);

    // Carga inicial de sesión
    supabase.auth
      .getSession()
      .then(({ data }: { data: { session: Session | null } }) => {
        setSession(data.session);
        setIsLoggedIn(!!data.session);
      })
      .catch((error: any) => {
        setIsLoggedIn(false);
      })
      .finally(() => {
        setIsLoading(false);
      });

    // Suscripción a cambios de autenticación
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setIsLoggedIn(!!session);

      // Si la sesión se invalida (logout/expired), llevar al login
      //   if (!session) {
      //     navigate('/login');
      //   }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, setIsLoading, setIsLoggedIn, setSession]);

  const logIn = async (credentials: LoginRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword(credentials);
      if (error) throw error;

      // La sesión se actualizará automáticamente a través del listener onAuthStateChange
      navigate("/dashboard");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      setError(errorMessage);
      throw error; // Re-throw para que el formulario pueda manejarlo
    } finally {
      setIsLoading(false);
    }
  };

  const logOut = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { error } = await supabase.auth.signOut();

      if (error) {
        setError(error.message);
        return;
      }

      // Limpiar el estado local
      setIsLoggedIn(false);
      setSession(null);

      // Navegar al login
      navigate("/login");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        logIn,
        session,
        logOut,
        isLoading,
        isLoggedIn,
        error,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
