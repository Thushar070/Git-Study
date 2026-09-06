import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookMarked, Search, Terminal } from 'lucide-react';
import { glossaryData } from '../data/glossary';

export const Glossary: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string>('all');

  const letters = ['all', ...Array.from(new Set(glossaryData.map((g) => g.term[0].toUpperCase()))).sort()];

  const filteredGlossary = glossaryData.filter((item) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchesTerm = item.term.toLowerCase().includes(q);
      const matchesDef = item.definition.toLowerCase().includes(q);
      if (!matchesTerm && !matchesDef) return false;
    }

    if (selectedLetter !== 'all' && item.term[0].toUpperCase() !== selectedLetter) {
      return false;
    }

    return true;
  });

  return (
    <div className="page-container glossary-page">
      <div className="page-header">
        <div className="page-title-group">
          <div className="page-icon-wrapper text-emerald">
            <BookMarked size={28} />
          </div>
          <div>
            <h1 className="page-title">Git Terminology Glossary</h1>
            <p className="page-description">
              Definitive dictionary of Git concepts, internal data structures, references, and terminology.
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
              placeholder="Search terms (e.g. 'HEAD', 'blob', 'tree', 'reflog', 'worktree')..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="category-pills-row">
          {letters.map((lettr) => (
            <button
              key={lettr}
              className={`cat-pill ${selectedLetter === lettr ? 'active' : ''}`}
              onClick={() => setSelectedLetter(lettr)}
            >
              <span>{lettr === 'all' ? 'All (A-Z)' : lettr}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Glossary Stack */}
      <div className="glossary-grid">
        {filteredGlossary.map((item) => (
          <div key={item.term} className="glossary-card">
            <div className="glossary-card-header">
              <h3 className="glossary-term">{item.term}</h3>
            </div>

            <p className="glossary-def">{item.definition}</p>

            {item.relatedCommands && item.relatedCommands.length > 0 && (
              <div className="glossary-related">
                <span className="related-label">Related commands:</span>
                <div className="related-badges-group">
                  {item.relatedCommands.map((cmd) => (
                    <Link key={cmd} to={`/git/commands/${cmd}`} className="glossary-command-pill">
                      <Terminal size={11} />
                      <span>{cmd}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
