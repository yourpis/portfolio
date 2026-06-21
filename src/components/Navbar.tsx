import Link from "next/link";
import Shuffle from "./Shuffle";

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 pt-8 lg:pt-12 mix-blend-difference pointer-events-none">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12 flex items-start justify-between pointer-events-auto">
        
        {/* Logo / Name */}
        <Link 
          href="/" 
          className="flex flex-col w-fit"
        >
          <span className="font-serif text-[1.55rem] md:text-[2.1rem] tracking-tighter text-white uppercase leading-[0.85]">
            Tubagus
          </span>
          <span className="font-sans font-black text-[2.7rem] md:text-[3.65rem] tracking-tighter text-white uppercase leading-[0.85]">
            Dafa
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-start mt-[0.1rem] md:mt-[0.15rem]">
          <Link 
            href="/contact" 
            className="bg-white text-black px-5 md:px-8 h-[1.08rem] md:h-[1.48rem] flex items-center justify-center font-sans font-black uppercase tracking-widest text-[0.6rem] md:text-[0.7rem] leading-none"
          >
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
          </Link>
        </nav>

      </div>
    </header>
  );
}