import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Terminal, Search, RefreshCw } from 'lucide-react';
import { allCommands as commandRegistry } from '../data/registry';
import { CommandCard } from '../components/CommandCard';

export const GitOverview: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const catParam = searchParams.get('cat') || 'all';

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(catParam);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedDanger, setSelectedDanger] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(commandRegistry.filter((c) => c.executable === 'git').map((c) => c.category)))];

  const filteredCommands = useMemo(() => {
    return commandRegistry.filter((cmd) => {
      if (cmd.executable !== 'git') return false;

      // Search filter
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesName = cmd.name.toLowerCase().includes(q);
        const matchesSummary = cmd.summary.toLowerCase().includes(q);
        const matchesOption = cmd.options.some((o) => o.flag.toLowerCase().includes(q) || o.description.toLowerCase().includes(q));
        if (!matchesName && !matchesSummary && !matchesOption) return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && cmd.category !== selectedCategory) {
        return false;
      }

      // Difficulty filter
      if (selectedDifficulty !== 'all' && cmd.difficulty !== selectedDifficulty) {
        return false;
      }

      // Danger filter
      if (selectedDanger !== 'all' && cmd.dangerLevel !== selectedDanger) {
        return false;
      }

      return true;
    });
  }, [search, selectedCategory, selectedDifficulty, selectedDanger]);

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === 'all') {
      searchParams.delete('cat');
    } else {
      searchParams.set('cat', cat);
    }
    setSearchParams(searchParams);
  };

  const handleResetFilters = () => {
    setSearch('');
    setSelectedCategory('all');
    setSelectedDifficulty('all');
    setSelectedDanger('all');
    setSearchParams({});
  };

  return (
    <div className="page-container git-overview-page">
      <div className="page-header">
        <div className="page-title-group">
          <div className="page-icon-wrapper text-primary">
            <Terminal size={28} />
          </div>
          <div>
            <h1 className="page-title">Git Command Reference</h1>
            <p className="page-description">
              Comprehensive reference of {commandRegistry.filter((c) => c.executable === 'git').length}+ Git commands, detailed option flags, real-world examples, and safe recovery procedures.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="filter-controls-card">
        <div className="search-filter-row">
          <div className="search-input-box">
            <Search size={18} className="search-box-icon" />
            <input
              type="text"
              className="search-control"
              placeholder="Filter commands by name, flag (--hard), or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="select-filters-group">
            <select
              className="select-control"
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
            >
              <option value="all">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </select>

            <select
              className="select-control"
              value={selectedDanger}
              onChange={(e) => setSelectedDanger(e.target.value)}
            >
              <option value="all">All Danger Levels</option>
              <option value="safe">✓ Safe Commands</option>
              <option value="caution">⚡ Caution Commands</option>
              <option value="destructive">🔥 Destructive Commands</option>
            </select>

            {(search || selectedCategory !== 'all' || selectedDifficulty !== 'all' || selectedDanger !== 'all') && (
              <button className="btn btn-secondary btn-sm" onClick={handleResetFilters}>
                <RefreshCw size={14} />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="category-pills-row">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`cat-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => handleCategorySelect(cat)}
            >
              <span>{cat === 'all' ? 'All Categories' : cat}</span>
              <span className="cat-pill-count">
                {cat === 'all'
                  ? commandRegistry.filter((c) => c.executable === 'git').length
                  : commandRegistry.filter((c) => c.executable === 'git' && c.category === cat).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="results-status-bar">
        <span>Showing {filteredCommands.length} commands</span>
      </div>

      {/* Commands Grid */}
      {filteredCommands.length === 0 ? (
        <div className="no-commands-empty">
          <Terminal size={40} className="text-muted" />
          <h3>No matching Git commands found</h3>
          <p>Try adjusting your search keywords or clear filters to see all available commands.</p>
          <button className="btn btn-primary btn-sm" onClick={handleResetFilters}>
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="commands-grid">
          {filteredCommands.map((cmd) => (
            <CommandCard key={cmd.id} command={cmd} />
          ))}
        </div>
      )}
    </div>
  );
};
