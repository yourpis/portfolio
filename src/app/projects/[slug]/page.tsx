import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import prisma from "@/lib/prisma";

// Next.js 16 handles params as a Promise for dynamic routes
export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;

  // 1. Fetch the specific project from the database using the URL slug
  const project = await prisma.project.findUnique({
    where: { slug: resolvedParams.slug },
  });

  // If someone types a random URL, show the 404 page
  if (!project) {
    notFound();
  }

  // 2. Analytics: Increment the view counter in the background!
  // (This is what you will see in your Admin Dashboard later)
  await prisma.project.update({
    where: { slug: resolvedParams.slug },
    data: { views: { increment: 1 } },
  });

  return (
    <main className="min-h-screen bg-[#050505] text-[#ededed] font-sans selection:bg-white/20 pb-32">
      {/* Background Glow */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900/30 via-[#050505] to-[#050505] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 pt-24">
        
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center text-sm font-medium text-neutral-500 hover:text-white transition-colors mb-12"
        >
          ← Return to System Core
        </Link>

        {/* Project Header */}
        <header className="mb-16">
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="px-3 py-1 text-xs font-mono tracking-widest text-neutral-300 bg-white/5 border border-white/10 rounded-full">
              {project.type.toUpperCase()}
            </span>
            <span className="px-3 py-1 text-xs font-mono tracking-widest text-neutral-400 border border-neutral-800 rounded-full">
              {project.subcategory.toUpperCase()}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            {project.title}
          </h1>

          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 text-sm text-neutral-400">
            {project.role && (
              <p>Role: <span className="text-neutral-200">{project.role}</span></p>
            )}
            {project.dateStart && project.dateEnd && (
              <p>Timeline: <span className="text-neutral-200">{project.dateStart} — {project.dateEnd}</span></p>
            )}
            {project.organization && (
              <p>Org: <span className="text-neutral-200">{project.organization}</span></p>
            )}
          </div>
        </header>

        {/* Divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-white/20 via-white/5 to-transparent mb-16" />

        {/* Markdown Content rendered beautifully */}
        <article className="prose prose-invert prose-neutral max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-li:text-neutral-300">
          <ReactMarkdown
            components={{
              // Customizing how the markdown elements look using Tailwind!
              h1: ({node, ...props}) => <h1 className="text-3xl text-white mt-12 mb-6" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-2xl text-white mt-10 mb-4" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-xl text-white mt-8 mb-4" {...props} />,
              p: ({node, ...props}) => <p className="text-neutral-300 leading-relaxed mb-6" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc list-outside ml-5 mb-6 space-y-2" {...props} />,
              li: ({node, ...props}) => <li className="text-neutral-300 pl-2" {...props} />,
              code: ({node, className, children, ...props}) => {
                const match = /language-(\w+)/.exec(className || '')
                return (
                  <code className="bg-neutral-900 border border-neutral-800 rounded-md px-1.5 py-0.5 text-sm font-mono text-emerald-400" {...props}>
                    {children}
                  </code>
                )
              }
            }}
          >
            {project.content}
          </ReactMarkdown>
        </article>

      </div>
    </main>
  );
}