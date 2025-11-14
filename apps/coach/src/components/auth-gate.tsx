"use client";
import { ReactNode } from "react";
import { useAuth } from "@/contexts/auth-context";
import { MinimalismButton, MinimalismInput } from "@/components/ui";
import { useState } from "react";

export function AuthGate({ children }: { children: ReactNode }) {
  const { user, loading, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (loading) return <div className="max-w-4xl mx-auto px-4 py-12">Loading...</div>;
  if (user) return <>{children}</>;

  const handleSignIn = async () => {
    setError("");
    try {
      await signIn(email, password);
    } catch (e: any) {
      setError(e.message || "Sign in failed");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-900">Sign in</h1>
      <p className="mt-2 text-gray-700">Use your coach account to continue.</p>
      <div className="mt-6 space-y-3">
        <MinimalismInput placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <MinimalismInput placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <MinimalismButton onClick={handleSignIn}>Sign in</MinimalismButton>
      </div>
    </div>
  );
}