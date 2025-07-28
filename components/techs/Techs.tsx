import { slugs, techs } from "@/constants/skills";
import DotPattern from "../ui/dot-pattern";
import IconCloud from "../ui/icon-cloud";
import TechTag from "./TechTag";

const Techs = () => {
  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden px-6 py-24 text-white">
      <div className="relative z-10 w-full max-w-screen-lg space-y-12 text-center">
        {/* Section Heading */}
        <div className="space-y-4">
          <h2 className="h2-bold  bg-clip-text text-white">
            Built With Modern Tech
          </h2>
          <p className="regular-paragraph text-gray-300">
            <span className="font-semibold text-white">PitchSnap</span> is
            crafted using a modern web stack optimized for performance,
            scalability, and developer experience. It combines:
            <span className="font-medium text-white"> Next.js</span> for
            frontend,
            <span className="font-medium text-white"> Tailwind CSS</span> and
            <span className="font-medium text-white"> shadcn/ui</span> for
            beautiful UI,
            <span className="font-medium text-white"> OpenAI</span> for smart
            pitch generation,
            <span className="font-medium text-white"> n8n</span> for backend
            automation, and
            <span className="font-medium text-white"> Vercel</span> for
            deployment.
          </p>
        </div>

        {/* Tech Tags */}
        <div className="flex flex-wrap justify-center gap-3">
          {techs.map((tech) => (
            <TechTag
              key={tech.label}
              title={tech.label}
              gradientColor={tech.bgColor}
            />
          ))}
        </div>

        {/* Icon Cloud */}
        <div>
          <IconCloud iconSlugs={slugs} />
        </div>
      </div>

      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className="dot-pattern absolute bottom-0 opacity-50"
      />
    </section>
  );
};

export default Techs;
