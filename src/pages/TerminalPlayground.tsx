import React, { useState, useRef, useEffect } from 'react';
import { Zap, RefreshCw, GitBranch } from 'lucide-react';

interface TermLog {
  id: number;
  type: 'input' | 'output' | 'error' | 'success';
  text: string;
}

interface RepoState {
  initialized: boolean;
  branch: string;
  untrackedFiles: string[];
  stagedFiles: string[];
  commits: { id: string; message: string; branch: string }[];
  stashedCount: number;
}

export const TerminalPlayground: React.FC = () => {
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState<TermLog[]>([
    { id: 1, type: 'output', text: 'Welcome to GitAtlas Interactive Terminal Sandbox v1.0' },
    { id: 2, type: 'output', text: 'Type `git help` or try running `git status`, `git add .`, `git commit -m "init"`' }
  ]);

  const [state, setState] = useState<RepoState>({
    initialized: true,
    branch: 'main',
    untrackedFiles: ['index.ts', 'App.tsx', 'styles.css'],
    stagedFiles: [],
    commits: [
      { id: 'a1b2c3d', message: 'Initial repo commit', branch: 'main' }
    ],
    stashedCount: 0
  });

  const termEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    termEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim();
    const newLogs: TermLog[] = [...logs, { id: Date.now(), type: 'input', text: `$ ${cmd}` }];

    // Evaluate simulated command
    const parts = cmd.split(/\s+/);
    const exec = parts[0];
    const sub = parts[1];

    if (cmd === 'clear') {
      setLogs([]);
      setInput('');
      return;
    }

    if (exec === 'git') {
      if (sub === 'status') {
        let statusOut = `On branch ${state.branch}\n`;
        if (state.stagedFiles.length === 0 && state.untrackedFiles.length === 0) {
          statusOut += 'nothing to commit, working tree clean';
        } else {
          if (state.stagedFiles.length > 0) {
            statusOut += 'Changes to be committed:\n' + state.stagedFiles.map((f) => `  (staged): ${f}`).join('\n') + '\n';
          }
          if (state.untrackedFiles.length > 0) {
            statusOut += 'Untracked files:\n' + state.untrackedFiles.map((f) => `  (modified): ${f}`).join('\n');
          }
        }
        newLogs.push({ id: Date.now() + 1, type: 'output', text: statusOut });
      } else if (sub === 'add') {
        const target = parts[2];
        if (target === '.' || target === '-A') {
          setState((prev) => ({
            ...prev,
            stagedFiles: [...prev.stagedFiles, ...prev.untrackedFiles],
            untrackedFiles: []
          }));
          newLogs.push({ id: Date.now() + 1, type: 'success', text: `Staged ${state.untrackedFiles.length} files.` });
        } else {
          newLogs.push({ id: Date.now() + 1, type: 'output', text: `Added ${target || 'files'} to staging index.` });
        }
      } else if (sub === 'commit') {
        const msgIdx = parts.indexOf('-m');
        const msg = msgIdx >= 0 ? parts.slice(msgIdx + 1).join(' ').replace(/["']/g, '') : 'Update repo';
        if (state.stagedFiles.length === 0) {
          newLogs.push({ id: Date.now() + 1, type: 'error', text: 'nothing to commit (use "git add" to track)' });
        } else {
          const hash = Math.random().toString(16).substring(2, 9);
          setState((prev) => ({
            ...prev,
            commits: [{ id: hash, message: msg, branch: prev.branch }, ...prev.commits],
            stagedFiles: []
          }));
          newLogs.push({ id: Date.now() + 1, type: 'success', text: `[${state.branch} ${hash}] ${msg}\n ${state.stagedFiles.length} files changed.` });
        }
      } else if (sub === 'branch') {
        const bName = parts[2];
        if (!bName) {
          newLogs.push({ id: Date.now() + 1, type: 'output', text: `* ${state.branch}\n  feature/auth\n  fix/bug-404` });
        } else {
          newLogs.push({ id: Date.now() + 1, type: 'success', text: `Created branch '${bName}'` });
        }
      } else if (sub === 'checkout' || sub === 'switch') {
        const bName = parts[2] === '-c' ? parts[3] : parts[2];
        if (bName) {
          setState((prev) => ({ ...prev, branch: bName }));
          newLogs.push({ id: Date.now() + 1, type: 'success', text: `Switched to branch '${bName}'` });
        } else {
          newLogs.push({ id: Date.now() + 1, type: 'error', text: 'fatal: missing branch name' });
        }
      } else if (sub === 'log') {
        const logStr = state.commits.map((c) => `commit ${c.id} (HEAD -> ${c.branch})\nAuthor: Developer <dev@gitatlas.io>\n    ${c.message}`).join('\n\n');
        newLogs.push({ id: Date.now() + 1, type: 'output', text: logStr });
      } else if (sub === 'stash') {
        setState((prev) => ({ ...prev, stashedCount: prev.stashedCount + 1, untrackedFiles: [], stagedFiles: [] }));
        newLogs.push({ id: Date.now() + 1, type: 'success', text: 'Saved working directory and index state WIP on main.' });
      } else if (sub === 'help') {
        newLogs.push({
          id: Date.now() + 1,
          type: 'output',
          text: 'Available test commands:\n- git status\n- git add .\n- git commit -m "message"\n- git branch <name>\n- git switch <name>\n- git log\n- git stash\n- clear'
        });
      } else {
        newLogs.push({ id: Date.now() + 1, type: 'error', text: `git: '${sub}' is not a recognized simulator command. Type 'git help'.` });
      }
    } else {
      newLogs.push({ id: Date.now() + 1, type: 'error', text: `command not found: ${exec}` });
    }

    setLogs(newLogs);
    setInput('');
  };

  const handleResetSimulator = () => {
    setState({
      initialized: true,
      branch: 'main',
      untrackedFiles: ['index.ts', 'App.tsx', 'styles.css'],
      stagedFiles: [],
      commits: [{ id: 'a1b2c3d', message: 'Initial repo commit', branch: 'main' }],
      stashedCount: 0
    });
    setLogs([{ id: Date.now(), type: 'output', text: 'Simulator state reset to clean initial state.' }]);
  };

  return (
    <div className="page-container terminal-page">
      <div className="page-header">
        <div className="page-title-group">
          <div className="page-icon-wrapper text-amber">
            <Zap size={28} />
          </div>
          <div>
            <h1 className="page-title">Terminal Playground Simulator</h1>
            <p className="page-description">
              Practice Git commands in a safe, interactive terminal sandbox. Watch repository state, branches, and commit logs update in real time.
            </p>
          </div>
        </div>
      </div>

      {/* Terminal + Visual State Split View */}
      <div className="terminal-split-container mt-6">
        {/* Terminal Input / Output Box */}
        <div className="terminal-window">
          <div className="terminal-topbar">
            <div className="window-dots">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <span className="window-title">bash — gitatlas-sandbox (~/project)</span>
            <button className="btn-reset-term" onClick={handleResetSimulator} title="Reset Sandbox State">
              <RefreshCw size={13} /> Reset State
            </button>
          </div>

          <div className="terminal-body">
            {logs.map((log) => (
              <div key={log.id} className={`log-line type-${log.type}`}>
                <pre>{log.text}</pre>
              </div>
            ))}
            <div ref={termEndRef} />
          </div>

          <form onSubmit={handleCommandSubmit} className="terminal-input-form">
            <span className="prompt-symbol">$</span>
            <input
              type="text"
              className="term-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type git command (e.g. git add .)..."
              autoFocus
            />
          </form>
        </div>

        {/* Dynamic Visual State Panel */}
        <div className="repo-state-panel">
          <h3 className="panel-title">
            <GitBranch size={18} /> Live Repository State
          </h3>

          <div className="state-section">
            <span className="state-label">Active Branch:</span>
            <span className="badge badge-purple badge-md">{state.branch}</span>
          </div>

          <div className="state-section">
            <span className="state-label">Working Directory ({state.untrackedFiles.length}):</span>
            <ul className="state-files-list">
              {state.untrackedFiles.length === 0 ? (
                <li className="text-muted">Clean (no modified files)</li>
              ) : (
                state.untrackedFiles.map((f) => <li key={f} className="text-amber">• {f}</li>)
              )}
            </ul>
          </div>

          <div className="state-section">
            <span className="state-label">Staging Index ({state.stagedFiles.length}):</span>
            <ul className="state-files-list">
              {state.stagedFiles.length === 0 ? (
                <li className="text-muted">Empty (0 staged files)</li>
              ) : (
                state.stagedFiles.map((f) => <li key={f} className="text-emerald">✓ {f}</li>)
              )}
            </ul>
          </div>

          <div className="state-section">
            <span className="state-label">Commit Log ({state.commits.length}):</span>
            <div className="commits-mini-list">
              {state.commits.map((c) => (
                <div key={c.id} className="mini-commit-card">
                  <code>{c.id}</code>
                  <span className="commit-msg">{c.message}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
