import SplitText from "@/components/SplitText";
import RotatingText from "@/components/RotatingText";

export default function HeroAnimations() {
  return (
    <div className="flex flex-col items-center">
      <SplitText
        text="CONQUER EVERY"
        className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-white uppercase leading-none"
        delay={40}
        duration={0.8}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 60 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-50px"
        tag="h1"
        textAlign="center"
      />
      <div className="flex items-center justify-center mt-2 md:mt-4">
        <RotatingText
          texts={["SUMMIT", "TRAIL", "STORM", "PEAK"]}
          mainClassName="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-primary uppercase overflow-hidden justify-center py-1 md:py-2"
          staggerFrom="last"
          staggerDuration={0.025}
          splitBy="characters"
          rotationInterval={2500}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-120%", opacity: 0 }}
        />
      </div>
    </div>
  );
}
