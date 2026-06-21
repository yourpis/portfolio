"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { createProject } from "@/app/actions/project";

// Dynamically import the markdown editor so it doesn't crash Server-Side Rendering
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function AdminEditor() {
  const [content, setContent] = useState<string>("# Context\nStart typing here...");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    } else {
      alert(`❌ Deployment Failed: ${result.error}`);
    }
    
    setIsSubmitting(false);
  }

  // Antigravity Glassmorphism Input Styling
  const inputClass = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-all";

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            
            <div className="space-y-2">
              <label className="text-sm text-neutral-400 font-medium">Title *</label>
              <input required name="title" type="text" placeholder="e.g. F1 Race Game" className={inputClass} />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-neutral-400 font-medium">Type *</label>
              <select required name="type" className={inputClass + " appearance-none"}>
                <option value="Project" className="bg-neutral-900">Project</option>
                <option value="Experience" className="bg-neutral-900">Experience</option>
                <option value="Certification" className="bg-neutral-900">Certification</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-neutral-400 font-medium">Subcategory *</label>
              <select required name="subcategory" className={inputClass + " appearance-none"}>
                <option value="Backend Engineering" className="bg-neutral-900">Backend Engineering</option>
                <option value="Full-stack Development" className="bg-neutral-900">Full-stack Development</option>
                <option value="Frontend Development" className="bg-neutral-900">Frontend Development</option>
                <option value="Embedded Systems" className="bg-neutral-900">Embedded Systems</option>
                <option value="Hardware Engineering" className="bg-neutral-900">Hardware Engineering</option>
                <option value="Management Consulting" className="bg-neutral-900">Management Consulting</option>
                <option value="Cybersecurity" className="bg-neutral-900">Cybersecurity</option>
                {/* Feel free to add the rest from your list! */}
              </select>
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
              <label className="text-sm text-neutral-400 font-medium">Cover Image Upload</label>
              <input 
                name="mediaFile" 
                type="file" 
                accept="image/*"
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-2 text-neutral-400 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20 transition-all cursor-pointer" 
              />
            </div>

          </div>

          {/* Markdown Editor Section */}
          <div className="rounded-2xl overflow-hidden border border-white/10" data-color-mode="dark">
            <MDEditor 
              value={content} 
              onChange={(val) => setContent(val || "")} 
              height={500}
              className="!bg-[#0a0a0a]"
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-white text-black font-semibold rounded-xl px-4 py-4 hover:bg-neutral-200 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Deploying..." : "Execute Deployment"}
          </button>
        </form>

      </div>
    </div>
  );
}