import Link from "next/link";

const Logo = ({ isLogoFooter = false }: { isLogoFooter?: boolean }) => {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2 font-extrabold tracking-tight ${
        isLogoFooter ? "text-3xl" : "text-2xl"
      }`}
    >
      <span className="bg-gradient-to-r from-pink-400 via-fuchsia-500 to-violet-500 bg-clip-text text-transparent">
        PitchSnap
      </span>
    </Link>
  );
};

export default Logo;
