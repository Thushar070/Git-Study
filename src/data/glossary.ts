// ============================================================
// GitAtlas — Glossary Data
// ============================================================
import type { GlossaryEntry } from '../types';

export const glossaryData: GlossaryEntry[] = [
  { term: 'Repository', definition: 'A directory that contains your project files and the entire revision history in a .git subdirectory.', relatedCommands: ['init', 'clone'] },
  { term: 'Commit', definition: 'A snapshot of the repository at a point in time. Each commit has a unique SHA-1 hash, author, timestamp, message, and pointer(s) to parent commit(s).', relatedCommands: ['commit', 'log', 'show'] },
  { term: 'Branch', definition: 'A lightweight, movable pointer to a commit. Creating a branch is nearly instantaneous and costs almost no storage.', relatedCommands: ['branch', 'switch', 'checkout'] },
  { term: 'HEAD', definition: 'A special reference that points to the current branch (which points to the latest commit on that branch). In detached HEAD state, it points directly to a commit.', relatedCommands: ['checkout', 'switch', 'reflog'] },
  { term: 'Index / Staging Area', definition: 'An intermediate area between the working directory and the repository where changes are prepared for the next commit.', relatedCommands: ['add', 'status', 'restore'] },
  { term: 'Working Tree / Working Directory', definition: 'The files and directories on your filesystem that you edit directly. Separate from the Git database.', relatedCommands: ['status', 'diff', 'restore'] },
  { term: 'Remote', definition: 'A named reference to another repository, typically hosted on a server like GitHub. "origin" is the conventional name for the primary remote.', relatedCommands: ['remote', 'fetch', 'push', 'pull'] },
  { term: 'Origin', definition: 'The default name for the remote repository you cloned from. It\'s just a convention — you can rename it.', relatedCommands: ['remote', 'clone'] },
  { term: 'Upstream', definition: 'The remote branch that a local branch is tracking. Also sometimes refers to the original repository that a fork was created from.', relatedCommands: ['push', 'pull', 'branch'] },
  { term: 'Fast-forward', definition: 'A type of merge where the branch pointer simply moves forward because there are no divergent commits. No merge commit is created.', relatedCommands: ['merge', 'pull'] },
  { term: 'Merge Commit', definition: 'A commit with two or more parents, created when branches with divergent histories are merged.', relatedCommands: ['merge'] },
  { term: 'Rebase', definition: 'The process of moving a sequence of commits to a new base commit, creating a linear history.', relatedCommands: ['rebase'] },
  { term: 'Cherry-pick', definition: 'Copying a specific commit from one branch and applying it to another branch as a new commit.', relatedCommands: ['cherry-pick'] },
  { term: 'Stash', definition: 'A temporary storage area for uncommitted changes, allowing you to switch context without committing incomplete work.', relatedCommands: ['stash'] },
  { term: 'Tag', definition: 'A named reference to a specific commit, typically used for release versions. Annotated tags store extra metadata.', relatedCommands: ['tag'] },
  { term: 'Blob', definition: 'A Git object that stores the content of a file. Blobs are identified by their SHA-1 hash.', relatedCommands: ['hash-object', 'cat-file'] },
  { term: 'Tree', definition: 'A Git object representing a directory — it maps names to blobs (files) and other trees (subdirectories).', relatedCommands: ['ls-tree', 'write-tree'] },
  { term: 'SHA-1 / Hash', definition: 'The 40-character hexadecimal string that uniquely identifies every Git object. Computed from the object\'s content.', relatedCommands: ['hash-object', 'rev-parse'] },
  { term: 'Detached HEAD', definition: 'A state where HEAD points directly to a commit instead of a branch. Commits made in this state don\'t belong to any branch.', relatedCommands: ['checkout', 'switch'] },
  { term: 'Reflog', definition: 'A local record of all changes to Git references (HEAD, branches). Serves as a safety net for recovering from mistakes.', relatedCommands: ['reflog'] },
  { term: 'Porcelain', definition: 'User-friendly Git commands designed for everyday use (git add, git commit, git push).', relatedTerms: ['Plumbing'] },
  { term: 'Plumbing', definition: 'Low-level Git commands that operate on Git\'s internal data structures (git hash-object, git cat-file, git update-index).', relatedTerms: ['Porcelain'] },
  { term: 'Fork', definition: 'A copy of a repository on a hosting service (like GitHub) under your own account, enabling independent development and pull requests.', relatedCommands: ['clone', 'remote'] },
  { term: 'Pull Request (PR)', definition: 'A request to merge changes from one branch (or fork) into another. A GitHub/GitLab collaboration mechanism, not a Git command.', relatedCommands: ['gh-pr-create'] },
  { term: 'Conflict', definition: 'Occurs when two branches modify the same lines of a file and Git can\'t automatically merge them. Requires manual resolution.', relatedCommands: ['merge', 'rebase', 'mergetool'] },
];
