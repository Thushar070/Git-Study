import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Terminal,
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Flame,
  ExternalLink,
  HelpCircle
} from 'lucide-react';
import { getCommandById } from '../data/registry';
import { CategoryBadge, DangerBadge, DifficultyBadge } from '../components/Badge';
import { DangerBanner } from '../components/DangerBanner';
import { CodeBlock } from '../components/CodeBlock';
import { FavoriteButton } from '../components/FavoriteButton';
import { addRecentlyViewed } from '../lib/storage';

export const CommandDetail: React.FC = () => {
  const { commandId } = useParams<{ commandId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'flags' | 'examples' | 'scenarios' | 'mistakes'>('overview');

  const command = getCommandById(commandId || '');

  useEffect(() => {
    if (commandId) {
      addRecentlyViewed(commandId);
      window.scrollTo(0, 0);
    }
  }, [commandId]);

  if (!command) {
    return (
      <div className="page-container">
        <div className="not-found-card">
          <Terminal size={48} className="text-danger" />
          <h2>Command Not Found</h2>
          <p>The requested command "{commandId}" does not exist in the database.</p>
          <Link to="/git" className="btn btn-primary">
            <ArrowLeft size={16} />
            <span>Back to Command Reference</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container command-detail-page">
      {/* Back Navigation Bar */}
      <div className="detail-top-nav">
        <button onClick={() => navigate(-1)} className="back-link-btn">
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>

        <div className="breadcrumb-trail">
          <Link to={command.executable === 'gh' ? '/github' : '/git'}>
            {command.executable === 'gh' ? 'GitHub CLI' : 'Git Reference'}
          </Link>
          <span className="separator">/</span>
          <span className="current">{command.executable} {command.name}</span>
        </div>
      </div>

      {/* Main Command Header Card */}
      <header className="command-header-card">
        <div className="header-top-row">
          <div className="command-title-box">
            <span className="command-exec-pill">{command.executable}</span>
            <h1 className="command-title-name">{command.name}</h1>
          </div>

          <div className="header-actions">
            <FavoriteButton commandId={command.id} showText size={18} />
            <a
              href={command.officialReference}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
              title="View on git-scm.com"
            >
              <span>Official Docs</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        <p className="command-summary-lead">{command.summary}</p>

        <div className="command-meta-badges">
          <CategoryBadge category={command.category} />
          <DangerBadge level={command.dangerLevel} />
          <DifficultyBadge difficulty={command.difficulty} />
          <span className="badge badge-secondary badge-sm">Type: {command.type}</span>
          {command.aliases && command.aliases.length > 0 && (
            <span className="badge badge-purple badge-sm">Aliases: {command.aliases.join(', ')}</span>
          )}
        </div>

        {/* Destructive / Caution Banner */}
        {command.dangerLevel !== 'safe' && (
          <DangerBanner
            level={command.dangerLevel}
            message={
              command.dangerLevel === 'destructive'
                ? `Running '${command.executable} ${command.name}' can permanently alter uncommitted changes or overwrite history. Ensure your workspace is clean or backed up before execution.`
                : `Use '${command.executable} ${command.name}' carefully. Inspect options to avoid unintended state changes.`
            }
          />
        )}
      </header>

      {/* Quick Syntax Box */}
      <section className="syntax-quick-card">
        <h3 className="section-subheading">Syntax Quick Reference</h3>
        <CodeBlock code={command.syntax.join('\n')} language="bash" showCopy />
      </section>

      {/* Tab Navigation */}
      <div className="detail-tabs-bar">
        <button
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <BookOpen size={16} />
          <span>Overview & Purpose</span>
        </button>
        <button
          className={`tab-btn ${activeTab === 'flags' ? 'active' : ''}`}
          onClick={() => setActiveTab('flags')}
        >
          <Terminal size={16} />
          <span>Flags & Options ({command.options.length})</span>
        </button>
        <button
          className={`tab-btn ${activeTab === 'examples' ? 'active' : ''}`}
          onClick={() => setActiveTab('examples')}
        >
          <CheckCircle2 size={16} />
          <span>Examples ({command.examples.length})</span>
        </button>
        <button
          className={`tab-btn ${activeTab === 'scenarios' ? 'active' : ''}`}
          onClick={() => setActiveTab('scenarios')}
        >
          <HelpCircle size={16} />
          <span>When to Use / Not Use</span>
        </button>
        <button
          className={`tab-btn ${activeTab === 'mistakes' ? 'active' : ''}`}
          onClick={() => setActiveTab('mistakes')}
        >
          <AlertTriangle size={16} />
          <span>Mistakes & Gotchas</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="tab-content-area">
        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="tab-pane">
            <div className="info-card">
              <h3 className="card-section-title">Why This Command Exists</h3>
              <p className="prose-text">{command.whyItExists}</p>
            </div>

            <div className="info-card">
              <h3 className="card-section-title">Detailed Explanation</h3>
              <p className="prose-text">{command.description}</p>
            </div>

            {command.tips && command.tips.length > 0 && (
              <div className="info-card tips-card">
                <h3 className="card-section-title">Pro Tips & Best Practices</h3>
                <ul className="tips-list">
                  {command.tips.map((tip, i) => (
                    <li key={i} className="tip-item">
                      <span className="tip-bullet">💡</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Flags & Options Table */}
        {activeTab === 'flags' && (
          <div className="tab-pane">
            <h3 className="card-section-title">Command Options & Flags</h3>
            <p className="table-intro">Complete list of flags supported by <code>{command.executable} {command.name}</code>:</p>

            <div className="options-table-wrapper">
              <table className="options-table">
                <thead>
                  <tr>
                    <th>Flag / Option</th>
                    <th>Description</th>
                    <th>Example Usage</th>
                  </tr>
                </thead>
                <tbody>
                  {command.options.map((opt, i) => (
                    <tr key={i}>
                      <td className="flag-cell">
                        <code>{opt.flag}</code>
                      </td>
                      <td className="desc-cell">{opt.description}</td>
                      <td className="example-cell">
                        {opt.example ? <code>{opt.example}</code> : <span className="text-subtle">—</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Examples */}
        {activeTab === 'examples' && (
          <div className="tab-pane">
            <h3 className="card-section-title">Practical Real-World Examples</h3>
            <div className="examples-stack">
              {command.examples.map((ex, i) => (
                <div key={i} className="example-card">
                  <div className="example-card-header">
                    <h4 className="example-card-title">{ex.title}</h4>
                  </div>
                  {ex.description && <p className="example-card-desc">{ex.description}</p>}
                  <CodeBlock code={ex.command} language="bash" showCopy />
                  {ex.output && (
                    <div className="example-card-output">
                      <span className="output-label">Expected Output:</span>
                      <pre className="output-text">{ex.output}</pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: When to Use / Not Use */}
        {activeTab === 'scenarios' && (
          <div className="tab-pane">
            <div className="use-cases-grid">
              <div className="use-case-card when-to-use">
                <div className="use-case-header text-emerald">
                  <CheckCircle2 size={20} />
                  <h3>When to Use This Command</h3>
                </div>
                <ul className="use-case-list">
                  {command.whenToUse.map((item, i) => (
                    <li key={i}>
                      <span className="list-icon text-emerald">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="use-case-card when-not-to-use">
                <div className="use-case-header text-danger">
                  <XCircle size={20} />
                  <h3>When NOT to Use This Command</h3>
                </div>
                <ul className="use-case-list">
                  {command.whenNotToUse.map((item, i) => (
                    <li key={i}>
                      <span className="list-icon text-danger">✕</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Related Situations */}
            {command.situations && command.situations.length > 0 && (
              <div className="info-card mt-6">
                <h3 className="card-section-title">Real-World Developer Scenarios</h3>
                <div className="situations-inline-list">
                  {command.situations.map((sit, i) => (
                    <div key={i} className="situation-inline-card">
                      <p className="sit-desc">{sit.description}</p>
                      <CodeBlock code={sit.command} language="bash" showCopy />
                      {sit.explanation && <p className="sit-explanation">{sit.explanation}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 5: Common Mistakes */}
        {activeTab === 'mistakes' && (
          <div className="tab-pane">
            <div className="mistakes-block">
              <h3 className="card-section-title">Common Developer Mistakes & Pitfalls</h3>
              <ul className="mistakes-list">
                {command.mistakes.map((mistake, i) => (
                  <li key={i} className="mistake-item">
                    <AlertTriangle size={18} className="text-amber flex-shrink-0" />
                    <span>{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>
            {command.warnings && command.warnings.length > 0 && (
              <div className="warnings-block">
                <h3 className="card-section-title">Critical Warnings</h3>
                <ul className="warnings-list">
                  {command.warnings.map((warn, i) => (
                    <li key={i} className="warning-item">
                      <Flame size={18} className="text-danger flex-shrink-0" />
                      <span>{warn}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Related Commands Footer Bar */}
      {command.relatedCommands && command.relatedCommands.length > 0 && (
        <section className="related-commands-footer">
          <h3 className="card-section-title">Related Commands</h3>
          <div className="related-links-grid">
            {command.relatedCommands.map((relId) => {
              const relCmd = getCommandById(relId);
              return relCmd ? (
                <Link key={relId} to={`/git/commands/${relId}`} className="related-cmd-chip inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface border border-border rounded-md text-xs font-mono hover:border-primary">
                  <Terminal size={14} />
                  <span>{relCmd.executable} {relCmd.name}</span>
                </Link>
              ) : null;
            })}
          </div>
        </section>
      )}
    </div>
  );
};
