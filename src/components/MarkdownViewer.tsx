"use client";

import ReactMarkdown from "react-markdown";

export default function MarkdownViewer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        h1: ({ _node, ...props }: any) => <h1 className="text-xl md:text-2xl text-white mt-8 md:mt-10 mb-3 md:mb-4" {...props} />,
        h2: ({ _node, ...props }: any) => <h2 className="text-lg md:text-xl text-white mt-6 md:mt-8 mb-3 md:mb-4" {...props} />,
        h3: ({ _node, ...props }: any) => <h3 className="text-base md:text-lg text-white mt-5 md:mt-6 mb-2 md:mb-3" {...props} />,
        p: ({ _node, ...props }: any) => <p className="text-neutral-300 text-sm md:text-base leading-relaxed mb-5 md:mb-6" {...props} />,
        ul: ({ _node, ...props }: any) => <ul className="list-disc list-outside ml-4 md:ml-5 mb-5 md:mb-6 space-y-1.5 md:space-y-2 text-sm md:text-base" {...props} />,
        li: ({ _node, ...props }: any) => <li className="text-neutral-300 pl-1.5 md:pl-2" {...props} />,
        code: ({ _node, className, children, ...props }: any) => {
          return (
            <code className="bg-neutral-900 border border-neutral-800 rounded-md px-1.5 py-0.5 text-xs md:text-sm font-mono text-emerald-400" {...props}>
              {children}
            </code>
          )
        },
        img: ({ _node, src, alt, ...props }: any) => {
          if (!src) return null;
          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img 
              src={src} 
              alt={alt || "Project Image"}
              className="rounded-lg shadow-lg my-6 md:my-8 w-full bg-neutral-900/20" 
              onError={(e) => {
                e.currentTarget.onerror = null; 
                e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 24 24' fill='none' stroke='%23525252' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='3' width='18' height='18' rx='2' ry='2'%3E%3C/rect%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'%3E%3C/circle%3E%3Cpolyline points='21 15 16 10 5 21'%3E%3C/polyline%3E%3Cline x1='3' y1='3' x2='21' y2='21' stroke='%23ef4444' stroke-width='1.5'%3E%3C/line%3E%3C/svg%3E";
                e.currentTarget.className = "rounded-lg shadow-lg my-6 md:my-8 w-full h-48 md:h-64 bg-neutral-900/30 object-contain p-10 md:p-16 border border-neutral-800/50";
              }}
              {...props} 
            />
          );
        },
        a: ({ _node, ...props }: any) => (
          <a className="text-[#dbfe52] no-underline hover:underline transition-colors" target="_blank" rel="noopener noreferrer" {...props} />
        )
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
