import BlurText from "@/components/BlurText";

interface StatsBlurProps {
  text: string;
  className?: string;
}

export default function StatsBlur({ text, className = "" }: StatsBlurProps) {
  return (
    <BlurText
      text={text}
      className={className}
      delay={80}
      animateBy="words"
      direction="bottom"
      threshold={0.2}
    />
  );
}
