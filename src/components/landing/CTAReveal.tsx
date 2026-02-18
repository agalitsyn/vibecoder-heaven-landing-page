import SplitText from "@/components/SplitText";

interface CTARevealProps {
  text: string;
}

export default function CTAReveal({ text }: CTARevealProps) {
  return (
    <SplitText
      text={text}
      className="font-display text-4xl sm:text-5xl md:text-7xl tracking-tight text-white uppercase leading-none"
      delay={30}
      duration={1}
      ease="power3.out"
      splitType="chars"
      from={{ opacity: 0, y: 80 }}
      to={{ opacity: 1, y: 0 }}
      threshold={0.2}
      rootMargin="-80px"
      tag="h2"
      textAlign="center"
    />
  );
}
