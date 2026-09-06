// ============================================================
// GitAtlas — Command Comparisons
// ============================================================
import type { ComparisonEntry } from '../types';

export const comparisonsData: ComparisonEntry[] = [
  {
    id: 'reset-vs-revert', title: 'git reset vs git revert', commands: ['reset', 'revert'],
    criteria: [
      { label: 'Purpose', values: { reset: 'Move branch pointer to a different commit', revert: 'Create a new commit that undoes a previous one' } },
      { label: 'History impact', values: { reset: 'Rewrites history — removes commits', revert: 'Preserves history — adds a new commit' } },
      { label: 'Safe for shared branches?', values: { reset: '❌ No — breaks collaborators\' history', revert: '✅ Yes — never rewrites history' } },
      { label: 'Changes working tree?', values: { reset: 'Depends on mode (--soft no, --hard yes)', revert: 'Yes — applies inverse changes' } },
      { label: 'Changes index?', values: { reset: 'Depends on mode (--soft no, --mixed yes)', revert: 'Yes — stages the inverse' } },
      { label: 'Typical use', values: { reset: 'Undoing local unpushed commits', revert: 'Undoing pushed/shared commits safely' } },
      { label: 'Danger level', values: { reset: '🔴 Destructive (--hard)', revert: '🟢 Safe' } },
      { label: 'Example', values: { reset: 'git reset --soft HEAD~1', revert: 'git revert HEAD' } },
    ],
  },
  {
    id: 'merge-vs-rebase', title: 'git merge vs git rebase', commands: ['merge', 'rebase'],
    criteria: [
      { label: 'Purpose', values: { merge: 'Combine two branches with a merge commit', rebase: 'Replay commits on top of another base' } },
      { label: 'History', values: { merge: 'Non-linear — preserves branch topology', rebase: 'Linear — creates clean straight-line history' } },
      { label: 'Merge commit?', values: { merge: 'Yes (unless fast-forward)', rebase: 'No' } },
      { label: 'Rewrites commits?', values: { merge: 'No', rebase: 'Yes — new hashes for replayed commits' } },
      { label: 'Safe for shared branches?', values: { merge: '✅ Yes', rebase: '❌ No — rewrites commit hashes' } },
      { label: 'Conflict resolution', values: { merge: 'Resolve once', rebase: 'May need to resolve for each replayed commit' } },
      { label: 'Best for', values: { merge: 'Integrating completed feature branches', rebase: 'Keeping feature branch updated with main' } },
      { label: 'Example', values: { merge: 'git merge feature-auth', rebase: 'git rebase main' } },
    ],
  },
  {
    id: 'fetch-vs-pull', title: 'git fetch vs git pull', commands: ['fetch', 'pull'],
    criteria: [
      { label: 'Purpose', values: { fetch: 'Download remote changes without integrating', pull: 'Download and immediately integrate' } },
      { label: 'Modifies working tree?', values: { fetch: '❌ No', pull: '✅ Yes' } },
      { label: 'Modifies local branch?', values: { fetch: '❌ No', pull: '✅ Yes (merge or rebase)' } },
      { label: 'Risk of conflicts?', values: { fetch: 'None', pull: 'Yes — during merge/rebase step' } },
      { label: 'Equivalent to', values: { fetch: 'Just downloading', pull: 'git fetch + git merge (or rebase)' } },
      { label: 'Best for', values: { fetch: 'Inspecting remote changes before merging', pull: 'Quick sync when you trust the changes' } },
    ],
  },
  {
    id: 'switch-vs-checkout', title: 'git switch vs git checkout', commands: ['switch', 'checkout'],
    criteria: [
      { label: 'Purpose', values: { switch: 'Switch branches (only)', checkout: 'Switch branches AND restore files' } },
      { label: 'Introduced', values: { switch: 'Git 2.23 (2019)', checkout: 'Original Git command' } },
      { label: 'Clarity', values: { switch: '✅ Single purpose — unambiguous', checkout: '⚠️ Overloaded — branches + files' } },
      { label: 'File restoration', values: { switch: 'Not supported — use git restore', checkout: 'Yes with -- <file>' } },
      { label: 'Create + switch', values: { switch: 'git switch -c <branch>', checkout: 'git checkout -b <branch>' } },
      { label: 'Recommendation', values: { switch: 'Preferred on Git 2.23+', checkout: 'Still works — required on older Git' } },
    ],
  },
  {
    id: 'restore-vs-checkout-file', title: 'git restore vs git checkout -- <file>', commands: ['restore', 'checkout'],
    criteria: [
      { label: 'Purpose', values: { restore: 'Restore file contents (only)', checkout: 'Restore files AND switch branches' } },
      { label: 'Unstage a file', values: { restore: 'git restore --staged <file>', checkout: 'Not directly — use git reset HEAD <file>' } },
      { label: 'Clarity', values: { restore: '✅ Explicit and safe', checkout: '⚠️ Ambiguous without --' } },
      { label: 'Recommendation', values: { restore: 'Preferred on Git 2.23+', checkout: 'Legacy — still works' } },
    ],
  },
  {
    id: 'reset-soft-mixed-hard', title: 'git reset --soft vs --mixed vs --hard', commands: ['reset'],
    criteria: [
      { label: 'HEAD', values: { 'reset --soft': '✅ Moves to target', 'reset --mixed': '✅ Moves to target', 'reset --hard': '✅ Moves to target' } },
      { label: 'Index (staging)', values: { 'reset --soft': '❌ Unchanged', 'reset --mixed': '✅ Reset to match target', 'reset --hard': '✅ Reset to match target' } },
      { label: 'Working directory', values: { 'reset --soft': '❌ Unchanged', 'reset --mixed': '❌ Unchanged', 'reset --hard': '✅ Reset to match target' } },
      { label: 'Data loss?', values: { 'reset --soft': 'None', 'reset --mixed': 'None (changes become unstaged)', 'reset --hard': '⚠️ YES — uncommitted changes lost' } },
      { label: 'Use case', values: { 'reset --soft': 'Re-commit with different message', 'reset --mixed': 'Unstage and revise changes', 'reset --hard': 'Completely discard everything' } },
    ],
  },
  {
    id: 'submodule-vs-subtree', title: 'git submodule vs git subtree', commands: ['submodule', 'subtree'],
    criteria: [
      { label: 'Storage', values: { submodule: 'Separate repository — linked by reference', subtree: 'Merged into your repository' } },
      { label: 'Complexity', values: { submodule: 'Higher — requires init/update commands', subtree: 'Lower — uses standard Git commands' } },
      { label: 'Contributors need knowledge?', values: { submodule: 'Yes — must know submodule commands', subtree: 'No — standard clone works' } },
      { label: 'Upstream contributions', values: { submodule: 'Easy — submodule is a real repo', subtree: 'Possible but more complex' } },
      { label: 'Best for', values: { submodule: 'Active upstream dependencies', subtree: 'Vendor/included code' } },
    ],
  },
];
