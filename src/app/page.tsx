import Link from "next/link";
import prisma from "@/lib/prisma";
import Image from "next/image";
import LineWaves from "@/components/LineWaves";
import Shuffle from "@/components/Shuffle";

import CurvedTransition from "@/components/CurvedTransition";
import MorphingWord from "@/components/MorphingWord";
import SmoothScrollLink from "@/components/SmoothScrollLink";

// This is a Server Component - it fetches data securely on the server!
export default async function Home() {
  // Fetch all projects from Neon, ordered by newest first
  const items = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="font-sans selection:bg-black/10">
      
      {/* Light Mode Hero Section */}
      <section className="relative w-full h-[100svh] bg-[#f4f4f0] text-[#111] overflow-hidden flex flex-col justify-center">
        
        {/* LineWaves Background */}
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply">
          <LineWaves
            speed={0.15}
            innerLineCount={40}
            outerLineCount={40}
            warpIntensity={1.5}
            rotation={-25}
            edgeFadeWidth={0.1}
            colorCycleSpeed={0.5}
            brightness={0.8}
            color1="#737373"
            color2="#a3a3a3"
            color3="#525252"
            enableMouseInteraction={true}
            mouseInfluence={3.0}
          />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 w-full max-w-[100rem] mx-auto px-6 lg:px-12 py-12 lg:py-0 flex flex-row items-center justify-between h-full gap-4 lg:gap-0">
          
          {/* Left: Typography & CTA */}
          <div className="w-[50%] sm:w-[55%] lg:w-[60%] flex flex-col justify-center relative z-20 h-full">
            
            <h1 className="text-[2rem] sm:text-[3.5rem] md:text-[5rem] lg:text-[7vw] xl:text-[8rem] leading-[0.85] tracking-tighter mb-4 lg:mb-8 text-left flex flex-col max-w-full lg:max-w-none">
              <span className="font-sans font-black text-black tracking-[-0.05em]">Code.</span>
              <span className="font-sans font-black text-black tracking-[-0.05em] whitespace-nowrap">
                <MorphingWord word1="Hard" word2="Soft" />ware.
              </span>
              <span className="font-serif italic font-normal text-neutral-600 mt-2">Stories.</span>
            </h1>
            
            <p className="mt-2 mb-6 lg:mt-4 lg:mb-10 text-neutral-600 font-sans text-[10px] sm:text-[11px] md:text-base lg:text-lg xl:text-xl max-w-full lg:max-w-md xl:max-w-lg leading-relaxed text-left z-20 relative pr-2">
              I am Tubagus Dafa, a software engineer and director. I build full-stack web platforms, embedded hardware, and stories.
            </p>
            
            <div className="relative">
              <div className="flex items-center gap-6 relative z-20 mix-blend-difference">
                <SmoothScrollLink targetId="projects" href="#projects" className="inline-flex items-center justify-center bg-white text-black px-3 md:px-10 h-[2rem] md:h-[3.5rem] font-sans font-black uppercase tracking-widest text-[0.55rem] md:text-[0.9rem] leading-none">
                  <Shuffle
                    text="VIEW PROJECTS"
                    shuffleDirection="up"
                    duration={0.35}
                    animationMode="evenodd"
                    shuffleTimes={1}
                    ease="power3.out"
                    stagger={0.03}
                    triggerOnHover={true}
                    tag="span"
                  />
                </SmoothScrollLink>
              </div>
              
              {/* Desktop Overlapping Element 2 (Keyboard/Laptop) */}
              <div className="hidden lg:block absolute top-[-30%] left-[5%] w-16 h-16 md:w-32 md:h-32 xl:w-48 xl:h-48 z-10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] overflow-hidden transform -rotate-6 pointer-events-none">
                 <Image src="/hero_element_2.jpeg" alt="Workspace Setup" fill className="object-cover" />
              </div>
            </div>
          </div>

          {/* Right: Main Image & Overlapping elements */}
          <div className="w-[45%] sm:w-[40%] lg:w-auto lg:h-[75vh] xl:h-[80vh] flex flex-col lg:block items-center justify-center z-10 relative">
            
            {/* Main Developer Image */}
            <div className="relative w-full aspect-[3/4] lg:h-full lg:w-auto lg:aspect-[3/4] overflow-hidden shadow-2xl bg-neutral-200">
               <Image src="/hero_main.jpeg" alt="Leonardo the Cat" fill className="object-cover object-[40%_center] lg:object-center" priority />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Mobile Artsy Overlapping Images */}
            <div className="absolute top-0 left-0 w-full h-full lg:hidden z-20 pointer-events-none">
               {/* Mobile Element 1 */}
               <div className="absolute -top-6 -left-6 w-[75%] aspect-video overflow-hidden shadow-[0_15px_30px_-10px_rgba(0,0,0,0.5)] bg-neutral-200 transform -rotate-6 z-30 pointer-events-auto">
                 <Image src="/hero_element_1.jpeg" alt="Architecture Diagram" fill className="object-cover" />
               </div>
               {/* Mobile Element 2 */}
               <div className="absolute -top-2 -right-4 w-[60%] aspect-square overflow-hidden shadow-[0_20px_40px_-10px_rgba(0,0,0,0.6)] bg-neutral-200 transform rotate-6 z-20 pointer-events-auto">
                 <Image src="/hero_element_2.jpeg" alt="Workspace Setup" fill className="object-cover object-center" />
               </div>
            </div>

            {/* Desktop Overlapping Element 1 (Code/Diagram) */}
            <div className="hidden lg:block absolute top-[15%] -left-24 w-48 xl:w-80 aspect-video z-20 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.4)] overflow-hidden transform rotate-6">
               <Image src="/hero_element_1.jpeg" alt="Architecture Diagram" fill className="object-cover" />
            </div>
            
          </div>

        </div>
        

      </section>

      {/* Scroll-triggered Curved Transition */}
      <CurvedTransition />

      {/* Dark Mode Content (Projects) */}
      <section id="projects" className="relative w-full bg-[#050505] text-[#ededed] min-h-screen pt-32 pb-32 flex flex-col items-center -mt-[1px] lg:-mt-[2px]">
        {/* Subtle glowing background mesh */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900/40 via-[#050505] to-[#050505] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-start max-w-7xl w-full px-6 mx-auto">
           <div className="mb-8">
             <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">Latest Deployments</h2>
           </div>
          
          <section className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10 w-full">
            {items.map((item) => (
              <Link href={`/projects/${item.slug}`} key={item.id} className="group outline-none flex flex-col gap-4">
                <div className="relative w-full aspect-video rounded-[9px] overflow-hidden bg-neutral-900 transition-all duration-500">
                  {item.media ? (
                    <Image src={item.media} alt={item.title} fill className="object-cover" />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] flex items-center justify-center">
                       <span className="opacity-[0.03] font-sans font-black text-[8rem] tracking-tighter">{item.title.substring(0, 2).toUpperCase()}</span>
                    </div>
                  )}
                  <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md px-2 py-1 rounded-md text-[10px] font-bold text-white tracking-widest uppercase">
                    {item.status}
                  </div>
                </div>

                <div className="flex flex-col px-1">
                  <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-1.5">
                    {item.subcategory}
                  </span>
                  <h3 className="text-base md:text-lg font-medium text-neutral-100 group-hover:text-white transition-colors leading-tight">
                    {item.title}
                  </h3>
                </div>
              </Link>
            ))}
          </section>
        </div>
      </section>

    </main>
  );
}