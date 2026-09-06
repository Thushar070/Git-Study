// ============================================================
// GitAtlas — Command Data Registry
// Aggregates all command data files into a single registry
// ============================================================

import type { GitCommand, CommandCategory, SituationEntry, ComparisonEntry, TroubleshootingEntry, LearningStage, CheatSheetSection, GlossaryEntry } from '../types';
import { gettingStartedCommands } from './commands/getting-started';
import { stagingCommands } from './commands/staging-snapshots';
import { undoRecoveryCommands } from './commands/undo-recovery';
import { branchingCommands } from './commands/branching';
import { mergingCommands } from './commands/merging-rebasing';
import { historyCommands } from './commands/history';
import { remoteCommands } from './commands/remote';
import { stashingTagsCommands } from './commands/stashing-tags';
import { debuggingCommands } from './commands/debugging';
import { advancedCommands } from './commands/advanced';
import { administrationCommands } from './commands/administration';
import { plumbingCommands } from './commands/plumbing';
import { plumbingAdvancedCommands } from './commands/plumbing-advanced';
import { plumbingPackCommands } from './commands/plumbing-pack';
import { patchingCommands } from './commands/patching';
import { referenceCommands } from './commands/references';
import { githubCliPrCommands } from './commands/github-cli-pr';
import { githubCliIssueCommands } from './commands/github-cli-issues';
import { situationsData } from './situations';
import { comparisonsData } from './comparisons';
import { troubleshootingData } from './troubleshooting';
import { learningPathData } from './learning-path';
import { cheatSheetData } from './cheatsheet';
import { glossaryData } from './glossary';

// ── Aggregate all commands ──
export const allCommands: GitCommand[] = [
  ...gettingStartedCommands,
  ...stagingCommands,
  ...undoRecoveryCommands,
  ...branchingCommands,
  ...mergingCommands,
  ...historyCommands,
  ...remoteCommands,
  ...stashingTagsCommands,
  ...debuggingCommands,
  ...advancedCommands,
  ...administrationCommands,
  ...plumbingCommands,
  ...plumbingAdvancedCommands,
  ...plumbingPackCommands,
  ...patchingCommands,
  ...referenceCommands,
  ...githubCliPrCommands,
  ...githubCliIssueCommands,
];

// Alias for convenience
export const commandRegistry = allCommands;

// ── Command lookup by ID ──
const commandMap = new Map<string, GitCommand>();
for (const cmd of allCommands) {
  commandMap.set(cmd.id, cmd);
}

export function getCommand(id: string): GitCommand | undefined {
  return commandMap.get(id);
}

export const getCommandById = getCommand;

export function getCommandsByCategory(category: string): GitCommand[] {
  return allCommands.filter((c) => c.category === category);
}

export function getCommandsByType(type: GitCommand['type']): GitCommand[] {
  return allCommands.filter((c) => c.type === type);
}

export function getGitCommands(): GitCommand[] {
  return allCommands.filter((c) => c.executable === 'git');
}

export function getGitHubCommands(): GitCommand[] {
  return allCommands.filter((c) => c.executable === 'gh');
}

// ── Categories ──
export const categories: CommandCategory[] = [
  { id: 'getting-started', name: 'Getting Started', description: 'Initialize repositories and configure Git', icon: '🚀', commands: [] },
  { id: 'staging-snapshots', name: 'Staging & Snapshots', description: 'Stage changes and create commits', icon: '📸', commands: [] },
  { id: 'undo-recovery', name: 'Undo & Recovery', description: 'Undo changes and recover lost work', icon: '↩️', commands: [] },
  { id: 'branching', name: 'Branching', description: 'Create, switch, and manage branches', icon: '🌿', commands: [] },
  { id: 'merging-rebasing', name: 'Merging & Rebasing', description: 'Integrate changes between branches', icon: '🔀', commands: [] },
  { id: 'history', name: 'History & Inspection', description: 'View and search project history', icon: '📜', commands: [] },
  { id: 'remote', name: 'Remote Operations', description: 'Work with remote repositories', icon: '☁️', commands: [] },
  { id: 'stashing-tags', name: 'Stashing & Tags', description: 'Temporarily save work and mark releases', icon: '🏷️', commands: [] },
  { id: 'debugging', name: 'Debugging', description: 'Find bugs and inspect changes', icon: '🔍', commands: [] },
  { id: 'patching', name: 'Patching & Email', description: 'Patch creation, email workflows, and mailbox application', icon: '✉️', commands: [] },
  { id: 'advanced', name: 'Advanced', description: 'Submodules, subtrees, and advanced operations', icon: '⚙️', commands: [] },
  { id: 'administration', name: 'Administration', description: 'Repository maintenance and housekeeping', icon: '🔧', commands: [] },
  { id: 'plumbing', name: 'Plumbing', description: 'Low-level Git internals and object manipulation', icon: '🔩', commands: [] },
  { id: 'github-cli', name: 'GitHub CLI', description: 'GitHub CLI (gh) commands', icon: '🐙', commands: [] },
];

// Populate category command lists
for (const cat of categories) {
  cat.commands = allCommands
    .filter((c) => c.category === cat.id)
    .map((c) => c.id);
}

// ── Re-export data ──
export const allSituations: SituationEntry[] = situationsData;
export const allComparisons: ComparisonEntry[] = comparisonsData;
export const allTroubleshooting: TroubleshootingEntry[] = troubleshootingData;
export const learningPath: LearningStage[] = learningPathData;
export const cheatSheet: CheatSheetSection[] = cheatSheetData;
export const glossary: GlossaryEntry[] = glossaryData;

// ── Stats ──
export function getStats() {
  const gitCmds = allCommands.filter((c) => c.executable === 'git');
  const ghCmds = allCommands.filter((c) => c.executable === 'gh');
  return {
    totalCommands: allCommands.length,
    gitCommands: gitCmds.length,
    githubCommands: ghCmds.length,
    categories: categories.filter((c) => c.commands.length > 0).length,
    situations: situationsData.length,
    troubleshooting: troubleshootingData.length,
    comparisons: comparisonsData.length,
    visualGuides: 12,
  };
}
