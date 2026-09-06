// ============================================================
// GitAtlas — Learning Path Data
// ============================================================
import type { LearningStage } from '../types';

export const learningPathData: LearningStage[] = [
  { id: 1, title: 'Git Fundamentals', description: 'Understand what Git is, install it, and configure your identity.', topics: ['What is version control?', 'Installing Git', 'Configuring user name and email', 'Understanding repositories'], commandIds: ['init', 'config', 'help', 'version'] },
  { id: 2, title: 'Working Tree & Files', description: 'Learn how Git tracks files and understand the working directory.', topics: ['Tracked vs untracked files', '.gitignore', 'File states: unmodified, modified, staged', 'Viewing file status'], commandIds: ['status', 'add', 'rm'] },
  { id: 3, title: 'Staging & Committing', description: 'Master the stage-commit workflow that forms the backbone of Git.', topics: ['The staging area (index)', 'Creating commits', 'Writing good commit messages', 'Viewing differences'], commandIds: ['add', 'commit', 'diff', 'status'] },
  { id: 4, title: 'Viewing History', description: 'Navigate and search through project history effectively.', topics: ['Browsing commit log', 'Filtering by author, date, message', 'Viewing individual commits', 'Searching history'], commandIds: ['log', 'show', 'shortlog', 'grep'] },
  { id: 5, title: 'Branching', description: 'Create, switch, and manage branches for parallel development.', topics: ['What are branches?', 'Creating and switching branches', 'Branch naming conventions', 'Listing and deleting branches'], commandIds: ['branch', 'switch', 'checkout'] },
  { id: 6, title: 'Merging', description: 'Combine branches together and resolve conflicts.', topics: ['Fast-forward merges', 'Three-way merges', 'Merge commits', 'Resolving conflicts'], commandIds: ['merge', 'mergetool'] },
  { id: 7, title: 'Rebasing', description: 'Create linear history by replaying commits onto a new base.', topics: ['What rebase does vs merge', 'Interactive rebase', 'When to rebase', 'The golden rule of rebasing'], commandIds: ['rebase', 'cherry-pick'] },
  { id: 8, title: 'Remote Repositories', description: 'Work with remote repositories — clone, fetch, pull, and push.', topics: ['What are remotes?', 'Cloning repositories', 'Fetching and pulling', 'Pushing changes', 'Remote-tracking branches'], commandIds: ['clone', 'remote', 'fetch', 'pull', 'push'] },
  { id: 9, title: 'GitHub Workflow', description: 'Collaborate using GitHub — pull requests, issues, and forks.', topics: ['Forking repositories', 'Pull request workflow', 'Code review', 'GitHub CLI'], commandIds: ['gh-pr-create', 'gh-pr-list', 'gh-pr-merge', 'gh-issue-create'] },
  { id: 10, title: 'Undo & Recovery', description: 'Learn to undo mistakes and recover lost work.', topics: ['Unstaging files', 'Discarding changes', 'Reverting commits', 'Resetting to previous states', 'Using reflog for recovery'], commandIds: ['restore', 'reset', 'revert', 'clean', 'reflog'] },
  { id: 11, title: 'Stashing & Tags', description: 'Temporarily save work and mark release points.', topics: ['Stashing changes', 'Managing stash stack', 'Creating tags', 'Annotated vs lightweight tags'], commandIds: ['stash', 'tag', 'describe'] },
  { id: 12, title: 'Debugging with Git', description: 'Use Git\'s built-in tools to find bugs and understand changes.', topics: ['Finding who changed a line', 'Binary search for bugs', 'Searching through code', 'Understanding file history'], commandIds: ['blame', 'bisect', 'grep', 'log'] },
  { id: 13, title: 'Git Internals', description: 'Understand how Git works under the hood — objects, trees, and refs.', topics: ['Blobs, trees, and commits', 'SHA-1 hashing', 'The index', 'Pack files', 'References and HEAD'], commandIds: ['hash-object', 'cat-file', 'ls-tree', 'ls-files', 'rev-parse'] },
];
