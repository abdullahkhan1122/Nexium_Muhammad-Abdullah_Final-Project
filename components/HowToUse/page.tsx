import { howToUseSteps } from "@/constants/howToUse";

const HowToUse = () => {
  return (
    <section
      id="how"
      className="relative flex items-center justify-center bg-black px-6 py-24 text-white"
    >
      <div className="z-10 w-full max-w-screen-lg">
        <div className="space-y-6 text-center">
          <h2 className="h2-bold text-white">How to Use</h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-300">
            Get started with PitchSnap in three easy steps.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {howToUseSteps.map((step, index) => {
            const Icon = step.asset.icon;
            return (
              <div
                key={step.id}
                className="group relative flex flex-col items-start gap-4 rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 p-6 shadow-lg transition hover:border-pink-500 hover:shadow-pink-500/10"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-pink-500 font-bold text-white">
                    {index + 1}
                  </div>
                  <div className="text-xl font-semibold text-white">
                    {step.titleLabel}
                  </div>
                </div>
                <div className="text-sm text-gray-400">{step.content}</div>
                <div className="absolute bottom-4 right-4 text-pink-300">
                  <Icon className="size-5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowToUse;
