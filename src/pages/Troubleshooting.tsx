import React, { useState } from 'react';
import { AlertTriangle, Search } from 'lucide-react';
import { troubleshootingData } from '../data/troubleshooting';
import { CodeBlock } from '../components/CodeBlock';

export const Troubleshooting: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(troubleshootingData.map((t) => t.category)))];

  const filteredErrors = troubleshootingData.filter((entry) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchesError = entry.error.toLowerCase().includes(q);
      const matchesWhat = entry.whatHappened.toLowerCase().includes(q);
      const matchesFix = entry.commands.some((c) => c.toLowerCase().includes(q));
      if (!matchesError && !matchesWhat && !matchesFix) return false;
    }

    if (selectedCat !== 'all' && entry.category !== selectedCat) return false;

    return true;
  });

  return (
    <div className="page-container troubleshooting-page">
      <div className="page-header">
        <div className="page-title-group">
          <div className="page-icon-wrapper text-danger">
            <AlertTriangle size={28} />
          </div>
          <div>
            <h1 className="page-title">Git Error Troubleshooting Guide</h1>
            <p className="page-description">
              Diagnostic guide for common Git error messages. Search your error string to find root causes, diagnostic steps, exact fix commands, and prevention strategies.
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
              placeholder="Search error message: 'detached HEAD', 'divergent branches', 'non-fast-forward', 'Permission denied'..."
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
              <span>{cat === 'all' ? 'All Errors' : cat}</span>
              <span className="cat-pill-count">
                {cat === 'all'
                  ? troubleshootingData.length
                  : troubleshootingData.filter((t) => t.category === cat).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Errors Stack */}
      <div className="trouble-stack">
        {filteredErrors.map((item) => (
          <div key={item.id} id={item.id} className="trouble-card">
            <div className="trouble-header">
              <span className="trouble-cat-badge">{item.category}</span>
              <h3 className="trouble-error-title">
                <code>{item.error}</code>
              </h3>
            </div>

            <div className="trouble-section">
              <h4 className="trouble-heading">What Happened:</h4>
              <p className="trouble-explanation">{item.whatHappened}</p>
            </div>

            <div className="trouble-section">
              <h4 className="trouble-heading">Why It Happened:</h4>
              <p className="trouble-explanation">{item.whyItHappened}</p>
            </div>

            {item.howToDiagnose && item.howToDiagnose.length > 0 && (
              <div className="trouble-section">
                <h4 className="trouble-heading">How to Diagnose:</h4>
                <ul className="trouble-list">
                  {item.howToDiagnose.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
            )}

            {item.howToFix && item.howToFix.length > 0 && (
              <div className="trouble-section">
                <h4 className="trouble-heading">Step-by-Step Fix:</h4>
                <ul className="trouble-list">
                  {item.howToFix.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            )}

            {item.commands && item.commands.length > 0 && (
              <div className="trouble-section">
                <h4 className="trouble-heading">Fix Commands:</h4>
                <CodeBlock code={item.commands.join('\n')} language="bash" showCopy />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
