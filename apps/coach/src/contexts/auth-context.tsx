"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/lib/supabase";

interface AuthContextValue {
  user: { id: string; email?: string } | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({ user: null, loading: true, signIn: async () => {}, signOut: async () => {} });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ? { id: data.user.id, email: data.user.email ?? undefined } : null);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ? { id: session.user.id, email: session.user.email ?? undefined } : null);
    });
    return () => {
      sub.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    await supabase.auth.signInWithPassword({ email, password });
    const { data } = await supabase.auth.getUser();
    setUser(data.user ? { id: data.user.id, email: data.user.email ?? undefined } : null);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, loading, signIn, signOut }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}