import React, { useState, useEffect } from 'react';
import { Bookmark } from 'lucide-react';
import { isFavorite, toggleFavorite } from '../lib/storage';

interface FavoriteButtonProps {
  commandId: string;
  className?: string;
  size?: number;
  showText?: boolean;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  commandId,
  className = '',
  size = 18,
  showText = false
}) => {
  const [fav, setFav] = useState(false);

  useEffect(() => {
    setFav(isFavorite(commandId));
  }, [commandId]);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newState = toggleFavorite(commandId);
    setFav(newState);
  };

  return (
    <button
      onClick={handleToggle}
      className={`favorite-btn ${fav ? 'active' : ''} ${className}`}
      title={fav ? 'Remove from saved commands' : 'Save command'}
      aria-label={fav ? 'Remove from saved commands' : 'Save command'}
    >
      <Bookmark size={size} fill={fav ? 'currentColor' : 'none'} />
      {showText && <span>{fav ? 'Saved' : 'Save'}</span>}
    </button>
  );
};
