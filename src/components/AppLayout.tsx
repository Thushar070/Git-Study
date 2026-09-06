import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { SearchModal } from './SearchModal';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useState(false);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K or / (when not typing in an input/textarea)
      if (
        (e.key === 'k' && (e.metaKey || e.ctrlKey)) ||
        (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName))
      ) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="app-root-layout">
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onToggleSidebar={() => setIsSidebarOpenMobile(!isSidebarOpenMobile)}
      />

      <div className="app-body-container">
        {/* Desktop Sidebar & Mobile Drawer */}
        <div className={`sidebar-wrapper ${isSidebarOpenMobile ? 'mobile-open' : ''}`}>
          <Sidebar onCloseMobile={() => setIsSidebarOpenMobile(false)} />
          {isSidebarOpenMobile && (
            <div
              className="sidebar-backdrop"
              onClick={() => setIsSidebarOpenMobile(false)}
            />
          )}
        </div>

        {/* Main Content Area */}
        <main className="app-main-content">
          <div className="main-content-scroll">
            {children}
            <Footer />
          </div>
        </main>
      </div>

      {/* Global Search Overlay */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
};
