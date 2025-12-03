"use client";

import { Menu, X } from "lucide-react";

interface MobileHeaderProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

export default function MobileHeader({ onMenuToggle, isMenuOpen }: MobileHeaderProps) {
  return (
    <div className="bg-[#010917] border-b border-gray-800 px-4 py-3 flex items-center justify-between">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-white">
        Talent Flex
      </h1>

      {/* Menu Toggle Button */}
      <button
        onClick={onMenuToggle}
        className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>
    </div>
  );
}