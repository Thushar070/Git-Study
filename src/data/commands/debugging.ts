// ============================================================
// GitAtlas — Debugging Commands
// git grep, git diff (adv), git apply, git format-patch, git am
// ============================================================
import type { GitCommand } from '../../types';

export const debuggingCommands: GitCommand[] = [
  {
    id: 'grep', name: 'grep', executable: 'git', category: 'debugging', subcategory: 'Search', type: 'porcelain', difficulty: 'intermediate', dangerLevel: 'safe',
    summary: 'Search tracked files for a pattern',
    description: 'git grep searches through tracked files in the working tree (or at a specific commit) for lines matching a pattern. It\'s faster than regular grep because it only searches Git-tracked files and leverages Git\'s internal index.',
    whyItExists: 'Regular grep searches all files including untracked ones, node_modules, build artifacts, etc. git grep is faster and more focused — it only searches files Git knows about.',
    whenToUse: ['Searching for function names, variables, or patterns across the codebase','Finding all references to a specific string','Searching at a specific commit without checkout'],
    whenNotToUse: ['When you need to search untracked or ignored files — use regular grep'],
    syntax: ['git grep <pattern>','git grep -n <pattern>','git grep <pattern> <commit>','git grep -l <pattern>'],
    options: [
      { flag: '-n', shortFlag: '--line-number', description: 'Show line numbers.', example: 'git grep -n "TODO"' },
      { flag: '-l', shortFlag: '--files-with-matches', description: 'Show only filenames.', example: 'git grep -l "deprecated"' },
      { flag: '-c', shortFlag: '--count', description: 'Show count of matches per file.', example: 'git grep -c "console.log"' },
      { flag: '-i', shortFlag: '--ignore-case', description: 'Case-insensitive search.', example: 'git grep -i "error"' },
      { flag: '-w', shortFlag: '--word-regexp', description: 'Match whole words only.', example: 'git grep -w "user"' },
      { flag: '-e <pattern>', description: 'Specify pattern (allows multiple with --or/--and).', example: 'git grep -e "TODO" --or -e "FIXME"' },
    ],
    examples: [
      { title: 'Search for a pattern', command: 'git grep -n "handleLogin"', output: 'src/auth/login.ts:42: function handleLogin(data) {\nsrc/auth/login.ts:89:   return handleLogin(formData);' },
      { title: 'Find TODOs', command: 'git grep -n "TODO\\|FIXME\\|HACK"' },
      { title: 'Search in a specific commit', command: 'git grep "oldFunction" HEAD~10' },
      { title: 'Count matches per file', command: 'git grep -c "console.log"' },
    ],
    situations: [
      { description: 'Finding all uses of a deprecated function', command: 'git grep -n "oldAPICall"', explanation: 'Shows every file and line where the deprecated function is referenced.' },
    ],
    mistakes: ['Forgetting that git grep only searches tracked files.'],
    relatedCommands: ['log', 'blame', 'diff'],
    tips: ['Faster than grep for tracked files because it uses Git\'s index.','Use git grep <pattern> <commit> to search old versions without checkout.'],
    officialReference: 'https://git-scm.com/docs/git-grep',
  },
  {
    id: 'difftool', name: 'difftool', executable: 'git', category: 'debugging', subcategory: 'Inspection', type: 'porcelain', difficulty: 'intermediate', dangerLevel: 'safe',
    summary: 'Show changes using a visual diff tool',
    description: 'git difftool launches an external diff tool to view changes. It accepts the same arguments as git diff but opens a graphical comparison tool instead of showing text diffs in the terminal.',
    whyItExists: 'Terminal diffs can be hard to read for complex changes. Graphical diff tools like VS Code, meld, or Beyond Compare provide side-by-side visual comparison.',
    whenToUse: ['Reviewing complex diffs visually','When terminal diffs are hard to follow','Comparing binary files'],
    whenNotToUse: ['For simple, quick diffs — git diff in the terminal is faster'],
    syntax: ['git difftool','git difftool --staged','git difftool <commit> <commit>','git difftool --tool=<tool>'],
    options: [
      { flag: '--tool=<tool>', shortFlag: '-t <tool>', description: 'Use a specific diff tool.', example: 'git difftool --tool=meld' },
      { flag: '--staged', shortFlag: '--cached', description: 'Compare staged changes.', example: 'git difftool --staged' },
      { flag: '--no-prompt', shortFlag: '-y', description: 'Don\'t prompt before launching.', example: 'git difftool -y' },
      { flag: '--dir-diff', shortFlag: '-d', description: 'Compare directories instead of file-by-file.', example: 'git difftool -d HEAD~1' },
    ],
    examples: [
      { title: 'Open visual diff', command: 'git difftool' },
      { title: 'Compare with a specific tool', command: 'git difftool --tool=vscode' },
      { title: 'Configure VS Code as diff tool', command: 'git config --global diff.tool vscode\ngit config --global difftool.vscode.cmd \'code --wait --diff $LOCAL $REMOTE\'' },
    ],
    situations: [],
    mistakes: ['Not having a diff tool configured — set one up with git config.'],
    relatedCommands: ['diff', 'mergetool'],
    tips: ['Most IDEs have built-in diff viewers that work better for daily use.','Configure once: git config --global diff.tool <name>'],
    officialReference: 'https://git-scm.com/docs/git-difftool',
  },
];
