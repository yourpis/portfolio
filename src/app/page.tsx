import Link from "next/link";
import prisma from "@/lib/prisma";

// This is a Server Component - it fetches data securely on the server!
export default async function Home() {
  // Fetch all projects from Neon, ordered by newest first
  const items = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-[#050505] text-[#ededed] font-sans selection:bg-white/20">
      
      {/* Subtle glowing background mesh */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900/40 via-[#050505] to-[#050505] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        
        {/* The macOS Window Hero Section */}
        <section className="mt-24 mb-24 w-full max-w-4xl px-6">
          <div className="rounded-2xl border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-2xl shadow-2xl overflow-hidden">
            
            {/* macOS Window Header */}
            <div className="h-12 border-b border-white/10 bg-white/5 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]"></div>
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]"></div>
            </div>

            {/* Window Content */}
            <div className="p-10 md:p-16 text-center md:text-left flex flex-col justify-center min-h-[300px]">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
                I craft systems, <br />
                interfaces & <span className="font-serif italic font-normal text-neutral-400">experiences.</span>
              </h1>
              
              <div className="mt-auto pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <p className="text-sm md:text-base text-neutral-400 font-medium">
                  Tubagus Dafa. Engineer driven by scalable architecture. <br className="hidden md:block" />
                  Based in Jakarta, Indonesia.
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-xs text-neutral-300 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Ready to deploy
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Dynamic Bento Box Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl w-full px-6 pb-32">
          {items.map((item) => (
            <Link href={`/projects/${item.slug}`} key={item.id} className="group outline-none">
              <div className="h-full flex flex-col p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 relative overflow-hidden">
                
                {/* Hover Glow Effect */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Card Header (Type & Status) */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest border border-white/10 px-2 py-1 rounded-md">
                    {item.type}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest flex items-center gap-1 text-neutral-500">
                    {item.status}
                  </span>
                </div>

                {/* Card Body */}
                <h3 className="text-2xl font-semibold mb-2 group-hover:text-white text-neutral-200 transition-colors">
                  {item.title}
                </h3>
                <p className="text-neutral-500 text-sm font-light mb-8">
                  {item.role} • {item.subcategory}
                </p>

                {/* Card Footer */}
                <div className="mt-auto flex items-center text-sm font-medium text-neutral-400 group-hover:text-white transition-colors">
                  Explore Protocol 
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>

              </div>
            </Link>
          ))}
        </section>
        
      </div>
    </main>
  );
}