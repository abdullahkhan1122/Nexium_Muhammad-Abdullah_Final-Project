"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";

export default function MagicLinkCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      const { error } = await supabase.auth.getSession();

      if (error) {
        if (
          error.message.includes("expired") ||
          error.message.includes("Invalid")
        ) {
          toast.error(
            "This magic link is expired or already used. Please request a new one."
          );
          router.replace("/login");
        } else {
          toast.error("Login failed. Please try again.");
          router.replace("/login");
        }
        return;
      }

      // Auth successful - redirect to dashboard or generate
      router.replace("/generate");
    };

    handleAuth();
  }, [router]);

  return (
    <p className="mt-20 text-center text-white">Verifying your login...</p>
  );
}
