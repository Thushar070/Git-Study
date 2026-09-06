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
      <div className="category-pills-row mb-6">
        {comparisonsData.map((comp) => (
          <button
            key={comp.id}
            className={`cat-pill ${selectedComp === comp.id ? 'active' : ''}`}
            onClick={() => setSelectedComp(comp.id)}
          >
            <span>{comp.title}</span>
          </button>
        ))}
      </div>

      {/* Active Comparison Matrix */}
      {activeComparison && (
        <div className="comparison-matrix-card">
          <div className="matrix-header">
            <h2 className="matrix-title">{activeComparison.title}</h2>
          </div>

          {/* Side-by-Side Comparison Table */}
          <div className="matrix-table-wrapper">
            <table className="matrix-table">
              <thead>
                <tr>
                  <th>Criterion / Aspect</th>
                  {activeComparison.commands.map((cmd) => (
                    <th key={cmd}>
                      <code>git {cmd}</code>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {activeComparison.criteria.map((row, idx) => (
                  <tr key={idx}>
                    <td className="criterion-label">{row.label}</td>
                    {activeComparison.commands.map((cmd) => (
                      <td key={cmd} className="criterion-value">
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
