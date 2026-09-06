import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookMarked, Search, ArrowRight } from 'lucide-react';
import { allCommands as commandRegistry } from '../data/registry';
import { CategoryBadge, DangerBadge, DifficultyBadge } from '../components/Badge';

export const CommandIndex: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedExec, setSelectedExec] = useState<'all' | 'git' | 'gh'>('all');

  const filteredCommands = commandRegistry.filter((cmd) => {
    if (selectedExec !== 'all' && cmd.executable !== selectedExec) return false;

    if (search.trim()) {
      const q = search.toLowerCase();
      const matchesName = cmd.name.toLowerCase().includes(q);
      const matchesSummary = cmd.summary.toLowerCase().includes(q);
      const matchesCat = cmd.category.toLowerCase().includes(q);
      if (!matchesName && !matchesSummary && !matchesCat) return false;
    }

    return true;
  });

  return (
    <div className="page-container command-index-page">
      <div className="page-header">
        <div className="page-title-group">
          <div className="page-icon-wrapper text-primary">
            <BookMarked size={28} />
          </div>
          <div>
            <h1 className="page-title">Master Command Index</h1>
            <p className="page-description">
              Directory of all {commandRegistry.length}+ documented Git & GitHub CLI commands with category, difficulty, danger level, and flags count.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="filter-controls-card">
        <div className="search-filter-row">
          <div className="search-input-box">
            <Search size={18} className="search-box-icon" />
            <input
              type="text"
              className="search-control"
              placeholder="Search directory by command name or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="select-filters-group">
            <button
              className={`cat-pill ${selectedExec === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedExec('all')}
            >
              All ({commandRegistry.length})
            </button>
            <button
              className={`cat-pill ${selectedExec === 'git' ? 'active' : ''}`}
              onClick={() => setSelectedExec('git')}
            >
              git ({commandRegistry.filter((c) => c.executable === 'git').length})
            </button>
            <button
              className={`cat-pill ${selectedExec === 'gh' ? 'active' : ''}`}
              onClick={() => setSelectedExec('gh')}
            >
              gh ({commandRegistry.filter((c) => c.executable === 'gh').length})
            </button>
          </div>
        </div>
      </div>

      {/* Table Directory */}
      <div className="index-table-wrapper mt-6">
        <table className="index-table">
          <thead>
            <tr>
              <th>Command</th>
              <th>Category</th>
              <th>Summary</th>
              <th>Difficulty</th>
              <th>Danger</th>
              <th>Flags</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCommands.map((cmd) => (
              <tr key={cmd.id}>
                <td className="cmd-cell">
                  <code>{cmd.executable} {cmd.name}</code>
                </td>
                <td>
                  <CategoryBadge category={cmd.category} />
                </td>
                <td className="summary-cell">{cmd.summary}</td>
                <td>
                  <DifficultyBadge difficulty={cmd.difficulty} />
                </td>
                <td>
                  <DangerBadge level={cmd.dangerLevel} />
                </td>
                <td className="flags-count-cell">{cmd.options.length} flags</td>
                <td>
                  <Link
                    to={`${cmd.executable === 'gh' ? '/github' : '/git'}/commands/${cmd.id}`}
                    className="btn btn-secondary btn-sm"
                  >
                    <span>Docs</span>
                    <ArrowRight size={12} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
