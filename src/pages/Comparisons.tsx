import React, { useState } from 'react';
import { Compass } from 'lucide-react';
import { comparisonsData } from '../data/comparisons';

export const Comparisons: React.FC = () => {
  const [selectedComp, setSelectedComp] = useState<string>(comparisonsData[0]?.id || '');

  const activeComparison = comparisonsData.find((c) => c.id === selectedComp) || comparisonsData[0];

  return (
    <div className="page-container comparisons-page">
      <div className="page-header">
        <div className="page-title-group">
          <div className="page-icon-wrapper text-emerald">
            <Compass size={28} />
          </div>
          <div>
            <h1 className="page-title">Git Command Comparisons</h1>
            <p className="page-description">
              Demystify commonly confused Git commands. Understand subtle differences in commit history, working directory impact, and when to choose one over another.
            </p>
          </div>
        </div>
      </div>

      {/* Comparison Selector List */}
      <div className="comparison-selector-pills flex flex-wrap gap-2 mb-6">
        {comparisonsData.map((comp) => (
          <button
            key={comp.id}
            className={`comp-pill px-4 py-2 rounded-md font-medium text-sm transition-all ${
              selectedComp === comp.id
                ? 'bg-primary text-white font-semibold'
                : 'bg-surface border border-border text-muted hover:text-foreground'
            }`}
            onClick={() => setSelectedComp(comp.id)}
          >
            <span>{comp.title}</span>
          </button>
        ))}
      </div>

      {/* Active Comparison Matrix */}
      {activeComparison && (
        <div className="comparison-matrix-card bg-surface border border-border rounded-lg p-6">
          <div className="matrix-header mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">{activeComparison.title}</h2>
          </div>

          {/* Side-by-Side Comparison Table */}
          <div className="matrix-table-wrapper overflow-x-auto">
            <table className="matrix-table w-full border-collapse">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="p-3 text-muted font-semibold text-sm">Criterion / Aspect</th>
                  {activeComparison.commands.map((cmd) => (
                    <th key={cmd} className="p-3 font-mono font-bold text-primary text-base">
                      <code>git {cmd}</code>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {activeComparison.criteria.map((row, idx) => (
                  <tr key={idx} className="border-b border-border/50 hover:bg-surface-hover">
                    <td className="p-3 font-medium text-foreground text-sm">{row.label}</td>
                    {activeComparison.commands.map((cmd) => (
                      <td key={cmd} className="p-3 text-muted text-sm font-mono">
                        {row.values[cmd] || '—'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
