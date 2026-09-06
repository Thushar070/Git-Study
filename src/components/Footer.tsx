import React from 'react';
import { Link } from 'react-router-dom';
import { GitBranch, Shield, Terminal, Zap } from 'lucide-react';
import { GithubIcon as Github } from './GithubIcon';

export const Footer: React.FC = () => {
  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Col 1: Brand */}
          <div className="footer-col brand-col">
            <div className="footer-brand">
              <GitBranch size={24} className="footer-logo-icon" />
              <span className="footer-title">GitAtlas</span>
            </div>
            <p className="footer-desc">
              The ultimate interactive Git & GitHub CLI documentation reference. Designed for developers, engineering teams, and Git practitioners.
            </p>
            <div className="footer-badges">
              <span className="footer-tag-badge">
                <Terminal size={12} /> 60+ Commands
              </span>
              <span className="footer-tag-badge">
                <Zap size={12} /> Visual Lab
              </span>
              <span className="footer-tag-badge">
                <Shield size={12} /> Production Ready
              </span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="footer-col">
            <h4 className="footer-heading">Documentation</h4>
            <ul className="footer-links">
              <li><Link to="/git">Git Core Commands</Link></li>
              <li><Link to="/github">GitHub CLI (gh)</Link></li>
              <li><Link to="/situations">Situation / Scenario Finder</Link></li>
              <li><Link to="/troubleshooting">Troubleshooting & Errors</Link></li>
              <li><Link to="/reference/command-index">All Commands Index</Link></li>
            </ul>
          </div>

          {/* Col 3: Visual & Practice */}
          <div className="footer-col">
            <h4 className="footer-heading">Interactive Tools</h4>
            <ul className="footer-links">
              <li><Link to="/visual-lab">Interactive Visual Lab</Link></li>
              <li><Link to="/terminal">Terminal Playground</Link></li>
              <li><Link to="/compare">Command Comparisons</Link></li>
              <li><Link to="/cheatsheet">Git Quick Cheat Sheet</Link></li>
              <li><Link to="/learn">Structured Learning Path</Link></li>
              <li><Link to="/reference/glossary">Git Terms Glossary</Link></li>
            </ul>
          </div>

          {/* Col 4: Project Info */}
          <div className="footer-col">
            <h4 className="footer-heading">Open Source</h4>
            <p className="footer-subtext">
              GitAtlas is built as an open-source educational platform to help software engineers master version control workflows.
            </p>
            <a
              href="https://github.com/Thushar070/Git-Study"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-github-btn"
            >
              <Github size={16} />
              <span>Contribute on GitHub</span>
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            <span>© {new Date().getFullYear()} GitAtlas. Built for developers worldwide.</span>
          </div>
          <div className="footer-extra">
            <span>Crafted with precision for Git Mastery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
