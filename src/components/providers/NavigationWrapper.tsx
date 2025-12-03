"use client";

import { NavigationProvider } from "@/contexts/NavigationContext";

interface NavigationWrapperProps {
  children: React.ReactNode;
}

export default function NavigationWrapper({ children }: NavigationWrapperProps) {
  return (
    <NavigationProvider>
      {children}
    </NavigationProvider>
  );
}
