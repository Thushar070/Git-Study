// ============================================================
// GitAtlas — Advanced References & Inspection Commands
// git show-ref, git merge-base, git show-branch, git name-rev, git symbolic-ref
// ============================================================

import type { GitCommand } from '../../types';

export const referenceCommands: GitCommand[] = [
  {
    id: 'show-ref',
    name: 'show-ref',
    executable: 'git',
    category: 'plumbing',
    subcategory: 'Reference Operations',
    type: 'plumbing',
    difficulty: 'advanced',
    dangerLevel: 'safe',
    summary: 'List references in a local repository',
    description: 'git show-ref displays references available in a local repository along with the associated commit object IDs. It can filter references by pattern, list tags or heads, and verify if a specific reference exists in scripts.',
    whyItExists: 'Scripts and automated tools need a fast, parseable low-level tool to inspect refs stored in .git/refs or packed-refs without parsing human-formatted UI logs.',
    whenToUse: [
      'Listing all local and remote-tracking references with SHA-1 hashes',
      'Checking if a tag or branch reference exists inside shell scripts',
      'Debugging packed-refs vs unpacked refs',
    ],
    whenNotToUse: [
      'Human browsing of branches and tags — use git branch or git tag instead',
    ],
    syntax: [
      'git show-ref [<pattern>...]',
      'git show-ref --heads',
      'git show-ref --tags',
      'git show-ref --verify <ref-path>',
    ],
    options: [
      { flag: '--heads', description: 'Show only branch references under refs/heads.', example: 'git show-ref --heads', whenUseful: 'Filtering out tags and remote refs to list local branches' },
      { flag: '--tags', description: 'Show only tag references under refs/tags.', example: 'git show-ref --tags', whenUseful: 'Retrieving exact SHA-1 hashes for all tag objects' },
      { flag: '--verify', description: 'Strict reference verification. Returns exit code 0 if exact ref path exists.', example: 'git show-ref --verify refs/heads/main', whenUseful: 'Script validation that a branch ref exists before operating' },
      { flag: '-s', shortFlag: '--hash[=<n>]', description: 'Only show the SHA-1 hash without the reference name.', example: 'git show-ref --hash --heads main', whenUseful: 'Extracting clean commit hash strings for shell pipelines' },
    ],
    examples: [
      { title: 'List all heads and tags', command: 'git show-ref', output: 'a1b2c3d4... refs/heads/main\ne5f6g7h8... refs/tags/v1.0' },
      { title: 'Verify exact branch ref', command: 'git show-ref --verify refs/heads/main', output: 'a1b2c3d4... refs/heads/main (exit code 0)' },
    ],
    situations: [
      { description: 'Checking in a bash script if a branch exists before merging', command: 'git show-ref --verify --quiet refs/heads/feature/auth', explanation: 'Returns exit status 0 if branch exists, allowing silent conditional logic.' },
    ],
    mistakes: [
      'Passing short branch names to --verify — --verify requires full ref paths like refs/heads/main.',
    ],
    tips: [
      'git show-ref checks both individual ref files in .git/refs/ and packed-refs.',
    ],
    relatedCommands: ['rev-parse', 'update-ref', 'for-each-ref'],
    comparisonCommands: ['rev-parse'],
    officialReference: 'https://git-scm.com/docs/git-show-ref',
  },

  {
    id: 'merge-base',
    name: 'merge-base',
    executable: 'git',
    category: 'plumbing',
    subcategory: 'History Walking',
    type: 'plumbing',
    difficulty: 'advanced',
    dangerLevel: 'safe',
    summary: 'Find as good common ancestors as possible for a merge',
    description: 'git merge-base finds the best common ancestor commit(s) between two or more commits. This common ancestor is the base used by 3-way merge algorithms to combine changes.',
    whyItExists: 'Three-way merges and rebases depend on knowing the exact point where two branches diverged. git merge-base computes that common ancestor commit.',
    whenToUse: [
      'Finding the exact commit where a feature branch diverged from main',
      'Checking if one branch is ancestor of another using --is-ancestor',
      'Determining merge base in custom automation tools',
    ],
    whenNotToUse: [
      'Viewing human-readable diffs between branches — use git diff branchA...branchB instead',
    ],
    syntax: [
      'git merge-base <commit> <commit>',
      'git merge-base --is-ancestor <ancestor> <descendant>',
      'git merge-base --octopus <commit>...',
    ],
    options: [
      { flag: '--is-ancestor', description: 'Check if the first commit is an ancestor of the second commit. Exits 0 if true, 1 if false.', example: 'git merge-base --is-ancestor main feature', whenUseful: 'Testing if feature branch is up to date with main' },
      { flag: '--octopus', description: 'Find the best common ancestor among all specified commits.', example: 'git merge-base --octopus c1 c2 c3', whenUseful: 'Preparing multi-branch octopus merges' },
      { flag: '-a', shortFlag: '--all', description: 'Output all merge bases for the commits instead of just one.', example: 'git merge-base --all branchA branchB', whenUseful: 'Detecting criss-cross merge topologies' },
    ],
    examples: [
      { title: 'Find divergence point between main and feature', command: 'git merge-base main feature/login', output: '4b8a2c1d9e...' },
      { title: 'Check if main is ancestor of feature', command: 'git merge-base --is-ancestor main feature && echo "Up to date"', output: 'Up to date' },
    ],
    situations: [
      { description: 'Diffing only changes introduced on a branch since divergence', command: 'git diff $(git merge-base main feature/login)..feature/login', explanation: 'Compares feature branch strictly against its divergence point from main.' },
    ],
    mistakes: [
      'Confusing git merge-base with git diff — merge-base returns a single commit hash, not diff text.',
    ],
    tips: [
      'Syntax `git diff main...feature` implicitly calls git merge-base internally.',
    ],
    relatedCommands: ['diff', 'log', 'merge'],
    comparisonCommands: ['diff'],
    officialReference: 'https://git-scm.com/docs/git-merge-base',
  },

  {
    id: 'show-branch',
    name: 'show-branch',
    executable: 'git',
    category: 'History & Inspection',
    subcategory: 'Branch Inspection',
    type: 'porcelain',
    difficulty: 'intermediate',
    dangerLevel: 'safe',
    summary: 'Show branches and their commits',
    description: 'git show-branch displays a visual ASCII matrix of branches and their commits, indicating which commits belong to which branches and where branches diverge or overlap.',
    whyItExists: 'Provides a quick terminal visualization of commit distribution across multiple active branches without needing external graphical tools.',
    whenToUse: [
      'Inspecting commit overlap across several feature branches simultaneously',
      'Determining which branches contain a specific commit',
      'Visualizing local vs remote tracking branch state',
    ],
    whenNotToUse: [
      'Standard commit history viewing — use git log --graph --oneline instead',
    ],
    syntax: [
      'git show-branch [<branch>...]',
      'git show-branch --all',
      'git show-branch --topo-order',
    ],
    options: [
      { flag: '-a', shortFlag: '--all', description: 'Show all local and remote-tracking branches.', example: 'git show-branch --all', whenUseful: 'Inspecting full multi-branch repository state' },
      { flag: '-r', shortFlag: '--remotes', description: 'Show remote-tracking branches.', example: 'git show-branch -r', whenUseful: 'Comparing remote branches' },
      { flag: '--current', description: 'Include the current branch in the output list.', example: 'git show-branch --current feature/login', whenUseful: 'Comparing active branch against target feature' },
    ],
    examples: [
      { title: 'Compare main and feature branch commits', command: 'git show-branch main feature/login', output: '! [main] Latest main commit\n * [feature/login] Feature commit\n---\n + [feature/login] Add auth API\n*+ [main] Initial release' },
    ],
    situations: [
      { description: 'Checking which of 3 active branches contain a specific bugfix', command: 'git show-branch main feature/a feature/b', explanation: 'Matrix display shows "+" or "*" columns indicating commit presence on each branch.' },
    ],
    mistakes: [
      'Misinterpreting the ASCII matrix header columns — columns correspond to the bracketed branch headers.',
    ],
    tips: [
      'Combine git show-branch --more=10 to view deeper commit histories.',
    ],
    relatedCommands: ['log', 'branch'],
    comparisonCommands: ['log'],
    officialReference: 'https://git-scm.com/docs/git-show-branch',
  },

  {
    id: 'name-rev',
    name: 'name-rev',
    executable: 'git',
    category: 'plumbing',
    subcategory: 'History Walking',
    type: 'plumbing',
    difficulty: 'advanced',
    dangerLevel: 'safe',
    summary: 'Find symbolic names suitable for human reading for given revs',
    description: 'git name-rev finds human-readable symbolic names (like `main~2^2` or `tags/v1.0~5`) for raw SHA-1 commit hashes based on existing branches and tags.',
    whyItExists: 'Raw SHA-1 hashes (e.g. `c1f38e2...`) are hard for humans to locate. git name-rev converts hashes into relative names based on nearest branches/tags.',
    whenToUse: [
      'Translating raw commit hashes from stack traces into human branch-relative names',
      'Annotating git log output with branch-relative positions in scripts',
      'Formatting commit lists for documentation',
    ],
    whenNotToUse: [
      'Finding exact tag description for a commit — use git describe instead',
    ],
    syntax: [
      'git name-rev <commit-hash>',
      'git name-rev --stdin',
      'git name-rev --name-only <commit-hash>',
    ],
    options: [
      { flag: '--name-only', description: 'Output only the symbolic name without printing the original commit hash.', example: 'git name-rev --name-only 1a2b3c4', whenUseful: 'Extracting clean symbolic names for automated reports' },
      { flag: '--tags', description: 'Only use tags to name the commits.', example: 'git name-rev --tags 1a2b3c4', whenUseful: 'Locating commit distance relative to release tags' },
      { flag: '--stdin', description: 'Read commit hashes from stdin and replace hashes with symbolic names in output stream.', example: 'cat log.txt | git name-rev --stdin', whenUseful: 'Translating crash reports or logs containing raw hashes' },
    ],
    examples: [
      { title: 'Find symbolic name of a commit hash', command: 'git name-rev a1b2c3d4', output: 'a1b2c3d4 main~3' },
      { title: 'Translate hashes from stdin', command: 'echo "Bug at 1a2b3c4" | git name-rev --stdin', output: 'Bug at 1a2b3c4 (tags/v2.1~4)' },
    ],
    situations: [
      { description: 'Identifying where a crash log commit hash sits in project history', command: 'git name-rev --name-only e4f82a9', explanation: 'Outputs e.g. "main~12", showing the commit is 12 commits behind main tip.' },
    ],
    mistakes: [
      'Confusing git name-rev with git describe — describe prefers annotated tags, whereas name-rev uses branches and tags.',
    ],
    tips: [
      'Use git name-rev --stdin on raw log outputs to make commit traces instantly readable.',
    ],
    relatedCommands: ['describe', 'rev-parse'],
    comparisonCommands: ['describe'],
    officialReference: 'https://git-scm.com/docs/git-name-rev',
  },

  {
    id: 'symbolic-ref',
    name: 'symbolic-ref',
    executable: 'git',
    category: 'plumbing',
    subcategory: 'Reference Operations',
    type: 'plumbing',
    difficulty: 'expert',
    dangerLevel: 'caution',
    summary: 'Read, modify and delete symbolic refs',
    description: 'git symbolic-ref inspects or updates symbolic reference files (like HEAD) that point to another reference (like `refs/heads/main`) rather than a direct commit SHA-1.',
    whyItExists: 'Symbolic refs (such as `.git/HEAD`) point to branch refs. git symbolic-ref allows reading or changing which branch HEAD points to safely.',
    whenToUse: [
      'Reading which branch HEAD points to in shell scripts',
      'Changing HEAD symbolic pointer without touching working directory files',
      'Deleting or modifying custom symbolic refs in automated Git tools',
    ],
    whenNotToUse: [
      'Normal branch switching — use git switch or git checkout instead',
    ],
    syntax: [
      'git symbolic-ref <name>',
      'git symbolic-ref <name> <target>',
      'git symbolic-ref -d <name>',
      'git symbolic-ref --short <name>',
    ],
    options: [
      { flag: '--short', description: 'Strip `refs/heads/` prefix from reference output for human reading.', example: 'git symbolic-ref --short HEAD', whenUseful: 'Getting current branch name as "main" instead of "refs/heads/main"' },
      { flag: '-d', shortFlag: '--delete', description: 'Delete the specified symbolic reference.', example: 'git symbolic-ref -d HEAD', whenUseful: 'Removing custom symbolic refs' },
      { flag: '-m <reason>', description: 'Record a reflog entry for the symbolic ref update with the specified reason.', example: 'git symbolic-ref -m "Switch default" HEAD refs/heads/main', whenUseful: 'Audit trail logging when modifying symbolic refs' },
    ],
    examples: [
      { title: 'Get current branch name in short format', command: 'git symbolic-ref --short HEAD', output: 'main' },
      { title: 'Point HEAD symbolically to develop branch', command: 'git symbolic-ref HEAD refs/heads/develop', output: 'HEAD now points to refs/heads/develop.' },
    ],
    situations: [
      { description: 'Getting active branch name in a prompt script without git branch overhead', command: 'git symbolic-ref --short HEAD', explanation: 'Returns current branch name cleanly (e.g. "main") or fails if in detached HEAD.' },
    ],
    mistakes: [
      'Running git symbolic-ref HEAD when in detached HEAD state — it will fail because HEAD points to a commit SHA, not a symbolic ref.',
    ],
    tips: [
      'Use --short HEAD in shell scripts to build fast custom shell prompts (e.g. PS1).',
    ],
    relatedCommands: ['update-ref', 'rev-parse', 'show-ref'],
    comparisonCommands: ['update-ref'],
    officialReference: 'https://git-scm.com/docs/git-symbolic-ref',
  }
];
