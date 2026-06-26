export default function ContactPage() {
  const inputClass = "w-full bg-[#0a0a0a] border border-white/10 rounded-[9px] px-4 py-3 text-base text-white placeholder-white/30 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-all";

  return (
    <main className="min-h-screen bg-[#050505] text-[#ededed] font-sans selection:bg-white/20 pb-32">
      {/* Subtle glowing background mesh */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900/30 via-[#050505] to-[#050505] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-[80px] lg:pt-[140px]">
        
        {/* Header */}
        <header className="mb-10 lg:mb-16 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
            Initialize Contact.
          </h1>
          <p className="text-lg text-neutral-400 max-w-xl">
            Whether you are looking to deploy a new project, require consulting, or want to integrate me into your engineering team, secure a channel below.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Left Column: Direct Message Form */}
          <section className="p-6 md:p-8 rounded-[9px] bg-white/5 border border-white/10 backdrop-blur-md">
            <h2 className="text-2xl font-semibold text-white mb-6">Direct Payload</h2>
            
            {/* The Recruiter Fast-Track Form */}
            <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs text-neutral-400 font-medium uppercase tracking-wider">Company</label>
                  <input required name="company" type="text" placeholder="e.g. GoTo, Shopee..." className={inputClass} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-neutral-400 font-medium uppercase tracking-wider">Recruiter Email</label>
                  <input required name="email" type="email" placeholder="talent@company.com" className={inputClass} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-neutral-400 font-medium uppercase tracking-wider">Target Role</label>
                <select required name="role" className={inputClass + " appearance-none"}>
                  <option value="Full-Stack Engineer" className="bg-neutral-900">Full-Stack Engineer</option>
                  <option value="Backend Engineer" className="bg-neutral-900">Backend Engineer</option>
                  <option value="Frontend Engineer" className="bg-neutral-900">Frontend / Next.js Engineer</option>
                  <option value="Embedded Systems" className="bg-neutral-900">Embedded Systems / Hardware</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs text-neutral-400 font-medium uppercase tracking-wider">Work Model</label>
                  <select required name="work_model" className={inputClass + " appearance-none"}>
                    <option value="Remote" className="bg-neutral-900">100% Remote</option>
                    <option value="Hybrid (Jakarta)" className="bg-neutral-900">Hybrid (Jakarta Area)</option>
                    <option value="On-Site" className="bg-neutral-900">On-Site</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-neutral-400 font-medium uppercase tracking-wider">Job Description Link</label>
                  <input name="jd_link" type="url" placeholder="https://..." className={inputClass} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-neutral-400 font-medium uppercase tracking-wider">Additional Context (Optional)</label>
                <textarea name="message" rows={3} placeholder="Salary bands, specific requirements, or why I'd be a good fit..." className={inputClass}></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-white text-black font-semibold rounded-[9px] px-4 py-4 hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 mt-4"
              >
                Transmit Proposal <span className="text-lg">↗</span>
              </button>
            </form>
          </section>

          {/* Right Column: Calendar Booking Widget */}
          <section className="p-6 md:p-8 rounded-[9px] bg-white/5 border border-white/10 backdrop-blur-md flex flex-col h-full">
            <h2 className="text-2xl font-semibold text-white mb-2">Schedule Integration</h2>
            <p className="text-sm text-neutral-400 mb-6">Book a 30-minute technical screening or consultation directly on my calendar.</p>
            
            {/* Cal.com Embed Container */}
            <div className="flex-grow w-full rounded-[9px] overflow-hidden bg-[#0a0a0a] border border-white/10 relative min-h-[400px]">
              {/* Replace this iframe src with your actual Cal.com or Calendly link */}
              <iframe 
                src="https://cal.com/tubagusdafa?theme=dark" 
                width="100%" 
                height="100%" 
                className="absolute inset-0 border-0"
                title="Schedule Meeting"
              ></iframe>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}