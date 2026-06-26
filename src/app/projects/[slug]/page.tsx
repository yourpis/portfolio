import Link from "next/link";
import { notFound } from "next/navigation";
import MarkdownViewer from "@/components/MarkdownViewer";
import prisma from "@/lib/prisma";
import BackButton from "@/components/BackButton";

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
    <main className="min-h-screen font-sans selection:bg-white/20 bg-[#141414]">
      {/* Top Section: RGB 0 */}
      <div className="bg-black pt-[80px] lg:pt-[140px] px-5 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <BackButton />

          {/* Project Cover Image or Live Preview */}
          {(project.media || (project.livePreviewOnProject && project.url)) && (
            <div className="w-full aspect-video overflow-hidden mb-8 md:mb-10 relative group">
              {project.livePreviewOnProject && project.url ? (
                <div className="w-full h-full flex flex-col bg-white">
                  {/* Safari Browser Chrome */}
                  <div className="h-10 sm:h-12 bg-[#f6f6f6] border-b border-black/5 flex items-center justify-between px-3 sm:px-4 relative shrink-0">
                    <div className="flex items-center gap-4">
                      <div className="flex gap-1.5 sm:gap-2">
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f56] border border-black/5" />
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ffbd2e] border border-black/5" />
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27c93f] border border-black/5" />
                      </div>
                      <div className="hidden sm:flex items-center gap-3 text-neutral-400">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                      </div>
                    </div>
                    
                    <div className="absolute left-1/2 -translate-x-1/2 w-[50%] max-w-[350px] h-6 sm:h-7 bg-white border border-black/5 rounded-md shadow-sm flex items-center justify-center px-3 gap-1.5 overflow-hidden">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-neutral-800 shrink-0"><path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11ZM12 18C11.1716 18 10.5 17.3284 10.5 16.5C10.5 15.6716 11.1716 15 12 15C12.8284 15 13.5 15.6716 13.5 16.5C13.5 17.3284 12.8284 18 12 18ZM17 11V7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7V11H17Z"/></svg>
                      <span className="text-[9px] sm:text-[11px] text-neutral-800 font-medium font-sans truncate">
                        {project.url.replace(/^https?:\/\/(www\.)?/, '')}
                      </span>
                    </div>

                    <div className="hidden sm:flex items-center gap-3 text-neutral-400">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>
                    </div>
                  </div>
                  {/* Browser Content */}
                  <div className="flex-1 w-full relative bg-white">
                    <iframe src={project.url} className="w-full h-full border-none absolute inset-0" />
                  </div>
                </div>
              ) : project.media?.match(/\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i) ? (
                <video
                  src={project.media}
                  autoPlay loop muted playsInline
                  className="w-full h-full object-cover"
                />
              ) : project.media ? (
                <img
                  src={project.media}
                  alt={`${project.title} cover`}
                  className="w-full h-full object-cover"
                />
              ) : null}

              {/* Optional Website Link Overlay */}
              {project.url && (
                <Link
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 left-4 md:bottom-8 md:left-8 inline-flex items-center gap-2.5 md:gap-4 px-3 py-2 md:px-5 md:py-3 bg-white text-black mix-blend-difference z-20 hover:scale-[1.02] transition-transform duration-300"
                >
                  <div className="flex flex-col justify-center gap-0.5 md:gap-1">
                    <span className="text-[9px] md:text-[11px] font-bold tracking-widest text-neutral-500 uppercase leading-none">Visit Site</span>
                    <span className="text-base sm:text-lg md:text-xl font-black truncate max-w-[160px] sm:max-w-[220px] md:max-w-md lg:max-w-lg leading-none mt-[1px] md:mt-0">
                      {project.url.replace(/^https?:\/\/(www\.)?/, '')}
                    </span>
                  </div>
                  <svg
                    className="w-4 h-4 md:w-6 md:h-6 ml-0.5 md:ml-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </Link>
              )}
            </div>
          )}

          {/* Context and Domain Data */}
          <div className="flex items-center gap-3 md:gap-4 pb-5 px-1">
            <span className="text-white text-sm md:text-[15px] font-medium">{project.type}</span>
            <div className="w-[1.5px] h-3.5 md:h-4 bg-[#dbfe52]" />
            <span className="text-white text-sm md:text-[15px] font-medium">{project.subcategory}</span>
          </div>
        </div>
      </div>

      {/* Bottom Section: RGB 20 */}
      <div className="bg-[#141414] px-5 sm:px-6 md:px-8 py-10 md:py-12 pb-24 md:pb-32">
        <div className="max-w-4xl mx-auto">
          <header className="mb-10 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 md:mb-6">
              {project.title}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-12 mt-8 md:mt-10 pb-8 md:pb-10 border-b border-neutral-800/50 mb-8 md:mb-10">
              {project.role && (
                <div className="flex flex-col gap-1 md:gap-1.5">
                  <span className="text-[10px] tracking-widest text-neutral-500 uppercase font-bold">Role</span>
                  <span className="text-sm sm:text-base md:text-lg text-white font-medium">{project.role}</span>
                </div>
              )}
              {project.dateStart && project.dateEnd && (
                <div className="flex flex-col gap-1 md:gap-1.5">
                  <span className="text-[10px] tracking-widest text-neutral-500 uppercase font-bold">Timeline</span>
                  <span className="text-sm sm:text-base md:text-lg text-white font-medium">{project.dateStart} — {project.dateEnd}</span>
                </div>
              )}
              {project.organization && (
                <div className="flex flex-col gap-1 md:gap-1.5">
                  <span className="text-[10px] tracking-widest text-neutral-500 uppercase font-bold">Organization</span>
                  <span className="text-sm sm:text-base md:text-lg text-white font-medium">{project.organization}</span>
                </div>
              )}
            </div>
          </header>

          {/* Markdown Content */}
          <article className="prose prose-invert prose-neutral max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-[#dbfe52] prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-li:text-neutral-300">
            <MarkdownViewer content={project.content} />
          </article>
        </div>
      </div>
    </main>
  );
}