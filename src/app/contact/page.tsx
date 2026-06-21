export default function ContactPage() {
  const inputClass = "w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-all";

  return (
    <main className="min-h-screen bg-[#050505] text-[#ededed] font-sans selection:bg-white/20 pb-32">
      {/* Subtle glowing background mesh */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900/30 via-[#050505] to-[#050505] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24">
        
        {/* Header */}
        <header className="mb-16 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
            Initialize Contact.
          </h1>
          <p className="text-lg text-neutral-400 max-w-xl">
            Whether you are looking to deploy a new project, require consulting, or want to integrate me into your engineering team, secure a channel below.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Left Column: Direct Message Form */}
          <section className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
            <h2 className="text-2xl font-semibold text-white mb-6">Direct Payload</h2>
            
            {/* Replace the action URL with your Formspree URL later */}
            <form action="https://formspree.io/f/xqevzplv" method="POST" className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm text-neutral-400 font-medium">Designation (Name)</label>
                <input required name="name" type="text" placeholder="John Doe" className={inputClass} />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-neutral-400 font-medium">Return Address (Email)</label>
                <input required name="email" type="email" placeholder="john@company.com" className={inputClass} />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-neutral-400 font-medium">Message constraints...</label>
                <textarea required name="message" rows={5} placeholder="We want to hire you for..." className={inputClass}></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-white text-black font-semibold rounded-xl px-4 py-4 hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
              >
                Transmit Message <span className="text-lg">↗</span>
              </button>
            </form>
          </section>

          {/* Right Column: Calendar Booking Widget */}
          <section className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col h-full">
            <h2 className="text-2xl font-semibold text-white mb-2">Schedule Integration</h2>
            <p className="text-sm text-neutral-400 mb-6">Book a 30-minute technical screening or consultation directly on my calendar.</p>
            
            {/* Cal.com Embed Container */}
            <div className="flex-grow w-full rounded-xl overflow-hidden bg-[#0a0a0a] border border-white/10 relative min-h-[400px]">
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