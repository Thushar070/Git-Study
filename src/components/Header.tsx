import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Search,
  Menu,
  X,
  GitBranch,
  Terminal,
  Layers,
  HelpCircle,
  FileText,
  Compass,
  BookOpen,
  Zap,
  BookMarked
} from 'lucide-react';
import { GithubIcon as Github } from './GithubIcon';

interface HeaderProps {
  onOpenSearch: () => void;
  onToggleSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch, onToggleSidebar }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <header className="app-header">
      <div className="header-container">
        {/* Left: Mobile Toggle & Brand Logo */}
        <div className="header-left">
          {onToggleSidebar && (
            <button
              className="sidebar-toggle-btn"
              onClick={onToggleSidebar}
              aria-label="Toggle Sidebar"
            >
              <Menu size={20} />
            </button>
          )}
          <Link to="/" className="brand-logo">
            <div className="logo-icon-wrapper">
              <GitBranch size={22} className="logo-icon" />
            </div>
            <div className="brand-text">
              <span className="brand-title">GitAtlas</span>
              <span className="brand-tag">v1.0</span>
            </div>
          </Link>
        </div>

        {/* Center: Search Bar Trigger */}
        <div className="header-center">
          <button className="search-trigger-btn" onClick={onOpenSearch}>
            <Search size={16} className="search-icon" />
            <span className="search-placeholder">Search 60+ commands, flags, situations, errors...</span>
            <kbd className="search-shortcut">/</kbd>
          </button>
        </div>

        {/* Right: Quick Links & GitHub */}
        <div className="header-right">
          <nav className="desktop-nav">
            <Link to="/git" className={`nav-link ${isActive('/git') ? 'active' : ''}`}>
              <Terminal size={15} />
              <span>Git Docs</span>
            </Link>
            <Link to="/github" className={`nav-link ${isActive('/github') ? 'active' : ''}`}>
              <Github size={15} />
              <span>gh CLI</span>
            </Link>
            <Link to="/visual-lab" className={`nav-link ${isActive('/visual-lab') ? 'active' : ''}`}>
              <Layers size={15} />
              <span>Visual Lab</span>
            </Link>
            <Link to="/situations" className={`nav-link ${isActive('/situations') ? 'active' : ''}`}>
              <HelpCircle size={15} />
              <span>Situations</span>
            </Link>
            <Link to="/cheatsheet" className={`nav-link ${isActive('/cheatsheet') ? 'active' : ''}`}>
              <FileText size={15} />
              <span>Cheat Sheet</span>
            </Link>
            <Link to="/terminal" className={`nav-link highlight ${isActive('/terminal') ? 'active' : ''}`}>
              <Zap size={15} />
              <span>Playground</span>
            </Link>
          </nav>

          <a
            href="https://github.com/Thushar070/Git-Study"
            target="_blank"
            rel="noopener noreferrer"
            className="github-link-btn"
            title="View on GitHub"
          >
            <Github size={18} />
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-nav-dropdown">
          <nav className="mobile-nav-list">
            <Link
              to="/git"
              className={`mobile-nav-item ${isActive('/git') ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Terminal size={18} />
              <span>Git Command Reference</span>
            </Link>
            <Link
              to="/github"
              className={`mobile-nav-item ${isActive('/github') ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Github size={18} />
              <span>GitHub CLI Reference</span>
            </Link>
            <Link
              to="/visual-lab"
              className={`mobile-nav-item ${isActive('/visual-lab') ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Layers size={18} />
              <span>Interactive Visual Lab</span>
            </Link>
            <Link
              to="/situations"
              className={`mobile-nav-item ${isActive('/situations') ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <HelpCircle size={18} />
              <span>Situation Finder</span>
            </Link>
            <Link
              to="/compare"
              className={`mobile-nav-item ${isActive('/compare') ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Compass size={18} />
              <span>Command Comparisons</span>
            </Link>
            <Link
              to="/cheatsheet"
              className={`mobile-nav-item ${isActive('/cheatsheet') ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <FileText size={18} />
              <span>Git Cheat Sheet</span>
            </Link>
            <Link
              to="/learn"
              className={`mobile-nav-item ${isActive('/learn') ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <BookOpen size={18} />
              <span>Learning Path</span>
            </Link>
            <Link
              to="/reference/command-index"
              className={`mobile-nav-item ${isActive('/reference/command-index') ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <BookMarked size={18} />
              <span>All Commands Index</span>
            </Link>
            <Link
              to="/terminal"
              className={`mobile-nav-item ${isActive('/terminal') ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Zap size={18} />
              <span>Terminal Playground</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
