"use client";

import { ReactNode, useState } from 'react';
import Sidebar from './Sidebar';
import MobileHeader from './MobileHeader';
import { UserRole } from '@/types';

interface DashboardLayoutProps {
  children: ReactNode;
  userRole?: UserRole;
}

export default function DashboardLayout({ children, userRole = 'candidate' }: DashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#010917] flex w-full relative">
      {/* Mobile Header - Only visible on mobile */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50">
        <MobileHeader
          onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          isMenuOpen={isMobileMenuOpen}
        />
      </div>

      {/* Sidebar - Desktop */}
      <div className="hidden lg:block">
        <Sidebar userRole={userRole} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={`fixed left-0 top-0 h-full z-40 transform transition-transform duration-300 lg:hidden overflow-y-auto ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <Sidebar
          className="h-full overflow-y-auto"
          onClose={() => setIsMobileMenuOpen(false)}
          isMobile={true}
          userRole={userRole}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-full lg:ml-0 mt-16 lg:mt-0">
        {children}
      </main>
    </div>
  );
}
