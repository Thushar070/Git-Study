import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'amber';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'secondary',
  size = 'md',
  icon,
  className = ''
}) => {
  return (
    <span className={`badge badge-${variant} badge-${size} ${className}`}>
      {icon && <span className="badge-icon">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};

export const CategoryBadge: React.FC<{ category: string }> = ({ category }) => {
  const getVariant = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'getting started': return 'info';
      case 'staging & snapshots': return 'primary';
      case 'branching & switching': return 'purple';
      case 'merging & rebasing': return 'amber';
      case 'history & inspection': return 'secondary';
      case 'undo & recovery': return 'danger';
      case 'remote repositories': return 'success';
      case 'github cli': return 'purple';
      default: return 'secondary';
    }
  };

  return <Badge variant={getVariant(category)} size="sm">{category}</Badge>;
};

export const DangerBadge: React.FC<{ level: 'safe' | 'caution' | 'destructive' }> = ({ level }) => {
  switch (level) {
    case 'safe':
      return <Badge variant="success" size="sm">✓ Safe</Badge>;
    case 'caution':
      return <Badge variant="warning" size="sm">⚡ Caution</Badge>;
    case 'destructive':
      return <Badge variant="danger" size="sm">🔥 Destructive</Badge>;
  }
};

export const DifficultyBadge: React.FC<{ difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert' }> = ({ difficulty }) => {
  const getVariant = (d: string) => {
    switch (d) {
      case 'beginner': return 'success';
      case 'intermediate': return 'info';
      case 'advanced': return 'warning';
      case 'expert': return 'danger';
      default: return 'secondary';
    }
  };

  return (
    <Badge variant={getVariant(difficulty)} size="sm">
      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
    </Badge>
  );
};
