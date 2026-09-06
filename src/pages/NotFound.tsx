import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Home } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="page-container not-found-page">
      <div className="not-found-card">
        <div className="not-found-icon text-danger">
          <Terminal size={56} />
        </div>

        <h1 className="not-found-code">404 — PATHSPEC NOT FOUND</h1>

        <div className="not-found-terminal-box">
          <code>
            fatal: pathspec '{window.location.pathname}' did not match any file(s) known to git.
          </code>
        </div>

        <p className="not-found-message">
          The route you are looking for has been moved, renamed, or restored away in a detached HEAD state.
        </p>

        <div className="not-found-actions">
          <Link to="/" className="btn btn-primary btn-lg">
            <Home size={18} />
            <span>Return to Home</span>
          </Link>
          <Link to="/git" className="btn btn-secondary btn-lg">
            <Terminal size={18} />
            <span>Git Commands Reference</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
