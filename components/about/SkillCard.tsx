import { ReactNode } from "react";

interface SkillCardProps {
  gradientColor?: string; // Optional
  assetBackground?: string; // Optional
  titleBackground?: string; // Optional
  titleLabel: string;
  content: string;
  children: ReactNode;
}

const SkillCard = ({ titleLabel, content, children }: SkillCardProps) => {
  return (
    <div className="group relative flex flex-col items-start gap-4 rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 p-6 shadow-lg transition hover:border-pink-500 hover:shadow-pink-500/10">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-full bg-pink-500 font-bold text-white">
          <span className="text-sm">{titleLabel.charAt(0)}</span>
        </div>
        <div className="text-xl font-semibold text-white">{titleLabel}</div>
      </div>
      <div className="text-sm text-gray-400">{content}</div>
      <div className="absolute bottom-4 right-4 text-pink-300">{children}</div>
    </div>
  );
};

export default SkillCard;
