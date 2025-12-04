"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { UserRole } from "@/types";

interface SidebarProps {
  className?: string;
  onClose?: () => void;
  isMobile?: boolean;
  userRole?: UserRole;
}

interface MenuItem {
  href: string;
  label: string;
  icon: string;
}

// Role-based menu configurations
const candidateMenuItems: MenuItem[] = [
  {
    href: '/candidate',
    label: 'Dashboard',
    icon: '/icons/view-grid.svg',
  },
  {
    href: '/candidate/application',
    label: 'My Application',
    icon: '/icons/document-text.svg',
  },
  {
    href: '/candidate/applications',
    label: 'Job Applications',
    icon: '/icons/briefcase-sidebar.svg',
  },
  {
    href: '/candidate/profile',
    label: 'My Profile',
    icon: '/icons/user.svg',
  },
  {
    href: '/notifications',
    label: 'Notifications',
    icon: '/icons/bell.svg',
  },
];

const employerMenuItems: MenuItem[] = [
  {
    href: '/employer',
    label: 'Dashboard',
    icon: '/icons/view-grid.svg',
  },
  {
    href: '/employer/saved-candidates',
    label: 'Saved Candidates',
    icon: '/icons/user-group.svg',
  },
  {
    href: '/employer/profile',
    label: 'Company Profile',
    icon: '/icons/briefcase-sidebar.svg',
  },
  {
    href: '/notifications',
    label: 'Notifications',
    icon: '/icons/bell.svg',
  },
];

const adminMenuItems: MenuItem[] = [
  {
    href: '/admin',
    label: 'Dashboard',
    icon: '/icons/view-grid.svg',
  },
  {
    href: '/admin/create-application',
    label: 'Create Application',
    icon: '/icons/paper-airplane.svg',
  },
  {
    href: '/admin/pipeline',
    label: 'Pipeline',
    icon: '/icons/briefcase-sidebar.svg',
  },
];

const settingsItems: MenuItem[] = [
  {
    href: '/settings',
    label: 'Settings',
    icon: '/icons/adjustments.svg',
  },
];

function getMenuItemsForRole(role: UserRole): { main: MenuItem[]; settings: MenuItem[] } {
  switch (role) {
    case 'candidate':
      return { main: candidateMenuItems, settings: settingsItems };
    case 'employer':
      return { main: employerMenuItems, settings: settingsItems };
    case 'internal':
      return { main: adminMenuItems, settings: settingsItems };
    default:
      return { main: candidateMenuItems, settings: settingsItems };
  }
}

function getRoleLabel(role: UserRole): string {
  switch (role) {
    case 'candidate':
      return 'Candidate';
    case 'employer':
      return 'Employer';
    case 'internal':
      return 'Admin';
    default:
      return 'Menu';
  }
}

export default function Sidebar({ className, onClose, isMobile = false, userRole = 'candidate' }: SidebarProps) {
  const pathname = usePathname();
  const { main: mainMenuItems, settings: settingsMenuItems } = getMenuItemsForRole(userRole);

  const isActiveRoute = (href: string) => {
    if (href === '/candidate' || href === '/employer' || href === '/admin') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <div className={cn(
      "w-64 flex-shrink-0 bg-[#010917] text-white flex flex-col min-h-screen",
      isMobile && "h-screen overflow-y-auto",
      className
    )}>
      {/* Logo and Close Button for Mobile */}
      <div className="px-5 pt-8 pb-6 flex items-center justify-between sticky top-0 bg-[#010917] z-10">
        {!isMobile ? (
          <Link href={userRole === 'employer' ? '/employer' : userRole === 'internal' ? '/admin' : '/candidate'}>
            <h1 className="text-[28px] font-bold tracking-tight text-white cursor-pointer hover:opacity-90 transition-opacity">
              Talent Flex
            </h1>
          </Link>
        ) : (
          <>
            <span className="text-sm text-[#C3C3C3]">
              {getRoleLabel(userRole)}
            </span>
            {onClose && (
              <button
                onClick={onClose}
                className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </>
        )}
      </div>

      {/* Menu */}
      <div className="flex-1 px-5">
        <div className="space-y-8">
          {/* Main Menu */}
          <div className="space-y-4">
            <h3 className="text-sm text-[#8B8B8B] font-normal">
              Main Menu
            </h3>
            <div className="space-y-1">
              {mainMenuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={isMobile ? onClose : undefined}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-colors",
                    isActiveRoute(item.href)
                      ? "bg-[#3D80F8] text-white"
                      : "text-[#E2E2E2] hover:bg-gray-800"
                  )}
                >
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={20}
                    height={20}
                    className={cn(
                      isActiveRoute(item.href) ? "filter-white" : "filter-gray"
                    )}
                  />
                  <span className="text-base font-normal">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Settings */}
          <div className="space-y-4">
            <h3 className="text-sm text-[#8B8B8B] font-normal">
              Account
            </h3>
            <div className="space-y-1">
              {settingsMenuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={isMobile ? onClose : undefined}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-colors",
                    isActiveRoute(item.href)
                      ? "bg-[#3D80F8] text-white"
                      : "text-[#E2E2E2] hover:bg-gray-800"
                  )}
                >
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={20}
                    height={20}
                    className={cn(
                      isActiveRoute(item.href) ? "filter-white" : "filter-gray"
                    )}
                  />
                  <span className="text-base font-normal">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* User Role Badge */}
      <div className="p-5 border-t border-gray-800">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className={cn(
            "w-2 h-2 rounded-full",
            userRole === 'candidate' && "bg-green-500",
            userRole === 'employer' && "bg-blue-500",
            userRole === 'internal' && "bg-purple-500"
          )} />
          <span className="text-sm text-[#C3C3C3]">
            Logged in as {getRoleLabel(userRole)}
          </span>
        </div>
      </div>
    </div>
  );
}
