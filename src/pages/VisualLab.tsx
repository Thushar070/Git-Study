import React, { useState } from 'react';
import { Layers, GitBranch, GitMerge, RotateCcw, Zap, RefreshCw } from 'lucide-react';
import { CodeBlock } from '../components/CodeBlock';

export const VisualLab: React.FC = () => {
  const [activeTopic, setActiveTopic] = useState<'lifecycle' | 'branching' | 'merge' | 'rebase' | 'reset' | 'cherrypick'>('lifecycle');

  // Interactive state for Reset Visualizer
  const [resetMode, setResetMode] = useState<'soft' | 'mixed' | 'hard'>('mixed');

  // Interactive state for Lifecycle
  const [lifecycleStep, setLifecycleStep] = useState<number>(0);

  return (
    <div className="page-container visual-lab-page">
      <div className="page-header">
        <div className="page-title-group">
          <div className="page-icon-wrapper text-amber">
            <Layers size={28} />
          </div>
          <div>
            <h1 className="page-title">Interactive Visual Workflow Lab</h1>
            <p className="page-description">
              Visualize Git repository state changes in real time. Interact with branch pointers, staging index, commit graphs, and reset modes.
            </p>
          </div>
        </div>
      </div>

      {/* Topic Switcher Bar */}
      <div className="visual-lab-tabs">
        <button
          className={`lab-tab ${activeTopic === 'lifecycle' ? 'active' : ''}`}
          onClick={() => setActiveTopic('lifecycle')}
        >
          <Layers size={16} />
          <span>Git Lifecycle</span>
        </button>
        <button
          className={`lab-tab ${activeTopic === 'branching' ? 'active' : ''}`}
          onClick={() => setActiveTopic('branching')}
        >
          <GitBranch size={16} />
          <span>Branching</span>
        </button>
        <button
          className={`lab-tab ${activeTopic === 'merge' ? 'active' : ''}`}
          onClick={() => setActiveTopic('merge')}
        >
          <GitMerge size={16} />
          <span>3-Way Merge</span>
        </button>
        <button
          className={`lab-tab ${activeTopic === 'rebase' ? 'active' : ''}`}
          onClick={() => setActiveTopic('rebase')}
        >
          <Zap size={16} />
          <span>Rebase Workflow</span>
        </button>
        <button
          className={`lab-tab ${activeTopic === 'reset' ? 'active' : ''}`}
          onClick={() => setActiveTopic('reset')}
        >
          <RotateCcw size={16} />
          <span>Reset Visualizer</span>
        </button>
        <button
          className={`lab-tab ${activeTopic === 'cherrypick' ? 'active' : ''}`}
          onClick={() => setActiveTopic('cherrypick')}
        >
          <GitBranch size={16} />
          <span>Cherry-Pick</span>
        </button>
      </div>

      {/* Visual Workspace Container */}
      <div className="visual-workspace-card">
        {/* TOPIC 1: LIFECYCLE */}
        {activeTopic === 'lifecycle' && (
          <div className="lab-view-container">
            <div className="lab-view-header">
              <h2>Git Architecture & File Lifecycle</h2>
              <p>Step through how files move from local edit to remote server.</p>
            </div>

            <div className="lifecycle-interactive-diagram">
              <div className="areas-grid">
                <div className={`area-box ${lifecycleStep >= 0 ? 'active' : ''}`}>
                  <div className="area-title">Working Directory</div>
                  <div className="area-status">
                    {lifecycleStep === 0 ? <span className="status-file un-staged">index.ts (modified)</span> : <span>Clean</span>}
                  </div>
                </div>

                <div className="flow-arrow">➔</div>

                <div className={`area-box ${lifecycleStep >= 1 ? 'active' : ''}`}>
                  <div className="area-title">Staging Area (Index)</div>
                  <div className="area-status">
                    {lifecycleStep === 1 ? <span className="status-file staged">index.ts (staged)</span> : <span>Empty</span>}
                  </div>
                </div>

                <div className="flow-arrow">➔</div>

                <div className={`area-box ${lifecycleStep >= 2 ? 'active' : ''}`}>
                  <div className="area-title">Local Repository</div>
                  <div className="area-status">
                    {lifecycleStep === 2 ? <span className="status-file committed">Commit c1f38e</span> : <span>Clean</span>}
                  </div>
                </div>

                <div className="flow-arrow">➔</div>

                <div className={`area-box ${lifecycleStep >= 3 ? 'active' : ''}`}>
                  <div className="area-title">Remote (GitHub)</div>
                  <div className="area-status">
                    {lifecycleStep === 3 ? <span className="status-file pushed">origin/main synced</span> : <span>Pending push</span>}
                  </div>
                </div>
              </div>

              {/* Interactive Controls */}
              <div className="lab-controls-panel">
                <h4>Simulate Step:</h4>
                <div className="controls-btn-group">
                  <button className="btn btn-secondary btn-sm" onClick={() => setLifecycleStep(0)}>
                    1. Edit file in Working Dir
                  </button>
                  <button className="btn btn-primary btn-sm" onClick={() => setLifecycleStep(1)}>
                    2. <code>git add index.ts</code>
                  </button>
                  <button className="btn btn-primary btn-sm" onClick={() => setLifecycleStep(2)}>
                    3. <code>git commit -m "update"</code>
                  </button>
                  <button className="btn btn-primary btn-sm" onClick={() => setLifecycleStep(3)}>
                    4. <code>git push origin main</code>
                  </button>
                  <button className="btn btn-outline btn-sm ml-auto" onClick={() => setLifecycleStep(0)}>
                    <RefreshCw size={14} /> Reset Step
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TOPIC 2: BRANCHING */}
        {activeTopic === 'branching' && (
          <div className="lab-view-container">
            <div className="lab-view-header">
              <h2>Git Branching & Pointer Mechanics</h2>
              <p>In Git, a branch is simply a lightweight moveable 40-character pointer to a specific commit.</p>
            </div>

            <div className="svg-graph-box">
              <svg width="100%" height="220" viewBox="0 0 700 220" className="git-svg-graph">
                {/* Main line */}
                <line x1="100" y1="110" x2="500" y2="110" stroke="#334155" strokeWidth="4" />
                {/* Feature line */}
                <path d="M 300 110 Q 350 50 400 50 L 600 50" fill="none" stroke="#a855f7" strokeWidth="4" strokeDasharray="6 6" />

                {/* Commits main */}
                <circle cx="100" cy="110" r="16" fill="#0f172a" stroke="#38bdf8" strokeWidth="4" />
                <text x="100" y="115" fill="#f8fafc" fontSize="12" textAnchor="middle" fontWeight="bold">C1</text>

                <circle cx="300" cy="110" r="16" fill="#0f172a" stroke="#38bdf8" strokeWidth="4" />
                <text x="300" y="115" fill="#f8fafc" fontSize="12" textAnchor="middle" fontWeight="bold">C2</text>

                <circle cx="500" cy="110" r="16" fill="#0f172a" stroke="#38bdf8" strokeWidth="4" />
                <text x="500" y="115" fill="#f8fafc" fontSize="12" textAnchor="middle" fontWeight="bold">C3</text>

                {/* Commits feature */}
                <circle cx="450" cy="50" r="16" fill="#0f172a" stroke="#c084fc" strokeWidth="4" />
                <text x="450" y="55" fill="#f8fafc" fontSize="12" textAnchor="middle" fontWeight="bold">C4</text>

                <circle cx="600" cy="50" r="16" fill="#0f172a" stroke="#c084fc" strokeWidth="4" />
                <text x="600" y="55" fill="#f8fafc" fontSize="12" textAnchor="middle" fontWeight="bold">C5</text>

                {/* Labels */}
                <rect x="460" y="140" width="80" height="28" rx="6" fill="#0284c7" />
                <text x="500" y="158" fill="#ffffff" fontSize="12" textAnchor="middle" fontWeight="bold">main</text>

                <rect x="560" y="80" width="110" height="28" rx="6" fill="#9333ea" />
                <text x="615" y="98" fill="#ffffff" fontSize="12" textAnchor="middle" fontWeight="bold">feature/login</text>

                <rect x="560" y="10" width="60" height="24" rx="4" fill="#10b981" />
                <text x="590" y="26" fill="#ffffff" fontSize="11" textAnchor="middle" fontWeight="bold">HEAD</text>
              </svg>
            </div>

            <div className="lab-info-footer">
              <CodeBlock code="git switch -c feature/login\ngit commit -m 'Add OAuth support'" language="bash" showCopy />
            </div>
          </div>
        )}

        {/* TOPIC 3: MERGE */}
        {activeTopic === 'merge' && (
          <div className="lab-view-container">
            <div className="lab-view-header">
              <h2>3-Way Merge vs Fast-Forward</h2>
              <p>A 3-way merge creates a special merge commit with TWO parent pointers, combining two history branches.</p>
            </div>

            <div className="svg-graph-box">
              <svg width="100%" height="220" viewBox="0 0 700 220" className="git-svg-graph">
                <line x1="100" y1="140" x2="600" y2="140" stroke="#334155" strokeWidth="4" />
                <path d="M 250 140 Q 300 60 400 60 L 500 60 Q 550 60 600 140" fill="none" stroke="#a855f7" strokeWidth="4" />

                <circle cx="100" cy="140" r="16" fill="#0f172a" stroke="#38bdf8" strokeWidth="4" />
                <circle cx="250" cy="140" r="16" fill="#0f172a" stroke="#38bdf8" strokeWidth="4" />
                <circle cx="400" cy="140" r="16" fill="#0f172a" stroke="#38bdf8" strokeWidth="4" />

                <circle cx="400" cy="60" r="16" fill="#0f172a" stroke="#c084fc" strokeWidth="4" />
                <circle cx="500" cy="60" r="16" fill="#0f172a" stroke="#c084fc" strokeWidth="4" />

                {/* Merge commit */}
                <circle cx="600" cy="140" r="20" fill="#059669" stroke="#34d399" strokeWidth="4" />
                <text x="600" y="145" fill="#ffffff" fontSize="12" textAnchor="middle" fontWeight="bold">M</text>

                <rect x="560" y="180" width="80" height="28" rx="6" fill="#0284c7" />
                <text x="600" y="198" fill="#ffffff" fontSize="12" textAnchor="middle" fontWeight="bold">main (HEAD)</text>
              </svg>
            </div>

            <CodeBlock code="git checkout main\ngit merge feature/login" language="bash" showCopy />
          </div>
        )}

        {/* TOPIC 4: REBASE */}
        {activeTopic === 'rebase' && (
          <div className="lab-view-container">
            <div className="lab-view-header">
              <h2>Git Rebase Workflow</h2>
              <p>Rebase rewrites history by moving feature branch commits on top of the tip of target main branch.</p>
            </div>

            <div className="rebase-comparison-box">
              <div className="rebase-card">
                <h4>Before Rebase (Diverged History)</h4>
                <p>Feature commits C4, C5 stem from older main commit C2.</p>
              </div>
              <div className="rebase-arrow">➔</div>
              <div className="rebase-card highlight">
                <h4>After Rebase (Linear History)</h4>
                <p>C4', C5' replayed cleanly onto main's latest commit C3.</p>
              </div>
            </div>

            <CodeBlock code="git checkout feature/login\ngit rebase main" language="bash" showCopy />
          </div>
        )}

        {/* TOPIC 5: RESET VISUALIZER */}
        {activeTopic === 'reset' && (
          <div className="lab-view-container">
            <div className="lab-view-header">
              <h2>Interactive Git Reset Visualizer</h2>
              <p>Compare how <code>--soft</code>, <code>--mixed</code>, and <code>--hard</code> treat working directory & index state when moving HEAD backwards.</p>
            </div>

            <div className="reset-mode-selector">
              <button
                className={`btn ${resetMode === 'soft' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setResetMode('soft')}
              >
                git reset --soft HEAD~1
              </button>
              <button
                className={`btn ${resetMode === 'mixed' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setResetMode('mixed')}
              >
                git reset --mixed HEAD~1 (default)
              </button>
              <button
                className={`btn ${resetMode === 'hard' ? 'btn-danger' : 'btn-secondary'}`}
                onClick={() => setResetMode('hard')}
              >
                git reset --hard HEAD~1 🔥
              </button>
            </div>

            <div className="reset-comparison-grid">
              <div className="reset-item-card">
                <h4>1. HEAD Pointer</h4>
                <div className="reset-status text-emerald">Moved back 1 commit</div>
                <p>In all reset modes, HEAD pointer is moved to target commit.</p>
              </div>

              <div className="reset-item-card">
                <h4>2. Staging Index Area</h4>
                <div className={`reset-status ${resetMode === 'soft' ? 'text-emerald' : 'text-amber'}`}>
                  {resetMode === 'soft' ? 'KEPT (Changes remain staged)' : 'UNSTAGED (Changes moved to working dir)'}
                </div>
                <p>Determines if commit changes stay staged in index.</p>
              </div>

              <div className="reset-item-card">
                <h4>3. Working Directory</h4>
                <div className={`reset-status ${resetMode === 'hard' ? 'text-danger' : 'text-emerald'}`}>
                  {resetMode === 'hard' ? 'DISCARDED PERMANENTLY 🔥' : 'PRESERVED UNCHANGED'}
                </div>
                <p>Determines if your local disk file modifications are saved or deleted.</p>
              </div>
            </div>
          </div>
        )}

        {/* TOPIC 6: CHERRY-PICK */}
        {activeTopic === 'cherrypick' && (
          <div className="lab-view-container">
            <div className="lab-view-header">
              <h2>Git Cherry-Pick</h2>
              <p>Apply changes introduced by existing commits without merging full branches.</p>
            </div>

            <CodeBlock code="git checkout main\ngit cherry-pick e4f82a9" language="bash" showCopy />
          </div>
        )}
      </div>
    </div>
  );
};
