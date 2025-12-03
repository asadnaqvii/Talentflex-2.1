'use client';

import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  onClick: () => void;
  className?: string;
}

export default function BackButton({ onClick, className = '' }: BackButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`border border-[#EDEDED] rounded-full p-3 hover:bg-gray-100 transition-colors ${className}`}
      aria-label="Go back"
    >
      <ArrowLeft 
        className="w-6 h-6 text-[#1A1A1A]" 
        strokeWidth={2.5}
      />
    </button>
  );
}