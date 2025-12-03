"use client";

import Image from "next/image";
import BackButton from "@/components/ui/BackButton";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface TopBarProps {
  title?: string;
  showBack?: boolean;
  onBackClick?: () => void;
}

export default function TopBar({ title = "Dashboard", showBack = false, onBackClick }: TopBarProps) {
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      router.back();
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results or filter current page
      console.log("Searching for:", searchQuery);
      setShowSearch(false);
      setSearchQuery("");
    }
  };

  return (
    <div className="flex justify-between items-center px-4 lg:px-8 py-4 lg:py-6 bg-white border-b border-[#EDEDED] relative">
      {/* Title - Hidden on mobile as we have mobile header */}
      <div className="hidden lg:flex items-center gap-6">
        {showBack && (
          <BackButton onClick={handleBackClick} />
        )}
        <h1 className="text-2xl lg:text-3xl font-bold text-[#1A1A1A] tracking-[-2%]">
          {title}
        </h1>
        
        {/* Search Bar - Desktop */}
        {showSearch && (
          <form onSubmit={handleSearch} className="flex items-center gap-2 ml-4">
            <div className="flex items-center gap-2 border border-[#EDEDED] rounded-lg px-3 py-2 min-w-[300px]">
              <Image
                src="/icons/search.svg"
                alt="Search"
                width={20}
                height={20}
                className="text-[#969699]"
              />
              <input
                type="text"
                placeholder="Search courses, jobs, challenges..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 text-sm outline-none placeholder:text-[#969699]"
                autoFocus
              />
            </div>
            <button
              type="button"
              onClick={() => {
                setShowSearch(false);
                setSearchQuery("");
              }}
              className="text-sm text-[#676767] hover:text-[#1A1A1A]"
            >
              Cancel
            </button>
          </form>
        )}
      </div>

      {/* Mobile Title */}
      <div className="lg:hidden flex items-center gap-3 flex-1">
        {showBack && (
          <BackButton onClick={handleBackClick} />
        )}
        <h1 className="text-xl font-bold text-[#1A1A1A]">
          {title}
        </h1>
      </div>

      {/* Right Side - Desktop */}
      <div className="hidden lg:flex items-center gap-2">
        {/* Search Button */}
        {!showSearch && (
          <button 
            onClick={() => setShowSearch(true)}
            className="w-12 h-12 border border-[#EDEDED] rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
            title="Search"
          >
            <Image
              src="/icons/search.svg"
              alt="Search"
              width={20}
              height={20}
            />
          </button>
        )}
        
        {/* AI Career Coach Button - Hidden on smaller screens */}
        <button 
          onClick={() => router.push('/ai-coach')}
          className="hidden xl:block bg-gradient-to-br from-[#D96570] to-[#4A83F0] text-white font-bold text-sm px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
        >
          AI Career Coach
        </button>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 ml-4">
          <button 
            onClick={() => router.push('/ai-marketplace')}
            className="w-12 h-12 border border-[#EDEDED] rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
            title="AI Marketplace"
          >
            <Image
              src="/icons/magic.svg"
              alt="Magic"
              width={24}
              height={24}
            />
          </button>
          <button 
            onClick={() => router.push('/notifications')}
            className="w-12 h-12 border border-[#EDEDED] rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors relative"
            title="Notifications"
          >
            <Image
              src="/icons/bell.svg"
              alt="Notifications"
              width={24}
              height={24}
            />
            {/* Notification badge */}
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          {/* Profile Avatar */}
          <button
            onClick={() => router.push('/profile')}
            className="w-12 h-12 rounded-full overflow-hidden ml-2 hover:ring-2 hover:ring-[#3D80F8] transition-all cursor-pointer"
            title="Profile"
          >
            <Image
              src="/images/avatar-1.png"
              alt="Profile"
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>

      {/* Mobile Actions */}
      <div className="lg:hidden flex items-center gap-2">
        <button 
          onClick={() => router.push('/notifications')}
          className="w-10 h-10 border border-[#EDEDED] rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors relative"
          title="Notifications"
        >
          <Image
            src="/icons/bell.svg"
            alt="Notifications"
            width={20}
            height={20}
          />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
      </div>
    </div>
  );
}