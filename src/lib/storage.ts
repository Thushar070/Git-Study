// ============================================================
// GitAtlas — localStorage utilities for favorites & recently viewed
// ============================================================

const FAVORITES_KEY = 'gitatlas-favorites';
const RECENT_KEY = 'gitatlas-recently-viewed';
const MAX_RECENT = 20;

export function getFavorites(): string[] {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleFavorite(commandId: string): boolean {
  const favorites = getFavorites();
  const idx = favorites.indexOf(commandId);
  if (idx >= 0) {
    favorites.splice(idx, 1);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    return false;
  } else {
    favorites.unshift(commandId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    return true;
  }
}

export function isFavorite(commandId: string): boolean {
  return getFavorites().includes(commandId);
}

export function getRecentlyViewed(): string[] {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addRecentlyViewed(commandId: string): void {
  const recent = getRecentlyViewed().filter((id) => id !== commandId);
  recent.unshift(commandId);
  if (recent.length > MAX_RECENT) recent.pop();
  localStorage.setItem(RECENT_KEY, JSON.stringify(recent));
}
