import { createContext, useContext, useState, ReactNode } from 'react';

export type NavigationPage = 
  | 'dashboard'
  | 'jobs' 
  | 'roadmap'
  | 'ai-marketplace'
  | 'skills'
  | 'challenges'
  | 'team'
  | 'profile'
  | 'ai-coach'
  | 'pricing';

interface NavigationContextType {
  currentPage: NavigationPage;
  setCurrentPage: (page: NavigationPage) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<NavigationPage>('dashboard');

  return (
    <NavigationContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
