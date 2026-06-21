import Link from "next/link";
import prisma from "@/lib/prisma";
import Image from "next/image";
import LineWaves from "@/components/LineWaves";
import Shuffle from "@/components/Shuffle";
import DraggableNotice from "@/components/DraggableNotice";
import CurvedTransition from "@/components/CurvedTransition";
import MorphingWord from "@/components/MorphingWord";

// This is a Server Component - it fetches data securely on the server!
export default async function Home() {
  // Fetch all projects from Neon, ordered by newest first
  const items = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="font-sans selection:bg-black/10">
      
      {/* Light Mode Hero Section */}
      <section className="relative w-full bg-[#f4f4f0] text-[#111] min-h-[100vh] overflow-hidden flex flex-col justify-center pt-24 pb-16">
        
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
        <div className="relative z-10 w-full max-w-[90rem] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center lg:items-stretch h-full gap-16 lg:gap-12 flex-1">
          
          {/* Left: Typography & CTA */}
          <div className="w-full lg:w-[45%] flex flex-col justify-center pt-10 lg:pt-0 relative min-w-0">
            

            
            <h1 className="text-[5rem] sm:text-[6rem] lg:text-[7rem] xl:text-[8rem] tracking-tighter leading-[0.8] mb-6 text-left flex flex-col">
              <span className="font-sans font-black text-black tracking-[-0.05em]">Code.</span>
              <span className="font-sans font-black text-black tracking-[-0.05em] whitespace-nowrap">
                <MorphingWord word1="Hard" word2="Soft" />ware.
              </span>
              <span className="font-serif italic font-normal text-neutral-600 mt-2">Stories.</span>
            </h1>
            
            <p className="mt-6 mb-10 text-neutral-600 font-sans text-sm md:text-base max-w-md leading-normal text-left">
              I am Tubagus Dafa, a software engineer and director. I build full-stack web platforms, embedded hardware, and stories.
            </p>
            
            <div className="flex items-center gap-6 relative z-20 mix-blend-difference">
              <Link href="#projects" className="inline-flex items-center justify-center bg-white text-black px-6 md:px-10 h-[2.5rem] md:h-[3.5rem] font-sans font-black uppercase tracking-widest text-[0.7rem] md:text-[0.9rem] leading-none">
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
              </Link>
            </div>
            
            {/* Overlapping Element 2 (Keyboard/Laptop) at bottom left */}
            <div className="hidden lg:block absolute -bottom-16 left-0 xl:left-8 w-56 h-56 xl:w-72 xl:h-72 z-10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] overflow-hidden transform -rotate-6">
               <Image src="/hero_element_2.jpeg" alt="Workspace Setup" fill className="object-cover" />
            </div>
          </div>

          {/* Right: Main Image & Overlapping elements */}
          <div className="w-full lg:w-[55%] relative min-h-[600px] lg:min-h-0 flex items-center">
            
            {/* Main Developer Image */}
            <div className="absolute inset-x-0 inset-y-12 lg:inset-y-8 lg:inset-x-0 z-10 overflow-hidden shadow-2xl bg-neutral-200">
               <Image src="/hero_main.jpeg" alt="Leonardo the Cat" fill className="object-cover object-center" priority />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>


            {/* Overlapping Element 1 (Code/Diagram) at top right */}
            <div className="absolute -top-4 -right-4 lg:-right-8 lg:-top-4 w-48 h-48 md:w-64 md:h-64 z-20 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.4)] overflow-hidden transform rotate-3">
               <Image src="/hero_element_1.jpeg" alt="Architecture Diagram" fill className="object-cover" />
            </div>
            

          </div>

        </div>
        
        {/* Draggable Disclaimer Box (Global to Hero) */}
        <DraggableNotice />
      </section>

      {/* Scroll-triggered Curved Transition */}
      <CurvedTransition />

      {/* Dark Mode Content (Projects) */}
      <section id="projects" className="relative w-full bg-[#050505] text-[#ededed] min-h-screen pt-32 pb-32 flex flex-col items-center">
        {/* Subtle glowing background mesh */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900/40 via-[#050505] to-[#050505] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center w-full">
           <div className="mb-20 text-center">
             <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Latest Deployments</h2>
             <p className="text-neutral-500 text-lg max-w-xl mx-auto">Explore the systems and architectures I've built, focusing on scalable backend solutions and immersive frontend interfaces.</p>
           </div>
          
          {/* Dynamic Bento Box Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl w-full px-6">
            {items.map((item) => (
              <Link href={`/projects/${item.slug}`} key={item.id} className="group outline-none">
                <div className="h-full flex flex-col p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 relative overflow-hidden">
                  
                  {/* Hover Glow Effect */}
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Card Header (Type & Status) */}
                  <div className="flex justify-between items-center mb-8">
                    <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest border border-white/10 px-3 py-1.5 rounded-md bg-black/20">
                      {item.type}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest flex items-center gap-1 text-neutral-500">
                      {item.status}
                    </span>
                  </div>

                  {/* Card Body */}
                  <h3 className="text-3xl font-semibold mb-3 group-hover:text-white text-neutral-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-neutral-400 text-sm font-light mb-10 leading-relaxed">
                    {item.role} • {item.subcategory}
                  </p>

                  {/* Card Footer */}
                  <div className="mt-auto flex items-center text-sm font-semibold text-neutral-400 group-hover:text-[#d0ff14] transition-colors uppercase tracking-wider">
                    Explore Protocol 
                    <span className="ml-2 transform group-hover:translate-x-2 transition-transform">
                      →
                    </span>
                  </div>

                </div>
              </Link>
            ))}
          </section>
        </div>
      </section>

    </main>
  );
}