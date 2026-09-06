import React from 'react';
import { Link } from 'react-router-dom';
import {
  Terminal,
  Layers,
  HelpCircle,
  Zap,
  ArrowRight,
  AlertTriangle,
  FileText,
  HardDrive,
  Globe
} from 'lucide-react';
import { allCommands as commandRegistry } from '../data/registry';
import { situationsData } from '../data/situations';
import { CommandCard } from '../components/CommandCard';

export const Home: React.FC = () => {
  const featuredCommands = commandRegistry.filter((c) =>
    ['commit', 'rebase', 'stash', 'reset', 'branch', 'checkout', 'log', 'merge'].includes(c.name)
  );

  const categories = [
    { title: 'Getting Started', count: commandRegistry.filter((c) => c.category === 'Getting Started').length, desc: 'Repo initialization, cloning, configuration', path: '/git?cat=Getting+Started' },
    { title: 'Staging & Snapshots', count: commandRegistry.filter((c) => c.category === 'Staging & Snapshots').length, desc: 'Adding, status, diffing, committing changes', path: '/git?cat=Staging+%26+Snapshots' },
    { title: 'Branching & Switching', count: commandRegistry.filter((c) => c.category === 'Branching & Switching').length, desc: 'Branch creation, checkout, switch, worktrees', path: '/git?cat=Branching+%26+Switching' },
    { title: 'Merging & Rebasing', count: commandRegistry.filter((c) => c.category === 'Merging & Rebasing').length, desc: 'Integrating work, interactive rebase, cherry-pick', path: '/git?cat=Merging+%26+Rebasing' },
    { title: 'History & Inspection', count: commandRegistry.filter((c) => c.category === 'History & Inspection').length, desc: 'Logs, show, reflog, blame, searching', path: '/git?cat=History+%26+Inspection' },
    { title: 'Undo & Recovery', count: commandRegistry.filter((c) => c.category === 'Undo & Recovery').length, desc: 'Resetting, restoring, reverting, cleaning', path: '/git?cat=Undo+%26+Recovery' },
    { title: 'Remote Repositories', count: commandRegistry.filter((c) => c.category === 'Remote Repositories').length, desc: 'Fetching, pulling, pushing, tracking remotes', path: '/git?cat=Remote+Repositories' },
    { title: 'GitHub CLI', count: commandRegistry.filter((c) => c.category === 'GitHub CLI').length, desc: 'gh pr, gh issue, gh release, gh repo', path: '/github' }
  ];

  return (
    <div className="page-container home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-pill">
            <Zap size={14} className="text-amber" />
            <span>Developer Reference Platform</span>
          </div>

          <h1 className="hero-title">
            GITATLAS
          </h1>

          <p className="hero-subtitle">
            Master Git without memorizing Git. A visual, searchable and interactive reference for Git and GitHub CLI commands.
          </p>

          <div className="hero-actions">
            <Link to="/git" className="btn btn-primary btn-lg">
              <Terminal size={18} />
              <span>Explore Git Commands</span>
            </Link>
            <Link to="/visual-lab" className="btn btn-secondary btn-lg">
              <Layers size={18} />
              <span>Open Visual Lab</span>
            </Link>
          </div>

          <div className="hero-stats-grid">
            <div className="stat-card">
              <span className="stat-value">{commandRegistry.length}+</span>
              <span className="stat-label">Commands</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">18</span>
              <span className="stat-label">Situations</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">12</span>
              <span className="stat-label">Visual Labs</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">9</span>
              <span className="stat-label">Troubleshooting Guides</span>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Visual Workflow Component */}
      <section className="section-block">
        <div className="section-header-center">
          <span className="section-eyebrow">WORKFLOW VISUALIZATION</span>
          <h2 className="section-title">How Git Lifecycle Works</h2>
          <p className="section-subtitle">
            Visualizing the flow of files through Git storage areas.
          </p>
        </div>

        <div className="lifecycle-preview-card">
          <div className="lifecycle-grid">
            <div className="lifecycle-stage stage-working">
              <div className="stage-header">
                <FileText size={20} className="text-sky" />
                <h3>Working Tree</h3>
              </div>
              <p>Your local modified & untracked files on disk.</p>
              <div className="stage-cmd">git add &lt;file&gt; ↓</div>
            </div>

            <div className="lifecycle-stage stage-staging">
              <div className="stage-header">
                <Layers size={20} className="text-amber" />
                <h3>Index (Staging)</h3>
              </div>
              <p>Prepared snapshot state ready for commit.</p>
              <div className="stage-cmd">git commit -m ↓</div>
            </div>

            <div className="lifecycle-stage stage-local">
              <div className="stage-header">
                <HardDrive size={20} className="text-purple" />
                <h3>Local Repo</h3>
              </div>
              <p>Permanent snapshot database in `.git` directory.</p>
              <div className="stage-cmd">git push remote ↓</div>
            </div>

            <div className="lifecycle-stage stage-remote">
              <div className="stage-header">
                <Globe size={20} className="text-emerald" />
                <h3>GitHub (Remote)</h3>
              </div>
              <p>Shared remote server repository for team sync.</p>
              <div className="stage-cmd">↑ git fetch / pull</div>
            </div>
          </div>

          <div className="lifecycle-card-footer">
            <Link to="/visual-lab" className="btn btn-secondary btn-sm">
              <Layers size={15} />
              <span>Explore Interactive Visual Lab</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="section-block">
        <div className="section-header">
          <div>
            <span className="section-eyebrow">EXPLORE BY CATEGORY</span>
            <h2 className="section-title">Command Categories</h2>
          </div>
          <Link to="/git" className="link-with-icon">
            <span>View all commands</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="category-cards-grid">
          {categories.map((cat) => (
            <Link to={cat.path} key={cat.title} className="category-card">
              <div className="cat-card-header">
                <h3>{cat.title}</h3>
                <span className="cat-count">{cat.count} cmds</span>
              </div>
              <p className="cat-card-desc">{cat.desc}</p>
              <div className="cat-card-footer">
                <span>Browse Category</span>
                <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Commands */}
      <section className="section-block">
        <div className="section-header">
          <div>
            <span className="section-eyebrow">MOST ESSENTIAL</span>
            <h2 className="section-title">Popular Commands</h2>
          </div>
          <Link to="/reference/command-index" className="link-with-icon">
            <span>Full command index</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="commands-grid">
          {featuredCommands.map((cmd) => (
            <CommandCard key={cmd.id} command={cmd} />
          ))}
        </div>
      </section>

      {/* Situation Finder Teaser */}
      <section className="section-block">
        <div className="situation-teaser-box">
          <div className="teaser-content">
            <div className="teaser-pill">
              <HelpCircle size={14} />
              <span>STUCK IN A TRICKY SITUATION?</span>
            </div>
            <h2>"What are you trying to do right now?"</h2>
            <p>
              Search by real-world scenarios instead of command names. Get exact steps, command flags, and safe recovery procedures.
            </p>

            <div className="teaser-situations-list">
              {situationsData.slice(0, 4).map((sit) => (
                <Link to={`/situations#${sit.id}`} key={sit.id} className="teaser-situation-item">
                  <span className="sit-icon">💡</span>
                  <span className="sit-text">{sit.question}</span>
                  <ArrowRight size={14} />
                </Link>
              ))}
            </div>

            <div className="teaser-actions">
              <Link to="/situations" className="btn btn-primary">
                <HelpCircle size={16} />
                <span>Open Situation Finder ({situationsData.length} Scenarios)</span>
              </Link>
              <Link to="/troubleshooting" className="btn btn-secondary">
                <AlertTriangle size={16} />
                <span>Troubleshoot Git Error</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
