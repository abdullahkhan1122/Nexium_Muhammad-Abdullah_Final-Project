"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function SignupPage() {
  const [form, setForm] = useState<{
    firstName: string;
    lastName: string;
    email: string;
  }>({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const { firstName, lastName, email } = form;

    if (!firstName || !lastName || !email) {
      setMessage({ type: "error", text: "Please fill in all fields." });
      return;
    }

    setLoading(true);
    try {
      //  Try signing in with dummy password to see if user exists
      const { error: checkError } = await supabase.auth.signInWithPassword({
        email,
        password: "dummy-password",
      });

      if (checkError?.message === "Invalid login credentials") {
        //  User exists
        setMessage({
          type: "error",
          text: "An account with this email already exists. Please log in instead.",
        });
        setLoading(false);
        return;
      }

      //  User does NOT exist — safe to send magic link
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/generate`,
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      });

      if (error) {
        setMessage({ type: "error", text: error.message });
      } else {
        setMessage({
          type: "success",
          text: "Magic link sent! Please check your email to complete registration.",
        });
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-black px-6 py-12">
      <div className="w-full max-w-md space-y-6 rounded-xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur">
        <h1 className="text-center text-2xl font-bold text-white">
          Create Account
        </h1>

        {message && (
          <div
            className={`rounded border px-4 py-2 text-sm ${
              message.type === "success"
                ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-400"
                : "border-red-400/20 bg-red-500/10 text-red-400"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            className="w-full rounded-md border border-white/10 bg-transparent px-4 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            className="w-full rounded-md border border-white/10 bg-transparent px-4 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-md border border-white/10 bg-transparent px-4 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-gradient-to-r from-violet-500 to-pink-500 py-2 font-semibold text-white transition hover:scale-105 disabled:opacity-50"
          >
            {loading ? "Sending Magic Link..." : "Sign Up with Magic Link"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-violet-400 underline hover:text-pink-400"
          >
            Log in
          </a>
        </p>
      </div>
    </section>
  );
}
