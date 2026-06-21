import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-[#050505]/70 backdrop-blur-md border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo / Name */}
        <Link 
          href="/" 
          className="text-white font-semibold tracking-tight text-lg hover:text-neutral-300 transition-colors flex items-center gap-2"
        >
          <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-neutral-200 to-neutral-600 shadow-[0_0_10px_rgba(255,255,255,0.2)]" />
          Tubagus Dafa
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
          <Link href="/" className="hover:text-white transition-colors">
            Protocols (Projects)
          </Link>
          <Link href="/contact" className="hover:text-white transition-colors">
            Initialize Contact
          </Link>
          {/* Secret link for you to easily access the admin panel! */}
          <Link href="/admin/dashboard" className="hover:text-emerald-400 transition-colors">
            [ Admin ]
          </Link>
        </nav>

        {/* Mobile Menu Button (Optional/Visual for now) */}
        <button className="md:hidden text-neutral-400 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>
          </svg>
        </button>

      </div>
    </header>
  );
}