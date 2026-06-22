"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Shuffle from "./Shuffle";

export default function Navbar() {
  const pathname = usePathname();

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };
  return (
    <header className="fixed top-0 w-full z-50 pt-8 lg:pt-12 mix-blend-difference pointer-events-none">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12 flex items-end justify-between">
        
        {/* Logo / Name */}
        <Link 
          href="/" 
          onClick={handleLogoClick}
          className="flex flex-col w-fit pointer-events-auto"
        >
          <span className="font-serif text-[0.95rem] md:text-[2.1rem] tracking-tighter text-white uppercase leading-[0.85]">
            Tubagus
          </span>
          <span className="font-sans font-black text-[1.65rem] md:text-[3.65rem] tracking-tighter text-white uppercase leading-[0.85]">
            Dafa
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex pointer-events-auto">
          <Link 
            href="/contact" 
            className="text-black relative flex items-center justify-center"
          >
            {/* The white background box, trimmed equally at top/bottom to match visual cap-height of DAFA */}
            <div className="absolute top-[10%] bottom-[10%] left-0 right-0 bg-white" />
            
            {/* Invisible clone of DAFA to force exact width and height */}
            <span className="font-sans font-black text-[1.65rem] md:text-[3.65rem] tracking-tighter uppercase leading-[0.85] opacity-0 pointer-events-none select-none">
              Dafa
            </span>
            
            {/* The actual CONNECT text absolutely positioned in the exact center */}
            <span className="absolute inset-0 flex items-center justify-center font-sans font-black uppercase tracking-widest text-[0.45rem] md:text-[0.95rem] leading-none">
              <span className="translate-x-[0.05em] translate-y-[0.08em] block">
                <Shuffle
                  text="CONNECT"
                  shuffleDirection="up"
                  duration={0.35}
                  animationMode="evenodd"
                  shuffleTimes={1}
                  ease="power3.out"
                  stagger={0.03}
                  triggerOnHover={true}
                  tag="span"
                />
              </span>
            </span>
          </Link>
        </nav>

      </div>
    </header>
  );
}