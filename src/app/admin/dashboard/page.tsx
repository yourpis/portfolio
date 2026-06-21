import Link from "next/link";
import prisma from "@/lib/prisma";
import DeleteButton from "./DeleteButton"; // We will create this next!

export default async function AdminDashboard() {
  // Fetch all projects, ordered by the most viewed first!
  const projects = await prisma.project.findMany({
    orderBy: { views: "desc" },
  });

  return (
    <main className="min-h-screen bg-[#050505] text-[#ededed] font-sans selection:bg-white/20 pb-32">
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900/30 via-[#050505] to-[#050505] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24">
        
        {/* Dashboard Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white mb-2">
              Command Center
            </h1>
            <p className="text-neutral-400">System Analytics & Protocol Management</p>
          </div>
          
          <Link 
            href="/admin/editor" 
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-neutral-200 transition-colors"
          >
            + Initialize New Protocol
          </Link>
        </header>

        {/* Analytics Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <h3 className="text-neutral-400 text-sm font-medium mb-2">Total Deployments</h3>
            <p className="text-3xl font-bold text-white">{projects.length}</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <h3 className="text-neutral-400 text-sm font-medium mb-2">Total System Views</h3>
            <p className="text-3xl font-bold text-emerald-400">
              {projects.reduce((sum, p) => sum + p.views, 0)}
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <h3 className="text-neutral-400 text-sm font-medium mb-2">Top Protocol</h3>
            <p className="text-lg font-bold text-white truncate">
              {projects[0]?.title || "N/A"}
            </p>
          </div>
        </div>

        {/* The Data Table */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-neutral-300">
              <thead className="bg-white/5 text-neutral-400 uppercase font-mono tracking-wider text-[10px]">
                <tr>
                  <th className="px-6 py-4">Protocol (Project)</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">👁️ Views</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">
                      <Link href={`/projects/${project.slug}`} className="hover:underline">
                        {project.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4">{project.type}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-neutral-800 border border-neutral-700 rounded-md text-[10px] uppercase tracking-widest">
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-emerald-400">
                      {project.views}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {/* Interactive Delete Button (Client Component) */}
                      <DeleteButton id={project.id} />
                    </td>
                  </tr>
                ))}
                
                {projects.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-neutral-500">
                      No protocols deployed yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
  );
}