import { RocketIcon, SparklesIcon, DownloadIcon } from "lucide-react";

export const howToUseSteps = [
  {
    id: 1,
    titleLabel: "Signup",
    content:
      "Register with your email—no password needed. Access your account via a secure magic link.",
    gradientColor: "from-emerald-400 via-green-500 to-teal-500",
    asset: {
      icon: RocketIcon,
      background: "bg-teal-600",
    },
    title: {
      background: "bg-green-100",
    },
  },
  {
    id: 2,
    titleLabel: "Generate Pitch",
    content:
      "Enter your pitch details, tone, and target audience—our AI then crafts a compelling, tailored pitch just for you.",
    gradientColor: "from-sky-400 via-blue-500 to-indigo-500",
    asset: {
      icon: SparklesIcon,
      background: "bg-indigo-600",
    },
    title: {
      background: "bg-blue-100",
    },
  },
  {
    id: 3,
    titleLabel: "Download or Share",
    content: "Save your pitch as PDF or present it directly.",
    gradientColor: "from-orange-400 via-amber-500 to-yellow-400",
    asset: {
      icon: DownloadIcon,
      background: "bg-amber-600",
    },
    title: {
      background: "bg-yellow-100",
    },
  },
];
