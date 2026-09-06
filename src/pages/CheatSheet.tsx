import React, { useState } from 'react';
import { FileText, Search } from 'lucide-react';
import { cheatSheetData } from '../data/cheatsheet';
import { CodeBlock } from '../components/CodeBlock';

export const CheatSheet: React.FC = () => {
  const [search, setSearch] = useState('');

  const filteredSections = cheatSheetData.map((sec) => {
    if (!search.trim()) return sec;
    const q = search.toLowerCase();
    const filteredCmds = sec.commands.filter(
      (item) =>
        item.command.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
    );
    return { ...sec, commands: filteredCmds };
  }).filter((sec) => sec.commands.length > 0);

  return (
    <div className="page-container cheatsheet-page">
      <div className="page-header">
        <div className="page-title-group">
          <div className="page-icon-wrapper text-sky">
            <FileText size={28} />
          </div>
          <div>
            <h1 className="page-title">Git Command Cheat Sheet</h1>
            <p className="page-description">
              Compact reference guide organized by workflow stage. Copy syntax instantly during active coding sessions.
            </p>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="filter-controls-card">
        <div className="search-input-box">
          <Search size={18} className="search-box-icon" />
          <input
            type="text"
            className="search-control"
            placeholder="Search cheat sheet (e.g. 'amend', 'hard reset', 'stash pop')..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Cheat Sheet Grid */}
      <div className="cheatsheet-grid mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSections.map((section) => (
          <div key={section.title} className="cheatsheet-section-card bg-surface border border-border rounded-lg p-5">
            <h3 className="section-card-title text-xl font-bold text-foreground mb-4 border-b border-border pb-2">{section.title}</h3>
            <div className="cheatsheet-items-list flex flex-col gap-4">
              {section.commands.map((item, idx) => (
                <div key={idx} className="cheatsheet-item">
                  <div className="cheatsheet-item-info mb-1">
                    <span className="item-purpose text-sm font-medium text-foreground block">{item.description}</span>
                  </div>
                  <CodeBlock code={item.command} language="bash" showCopy />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
