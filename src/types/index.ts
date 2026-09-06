// ============================================================
// GitAtlas — Core Type Definitions
// ============================================================

export type Difficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert';
export type DangerLevel = 'safe' | 'caution' | 'destructive';
export type CommandType = 'porcelain' | 'plumbing' | 'github-cli';
export type Executable = 'git' | 'gh';

export interface CommandOption {
  flag: string;
  shortFlag?: string;
  description: string;
  example?: string;
  whenUseful?: string;
  warning?: string;
}

export interface CommandExample {
  title: string;
  description?: string;
  command: string;
  output?: string;
}

export interface Situation {
  description: string;
  command: string;
  explanation: string;
}

export interface GitCommand {
  id: string;
  name: string;
  executable: Executable;
  category: string;
  subcategory?: string;
  type: CommandType;
  difficulty: Difficulty;
  dangerLevel: DangerLevel;
  summary: string;
  description: string;
  whyItExists: string;
  whenToUse: string[];
  whenNotToUse: string[];
  syntax: string[];
  aliases?: string[];
  options: CommandOption[];
  examples: CommandExample[];
  situations: Situation[];
  mistakes: string[];
  warnings?: string[];
  relatedCommands: string[];
  comparisonCommands?: string[];
  tips?: string[];
  notes?: string[];
  officialReference: string;
}

export interface CommandCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  commands: string[]; // command IDs
}

export interface SituationEntry {
  id: string;
  question: string;
  category: string;
  recommendedCommands: {
    commandId: string;
    explanation: string;
    example: string;
    dangerLevel: DangerLevel;
    alternatives?: string[];
  }[];
}

export interface ComparisonEntry {
  id: string;
  title: string;
  commands: string[];
  criteria: {
    label: string;
    values: Record<string, string>;
  }[];
}

export interface TroubleshootingEntry {
  id: string;
  error: string;
  category: string;
  whatHappened: string;
  whyItHappened: string;
  howToDiagnose: string[];
  howToFix: string[];
  commands: string[];
  commonMistakes: string[];
}

export interface LearningStage {
  id: number;
  title: string;
  description: string;
  topics: string[];
  commandIds: string[];
}

export interface CheatSheetSection {
  title: string;
  commands: {
    command: string;
    description: string;
    commandId?: string;
  }[];
}

export interface GlossaryEntry {
  term: string;
  definition: string;
  relatedTerms?: string[];
  relatedCommands?: string[];
}
