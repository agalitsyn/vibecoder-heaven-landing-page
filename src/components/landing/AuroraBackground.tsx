import { useEffect, useState } from "react";
import Aurora from "@/components/Aurora";

export default function AuroraBackground() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Skip Aurora WebGL on mobile for performance
    setShow(window.innerWidth >= 768);
  }, []);

  if (!show) return null;

  return (
    <div className="absolute inset-0 z-0 opacity-40">
      <Aurora
        colorStops={["#1a4a3a", "#2d8a6e", "#1a3a5a"]}
        amplitude={1.2}
        blend={0.6}
        speed={0.4}
      />
    </div>
  );
}
