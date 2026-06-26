"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { createProject } from "@/app/actions/project";

// Dynamically import the markdown editor so it doesn't crash Server-Side Rendering
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function AdminEditor() {
  const [content, setContent] = useState<string>("# Context\nStart typing here...");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState("Web Development");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    // Save a reference to the form right away!
    const form = event.currentTarget;
    const formData = new FormData(form);
    
    const result = await createProject(formData, content);

    if (result.success) {
      alert("✅ Protocol Deployed Successfully!");
      // Use the saved reference to reset
      form.reset();
      setContent("# Context\n");
      setSelectedDomain("Web Development");
    } else {
      alert(`❌ Deployment Failed: ${result.error}`);
    }
    
    setIsSubmitting(false);
  }

  // Antigravity Glassmorphism Input Styling
  const inputClass = "w-full bg-white/5 border border-white/10 rounded-[9px] px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-all";

  return (
    <div className="min-h-screen bg-[#050505] text-[#ededed] p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        <header className="mb-10">
          <h1 className="text-4xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500">
            Initialize New Protocol
          </h1>
          <p className="text-neutral-400 mt-2">Admin Command Center Editor</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Metadata Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 rounded-[9px] bg-white/5 border border-white/10 backdrop-blur-md">
            
            <div className="space-y-2">
              <label className="text-sm text-neutral-400 font-medium">Title *</label>
              <input required name="title" type="text" placeholder="e.g. F1 Race Game" className={inputClass} />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-neutral-400 font-medium">Context (Type) *</label>
              <select required name="type" className={inputClass + " appearance-none"}>
                <option value="Personal Project" className="bg-neutral-900">Personal Project</option>
                <option value="Academic / University" className="bg-neutral-900">Academic / University</option>
                <option value="Professional / Client Work" className="bg-neutral-900">Professional / Client Work</option>
                <option value="Hackathon / Competition" className="bg-neutral-900">Hackathon / Competition</option>
                <option value="Open Source" className="bg-neutral-900">Open Source</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-neutral-400 font-medium">Domain *</label>
              {selectedDomain !== "Other" ? (
                <select 
                  required 
                  name="subcategory" 
                  className={inputClass + " appearance-none"}
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                >
                  <option value="Web Development" className="bg-neutral-900">Web Development</option>
                  <option value="Embedded Systems & IoT" className="bg-neutral-900">Embedded Systems & IoT</option>
                  <option value="Hardware & Digital Design" className="bg-neutral-900">Hardware & Digital Design</option>
                  <option value="Game Development" className="bg-neutral-900">Game Development</option>
                  <option value="Human-Computer Interaction (HCI)" className="bg-neutral-900">Human-Computer Interaction (HCI)</option>
                  <option value="Software Engineering" className="bg-neutral-900">Software Engineering</option>
                  <option value="Cybersecurity" className="bg-neutral-900">Cybersecurity</option>
                  <option value="Data Science & AI" className="bg-neutral-900">Data Science & AI</option>
                  <option value="Other" className="bg-neutral-900">Other (Custom)</option>
                </select>
              ) : (
                <div className="flex gap-2">
                  <input 
                    required 
                    name="subcategory" 
                    type="text" 
                    placeholder="Enter custom domain..." 
                    className={inputClass} 
                    autoFocus
                  />
                  <button 
                    type="button" 
                    onClick={() => setSelectedDomain("Web Development")}
                    className="px-4 bg-white/10 hover:bg-white/20 text-white rounded-[9px] transition-colors text-sm font-medium whitespace-nowrap border border-white/10"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm text-neutral-400 font-medium">Status *</label>
              <select required name="status" className={inputClass + " appearance-none"}>
                <option value="Completed" className="bg-neutral-900">Completed</option>
                <option value="Production" className="bg-neutral-900">Production</option>
                <option value="Deployed" className="bg-neutral-900">Deployed</option>
                <option value="Ongoing" className="bg-neutral-900">Ongoing</option>
                <option value="Resigned" className="bg-neutral-900">Resigned</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-neutral-400 font-medium">Start Date</label>
              <input name="dateStart" type="text" placeholder="YYYY-MM" className={inputClass} />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-neutral-400 font-medium">End Date</label>
              <input name="dateEnd" type="text" placeholder="YYYY-MM or Present" className={inputClass} />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-neutral-400 font-medium">Role</label>
              <input name="role" type="text" placeholder="e.g. Lead Developer" className={inputClass} />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-neutral-400 font-medium">Organization</label>
              <input name="organization" type="text" placeholder="e.g. BEM UI" className={inputClass} />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-neutral-400 font-medium">Cover Image/Video Upload</label>
              <input 
                name="mediaFile" 
                type="file" 
                accept="image/*,video/*"
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-[9px] px-4 py-2 text-neutral-400 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20 transition-all cursor-pointer" 
              />
            </div>

          </div>

          {/* Markdown Editor Section */}
          <div className="rounded-[9px] overflow-hidden border border-white/10" data-color-mode="dark">
            <MDEditor 
              value={content} 
              onChange={(val) => setContent(val || "")} 
              height={500}
              className="!bg-[#0a0a0a]"
              previewOptions={{
                components: {
                  img: ({ src, alt, ...props }) => {
                    if (!src) return null;
                    // eslint-disable-next-line @next/next/no-img-element
                    return <img src={src} alt={alt || ""} {...props} />;
                  }
                }
              }}
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-white text-black font-semibold rounded-[9px] px-4 py-4 hover:bg-neutral-200 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Deploying..." : "Execute Deployment"}
          </button>
        </form>

      </div>
    </div>
  );
}