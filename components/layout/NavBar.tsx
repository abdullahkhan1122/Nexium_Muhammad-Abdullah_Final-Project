"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { useUser } from "@/lib/useUser";
import Logo from "./Logo";
import NavIcons from "./NavIcons";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleYScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleYScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleYScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-center transition-all duration-1000 ease-out">
      <div className="pointer-events-auto relative w-full max-w-[1200px] md:rounded-full">
        <div
          className={`mt-0 w-full overflow-hidden bg-transparent py-5 transition-all duration-300 ease-out md:py-[9px] ${
            isScrolled ? "md:mt-[6px]" : ""
          }`}
          style={{ contain: "paint" }}
        >
          <div
            className="absolute inset-0 transition-all duration-100 ease-out md:rounded-full"
            style={
              isScrolled
                ? {
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                  }
                : {}
            }
          />
          <div
            className={`absolute inset-0 bg-[#424242] transition-all duration-300 ease-out md:rounded-full ${
              isScrolled ? "opacity-60" : "opacity-0"
            }`}
          />
          <div className="mx-auto w-full px-6">
            <NavbarContent />
          </div>
        </div>
      </div>
    </div>
  );
};

const NavbarContent = () => {
  const { user } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  const scrollOrNavigate = (hash: string) => {
    if (pathname !== "/") {
      router.push(`/#${hash}`);
    } else {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      toast.success("Logged out successfully!");
      router.push("/");
    } else {
      toast.error("Logout failed.");
    }
  };

  return (
    <header className="relative z-50 flex w-full items-center justify-between">
      {/* Left */}
      <div className="flex items-center gap-3 md:gap-5">
        <NavIcons />
      </div>

      {/* Center */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Logo />
      </div>

      {/* Right */}
      <div className="hidden items-center space-x-6 md:flex">
        <button
          onClick={() => scrollOrNavigate("how")}
          className="text-sm transition hover:text-blue-400"
        >
          How It Works
        </button>
        <button
          onClick={() => scrollOrNavigate("techs")}
          className="text-sm transition hover:text-blue-400"
        >
          Tech
        </button>
        <button
          onClick={() => scrollOrNavigate("about")}
          className="text-sm transition hover:text-blue-400"
        >
          About
        </button>
        {user ? (
          <button
            onClick={handleLogout}
            className="rounded border border-white px-4 py-1.5 text-sm transition hover:bg-white hover:text-black"
          >
            Logout
          </button>
        ) : (
          <Link
            href="/login"
            className="rounded border border-white px-4 py-1.5 text-sm transition hover:bg-white hover:text-black"
          >
            Login
          </Link>
        )}
      </div>

      {/* Mobile */}
      <Sheet>
        <SheetTrigger className="md:hidden" asChild>
          <Menu />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="space-y-6 border-none bg-black p-6 text-white"
        >
          <SheetClose />
          <button
            onClick={() => scrollOrNavigate("how")}
            className="block hover:text-blue-400"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollOrNavigate("techs")}
            className="block hover:text-blue-400"
          >
            Tech
          </button>
          <button
            onClick={() => scrollOrNavigate("about")}
            className="block hover:text-blue-400"
          >
            About
          </button>

          {user ? (
            <button
              onClick={handleLogout}
              className="mt-4 block rounded border border-white px-4 py-2 transition hover:bg-white hover:text-black"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className="mt-4 block rounded border border-white px-4 py-2 transition hover:bg-white hover:text-black"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="block rounded bg-blue-600 px-4 py-2 transition hover:bg-blue-700"
              >
                Get Started
              </Link>
            </>
          )}
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default NavBar;
