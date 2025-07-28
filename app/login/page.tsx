"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Step 1: Check if user exists
      const { error: checkError } = await supabase.auth.signInWithPassword({
        email,
        password: "invalid-password",
      });

      // Step 2: If user exists, send magic link
      if (checkError?.message === "Invalid login credentials") {
        const { error: magicLinkError } = await supabase.auth.signInWithOtp({
          email,
          options: {
            emailRedirectTo: `${window.location.origin}/generate`,
          },
        });

        if (magicLinkError) {
          toast.error(`Error: ${magicLinkError.message}`);
        } else {
          toast.success("Magic link sent! Check your email.");
        }
      } else {
        toast.error("No account found with this email.");
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-black px-6 py-12">
      <div className="w-full max-w-md space-y-6 rounded-xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur">
        <h1 className="text-center text-2xl font-bold text-white">Login</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full rounded-md border border-white/10 bg-transparent px-4 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-gradient-to-r from-violet-500 to-pink-500 py-2 font-semibold text-white transition hover:scale-105 disabled:opacity-50"
          >
            {loading ? "Sending Link..." : "Send Magic Link"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-violet-400 underline hover:text-pink-400"
          >
            Sign up
          </a>
        </p>

        <p className="text-center text-xs text-gray-500">
          If you already used a magic link, enter your email again to receive a
          new one.
        </p>
      </div>
    </section>
  );
}
