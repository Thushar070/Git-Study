import React, { useState } from 'react';
import { Search, GitPullRequest, AlertCircle, Tag, FolderGit2, Key } from 'lucide-react';
import { GithubIcon as Github } from '../components/GithubIcon';
import { allCommands as commandRegistry } from '../data/registry';
import { CommandCard } from '../components/CommandCard';
import { CodeBlock } from '../components/CodeBlock';

export const GitHubOverview: React.FC = () => {
  const [search, setSearch] = useState('');
  const [subcat, setSubcat] = useState<string>('all');

  const ghCommands = commandRegistry.filter((c) => c.executable === 'gh');

  const filteredCommands = ghCommands.filter((cmd) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchesName = cmd.name.toLowerCase().includes(q);
      const matchesSummary = cmd.summary.toLowerCase().includes(q);
      if (!matchesName && !matchesSummary) return false;
    }

    if (subcat !== 'all') {
      if (subcat === 'pr' && !cmd.name.startsWith('pr')) return false;
      if (subcat === 'issue' && !cmd.name.startsWith('issue')) return false;
      if (subcat === 'release' && !cmd.name.startsWith('release')) return false;
      if (subcat === 'repo' && !cmd.name.startsWith('repo')) return false;
      if (subcat === 'auth' && !cmd.name.startsWith('auth')) return false;
    }

    return true;
  });

  return (
    <div className="page-container github-overview-page">
      <div className="page-header">
        <div className="page-title-group">
          <div className="page-icon-wrapper text-purple">
            <Github size={28} />
          </div>
          <div>
            <h1 className="page-title">GitHub CLI (gh) Reference</h1>
            <p className="page-description">
              Master official GitHub command-line interface tools to manage Pull Requests, Issues, Releases, Gists, and Workflows directly from your terminal.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Setup Card */}
      <div className="gh-setup-card">
        <div className="setup-header">
          <Key size={20} className="text-purple" />
          <h3>Getting Started with GitHub CLI</h3>
        </div>
        <p>Authenticate your GitHub account directly in your terminal to enable interactive PR creation, review, and issue tracking:</p>
        <CodeBlock code="gh auth login" language="bash" showCopy />
      </div>

      {/* Filter Bar */}
      <div className="filter-controls-card mt-6">
        <div className="search-filter-row">
          <div className="search-input-box">
            <Search size={18} className="search-box-icon" />
            <input
              type="text"
              className="search-control"
              placeholder="Search GitHub CLI commands (gh pr, gh issue, gh release)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="category-pills-row">
          <button className={`cat-pill ${subcat === 'all' ? 'active' : ''}`} onClick={() => setSubcat('all')}>
            <span>All gh Commands</span>
            <span className="cat-pill-count">{ghCommands.length}</span>
          </button>
          <button className={`cat-pill ${subcat === 'pr' ? 'active' : ''}`} onClick={() => setSubcat('pr')}>
            <GitPullRequest size={14} />
            <span>Pull Requests (gh pr)</span>
          </button>
          <button className={`cat-pill ${subcat === 'issue' ? 'active' : ''}`} onClick={() => setSubcat('issue')}>
            <AlertCircle size={14} />
            <span>Issues (gh issue)</span>
          </button>
          <button className={`cat-pill ${subcat === 'release' ? 'active' : ''}`} onClick={() => setSubcat('release')}>
            <Tag size={14} />
            <span>Releases (gh release)</span>
          </button>
          <button className={`cat-pill ${subcat === 'repo' ? 'active' : ''}`} onClick={() => setSubcat('repo')}>
            <FolderGit2 size={14} />
            <span>Repos & Auth</span>
          </button>
        </div>
      </div>

      {/* Commands Grid */}
      <div className="commands-grid mt-6">
        {filteredCommands.map((cmd) => (
          <CommandCard key={cmd.id} command={cmd} />
        ))}
      </div>
    </div>
  );
};
