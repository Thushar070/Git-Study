// ============================================================
// GitAtlas — Merging & Rebasing Commands
// git merge, git rebase, git cherry-pick, git mergetool, git rerere
// ============================================================

import type { GitCommand } from '../../types';

export const mergingCommands: GitCommand[] = [
  {
    id: 'merge',
    name: 'merge',
    executable: 'git',
    category: 'merging-rebasing',
    subcategory: 'Integration',
    type: 'porcelain',
    difficulty: 'intermediate',
    dangerLevel: 'caution',
    summary: 'Join two or more development histories together — integrate branch changes',
    description: 'git merge incorporates changes from one branch into another. It finds the common ancestor of both branches, computes the differences, and combines them. If both branches modified the same lines, Git reports a conflict that you must resolve manually. A successful merge creates a merge commit with two parents.',
    whyItExists: 'Branching is pointless without integration. After working on a feature branch, you need to bring those changes back into the main line of development. git merge is the primary mechanism for this.',
    whenToUse: [
      'Integrating a completed feature branch into main',
      'Pulling upstream changes into your branch',
      'Combining work from multiple contributors',
    ],
    whenNotToUse: [
      'When you want a linear history — use git rebase instead',
      'When you want to test a single commit from another branch — use git cherry-pick',
    ],
    syntax: [
      'git merge <branch>',
      'git merge --no-ff <branch>',
      'git merge --ff-only <branch>',
      'git merge --squash <branch>',
      'git merge --abort',
    ],
    options: [
      { flag: '--no-ff', description: 'Always create a merge commit, even if fast-forward is possible.', example: 'git merge --no-ff feature-auth', whenUseful: 'Preserving branch history and making it clear where a feature was integrated' },
      { flag: '--ff-only', description: 'Refuse to merge if it cannot be fast-forwarded.', example: 'git merge --ff-only origin/main', whenUseful: 'Ensuring you don\'t accidentally create merge commits when pulling' },
      { flag: '--squash', description: 'Take all changes from the branch and stage them without creating a merge commit. You commit manually.', example: 'git merge --squash feature-x && git commit -m "Add feature X"', whenUseful: 'Combining an entire feature branch into a single commit' },
      { flag: '--abort', description: 'Abort a merge that has conflicts and return to the pre-merge state.', example: 'git merge --abort', whenUseful: 'When you realize you\'re not ready to resolve the conflicts' },
      { flag: '--continue', description: 'Continue the merge after resolving conflicts.', example: 'git merge --continue' },
      { flag: '-m <msg>', description: 'Set the merge commit message.', example: 'git merge -m "Merge feature-auth into main" feature-auth' },
      { flag: '--no-commit', description: 'Perform the merge but don\'t create a commit, allowing you to inspect or modify the result.', example: 'git merge --no-commit feature-x' },
    ],
    examples: [
      { title: 'Merge a feature branch', command: 'git switch main\ngit merge feature-auth' },
      { title: 'Merge with explicit merge commit', command: 'git merge --no-ff feature-auth' },
      { title: 'Squash merge', command: 'git merge --squash feature-x\ngit commit -m "Add feature X"' },
      { title: 'Abort a conflicted merge', command: 'git merge --abort' },
    ],
    situations: [
      { description: 'A feature branch is complete and ready for main', command: 'git switch main\ngit pull origin main\ngit merge --no-ff feature-auth -m "feat: integrate authentication module"\ngit push origin main', explanation: 'Switches to main, pulls latest changes, merges the feature with an explicit merge commit, and pushes.' },
      { description: 'Merge conflicts occur', command: '# After git merge feature-x reports conflicts:\n# 1. Open conflicted files and resolve <<<< ==== >>>> markers\n# 2. git add <resolved-files>\n# 3. git merge --continue', explanation: 'Git marks conflicts with markers. Edit the files to resolve, stage them, then continue.' },
    ],
    mistakes: [
      'Merging without pulling the latest changes from the remote — can create unnecessary merge commits.',
      'Not testing the merge result before pushing — the merge might compile but have logical bugs.',
      'Using --squash on shared branches — it discards branch history and can cause confusion.',
    ],
    warnings: [
      'Merge conflicts must be resolved manually. Git cannot decide which version is "correct".',
    ],
    relatedCommands: ['rebase', 'cherry-pick', 'branch', 'switch', 'mergetool'],
    comparisonCommands: ['rebase'],
    tips: [
      'Use --no-ff to always create merge commits — this preserves the feature branch history in git log --graph.',
      'After resolving conflicts, always test the code before committing the merge.',
      'git log --graph --oneline is great for visualizing merge history.',
    ],
    officialReference: 'https://git-scm.com/docs/git-merge',
  },

  {
    id: 'rebase',
    name: 'rebase',
    executable: 'git',
    category: 'merging-rebasing',
    subcategory: 'Integration',
    type: 'porcelain',
    difficulty: 'advanced',
    dangerLevel: 'destructive',
    summary: 'Reapply commits on top of another base — create a linear history',
    description: 'git rebase takes the commits from your current branch, temporarily removes them, fast-forwards to the target branch, then replays your commits on top. The result is a linear history that looks as if you started your work from the latest upstream commit. Interactive rebase (-i) lets you reorder, edit, squash, or drop commits.',
    whyItExists: 'Merge commits can clutter history. Teams that prefer a clean, linear commit log use rebase to integrate changes without creating merge commits. Interactive rebase is also the primary tool for cleaning up local history before sharing.',
    whenToUse: [
      'Updating a feature branch with the latest changes from main',
      'Cleaning up messy local commit history before pushing',
      'Squashing multiple small commits into meaningful ones',
      'Reordering commits for logical grouping',
    ],
    whenNotToUse: [
      'On commits that have been pushed to a shared branch — rebase rewrites commit hashes',
      'When you want to preserve the exact development history — use merge',
      'When merge conflicts would be too complex — a merge might be simpler',
    ],
    syntax: [
      'git rebase <upstream>',
      'git rebase -i <commit>',
      'git rebase --onto <newbase> <upstream> [<branch>]',
      'git rebase --abort',
      'git rebase --continue',
      'git rebase --skip',
    ],
    options: [
      { flag: '-i', shortFlag: '--interactive', description: 'Open an editor to reorder, squash, edit, or drop commits.', example: 'git rebase -i HEAD~5', whenUseful: 'Cleaning up commit history before pushing or opening a PR' },
      { flag: '--onto <newbase>', description: 'Rebase onto a specific base that\'s different from the upstream.', example: 'git rebase --onto main feature-base feature-x', whenUseful: 'Moving a chain of commits from one base to another' },
      { flag: '--abort', description: 'Abort a rebase in progress and return to the original state.', example: 'git rebase --abort' },
      { flag: '--continue', description: 'Continue the rebase after resolving a conflict.', example: 'git rebase --continue' },
      { flag: '--skip', description: 'Skip the current commit and continue with the next one.', example: 'git rebase --skip', warning: 'The skipped commit\'s changes will be lost' },
      { flag: '--autosquash', description: 'Automatically reorder fixup! and squash! commits.', example: 'git rebase -i --autosquash main', whenUseful: 'When you used git commit --fixup to mark commits for squashing' },
    ],
    examples: [
      { title: 'Rebase feature branch onto main', command: 'git switch feature-auth\ngit rebase main' },
      { title: 'Interactive rebase (clean up last 5 commits)', command: 'git rebase -i HEAD~5', output: 'pick abc1234 Add login form\npick def5678 Fix typo\npick 9ab0123 Add validation\npick 4cd5678 More fixes\npick 7ef8901 Final cleanup\n\n# Change "pick" to "squash" or "s" to combine commits' },
      { title: 'Abort a rebase gone wrong', command: 'git rebase --abort' },
    ],
    situations: [
      { description: 'Your feature branch is behind main and you want a linear history', command: 'git switch feature-auth\ngit fetch origin\ngit rebase origin/main', explanation: 'Replays your feature commits on top of the latest main, creating a clean linear history.' },
      { description: 'Squashing WIP commits before opening a PR', command: 'git rebase -i HEAD~4\n# Change "pick" to "squash" for the commits you want to combine\n# Save and close the editor\n# Write a clean combined commit message', explanation: 'Combines multiple small commits into fewer, meaningful ones.' },
    ],
    mistakes: [
      'Rebasing commits that have already been pushed — other developers based work on those commits and their hashes will change.',
      'Not understanding that rebase creates NEW commits with new hashes — D becomes D\', E becomes E\'.',
      'Resolving conflicts incorrectly during rebase — each conflict must be resolved correctly for each replayed commit.',
      'Force-pushing after rebase without communicating with the team.',
    ],
    warnings: [
      'Rebase rewrites commit history. Rebased commits have new SHA hashes.',
      'NEVER rebase commits that have been pushed to a shared branch unless the team has agreed to this workflow.',
      'If a rebase goes wrong, use git rebase --abort to return to the original state, or git reflog to find the pre-rebase state.',
    ],
    relatedCommands: ['merge', 'cherry-pick', 'reset', 'reflog'],
    comparisonCommands: ['merge'],
    tips: [
      'Golden rule: never rebase public/shared history.',
      'Use git pull --rebase instead of git pull for a cleaner history when pulling from remote.',
      'Interactive rebase commands: pick, reword, edit, squash, fixup, drop.',
      'After rebase, you\'ll need git push --force-with-lease to update a pushed branch.',
    ],
    officialReference: 'https://git-scm.com/docs/git-rebase',
  },

  {
    id: 'cherry-pick',
    name: 'cherry-pick',
    executable: 'git',
    category: 'merging-rebasing',
    subcategory: 'Selective Integration',
    type: 'porcelain',
    difficulty: 'intermediate',
    dangerLevel: 'caution',
    summary: 'Apply the changes from a specific commit onto the current branch',
    description: 'git cherry-pick takes one or more existing commits and applies their changes as new commits on the current branch. Unlike merge or rebase, it copies individual commits rather than integrating entire branches. The new commits have different SHA hashes.',
    whyItExists: 'Sometimes you need just one specific fix or change from another branch without merging the entire branch. Cherry-pick lets you selectively apply individual commits.',
    whenToUse: [
      'Applying a hotfix from a release branch to main',
      'Copying a specific bug fix from one branch to another',
      'Selectively integrating work when a full merge isn\'t appropriate',
    ],
    whenNotToUse: [
      'When you need all changes from a branch — use merge or rebase',
      'When cherry-picking many commits — consider merge instead',
      'When you need to maintain the relationship between branches — cherry-pick creates independent commits',
    ],
    syntax: [
      'git cherry-pick <commit>',
      'git cherry-pick <commit1> <commit2>',
      'git cherry-pick <start>..<end>',
      'git cherry-pick --no-commit <commit>',
      'git cherry-pick --abort',
    ],
    options: [
      { flag: '--no-commit', shortFlag: '-n', description: 'Apply changes without creating a commit, staging them instead.', example: 'git cherry-pick --no-commit abc1234', whenUseful: 'When you want to combine multiple cherry-picks into a single commit' },
      { flag: '--edit', shortFlag: '-e', description: 'Edit the commit message before committing.', example: 'git cherry-pick -e abc1234' },
      { flag: '-x', description: 'Append a line saying which commit was cherry-picked.', example: 'git cherry-pick -x abc1234', whenUseful: 'Documentation — makes it clear the commit was cherry-picked' },
      { flag: '--abort', description: 'Abort a cherry-pick in progress (e.g., during conflicts).', example: 'git cherry-pick --abort' },
      { flag: '--continue', description: 'Continue after resolving cherry-pick conflicts.', example: 'git cherry-pick --continue' },
    ],
    examples: [
      { title: 'Cherry-pick a single commit', command: 'git cherry-pick abc1234' },
      { title: 'Cherry-pick with provenance note', command: 'git cherry-pick -x abc1234' },
      { title: 'Cherry-pick without committing', command: 'git cherry-pick --no-commit abc1234 def5678\ngit commit -m "Backport security fixes"' },
    ],
    situations: [
      { description: 'A bug fix on develop needs to go to the release branch', command: 'git switch release-1.0\ngit cherry-pick abc1234\ngit push origin release-1.0', explanation: 'Copies just the bug fix commit to the release branch.' },
    ],
    mistakes: [
      'Cherry-picking a merge commit without -m — Git needs to know which parent to apply against.',
      'Cherry-picking the same commit to multiple branches then merging those branches — can cause duplicate changes.',
    ],
    relatedCommands: ['merge', 'rebase', 'revert'],
    comparisonCommands: ['merge', 'rebase'],
    tips: [
      'Use -x flag to record the source commit hash in the message — helps with traceability.',
      'Cherry-picking creates a new commit with a different hash — it\'s a copy, not a move.',
    ],
    officialReference: 'https://git-scm.com/docs/git-cherry-pick',
  },

  {
    id: 'mergetool',
    name: 'mergetool',
    executable: 'git',
    category: 'merging-rebasing',
    subcategory: 'Conflict Resolution',
    type: 'porcelain',
    difficulty: 'intermediate',
    dangerLevel: 'safe',
    summary: 'Run a merge conflict resolution tool for conflicted files',
    description: 'git mergetool launches a visual diff/merge tool to help resolve merge conflicts. It opens each conflicted file in a three-way merge view (local, remote, base) in tools like vimdiff, meld, kdiff3, VS Code, or any configured merge tool.',
    whyItExists: 'Manually editing conflict markers (<<<<<<<, =======, >>>>>>>) in a text editor can be error-prone, especially for complex conflicts. Merge tools provide a visual side-by-side view that makes resolution easier.',
    whenToUse: [
      'After a merge, rebase, or cherry-pick reports conflicts',
      'When conflicts are complex and visual comparison helps',
    ],
    whenNotToUse: [
      'For simple conflicts that are easy to resolve in your editor',
      'When no merge conflicts exist — there\'s nothing to resolve',
    ],
    syntax: [
      'git mergetool',
      'git mergetool --tool=<tool>',
      'git mergetool <file>',
    ],
    options: [
      { flag: '--tool=<tool>', shortFlag: '-t <tool>', description: 'Use a specific merge tool.', example: 'git mergetool --tool=vimdiff', whenUseful: 'Overriding the default tool for a specific merge' },
      { flag: '--no-prompt', description: 'Don\'t prompt before launching each merge tool instance.', example: 'git mergetool --no-prompt' },
    ],
    examples: [
      { title: 'Launch merge tool for all conflicts', command: 'git mergetool' },
      { title: 'Configure VS Code as merge tool', command: 'git config --global merge.tool vscode\ngit config --global mergetool.vscode.cmd \'code --wait $MERGED\'' },
      { title: 'Use a specific tool', command: 'git mergetool --tool=meld' },
    ],
    situations: [
      { description: 'A merge has conflicts you want to resolve visually', command: 'git merge feature-x\n# CONFLICT reported\ngit mergetool', explanation: 'Opens each conflicted file in your configured merge tool for visual resolution.' },
    ],
    mistakes: [
      'Forgetting to git add and git commit after resolving conflicts with mergetool.',
      'Not cleaning up .orig backup files — configure mergetool.keepBackup false.',
    ],
    relatedCommands: ['merge', 'rebase', 'diff'],
    tips: [
      'Configure your preferred tool: git config --global merge.tool <toolname>',
      'Disable backup files: git config --global mergetool.keepBackup false',
    ],
    officialReference: 'https://git-scm.com/docs/git-mergetool',
  },

  {
    id: 'rerere',
    name: 'rerere',
    executable: 'git',
    category: 'merging-rebasing',
    subcategory: 'Conflict Resolution',
    type: 'porcelain',
    difficulty: 'advanced',
    dangerLevel: 'safe',
    summary: 'Reuse recorded resolution of previously resolved merge conflicts',
    description: 'git rerere (Reuse Recorded Resolution) records how you resolved merge conflicts and automatically applies the same resolution if it encounters the same conflict again. This is particularly useful when rebasing or repeatedly merging the same branches.',
    whyItExists: 'If you rebase frequently or maintain long-lived branches that are periodically merged, you might encounter the same conflicts multiple times. rerere remembers your resolutions and applies them automatically.',
    whenToUse: [
      'When you rebase frequently and hit the same conflicts',
      'When maintaining a long-lived branch that\'s periodically synced with main',
      'When testing merges that you may need to redo',
    ],
    whenNotToUse: [
      'When conflicts are genuinely different each time',
    ],
    syntax: [
      'git rerere',
      'git rerere diff',
      'git rerere status',
      'git rerere clear',
      'git rerere forget <pathspec>',
    ],
    options: [
      { flag: 'diff', description: 'Show the current state of the resolution — what rerere will record.', example: 'git rerere diff' },
      { flag: 'status', description: 'Show files with recorded resolutions.', example: 'git rerere status' },
      { flag: 'clear', description: 'Clear all recorded resolutions.', example: 'git rerere clear' },
      { flag: 'forget <path>', description: 'Forget the recorded resolution for a specific file.', example: 'git rerere forget src/config.ts' },
    ],
    examples: [
      { title: 'Enable rerere globally', command: 'git config --global rerere.enabled true' },
      { title: 'Check rerere status', command: 'git rerere status' },
      { title: 'View recorded resolution', command: 'git rerere diff' },
    ],
    situations: [
      { description: 'You rebase a branch frequently and hit the same conflict each time', command: 'git config rerere.enabled true\n# Resolve the conflict once — rerere records it\n# Next time you rebase, the same conflict is auto-resolved', explanation: 'After enabling rerere and resolving a conflict, Git remembers your resolution and applies it automatically in the future.' },
    ],
    mistakes: [
      'Forgetting to enable rerere — it\'s off by default. Set rerere.enabled = true.',
      'Not verifying auto-resolved conflicts — rerere can sometimes apply an outdated resolution.',
    ],
    relatedCommands: ['merge', 'rebase', 'mergetool'],
    tips: [
      'Enable globally: git config --global rerere.enabled true',
      'rerere is especially valuable for rebase-heavy workflows.',
    ],
    officialReference: 'https://git-scm.com/docs/git-rerere',
  },
];
