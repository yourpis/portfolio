"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { createProject, updateProject, uploadInlineImage } from "@/app/actions/project";
import { useRouter } from "next/navigation";

// Dynamically import the markdown editor so it doesn't crash Server-Side Rendering
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function ProjectForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const [content, setContent] = useState<string>(initialData?.content || "# Context\nStart typing here...");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Set the selected domain to initial subcategory. If it doesn't match standard options, we set it to 'Other'.
  // However, simpler is just initializing it to whatever it was. 
  const isCustomDomain = initialData?.subcategory && !["Web Development", "Embedded Systems & IoT", "Hardware & Digital Design", "Game Development", "Human-Computer Interaction (HCI)", "Software Engineering", "Cybersecurity", "Data Science & AI", "Creative Coding & WebGL", "UI/UX & Product Design", "AR/VR & Spatial Computing"].includes(initialData.subcategory);
  
  const [selectedDomain, setSelectedDomain] = useState(isCustomDomain ? "Other" : (initialData?.subcategory || "Web Development"));
  const [isPresent, setIsPresent] = useState(initialData?.dateEnd === 'Present');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    
    let result;
    if (initialData?.id) {
      result = await updateProject(initialData.id, formData, content);
    } else {
      result = await createProject(formData, content);
    }

    if (result.success) {
      alert(`✅ Protocol ${initialData?.id ? 'Updated' : 'Deployed'} Successfully!`);
      if (!initialData?.id) {
        form.reset();
        setContent("# Context\n");
        setSelectedDomain("Web Development");
        setIsPresent(false);
      } else {
        router.push('/admin/dashboard');
      }
    } else {
      alert(`❌ Deployment Failed: ${result.error}`);
    }
    
    setIsSubmitting(false);
  }

  const insertToTextArea = (insertString: string) => {
    const textarea = document.querySelector('textarea');
    if (!textarea) {
      setContent(prev => prev + insertString);
      return;
    }

    const sentence = textarea.value;
    const len = sentence.length;
    const pos = textarea.selectionStart;

    const front = sentence.slice(0, pos);
    const back = sentence.slice(pos, len);

    setContent(front + insertString + back);
    
    setTimeout(() => {
      textarea.selectionStart = pos + insertString.length;
      textarea.selectionEnd = pos + insertString.length;
    }, 0);
  };

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    
    const placeholder = `\n![Uploading ${file.name}...]()\n`;
    insertToTextArea(placeholder);

    const result = await uploadInlineImage(formData);
    
    if (result.success && result.url) {
      setContent((prev) => prev.replace(placeholder, `\n![${file.name}](${result.url})\n`));
    } else {
      setContent((prev) => prev.replace(placeholder, ""));
      alert(`❌ Image Upload Failed: ${result.error}`);
    }
  };

  const handlePaste = async (event: React.ClipboardEvent) => {
    const items = event.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        event.preventDefault();
        const file = items[i].getAsFile();
        if (file) {
          await handleImageUpload(file);
        }
      }
    }
  };

  const handleDrop = async (event: React.DragEvent) => {
    if (event.dataTransfer?.files?.length > 0) {
      const file = event.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        event.preventDefault();
        await handleImageUpload(file);
      }
    }
  };

  // Antigravity Glassmorphism Input Styling
  const inputClass = "w-full bg-white/5 border border-white/10 rounded-[9px] px-4 py-3 text-base text-white placeholder-white/30 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-all";

  return (
    <div className="min-h-screen bg-[#050505] text-[#ededed] px-6 pt-[80px] lg:pt-[140px] pb-32 font-sans">
      <div className="max-w-5xl mx-auto">
        
        <header className="mb-8 lg:mb-10 text-center md:text-left">
          <h1 className="text-4xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500">
            {initialData ? "Update Protocol" : "Initialize New Protocol"}
          </h1>
          <p className="text-neutral-400 mt-2">Admin Command Center Editor</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Metadata Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 p-4 md:p-6 rounded-[9px] bg-white/5 border border-white/10 backdrop-blur-md">
            
            <div className="space-y-2">
              <label className="text-sm text-neutral-400 font-medium">Title *</label>
              <input required name="title" type="text" defaultValue={initialData?.title} placeholder="e.g. F1 Race Game" className={inputClass} />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-neutral-400 font-medium">Context (Type) *</label>
              <select required name="type" defaultValue={initialData?.type} className={inputClass + " appearance-none"}>
                <option value="Personal Project" className="bg-neutral-900">Personal Project</option>
                <option value="Academic / University" className="bg-neutral-900">Academic / University</option>
                <option value="Agency / Client Work" className="bg-neutral-900">Agency / Client Work</option>
                <option value="In-House / Enterprise" className="bg-neutral-900">In-House / Enterprise</option>
                <option value="Hackathon / Competition" className="bg-neutral-900">Hackathon / Competition</option>
                <option value="Open Source" className="bg-neutral-900">Open Source</option>
                <option value="R&D / Experimental" className="bg-neutral-900">R&D / Experimental</option>
                <option value="Art Installation / Exhibition" className="bg-neutral-900">Art Installation / Exhibition</option>
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
                  <option value="Creative Coding & WebGL" className="bg-neutral-900">Creative Coding & WebGL</option>
                  <option value="UI/UX & Product Design" className="bg-neutral-900">UI/UX & Product Design</option>
                  <option value="AR/VR & Spatial Computing" className="bg-neutral-900">AR/VR & Spatial Computing</option>
                  <option value="Other" className="bg-neutral-900">Other (Custom)</option>
                </select>
              ) : (
                <div className="flex gap-2">
                  <input 
                    required 
                    name="subcategory" 
                    type="text"
                    defaultValue={isCustomDomain ? initialData?.subcategory : ""}
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
              <select required name="status" defaultValue={initialData?.status} className={inputClass + " appearance-none"}>
                <option value="Completed" className="bg-neutral-900">Completed</option>
                <option value="Production" className="bg-neutral-900">Production</option>
                <option value="Deployed" className="bg-neutral-900">Deployed</option>
                <option value="Ongoing" className="bg-neutral-900">Ongoing</option>
                <option value="Prototype" className="bg-neutral-900">Prototype</option>
                <option value="Beta" className="bg-neutral-900">Beta</option>
                <option value="Archived" className="bg-neutral-900">Archived</option>
                <option value="Deprecated" className="bg-neutral-900">Deprecated</option>
                <option value="Halted" className="bg-neutral-900">Halted</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-neutral-400 font-medium">Start Date</label>
              <input name="dateStart" type="month" defaultValue={initialData?.dateStart || ''} className={inputClass} />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-neutral-400 font-medium flex items-center justify-between">
                <span>End Date</span>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="isPresent" checked={isPresent} onChange={(e) => setIsPresent(e.target.checked)} className="w-3.5 h-3.5 accent-white bg-white/10" />
                  <label htmlFor="isPresent" className="text-xs text-neutral-300 font-normal cursor-pointer">Present</label>
                </div>
              </label>
              {isPresent ? (
                <>
                  <input type="hidden" name="dateEnd" value="Present" />
                  <input type="text" disabled value="Present" className={inputClass + " opacity-50 cursor-not-allowed"} />
                </>
              ) : (
                <input name="dateEnd" type="month" defaultValue={initialData?.dateEnd !== 'Present' ? initialData?.dateEnd : ''} className={inputClass} />
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm text-neutral-400 font-medium">Role</label>
              <input name="role" type="text" defaultValue={initialData?.role || ''} placeholder="e.g. Lead Developer" className={inputClass} />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-neutral-400 font-medium">Client / Brand</label>
              <input name="organization" type="text" defaultValue={initialData?.organization || ''} placeholder="e.g. XYZ Agency, Independent" className={inputClass} />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-neutral-400 font-medium">Website URL (Optional)</label>
              <input name="url" type="url" defaultValue={initialData?.url || ''} placeholder="https://..." className={inputClass} />
            </div>

            <div className="space-y-3 flex flex-col justify-center">
              <label className="text-sm text-neutral-400 font-medium">Live Preview Options</label>
              <div className="flex items-center gap-2">
                <input type="checkbox" name="livePreviewOnHome" id="livePreviewOnHome" defaultChecked={initialData?.livePreviewOnHome} className="w-4 h-4 accent-white bg-white/10" />
                <label htmlFor="livePreviewOnHome" className="text-sm text-neutral-300 cursor-pointer">Show on Homepage</label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" name="livePreviewOnProject" id="livePreviewOnProject" defaultChecked={initialData?.livePreviewOnProject} className="w-4 h-4 accent-white bg-white/10" />
                <label htmlFor="livePreviewOnProject" className="text-sm text-neutral-300 cursor-pointer">Show on Project Page</label>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-neutral-400 font-medium">Cover Image/Video Upload</label>
              <input 
                name="mediaFile" 
                type="file" 
                accept="image/*,video/*"
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-[9px] px-4 py-2 text-neutral-400 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-[9px] file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20 transition-all cursor-pointer" 
              />
              {initialData?.media && (
                <p className="text-xs text-neutral-500 mt-1">Leave empty to keep existing media.</p>
              )}
            </div>

          </div>

          {/* Markdown Editor Section */}
          <div 
            className="rounded-[9px] overflow-hidden border border-white/10" 
            data-color-mode="dark"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onPaste={handlePaste}
          >
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
            {isSubmitting ? (initialData ? "Updating..." : "Deploying...") : (initialData ? "Update Protocol" : "Execute Deployment")}
          </button>
        </form>

      </div>
    </div>
  );
}
