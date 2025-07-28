"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@/lib/useUser";
import { cn } from "@/lib/utils";
import AnimatedGradientText from "../ui/animated-gradient-text";
import AnimatedGridPattern from "../ui/animated-grid-pattern";

const featureTags = [
  {
    label: "Investor-Ready in Seconds",
    className: "border border-pink-500 text-white",
  },
  {
    label: "Powered by GPT-4 Intelligence",
    className: "border border-pink-500 text-white",
  },
  {
    label: "Structure That Sells",
    className: "border border-pink-500 text-white",
  },
  {
    label: "Present with Confidence",
    className: "border border-pink-500 text-white",
  },
];

const Hero = () => {
  const { user } = useUser();
  const router = useRouter();

  const handleGetStarted = () => {
    if (user) {
      router.push("/generate");
    } else {
      router.push("/login");
    }
  };

  return (
    <section className="relative px-6 pb-44" style={{ contain: "layout" }}>
      {/* Headline & Subtitle */}
      <div className="pt-48 text-center">
        <h1 className="h1-bold flex flex-col items-center text-balance leading-tight tracking-tight text-white">
          <span>Write World-Class</span>
          <span>Startup Pitches</span>
          <span>In Seconds</span>
        </h1>
        <p className="mt-6 text-lg font-medium text-gray-400">
          Pitch Writer – Your AI assistant for crafting stunning presentations
        </p>

        {/* CTA Button */}
        <div className="mt-8 flex justify-center">
          <button onClick={handleGetStarted}>
            <AnimatedGradientText className="rounded-full border border-violet-500 bg-gradient-to-r from-violet-400 via-pink-500 to-violet-400 bg-clip-text px-6 py-3 text-lg font-semibold text-transparent transition hover:scale-105 hover:border-pink-400">
              <span className="ml-2">Get Started</span>
            </AnimatedGradientText>
          </button>
        </div>
      </div>

      {/* Feature Tags */}
      <div className="mt-16 flex flex-wrap justify-center gap-3 text-sm font-medium">
        {featureTags.map(({ label, className }, i) => (
          <div
            key={i}
            className={cn(
              "rounded-full px-4 py-1 transition hover:scale-105",
              className
            )}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Background Effects */}
      <div className="pointer-events-none absolute top-0 -z-20 size-full overflow-hidden opacity-50 [mask-image:radial-gradient(900px_circle_at_top,#000,transparent)]">
        <AnimatedGridPattern
          numSquares={120}
          maxOpacity={0.2}
          duration={5}
          repeatDelay={1}
          colors={[
            "rgba(45, 212, 191, 0.25)", // teal
            "rgba(147, 197, 253, 0.2)", // blue
            "rgba(253, 186, 116, 0.2)", // amber
            "rgba(139, 92, 246, 0.2)", // violet
            "rgba(203, 213, 225, 0.15)", // slate
          ]}
          className="inset-x-[4.5px] inset-y-[-30%] h-[150%]"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:linear-gradient(#000_50%,transparent)]">
        <div className="grid-pattern pointer-events-none absolute inset-0" />
      </div>
    </section>
  );
};

export default Hero;
