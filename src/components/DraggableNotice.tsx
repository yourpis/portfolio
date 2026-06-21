"use client";

import { motion } from 'framer-motion';

export default function DraggableNotice() {
  return (
    <motion.div 
      drag 
      dragConstraints={{ top: -300, bottom: 300, left: -600, right: 600 }}
      dragElastic={0.2}
      dragMomentum={true}
      className="absolute z-50 bg-[#fffdf0] text-black p-6 lg:p-8 shadow-[12px_20px_50px_-12px_rgba(0,0,0,0.5)] border border-neutral-300 max-w-[300px] lg:max-w-[380px] cursor-grab active:cursor-grabbing top-1/2 left-1/2"
      initial={{ x: "-50%", y: "-50%", rotate: -6 }}
      whileHover={{ scale: 1.02, rotate: -2 }}
      whileDrag={{ scale: 1.05, rotate: 0, boxShadow: "0px 25px 50px -12px rgba(0,0,0,0.6)" }}
    >
      {/* Tape Piece */}
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-24 h-8 bg-white/60 backdrop-blur-md border border-black/10 rotate-3 shadow-sm pointer-events-none z-50"></div>
      
      <p className="text-xs font-mono font-bold uppercase tracking-widest mb-4 text-black bg-[#d0ff14] inline-block px-3 py-1 border border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] pointer-events-none select-none">
        Notice!
      </p>
      
      <div 
        className="cursor-auto"
        onPointerDown={(e) => e.stopPropagation()} // Stop framer-motion from dragging when interacting with links
      >
        <p className="text-base lg:text-lg font-bold leading-relaxed select-none text-neutral-800">
          Professional headshot coming soon. Meanwhile, please accept my manager, Leonardo. Find me on{' '}
          <a href="https://instagram.com/dafizzafr" target="_blank" rel="noopener noreferrer" className="text-black underline decoration-2 decoration-[#d0ff14] hover:bg-[#d0ff14] transition-all cursor-pointer">Instagram</a>,{' '}
          connect on <a href="https://www.linkedin.com/in/tubagusdafa" target="_blank" rel="noopener noreferrer" className="text-black underline decoration-2 decoration-neutral-300 hover:bg-black hover:text-white hover:decoration-black transition-all cursor-pointer">LinkedIn</a>,{' '}
          or say <a href="mailto:tubagus.dafa@ui.ac.id" className="text-black underline decoration-2 decoration-neutral-300 hover:bg-black hover:text-white hover:decoration-black transition-all cursor-pointer">tubagus.dafa@ui.ac.id</a>.
        </p>
      </div>
    </motion.div>
  );
}
