// ============================================================
// GitAtlas — Cheat Sheet Data
// ============================================================
import type { CheatSheetSection } from '../types';

export const cheatSheetData: CheatSheetSection[] = [
  { title: 'Setup & Configuration', commands: [
    { command: 'git init', description: 'Initialize a new repository', commandId: 'init' },
    { command: 'git clone <url>', description: 'Clone a remote repository', commandId: 'clone' },
    { command: 'git config --global user.name "Name"', description: 'Set your identity', commandId: 'config' },
    { command: 'git config --global user.email "email"', description: 'Set your email', commandId: 'config' },
  ]},
  { title: 'Daily Commands', commands: [
    { command: 'git status', description: 'Check repository status', commandId: 'status' },
    { command: 'git add <file>', description: 'Stage a file', commandId: 'add' },
    { command: 'git add .', description: 'Stage all changes', commandId: 'add' },
    { command: 'git commit -m "message"', description: 'Commit staged changes', commandId: 'commit' },
    { command: 'git diff', description: 'View unstaged changes', commandId: 'diff' },
    { command: 'git diff --staged', description: 'View staged changes', commandId: 'diff' },
    { command: 'git log --oneline', description: 'View concise history', commandId: 'log' },
  ]},
  { title: 'Branching', commands: [
    { command: 'git branch', description: 'List branches', commandId: 'branch' },
    { command: 'git switch -c <branch>', description: 'Create and switch to branch', commandId: 'switch' },
    { command: 'git switch <branch>', description: 'Switch branches', commandId: 'switch' },
    { command: 'git branch -d <branch>', description: 'Delete a merged branch', commandId: 'branch' },
    { command: 'git branch -m <old> <new>', description: 'Rename a branch', commandId: 'branch' },
  ]},
  { title: 'Merging & Rebasing', commands: [
    { command: 'git merge <branch>', description: 'Merge branch into current', commandId: 'merge' },
    { command: 'git rebase <branch>', description: 'Rebase onto branch', commandId: 'rebase' },
    { command: 'git rebase -i HEAD~n', description: 'Interactive rebase last n commits', commandId: 'rebase' },
    { command: 'git cherry-pick <hash>', description: 'Apply specific commit', commandId: 'cherry-pick' },
    { command: 'git merge --abort', description: 'Abort a merge', commandId: 'merge' },
  ]},
  { title: 'Remote Operations', commands: [
    { command: 'git remote -v', description: 'List remotes with URLs', commandId: 'remote' },
    { command: 'git fetch', description: 'Download remote changes', commandId: 'fetch' },
    { command: 'git pull', description: 'Fetch and merge remote', commandId: 'pull' },
    { command: 'git pull --rebase', description: 'Fetch and rebase', commandId: 'pull' },
    { command: 'git push', description: 'Push commits to remote', commandId: 'push' },
    { command: 'git push -u origin <branch>', description: 'Push and set upstream', commandId: 'push' },
  ]},
  { title: 'Undo & Recovery', commands: [
    { command: 'git restore <file>', description: 'Discard working changes', commandId: 'restore' },
    { command: 'git restore --staged <file>', description: 'Unstage a file', commandId: 'restore' },
    { command: 'git reset --soft HEAD~1', description: 'Undo commit, keep staged', commandId: 'reset' },
    { command: 'git reset --hard HEAD~1', description: 'Undo commit, discard all', commandId: 'reset' },
    { command: 'git revert <hash>', description: 'Create undo commit (safe)', commandId: 'revert' },
    { command: 'git reflog', description: 'View HEAD history (recovery)', commandId: 'reflog' },
  ]},
  { title: 'Stash & Tags', commands: [
    { command: 'git stash', description: 'Save changes temporarily', commandId: 'stash' },
    { command: 'git stash pop', description: 'Restore last stash', commandId: 'stash' },
    { command: 'git stash list', description: 'List stashes', commandId: 'stash' },
    { command: 'git tag -a v1.0 -m "msg"', description: 'Create annotated tag', commandId: 'tag' },
    { command: 'git push --tags', description: 'Push all tags', commandId: 'push' },
  ]},
  { title: 'Inspection & Debugging', commands: [
    { command: 'git blame <file>', description: 'Show who changed each line', commandId: 'blame' },
    { command: 'git bisect start', description: 'Start binary bug search', commandId: 'bisect' },
    { command: 'git log -S "text"', description: 'Find commits adding/removing text', commandId: 'log' },
    { command: 'git show <hash>', description: 'Show commit details', commandId: 'show' },
    { command: 'git grep "pattern"', description: 'Search tracked files', commandId: 'grep' },
  ]},
  { title: 'Cleanup', commands: [
    { command: 'git clean -nd', description: 'Preview untracked file removal', commandId: 'clean' },
    { command: 'git clean -fd', description: 'Remove untracked files/dirs', commandId: 'clean' },
    { command: 'git gc', description: 'Run garbage collection', commandId: 'gc' },
  ]},
];
