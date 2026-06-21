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
        
        {/* Hero Section */}
        <section className="mt-32 mb-24 text-center max-w-4xl px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-neutral-300 font-medium tracking-wide mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            System Online
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-neutral-500 mb-6 pb-2">
            The Developer.<br />Reimagined.
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 font-light tracking-wide max-w-2xl mx-auto">
            Bridging the gap between Low-Level Hardware Architecture and High-Performance Next.js Ecosystems.
          </p>
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