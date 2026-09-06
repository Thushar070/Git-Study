import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Terminal,
  Bookmark,
  Clock,
  Layers,
  HelpCircle,
  AlertTriangle,
  FileText,
  Compass,
  BookOpen,
  BookMarked,
  Zap,
  ChevronDown,
  ChevronRight,
  Flame,
  Search,
  Grid
} from 'lucide-react';
import { GithubIcon as Github } from './GithubIcon';
import { allCommands as commandRegistry } from '../data/registry';
import { getFavorites, getRecentlyViewed } from '../lib/storage';

interface SidebarProps {
  collapsed?: boolean;
  onCloseMobile?: () => void;
  onOpenSearch?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onCloseMobile, onOpenSearch }) => {
  const location = useLocation();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    'Getting Started': true,
    'Staging & Snapshots': true,
    'Branching & Switching': false,
    'Merging & Rebasing': false,
    'Undo & Recovery': false,
    'History & Inspection': false,
    'Remote Repositories': false,
    'GitHub CLI': false
  });

  useEffect(() => {
    setFavorites(getFavorites());
    setRecent(getRecentlyViewed());
  }, [location.pathname]);

  const toggleCategory = (cat: string) => {
    setOpenCategories((prev) => ({ ...prev, [cat]: !prev[cat] }));
  };

  const categories = Array.from(new Set(commandRegistry.map((c) => c.category)));

  const getCommandsForCategory = (cat: string) => {
    return commandRegistry.filter((c) => c.category === cat);
  };

  const favCommands = commandRegistry.filter((c) => favorites.includes(c.id));
  const recentCommands = commandRegistry.filter((c) => recent.includes(c.id));

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="app-sidebar">
      <div className="sidebar-scroll">
        {/* Search Bar Button in Sidebar */}
        <div className="sidebar-section">
          <button className="sidebar-nav-item search-btn-item" onClick={onOpenSearch}>
            <Search size={16} />
            <span>Search Documentation</span>
            <kbd className="cat-count-badge">⌘K</kbd>
          </button>
        </div>

        {/* EXPLORE SECTION */}
        <div className="sidebar-section">
          <div className="sidebar-section-title">
            <span>EXPLORE</span>
          </div>
          <ul className="sidebar-nav-list">
            <li>
              <Link to="/git" className={`sidebar-nav-item ${isActive('/git') ? 'active' : ''}`} onClick={onCloseMobile}>
                <Terminal size={16} />
                <span>Git Docs</span>
              </Link>
            </li>
            <li>
              <Link to="/github" className={`sidebar-nav-item ${isActive('/github') ? 'active' : ''}`} onClick={onCloseMobile}>
                <Github size={16} />
                <span>GitHub CLI</span>
              </Link>
            </li>
            <li>
              <Link to="/visual-lab" className={`sidebar-nav-item ${isActive('/visual-lab') ? 'active' : ''}`} onClick={onCloseMobile}>
                <Layers size={16} />
                <span>Visual Lab</span>
              </Link>
            </li>
            <li>
              <Link to="/situations" className={`sidebar-nav-item ${isActive('/situations') ? 'active' : ''}`} onClick={onCloseMobile}>
                <HelpCircle size={16} />
                <span>Situations</span>
              </Link>
            </li>
            <li>
              <Link to="/cheatsheet" className={`sidebar-nav-item ${isActive('/cheatsheet') ? 'active' : ''}`} onClick={onCloseMobile}>
                <FileText size={16} />
                <span>Cheat Sheet</span>
              </Link>
            </li>
            <li>
              <Link to="/terminal" className={`sidebar-nav-item ${isActive('/terminal') ? 'active' : ''}`} onClick={onCloseMobile}>
                <Zap size={16} className="text-amber" />
                <span>Playground</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* REFERENCE SECTION */}
        <div className="sidebar-section">
          <div className="sidebar-section-title">
            <span>REFERENCE</span>
          </div>
          <ul className="sidebar-nav-list">
            <li>
              <Link to="/reference/command-index" className={`sidebar-nav-item ${isActive('/reference/command-index') ? 'active' : ''}`} onClick={onCloseMobile}>
                <Grid size={16} />
                <span>Command Index</span>
              </Link>
            </li>
            <li>
              <Link to="/compare" className={`sidebar-nav-item ${isActive('/compare') ? 'active' : ''}`} onClick={onCloseMobile}>
                <Compass size={16} />
                <span>Comparisons</span>
              </Link>
            </li>
            <li>
              <Link to="/troubleshooting" className={`sidebar-nav-item ${isActive('/troubleshooting') ? 'active' : ''}`} onClick={onCloseMobile}>
                <AlertTriangle size={16} />
                <span>Troubleshooting</span>
              </Link>
            </li>
            <li>
              <Link to="/learn" className={`sidebar-nav-item ${isActive('/learn') ? 'active' : ''}`} onClick={onCloseMobile}>
                <BookOpen size={16} />
                <span>Learning Path</span>
              </Link>
            </li>
            <li>
              <Link to="/reference/glossary" className={`sidebar-nav-item ${isActive('/reference/glossary') ? 'active' : ''}`} onClick={onCloseMobile}>
                <BookMarked size={16} />
                <span>Glossary</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* COMMAND CATEGORIES SECTION */}
        <div className="sidebar-section">
          <div className="sidebar-section-title">
            <span>COMMAND CATEGORIES</span>
          </div>

          {categories.map((cat) => {
            const cmds = getCommandsForCategory(cat);
            const isOpen = !!openCategories[cat];
            return (
              <div key={cat} className="sidebar-category-group">
                <button
                  className="sidebar-category-toggle"
                  onClick={() => toggleCategory(cat)}
                >
                  <div className="cat-title-inner">
                    {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    <span>{cat}</span>
                  </div>
                  <span className="cat-count-badge">{cmds.length}</span>
                </button>

                {isOpen && (
                  <ul className="sidebar-subnav-list">
                    {cmds.map((cmd) => (
                      <li key={cmd.id}>
                        <Link
                          to={`${cmd.executable === 'gh' ? '/github' : '/git'}/commands/${cmd.id}`}
                          className={`sidebar-subnav-item ${isActive(`${cmd.executable === 'gh' ? '/github' : '/git'}/commands/${cmd.id}`) ? 'active' : ''}`}
                          onClick={onCloseMobile}
                        >
                          <span className="subnav-name">{cmd.executable} {cmd.name}</span>
                          {cmd.dangerLevel === 'destructive' && <span className="ml-auto text-danger" title="Destructive command"><Flame size={12} /></span>}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>

        {/* Saved Commands */}
        {favCommands.length > 0 && (
          <div className="sidebar-section">
            <div className="sidebar-section-title">
              <Bookmark size={14} className="text-amber" />
              <span>Saved ({favCommands.length})</span>
            </div>
            <ul className="sidebar-nav-list">
              {favCommands.map((cmd) => (
                <li key={cmd.id}>
                  <Link
                    to={`/git/commands/${cmd.id}`}
                    className={`sidebar-nav-item ${isActive(`/git/commands/${cmd.id}`) ? 'active' : ''}`}
                    onClick={onCloseMobile}
                  >
                    <Terminal size={14} />
                    <span className="cmd-item-name">{cmd.executable} {cmd.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Recently Viewed Commands */}
        {recentCommands.length > 0 && (
          <div className="sidebar-section">
            <div className="sidebar-section-title">
              <Clock size={14} />
              <span>Recently Viewed</span>
            </div>
            <ul className="sidebar-nav-list">
              {recentCommands.slice(0, 5).map((cmd) => (
                <li key={cmd.id}>
                  <Link
                    to={`/git/commands/${cmd.id}`}
                    className={`sidebar-nav-item ${isActive(`/git/commands/${cmd.id}`) ? 'active' : ''}`}
                    onClick={onCloseMobile}
                  >
                    <Terminal size={14} />
                    <span className="cmd-item-name">{cmd.executable} {cmd.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </aside>
  );
};
