"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function CurvedTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useGSAP(() => {
    if (!pathRef.current || !containerRef.current) return;

    // The initial path draws a hill shape pointing upwards
    // M 0 100: Bottom Left
    // L 100 100: Line to Bottom Right
    // Q 50 0 0 100: Quadratic curve pulling up to top-center (50, 0) and landing at Bottom Left (0, 100)
    
    gsap.to(pathRef.current, {
      attr: { d: "M 0 100 L 100 100 Q 50 100 0 100 Z" }, // Animates the control point down to 100, flattening the curve
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "bottom bottom", // Starts exactly when the user begins scrolling down (since it's at the bottom of 100vh)
        end: "top top",         // Ends when the dark section reaches the top of the screen
        scrub: true,
      },
    });
  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef} 
      className="w-full relative h-[100px] md:h-[150px] lg:h-[200px] -mt-[100px] md:-mt-[150px] lg:-mt-[200px] z-0 pointer-events-none"
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          d="M 0 100 L 100 100 Q 50 0 0 100 Z"
          fill="#050505"
        />
      </svg>
    </div>
  );
}
