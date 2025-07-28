import { MagicCard } from "../ui/magic-card";

const TechTag = ({
  gradientColor,
  title,
}: {
  gradientColor: string;
  title: string;
}) => {
  return (
    <MagicCard
      className="flex w-fit cursor-pointer items-center justify-center rounded-md border-none bg-background px-3 py-2"
      gradientColor={gradientColor}
      gradientOpacity={0.25}
    >
      <p className="text-sm font-medium text-white">{title}</p>
    </MagicCard>
  );
};

export default TechTag;
