import DotPattern from "../ui/dot-pattern";
import { skills } from "@/constants/skills";

const About = () => {
  return (
    <section className="relative flex items-center justify-center bg-black px-6 py-24 text-white">
      <div className="z-10 w-full max-w-screen-lg">
        {/* Heading */}
        <div className="space-y-6 text-center">
          <h2 className="h2-bold text-white">About Us</h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-300">
            <span className="font-semibold text-white">PitchSnap</span> is your
            AI-powered partner for building high-quality startup pitches in
            minutes—not days. Whether you&#39;re validating an idea or preparing
            for a Series A, our platform combines{" "}
            <span className="font-medium text-white">intelligent guidance</span>{" "}
            with{" "}
            <span className="font-medium text-slate-200">
              minimal, investor-ready design
            </span>{" "}
            to help you pitch with clarity and confidence.
            <br className="hidden md:block" />
            Built for <span className="font-semibold text-white">speed</span>,
            optimized for{" "}
            <span className="font-semibold text-white">precision</span>, and
            trusted by founders who value{" "}
            <span className="font-semibold text-white">efficiency</span> and{" "}
            <span className="font-semibold text-white">impact</span>.
          </p>
        </div>

        {/* Skill Cards */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:mt-24 md:grid-cols-3">
          {skills.map((skill, index) => {
            const Icon = skill.asset.icon;
            return (
              <div
                key={skill.id}
                className="w-full max-w-sm transition hover:scale-[1.015]"
              >
                <div className="group relative flex h-full flex-col items-start gap-4 rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 p-6 shadow-lg hover:border-pink-500 hover:shadow-pink-500/10">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-pink-500 text-sm font-bold text-white shadow-md">
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      {skill.title.label}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-400">{skill.content}</p>
                  <div className="absolute bottom-4 right-4 text-pink-300">
                    <Icon className="size-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className="dot-pattern text-gray-600 opacity-40"
      />
    </section>
  );
};

export default About;
