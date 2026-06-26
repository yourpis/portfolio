"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button 
      onClick={() => router.back()} 
      className="inline-flex items-center text-[15px] font-medium text-[#dbfe52] hover:opacity-80 transition-opacity mb-8"
    >
      <svg 
        className="w-3.5 h-3.5 mr-1" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M15 19l-7-7 7-7" />
      </svg>
      return
    </button>
  );
}
