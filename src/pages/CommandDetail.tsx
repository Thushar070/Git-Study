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
        <div className="syntax-code-list">
          {command.syntax.map((syn, idx) => (
            <CodeBlock key={idx} code={syn} language="bash" showCopy />
          ))}
        </div>
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
            <div className="info-block mb-6">
              <h3 className="text-lg font-bold mb-2">Why This Command Exists</h3>
              <p className="prose-text text-muted">{command.whyItExists}</p>
            </div>

            <div className="info-block mb-6">
              <h3 className="text-lg font-bold mb-2">Detailed Explanation</h3>
              <p className="prose-text text-muted">{command.description}</p>
            </div>

            {command.tips && command.tips.length > 0 && (
              <div className="info-block tips-block">
                <h3 className="text-lg font-bold mb-2">Pro Tips & Best Practices</h3>
                <ul className="tips-list">
                  {command.tips.map((tip, i) => (
                    <li key={i}>
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
            <h3 className="text-lg font-bold mb-2">Command Options & Flags</h3>
            <p className="table-intro text-muted mb-4">Complete list of flags supported by <code>{command.executable} {command.name}</code>:</p>

            <div className="options-table-wrapper overflow-x-auto">
              <table className="options-table w-full border-collapse">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="p-3">Flag / Option</th>
                    <th className="p-3">Description</th>
                    <th className="p-3">Example Usage</th>
                  </tr>
                </thead>
                <tbody>
                  {command.options.map((opt, i) => (
                    <tr key={i} className="border-b border-border/50">
                      <td className="flag-cell p-3 font-mono text-emerald">
                        <code>{opt.flag}</code>
                      </td>
                      <td className="desc-cell p-3 text-muted text-sm">{opt.description}</td>
                      <td className="example-cell p-3 font-mono text-xs">
                        {opt.example ? <code>{opt.example}</code> : <span className="text-muted">—</span>}
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
            <h3 className="text-lg font-bold mb-4">Practical Real-World Examples</h3>
            <div className="examples-stack flex flex-col gap-6">
              {command.examples.map((ex, i) => (
                <div key={i} className="example-card bg-surface border border-border p-5 rounded-lg">
                  <div className="example-card-header mb-2">
                    <h4 className="font-bold text-foreground">{ex.title}</h4>
                  </div>
                  {ex.description && <p className="example-card-desc text-muted text-sm mb-3">{ex.description}</p>}
                  <CodeBlock code={ex.command} language="bash" showCopy />
                  {ex.output && (
                    <div className="example-card-explanation text-xs text-muted mt-2 font-mono bg-background p-2 rounded">
                      <strong>Output:</strong> {ex.output}
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
            <div className="use-cases-grid grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="use-case-card when-to-use bg-surface border border-border p-5 rounded-lg">
                <div className="use-case-header text-emerald flex items-center gap-2 mb-3">
                  <CheckCircle2 size={20} />
                  <h3 className="font-bold text-foreground">When to Use This Command</h3>
                </div>
                <ul className="use-case-list flex flex-col gap-2">
                  {command.whenToUse.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted">
                      <span className="list-icon text-emerald">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="use-case-card when-not-to-use bg-surface border border-border p-5 rounded-lg">
                <div className="use-case-header text-danger flex items-center gap-2 mb-3">
                  <XCircle size={20} />
                  <h3 className="font-bold text-foreground">When NOT to Use This Command</h3>
                </div>
                <ul className="use-case-list flex flex-col gap-2">
                  {command.whenNotToUse.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted">
                      <span className="list-icon text-danger">✕</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Related Situations */}
            {command.situations && command.situations.length > 0 && (
              <div className="info-block mt-6">
                <h3 className="text-lg font-bold mb-3">Real-World Developer Scenarios</h3>
                <div className="situations-inline-list flex flex-col gap-4">
                  {command.situations.map((sit, i) => (
                    <div key={i} className="situation-inline-card bg-surface border border-border p-4 rounded-lg">
                      <p className="sit-desc font-medium text-foreground mb-2">{sit.description}</p>
                      <CodeBlock code={sit.command} language="bash" showCopy />
                      {sit.explanation && <p className="text-xs text-muted mt-2">{sit.explanation}</p>}
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
            <div className="mistakes-block bg-surface border border-border p-5 rounded-lg mb-6">
              <h3 className="text-lg font-bold mb-3 text-foreground">Common Developer Mistakes & Pitfalls</h3>
              <ul className="mistakes-list flex flex-col gap-3">
                {command.mistakes.map((mistake, i) => (
                  <li key={i} className="mistake-item flex items-start gap-3 text-sm text-muted">
                    <AlertTriangle size={18} className="mistake-icon text-amber shrink-0 mt-0.5" />
                    <span>{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>

            {command.warnings && command.warnings.length > 0 && (
              <div className="warnings-block bg-surface border border-border p-5 rounded-lg">
                <h3 className="text-lg font-bold mb-3 text-foreground">Critical Warnings</h3>
                <ul className="warnings-list flex flex-col gap-3">
                  {command.warnings.map((warn, i) => (
                    <li key={i} className="warning-item flex items-start gap-3 text-sm text-muted">
                      <Flame size={18} className="warning-icon text-danger shrink-0 mt-0.5" />
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
        <section className="related-commands-footer mt-8 border-t border-border pt-6">
          <h3 className="font-bold text-foreground mb-4">Related Commands</h3>
          <div className="related-links-grid flex flex-wrap gap-2">
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
