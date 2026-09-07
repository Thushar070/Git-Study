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
  branches: string[];
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
    branches: ['main', 'feature/login'],
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

    const parts = cmd.split(/\s+/);
    const exec = parts[0];
    const sub = parts[1];

    if (cmd === 'clear') {
      setLogs([]);
      setInput('');
      return;
    }

    if (exec === 'touch') {
      const fileName = parts[1] || 'newfile.txt';
      if (!state.untrackedFiles.includes(fileName)) {
        setState((prev) => ({ ...prev, untrackedFiles: [...prev.untrackedFiles, fileName] }));
      }
      newLogs.push({ id: Date.now() + 1, type: 'output', text: `Created file '${fileName}'` });
      setLogs(newLogs);
      setInput('');
      return;
    }

    if (exec === 'git') {
      if (!sub || sub === 'help') {
        newLogs.push({
          id: Date.now() + 1,
          type: 'output',
          text: 'Available test commands:\n- git init\n- git status\n- git add .\n- git commit -m "message"\n- git diff\n- git branch [name]\n- git switch <name>\n- git log\n- git merge <branch>\n- git rebase <branch>\n- git stash / git stash pop\n- git restore <file>\n- git reset [--soft|--hard] HEAD~1\n- git revert <hash>\n- git remote [-v]\n- git fetch / git pull / git push\n- touch <filename>\n- clear'
        });
      } else if (sub === 'init') {
        setState((prev) => ({
          ...prev,
          initialized: true,
          branch: 'main',
          untrackedFiles: ['index.ts', 'App.tsx', 'styles.css'],
          stagedFiles: [],
          commits: [{ id: 'a1b2c3d', message: 'Initial repo commit', branch: 'main' }]
        }));
        newLogs.push({ id: Date.now() + 1, type: 'success', text: 'Reinitialized existing Git repository in /home/user/project/.git/' });
      } else if (sub === 'status') {
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
        if (!target) {
          newLogs.push({ id: Date.now() + 1, type: 'error', text: 'Nothing specified, nothing added.' });
        } else if (target === '.' || target === '-A' || target === '--all') {
          const addedCount = state.untrackedFiles.length;
          setState((prev) => ({
            ...prev,
            stagedFiles: Array.from(new Set([...prev.stagedFiles, ...prev.untrackedFiles])),
            untrackedFiles: []
          }));
          newLogs.push({ id: Date.now() + 1, type: 'success', text: `Staged ${addedCount} file(s).` });
        } else {
          setState((prev) => ({
            ...prev,
            stagedFiles: Array.from(new Set([...prev.stagedFiles, target])),
            untrackedFiles: prev.untrackedFiles.filter((f) => f !== target)
          }));
          newLogs.push({ id: Date.now() + 1, type: 'success', text: `Staged '${target}'.` });
        }
      } else if (sub === 'commit') {
        const msgIdx = parts.indexOf('-m');
        const msg = msgIdx >= 0 ? parts.slice(msgIdx + 1).join(' ').replace(/["']/g, '') : 'Update project files';
        if (state.stagedFiles.length === 0) {
          newLogs.push({ id: Date.now() + 1, type: 'error', text: 'nothing to commit (use "git add" to track)' });
        } else {
          const hash = Math.random().toString(16).substring(2, 9);
          const commitCount = state.stagedFiles.length;
          setState((prev) => ({
            ...prev,
            commits: [{ id: hash, message: msg, branch: prev.branch }, ...prev.commits],
            stagedFiles: []
          }));
          newLogs.push({ id: Date.now() + 1, type: 'success', text: `[${state.branch} ${hash}] ${msg}\n ${commitCount} file(s) changed.` });
        }
      } else if (sub === 'diff') {
        if (state.untrackedFiles.length === 0 && state.stagedFiles.length === 0) {
          newLogs.push({ id: Date.now() + 1, type: 'output', text: 'nothing to diff, working tree clean' });
        } else {
          const fileToDiff = state.untrackedFiles[0] || state.stagedFiles[0] || 'App.tsx';
          newLogs.push({
            id: Date.now() + 1,
            type: 'output',
            text: `diff --git a/${fileToDiff} b/${fileToDiff}\n--- a/${fileToDiff}\n+++ b/${fileToDiff}\n@@ -1,4 +1,6 @@\n+ import { GitAtlas } from './components';\n+ // Added new feature implementation`
          });
        }
      } else if (sub === 'branch') {
        const bName = parts[2];
        if (!bName) {
          const branchList = state.branches.map((b) => (b === state.branch ? `* ${b}` : `  ${b}`)).join('\n');
          newLogs.push({ id: Date.now() + 1, type: 'output', text: branchList });
        } else if (bName === '-d' || bName === '-D') {
          const delTarget = parts[3];
          if (delTarget && state.branches.includes(delTarget)) {
            setState((prev) => ({ ...prev, branches: prev.branches.filter((b) => b !== delTarget) }));
            newLogs.push({ id: Date.now() + 1, type: 'success', text: `Deleted branch ${delTarget}.` });
          } else {
            newLogs.push({ id: Date.now() + 1, type: 'error', text: `error: branch '${delTarget}' not found.` });
          }
        } else {
          if (!state.branches.includes(bName)) {
            setState((prev) => ({ ...prev, branches: [...prev.branches, bName] }));
          }
          newLogs.push({ id: Date.now() + 1, type: 'success', text: `Created branch '${bName}'` });
        }
      } else if (sub === 'checkout' || sub === 'switch') {
        const isCreate = parts[2] === '-c' || parts[2] === '-b';
        const bName = isCreate ? parts[3] : parts[2];
        if (bName) {
          if (!state.branches.includes(bName)) {
            setState((prev) => ({ ...prev, branches: [...prev.branches, bName] }));
          }
          setState((prev) => ({ ...prev, branch: bName }));
          newLogs.push({ id: Date.now() + 1, type: 'success', text: `Switched to branch '${bName}'` });
        } else {
          newLogs.push({ id: Date.now() + 1, type: 'error', text: 'fatal: missing branch name' });
        }
      } else if (sub === 'log') {
        const logStr = state.commits.map((c) => `commit ${c.id} (HEAD -> ${c.branch})\nAuthor: Developer <dev@gitatlas.io>\n    ${c.message}`).join('\n\n');
        newLogs.push({ id: Date.now() + 1, type: 'output', text: logStr });
      } else if (sub === 'merge') {
        const targetBranch = parts[2] || 'feature/login';
        newLogs.push({ id: Date.now() + 1, type: 'success', text: `Updating ${state.commits[0]?.id || 'a1b2c3d'}..9f8e7d6\nFast-forward\n Merged '${targetBranch}' into ${state.branch}.` });
      } else if (sub === 'rebase') {
        const targetBranch = parts[2] || 'main';
        newLogs.push({ id: Date.now() + 1, type: 'success', text: `Successfully rebased and updated refs/heads/${state.branch} onto ${targetBranch}.` });
      } else if (sub === 'stash') {
        const action = parts[2];
        if (action === 'pop') {
          if (state.stashedCount > 0) {
            setState((prev) => ({ ...prev, stashedCount: prev.stashedCount - 1, untrackedFiles: ['styles.css'] }));
            newLogs.push({ id: Date.now() + 1, type: 'success', text: 'On branch main: Restored stashed changes.' });
          } else {
            newLogs.push({ id: Date.now() + 1, type: 'error', text: 'No stash entries found.' });
          }
        } else {
          setState((prev) => ({ ...prev, stashedCount: prev.stashedCount + 1, untrackedFiles: [], stagedFiles: [] }));
          newLogs.push({ id: Date.now() + 1, type: 'success', text: 'Saved working directory and index state WIP on main.' });
        }
      } else if (sub === 'restore') {
        const isStaged = parts[2] === '--staged';
        const file = isStaged ? parts[3] : parts[2];
        if (isStaged && file) {
          setState((prev) => ({
            ...prev,
            stagedFiles: prev.stagedFiles.filter((f) => f !== file),
            untrackedFiles: [...prev.untrackedFiles, file]
          }));
          newLogs.push({ id: Date.now() + 1, type: 'success', text: `Unstaged '${file}'.` });
        } else if (file) {
          newLogs.push({ id: Date.now() + 1, type: 'success', text: `Restored working directory copy of '${file}'.` });
        } else {
          newLogs.push({ id: Date.now() + 1, type: 'error', text: 'fatal: pathspec required for restore' });
        }
      } else if (sub === 'reset') {
        const mode = parts.includes('--hard') ? 'hard' : parts.includes('--soft') ? 'soft' : 'mixed';
        if (mode === 'hard') {
          setState((prev) => ({ ...prev, stagedFiles: [], untrackedFiles: [] }));
          newLogs.push({ id: Date.now() + 1, type: 'success', text: 'HEAD is now at a1b2c3d (Hard reset: working tree clean)' });
        } else if (mode === 'soft') {
          newLogs.push({ id: Date.now() + 1, type: 'success', text: 'HEAD is now at a1b2c3d (Soft reset: changes remain staged)' });
        } else {
          setState((prev) => ({ ...prev, untrackedFiles: [...prev.untrackedFiles, ...prev.stagedFiles], stagedFiles: [] }));
          newLogs.push({ id: Date.now() + 1, type: 'success', text: 'Unstaged changes after reset.' });
        }
      } else if (sub === 'revert') {
        const targetHash = parts[2] || state.commits[0]?.id || 'HEAD';
        const revertHash = Math.random().toString(16).substring(2, 9);
        setState((prev) => ({
          ...prev,
          commits: [{ id: revertHash, message: `Revert commit ${targetHash}`, branch: prev.branch }, ...prev.commits]
        }));
        newLogs.push({ id: Date.now() + 1, type: 'success', text: `[${state.branch} ${revertHash}] Revert commit ${targetHash}` });
      } else if (sub === 'remote') {
        newLogs.push({
          id: Date.now() + 1,
          type: 'output',
          text: 'origin\thttps://github.com/user/gitatlas-app.git (fetch)\norigin\thttps://github.com/user/gitatlas-app.git (push)'
        });
      } else if (sub === 'fetch') {
        newLogs.push({ id: Date.now() + 1, type: 'success', text: 'From https://github.com/user/gitatlas-app\n * [new branch]      main       -> origin/main' });
      } else if (sub === 'pull') {
        newLogs.push({ id: Date.now() + 1, type: 'success', text: 'Already up to date.' });
      } else if (sub === 'push') {
        newLogs.push({ id: Date.now() + 1, type: 'success', text: 'Everything up-to-date\nTo https://github.com/user/gitatlas-app.git\n * [up to date]      main -> main' });
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
      branches: ['main', 'feature/login'],
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
              placeholder="Type git command (e.g. git status, git add .)..."
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
