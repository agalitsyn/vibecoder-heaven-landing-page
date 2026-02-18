import AnimatedContent from "@/components/AnimatedContent";
import type { ReactNode } from "react";

interface AnimatedRevealProps {
  children: ReactNode;
  direction?: "vertical" | "horizontal";
  distance?: number;
  delay?: number;
  className?: string;
}

export default function AnimatedReveal({
  children,
  direction = "vertical",
  distance = 60,
  delay = 0,
  className = "",
}: AnimatedRevealProps) {
  return (
    <AnimatedContent
      distance={distance}
      direction={direction}
      delay={delay}
      duration={0.9}
      ease="power3.out"
      threshold={0.15}
      className={className}
    >
      {children}
    </AnimatedContent>
  );
}
