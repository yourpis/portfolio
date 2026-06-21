"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    // Attempt to log in using NextAuth
    const result = await signIn("credentials", {
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid master password.");
    } else {
      // If success, redirect to the Command Center!
      router.push("/admin/dashboard");
      router.refresh();
    }
  }

  return (
    <main className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900/30 via-[#050505] to-[#050505] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
        <div className="text-center mb-8">
          <div className="w-8 h-8 mx-auto rounded-full bg-gradient-to-tr from-neutral-200 to-neutral-600 shadow-[0_0_15px_rgba(255,255,255,0.3)] mb-4" />
          <h1 className="text-2xl font-bold text-white tracking-tight">Restricted Access</h1>
          <p className="text-neutral-400 text-sm mt-2">Enter master password to access Command Center.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-all text-center tracking-[0.3em]"
              required
            />
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-white text-black font-semibold rounded-xl px-4 py-3 hover:bg-neutral-200 transition-colors"
          >
            Authenticate
          </button>
        </form>
      </div>
    </main>
  );
}