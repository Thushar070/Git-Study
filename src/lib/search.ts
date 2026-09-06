// ============================================================
// GitAtlas — Search Engine
// ============================================================

import type { GitCommand, SituationEntry, TroubleshootingEntry } from '../types';

export interface SearchResult {
  type: 'command' | 'situation' | 'troubleshooting';
  id: string;
  title: string;
  description: string;
  category?: string;
  path: string;
  score: number;
}

function normalizeQuery(q: string): string {
  return q.toLowerCase().trim();
}

function fuzzyScore(query: string, text: string): number {
  const q = normalizeQuery(query);
  const t = text.toLowerCase();

  // Exact match
  if (t === q) return 100;
  // Starts with
  if (t.startsWith(q)) return 90;
  // Contains exact
  if (t.includes(q)) return 70;

  // Word match
  const words = q.split(/\s+/);
  let wordScore = 0;
  for (const w of words) {
    if (t.includes(w)) wordScore += 30 / words.length;
  }
  if (wordScore > 0) return wordScore;

  // Fuzzy character match
  let qi = 0;
  let matched = 0;
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) {
      matched++;
      qi++;
    }
  }
  if (qi === q.length) {
    return (matched / t.length) * 20;
  }

  return 0;
}

export function searchCommands(
  commands: GitCommand[],
  query: string
): SearchResult[] {
  if (!query.trim()) return [];
  const q = normalizeQuery(query);

  return commands
    .map((cmd) => {
      const nameScore = fuzzyScore(q, cmd.name) * 2;
      const summaryScore = fuzzyScore(q, cmd.summary);
      const descScore = fuzzyScore(q, cmd.description) * 0.5;
      const catScore = fuzzyScore(q, cmd.category) * 0.3;

      // Search in options/flags
      let flagScore = 0;
      for (const opt of cmd.options) {
        const fs = fuzzyScore(q, opt.flag + ' ' + opt.description);
        if (fs > flagScore) flagScore = fs;
      }

      // Search in situations
      let sitScore = 0;
      for (const sit of cmd.situations) {
        const ss = fuzzyScore(q, sit.description);
        if (ss > sitScore) sitScore = ss;
      }

      // Search in whenToUse
      let whenScore = 0;
      for (const w of cmd.whenToUse) {
        const ws = fuzzyScore(q, w);
        if (ws > whenScore) whenScore = ws;
      }

      const totalScore = Math.max(
        nameScore,
        summaryScore,
        descScore,
        catScore,
        flagScore * 0.7,
        sitScore * 0.6,
        whenScore * 0.5
      );

      const prefix = cmd.executable === 'gh' ? '/github' : '/git';
      return {
        type: 'command' as const,
        id: cmd.id,
        title: `${cmd.executable} ${cmd.name}`,
        description: cmd.summary,
        category: cmd.category,
        path: `${prefix}/commands/${cmd.id}`,
        score: totalScore,
      };
    })
    .filter((r) => r.score > 5)
    .sort((a, b) => b.score - a.score)
    .slice(0, 20);
}

export function searchSituations(
  situations: SituationEntry[],
  query: string
): SearchResult[] {
  if (!query.trim()) return [];

  return situations
    .map((sit) => {
      const score = fuzzyScore(query, sit.question);
      return {
        type: 'situation' as const,
        id: sit.id,
        title: sit.question,
        description: sit.recommendedCommands.map((c) => c.commandId).join(', '),
        category: sit.category,
        path: `/situations#${sit.id}`,
        score,
      };
    })
    .filter((r) => r.score > 5)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
}

export function searchTroubleshooting(
  entries: TroubleshootingEntry[],
  query: string
): SearchResult[] {
  if (!query.trim()) return [];

  return entries
    .map((entry) => {
      const errScore = fuzzyScore(query, entry.error) * 1.5;
      const whatScore = fuzzyScore(query, entry.whatHappened);
      const score = Math.max(errScore, whatScore);
      return {
        type: 'troubleshooting' as const,
        id: entry.id,
        title: entry.error,
        description: entry.whatHappened,
        category: entry.category,
        path: `/troubleshooting#${entry.id}`,
        score,
      };
    })
    .filter((r) => r.score > 5)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
}

export function searchAll(
  commands: GitCommand[],
  situations: SituationEntry[],
  troubleshooting: TroubleshootingEntry[],
  query: string
): SearchResult[] {
  const cmdResults = searchCommands(commands, query);
  const sitResults = searchSituations(situations, query);
  const tsResults = searchTroubleshooting(troubleshooting, query);

  return [...cmdResults, ...sitResults, ...tsResults]
    .sort((a, b) => b.score - a.score)
    .slice(0, 30);
}
