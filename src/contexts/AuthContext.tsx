import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { authService } from "@/services";
import type { Usuario } from "@/services";

interface AuthContextType {
  user: Usuario | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string, nombre: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Verificar sesión inicial - solo una vez
    const initializeAuth = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error("Error getting session:", error);
          return;
        }

        if (session?.user && mounted) {
          // Crear usuario directamente desde la sesión sin llamada adicional
          const usuario: Usuario = {
            id: session.user.id,
            email: session.user.email || "",
            nombre:
              session.user.user_metadata?.nombre || session.user.email?.split("@")[0] || "Usuario",
            telefono: session.user.user_metadata?.telefono,
            avatar_url: session.user.user_metadata?.avatar_url,
            role: "vendedor",
          };
          setUser(usuario);
        }
      } catch (error) {
        console.error("Error during auth initialization:", error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    // Timeout de seguridad (3 segundos máximo)
    const timeoutId = setTimeout(() => {
      if (mounted) {
        setLoading(false);
      }
    }, 3000);

    initializeAuth();

    // Escuchar cambios de autenticación (solo para eventos futuros)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, _session) => {
      if (!mounted) return;

      if (event === "SIGNED_OUT") {
        setUser(null);
      }
      // Para SIGNED_IN, ya lo manejamos en signIn() y initializeAuth()
    });

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const result = await authService.signIn(email, password);

      if (result.error) {
        return { error: result.error };
      }

      if (result.data) {
        setUser(result.data);
        setLoading(false);
      }

      return { error: null };
    } catch (error) {
      console.error("Sign in error:", error);
      return { error: "Error inesperado al iniciar sesión" };
    }
  };

  const signUp = async (email: string, password: string, nombre: string) => {
    try {
      const result = await authService.signUp(email, password, nombre);

      if (result.error) {
        return { error: result.error };
      }

      return { error: null };
    } catch (error) {
      console.error("Sign up error:", error);
      return { error: "Error inesperado al registrarse" };
    }
  };

  const signOut = async () => {
    try {
      await authService.signOut();
      setUser(null);
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const result = await authService.resetPassword(email);
      return { error: result.error };
    } catch (error) {
      console.error("Reset password error:", error);
      return { error: "Error al enviar email de recuperación" };
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // In development, return a safe fallback instead of throwing
    if (process.env.NODE_ENV === "development") {
      console.warn("useAuth: AuthContext is undefined. This may cause issues.");
      return {
        user: null,
        loading: true,
        login: async () => {},
        logout: async () => {},
        register: async () => {},
      };
    }
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
