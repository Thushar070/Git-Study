// ============================================================
// GitAtlas — Situation-Based Command Finder Data
// ============================================================
import type { SituationEntry } from '../types';

export const situationsData: SituationEntry[] = [
  { id: 'undo-last-commit', question: 'I want to undo my last commit but keep the changes', category: 'Recovery',
    recommendedCommands: [
      { commandId: 'reset', explanation: 'git reset --soft HEAD~1 moves HEAD back one commit but keeps all changes staged.', example: 'git reset --soft HEAD~1', dangerLevel: 'caution', alternatives: ['revert'] },
    ],
  },
  { id: 'accidentally-committed-file', question: 'I accidentally committed a file I shouldn\'t have', category: 'Recovery',
    recommendedCommands: [
      { commandId: 'reset', explanation: 'If not pushed: git reset --soft HEAD~1 then git restore --staged <file>.', example: 'git reset --soft HEAD~1\ngit restore --staged secrets.env\ngit commit -m "Recommit without secrets"', dangerLevel: 'caution' },
      { commandId: 'revert', explanation: 'If already pushed: create a new commit that removes the file.', example: 'git rm --cached secrets.env\ngit commit -m "Remove secrets file"\ngit push', dangerLevel: 'safe' },
    ],
  },
  { id: 'recover-deleted-branch', question: 'I deleted a branch and need to recover it', category: 'Recovery',
    recommendedCommands: [
      { commandId: 'reflog', explanation: 'Reflog records where branch tips were. Find the last commit of the deleted branch and recreate it.', example: 'git reflog\ngit checkout -b recovered-branch abc1234', dangerLevel: 'safe' },
    ],
  },
  { id: 'recover-lost-commit', question: 'I lost a commit after reset and want to recover it', category: 'Recovery',
    recommendedCommands: [
      { commandId: 'reflog', explanation: 'git reflog shows where HEAD was before the reset. Find the commit and reset back to it.', example: 'git reflog\ngit reset --hard HEAD@{2}', dangerLevel: 'caution' },
    ],
  },
  { id: 'unstage-file', question: 'I want to remove a file from staging without losing changes', category: 'Undo Changes',
    recommendedCommands: [
      { commandId: 'restore', explanation: 'git restore --staged removes the file from staging but keeps your working directory changes.', example: 'git restore --staged src/app.ts', dangerLevel: 'safe' },
    ],
  },
  { id: 'discard-local-changes', question: 'I want to discard all my local changes and start fresh', category: 'Undo Changes',
    recommendedCommands: [
      { commandId: 'restore', explanation: 'git restore . discards all unstaged modifications to tracked files.', example: 'git restore .', dangerLevel: 'caution' },
      { commandId: 'clean', explanation: 'git clean -fd removes untracked files and directories.', example: 'git clean -fd', dangerLevel: 'destructive' },
    ],
  },
  { id: 'update-branch', question: 'I want to update my feature branch with the latest from main', category: 'Branch Problems',
    recommendedCommands: [
      { commandId: 'rebase', explanation: 'Rebase replays your commits on top of the latest main for a linear history.', example: 'git fetch origin\ngit rebase origin/main', dangerLevel: 'caution', alternatives: ['merge'] },
      { commandId: 'merge', explanation: 'Merge integrates main into your branch, preserving both histories.', example: 'git fetch origin\ngit merge origin/main', dangerLevel: 'caution' },
    ],
  },
  { id: 'combine-commits', question: 'I want to combine multiple commits into one', category: 'Branch Problems',
    recommendedCommands: [
      { commandId: 'rebase', explanation: 'Interactive rebase lets you squash commits together.', example: 'git rebase -i HEAD~3\n# Change "pick" to "squash" for commits to combine', dangerLevel: 'caution' },
      { commandId: 'reset', explanation: 'Soft reset undoes commits and re-stages changes for a single new commit.', example: 'git reset --soft HEAD~3\ngit commit -m "Combined feature"', dangerLevel: 'caution' },
    ],
  },
  { id: 'find-who-changed-line', question: 'I want to find who changed a specific line of code', category: 'Debugging',
    recommendedCommands: [
      { commandId: 'blame', explanation: 'git blame shows the author and commit for each line.', example: 'git blame src/auth.ts', dangerLevel: 'safe' },
    ],
  },
  { id: 'merge-conflicts', question: 'My branch has merge conflicts', category: 'Merge Conflicts',
    recommendedCommands: [
      { commandId: 'mergetool', explanation: 'Launch a visual merge tool to resolve conflicts.', example: 'git mergetool', dangerLevel: 'safe' },
    ],
  },
  { id: 'save-work-temporarily', question: 'I want to temporarily save my changes without committing', category: 'Undo Changes',
    recommendedCommands: [
      { commandId: 'stash', explanation: 'Stash saves your changes and cleans the working directory.', example: 'git stash push -m "WIP: feature work"\n# Do other work\ngit stash pop', dangerLevel: 'safe' },
    ],
  },
  { id: 'find-bug-commit', question: 'I want to find the commit that introduced a bug', category: 'Debugging',
    recommendedCommands: [
      { commandId: 'bisect', explanation: 'Binary search through commits to find the one that introduced the bug.', example: 'git bisect start\ngit bisect bad HEAD\ngit bisect good v1.0\n# Test each commit Git checks out', dangerLevel: 'safe' },
    ],
  },
  { id: 'accidentally-pushed', question: 'I accidentally pushed something I shouldn\'t have', category: 'Remote Problems',
    recommendedCommands: [
      { commandId: 'revert', explanation: 'Create a new commit that undoes the accidental changes — safe for shared history.', example: 'git revert HEAD\ngit push', dangerLevel: 'safe' },
    ],
  },
  { id: 'compare-branches', question: 'I want to compare two branches', category: 'Debugging',
    recommendedCommands: [
      { commandId: 'diff', explanation: 'git diff shows differences between branches.', example: 'git diff main..feature --stat', dangerLevel: 'safe' },
      { commandId: 'log', explanation: 'git log shows commits on one branch that aren\'t on another.', example: 'git log main..feature --oneline', dangerLevel: 'safe' },
    ],
  },
  { id: 'clean-untracked', question: 'I want to remove all untracked files', category: 'Undo Changes',
    recommendedCommands: [
      { commandId: 'clean', explanation: 'git clean removes untracked files. Always use -n first to preview.', example: 'git clean -nd  # preview\ngit clean -fd  # execute', dangerLevel: 'destructive' },
    ],
  },
  { id: 'inspect-old-commit', question: 'I want to look at an old version of my code', category: 'Debugging',
    recommendedCommands: [
      { commandId: 'show', explanation: 'Show file contents at a specific commit.', example: 'git show HEAD~5:src/app.ts', dangerLevel: 'safe' },
      { commandId: 'checkout', explanation: 'Temporarily check out an old commit (detached HEAD).', example: 'git checkout abc1234\n# Look around\ngit switch -  # go back', dangerLevel: 'safe' },
    ],
  },
  { id: 'cherry-pick-commit', question: 'I want to copy a specific commit to my branch', category: 'Branch Problems',
    recommendedCommands: [
      { commandId: 'cherry-pick', explanation: 'Cherry-pick copies a specific commit\'s changes to your current branch.', example: 'git cherry-pick abc1234', dangerLevel: 'caution' },
    ],
  },
  { id: 'undo-rebase', question: 'A rebase went wrong and I want to undo it', category: 'Recovery',
    recommendedCommands: [
      { commandId: 'reflog', explanation: 'Find the pre-rebase state in reflog and reset to it.', example: 'git reflog\ngit reset --hard HEAD@{5}', dangerLevel: 'caution' },
    ],
  },
];
