import React, { useState } from 'react';
import { HelpCircle, Search } from 'lucide-react';
import { situationsData } from '../data/situations';
import { CodeBlock } from '../components/CodeBlock';
import { ProseBlock } from '../components/DocContent';
import { DangerBadge } from '../components/Badge';

export const Situations: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(situationsData.map((s) => s.category)))];

  const filteredSituations = situationsData.filter((sit) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchesQ = sit.question.toLowerCase().includes(q);
      const matchesCmd = sit.recommendedCommands.some(
        (c) => c.commandId.toLowerCase().includes(q) || c.explanation.toLowerCase().includes(q) || c.example.toLowerCase().includes(q)
      );
      if (!matchesQ && !matchesCmd) return false;
    }

    if (selectedCat !== 'all' && sit.category !== selectedCat) return false;

    return true;
  });

  return (
    <div className="page-container situations-page">
      <div className="page-header">
        <div className="page-title-group">
          <div className="page-icon-wrapper text-primary">
            <HelpCircle size={28} />
          </div>
          <div>
            <h1 className="page-title">Situation-Based Command Finder</h1>
            <p className="page-description">
              "What are you trying to do right now?" Search real-world scenarios to get immediate command recommendations and safe step-by-step recovery guidance.
            </p>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="filter-controls-card">
        <div className="search-filter-row">
          <div className="search-input-box">
            <Search size={18} className="search-box-icon" />
            <input
              type="text"
              className="search-control"
              placeholder="Search scenarios: 'undo commit', 'change message', 'stash untracked', 'delete branch'..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="category-pills-row">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`cat-pill ${selectedCat === cat ? 'active' : ''}`}
              onClick={() => setSelectedCat(cat)}
            >
              <span>{cat === 'all' ? 'All Scenarios' : cat}</span>
              <span className="cat-pill-count">
                {cat === 'all'
                  ? situationsData.length
                  : situationsData.filter((s) => s.category === cat).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Situations List */}
      <div className="situations-stack">
        {filteredSituations.map((sit) => (
          <div key={sit.id} id={sit.id} className="situation-card">
            <div className="situation-card-header">
              <div className="sit-header-left">
                <span className="sit-badge">{sit.category}</span>
                <h3 className="sit-question">{sit.question}</h3>
              </div>
            </div>

            {/* Recommended Commands Stack */}
            <div className="sit-commands-block">
              <h4 className="sit-commands-heading">Recommended Solution Commands:</h4>
              {sit.recommendedCommands.map((rc, idx) => (
                <div key={idx} className="sit-cmd-item">
                  <div className="sit-cmd-header">
                    <span className="sit-cmd-id">Command: {rc.commandId}</span>
                    <DangerBadge level={rc.dangerLevel} />
                  </div>
                  <ProseBlock text={rc.explanation} />
                  <CodeBlock code={rc.example} language="bash" showCopy />
                  {rc.alternatives && rc.alternatives.length > 0 && (
                    <div className="sit-cmd-alts">
                      Alternatives: {rc.alternatives.join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
