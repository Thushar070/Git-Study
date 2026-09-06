import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Terminal } from 'lucide-react';
import type { GitCommand } from '../types';
import { DangerBadge, DifficultyBadge } from './Badge';
import { FavoriteButton } from './FavoriteButton';

interface CommandCardProps {
  command: GitCommand;
  showCategory?: boolean;
}

export const CommandCard: React.FC<CommandCardProps> = ({
  command,
  showCategory = true
}) => {
  return (
    <div className="command-card">
      <div className="command-card-header">
        <div className="command-card-title-group">
          <span className="command-card-exec">
            <Terminal size={14} />
            {command.executable}
          </span>
          <Link to={`/git/commands/${command.id}`} className="command-card-name">
            {command.name}
          </Link>
        </div>
        <FavoriteButton commandId={command.id} />
      </div>

      <p className="command-card-summary">{command.summary}</p>

      <div className="command-card-meta">
        <div className="command-card-badges">
          <DangerBadge level={command.dangerLevel} />
          <DifficultyBadge difficulty={command.difficulty} />
          {showCategory && <span className="command-card-cat">{command.category}</span>}
        </div>
        <Link to={`/git/commands/${command.id}`} className="command-card-link">
          <span>Explore</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
};
