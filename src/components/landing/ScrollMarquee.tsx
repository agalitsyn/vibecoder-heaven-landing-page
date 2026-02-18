import ScrollVelocity from "@/components/ScrollVelocity";

interface ScrollMarqueeProps {
  texts?: string[];
  velocity?: number;
}

export default function ScrollMarquee({
  texts = ["FALL / WINTER 2026 COLLECTION"],
  velocity = 80,
}: ScrollMarqueeProps) {
  return (
    <ScrollVelocity
      texts={texts}
      velocity={velocity}
      className="font-display text-foreground/10"
      numCopies={4}
      scrollerClassName="!text-7xl md:!text-[10rem] !tracking-wider"
    />
  );
}
