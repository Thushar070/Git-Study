// ============================================================
// GitAtlas — Verification & Low-Level Maintenance Commands
// git verify-commit, git verify-tag, git unpack-objects, git unpack-trees, git var
// ============================================================

import type { GitCommand } from '../../types';

export const verificationCommands: GitCommand[] = [
  {
    id: 'verify-commit',
    name: 'verify-commit',
    executable: 'git',
    category: 'administration',
    subcategory: 'Security',
    type: 'porcelain',
    difficulty: 'advanced',
    dangerLevel: 'safe',
    summary: 'Check GPG signature of commits',
    description: 'git verify-commit validates the GPG / SSH digital signature of specified commit objects, displaying key information and exit codes indicating signature authenticity.',
    whyItExists: 'In secure production workflows and release repositories, commits are signed with GPG/SSH keys. git verify-commit allows automated verification of commit signature integrity.',
    whenToUse: [
      'Verifying digital GPG/SSH signatures on commits before release deployments',
      'Enforcing commit signing verification inside CI/CD security pipelines',
      'Checking key validity for commits in security-audited codebases',
    ],
    whenNotToUse: [
      'Unsigned commits — verify-commit will report no signature and return exit status 1',
    ],
    syntax: [
      'git verify-commit <commit>...',
      'git verify-commit --raw <commit>',
      'git verify-commit -v <commit>',
    ],
    options: [
      { flag: '--raw', description: 'Print raw GPG status output instead of human-formatted messages.', example: 'git verify-commit --raw HEAD', whenUseful: 'Parsing GPG verification status codes in scripts' },
      { flag: '-v', shortFlag: '--verbose', description: 'Print commit object contents in addition to GPG verification output.', example: 'git verify-commit -v HEAD', whenUseful: 'Inspecting signed commit header along with GPG status' },
    ],
    examples: [
      { title: 'Verify signature of current HEAD commit', command: 'git verify-commit HEAD', output: 'gpg: Signature made Sun Sep 6 ... using RSA key ID 4A3B2C1D\ngpg: Good signature from "Developer <dev@example.com>"' },
    ],
    situations: [
      { description: 'Verifying all release candidate commits in a security audit pipeline', command: 'git verify-commit v2.0.0..v2.1.0', explanation: 'Checks GPG signatures for all commits in the release range.' },
    ],
    mistakes: [
      'Running verify-commit without importing the signer\'s public GPG/SSH key into your GPG keyring first.',
    ],
    tips: [
      'Configure git log --show-signature to view commit signatures during normal log browsing.',
    ],
    relatedCommands: ['verify-tag', 'log', 'tag'],
    comparisonCommands: ['verify-tag'],
    officialReference: 'https://git-scm.com/docs/git-verify-commit',
  },

  {
    id: 'verify-tag',
    name: 'verify-tag',
    executable: 'git',
    category: 'administration',
    subcategory: 'Security',
    type: 'porcelain',
    difficulty: 'intermediate',
    dangerLevel: 'safe',
    summary: 'Check GPG signature of tags',
    description: 'git verify-tag checks GPG or SSH signatures on annotated tag objects, verifying that a release tag was created by an authorized key holder.',
    whyItExists: 'Release tags denote production distributions. git verify-tag verifies that a tag was cryptographically signed by an authorized maintainer.',
    whenToUse: [
      'Verifying release tags before building production artifacts',
      'Validating software release packages in deployment automation',
      'Checking tag authenticity in package manager downloads',
    ],
    whenNotToUse: [
      'Lightweight tags — lightweight tags are pointer refs without GPG signatures',
    ],
    syntax: [
      'git verify-tag <tag-name>...',
      'git verify-tag --raw <tag-name>',
      'git verify-tag -v <tag-name>',
    ],
    options: [
      { flag: '--raw', description: 'Print raw GPG status codes for automated parsing.', example: 'git verify-tag --raw v1.0.0', whenUseful: 'Evaluating signature status programmatically' },
      { flag: '-v', shortFlag: '--verbose', description: 'Print tag object contents in addition to GPG verification output.', example: 'git verify-tag -v v1.0.0', whenUseful: 'Reading tag annotation message and GPG key details simultaneously' },
    ],
    examples: [
      { title: 'Verify release tag v1.0.0 signature', command: 'git verify-tag v1.0.0', output: 'gpg: Good signature from "Maintainer <release@example.com>"' },
    ],
    situations: [
      { description: 'Automating release artifact verification in deployment scripts', command: 'git verify-tag --quiet v3.2.0 && ./deploy.sh', explanation: 'Ensures release deployment proceeds only if the tag GPG signature is valid.' },
    ],
    mistakes: [
      'Attempting to verify lightweight tags created without `-s` or `-a` flags.',
    ],
    tips: [
      'Create signed tags using `git tag -s v1.0.0 -m "Release v1.0.0"`.',
    ],
    relatedCommands: ['tag', 'verify-commit', 'show'],
    comparisonCommands: ['verify-commit'],
    officialReference: 'https://git-scm.com/docs/git-verify-tag',
  },

  {
    id: 'unpack-objects',
    name: 'unpack-objects',
    executable: 'git',
    category: 'plumbing',
    subcategory: 'Pack Operations',
    type: 'plumbing',
    difficulty: 'expert',
    dangerLevel: 'safe',
    summary: 'Unpack objects from a packed archive',
    description: 'git unpack-objects reads a packed `.pack` archive from standard input and expands contained objects into individual loose object files under `.git/objects/`.',
    whyItExists: 'When pushing or fetching over network transports, objects are transmitted as single compressed packfiles. git unpack-objects extracts those packs into loose object files when storing smaller commits.',
    whenToUse: [
      'Decompressing packfile archives received over raw network streams',
      'Converting packed repositories into loose object structures for low-level recovery',
      'Writing custom Git transport protocols',
    ],
    whenNotToUse: [
      'Normal everyday workflow — Git invokes unpack-objects automatically during fetch/push operations',
    ],
    syntax: [
      'git unpack-objects [-n] [-q] [-r] < .git/objects/pack/pack-file.pack',
    ],
    options: [
      { flag: '-n', description: 'Dry run: check packfile objects without unpacking them to disk.', example: 'git unpack-objects -n < packfile.pack', whenUseful: 'Testing packfile integrity without polluting loose objects' },
      { flag: '-r', description: 'Try recovering damaged packfile objects.', example: 'git unpack-objects -r < damaged.pack', whenUseful: 'Recovering uncorrupted objects from broken packfiles' },
      { flag: '-q', description: 'Quiet mode: suppress progress output.', example: 'git unpack-objects -q < packfile.pack', whenUseful: 'Running silently in automated scripts' },
    ],
    examples: [
      { title: 'Unpack a packfile into loose objects', command: 'git unpack-objects < .git/objects/pack/pack-1a2b3c.pack', output: 'Unpacks objects into .git/objects/xx/ directories.' },
    ],
    situations: [
      { description: 'Recovering loose commit blobs from a corrupt repository packfile', command: 'git unpack-objects -r < .git/objects/pack/pack-backup.pack', explanation: 'Extracts valid objects from packfile into loose object store.' },
    ],
    mistakes: [
      'Unpacking massive multi-gigabyte packfiles — generates millions of loose files and degrades disk I/O performance.',
    ],
    tips: [
      'Git automatically runs `git gc` to pack loose objects when loose object counts grow large.',
    ],
    relatedCommands: ['pack-objects', 'index-pack', 'verify-pack'],
    comparisonCommands: ['pack-objects'],
    officialReference: 'https://git-scm.com/docs/git-unpack-objects',
  },

  {
    id: 'unpack-trees',
    name: 'unpack-trees',
    executable: 'git',
    category: 'plumbing',
    subcategory: 'Index Operations',
    type: 'plumbing',
    difficulty: 'expert',
    dangerLevel: 'caution',
    summary: 'Read tree information into the index',
    description: 'git unpack-trees reads tree objects specified into the staging index, performing internal 2-way or 3-way tree merges to update index and working tree state.',
    whyItExists: 'Higher-level commands like `git checkout`, `git switch`, `git merge`, and `git reset` rely on unpack-trees under the hood to perform structural tree merges.',
    whenToUse: [
      'Building custom Git merge or checkout plumbing algorithms',
      'Merging multiple tree objects directly into index in automated tools',
    ],
    whenNotToUse: [
      'General developer operations — use git checkout, git switch, or git merge instead',
    ],
    syntax: [
      'git unpack-trees [-m] [--reset] [-i] <tree-ish1> [<tree-ish2> [<tree-ish3>]]',
    ],
    options: [
      { flag: '-m', description: 'Perform a merge between tree objects and the index.', example: 'git unpack-trees -m tree1 tree2', whenUseful: 'Merging tree structures into index' },
      { flag: '--reset', description: 'Discard uncommitted changes in index and working tree during tree unpacking.', example: 'git unpack-trees --reset -u tree1', whenUseful: 'Forcing working tree to match target tree' },
      { flag: '-u', description: 'Update working tree files to match unpacked index files.', example: 'git unpack-trees -m -u HEAD', whenUseful: 'Syncing working directory files' },
    ],
    examples: [
      { title: 'Unpack tree into index and update working tree', command: 'git unpack-trees -m -u HEAD', output: 'Updates index and working directory to match HEAD tree.' },
    ],
    situations: [
      { description: 'Executing low-level tree comparison in custom Git extensions', command: 'git unpack-trees -m -u treeA treeB', explanation: 'Performs two-way tree unpack merge into staging index.' },
    ],
    mistakes: [
      'Running unpack-trees without `-u` flag — updates index without syncing working tree files.',
    ],
    tips: [
      'git checkout uses unpack-trees with `-m -u` to switch branch HEADs while keeping clean local edits.',
    ],
    relatedCommands: ['read-tree', 'write-tree', 'checkout-index'],
    comparisonCommands: ['read-tree'],
    officialReference: 'https://git-scm.com/docs/git-unpack-trees',
  },

  {
    id: 'var',
    name: 'var',
    executable: 'git',
    category: 'administration',
    subcategory: 'Information',
    type: 'plumbing',
    difficulty: 'intermediate',
    dangerLevel: 'safe',
    summary: 'Show a Git logical variable',
    description: 'git var displays logical internal Git variables, such as author/committer identities, default editor, pager, or syntax settings.',
    whyItExists: 'Scripts and external tools need to discover Git\'s computed identity settings (including fallback environment variables and system configurations) without parsing config files manually.',
    whenToUse: [
      'Checking effective committer/author identity in shell scripts',
      'Discovering Git\'s default editor (`GIT_EDITOR`) or pager (`GIT_PAGER`)',
      'Listing all internal logical variables using `git var -l`',
    ],
    whenNotToUse: [
      'Viewing standard user configuration keys — use git config --list instead',
    ],
    syntax: [
      'git var <variable>',
      'git var -l',
    ],
    options: [
      { flag: '-l', description: 'List all logical variables and their current values.', example: 'git var -l', whenUseful: 'Inspecting all effective environment and logical settings' },
    ],
    examples: [
      { title: 'Show current author identity', command: 'git var GIT_AUTHOR_IDENT', output: 'Developer <dev@example.com> 1725650000 +0000' },
      { title: 'Show configured editor', command: 'git var GIT_EDITOR', output: 'code --wait' },
    ],
    situations: [
      { description: 'Verifying in a release script what author name/email will be recorded in commits', command: 'git var GIT_COMMITTER_IDENT', explanation: 'Outputs exact name, email, timestamp, and timezone used for commit signatures.' },
    ],
    mistakes: [
      'Confusing `git var` with `git config` — `git var` evaluates fallback environment variables (e.g. `EMAIL`, `LOGNAME`) whereas `git config` only reads config files.',
    ],
    tips: [
      'Logical variables include `GIT_AUTHOR_IDENT`, `GIT_COMMITTER_IDENT`, `GIT_EDITOR`, `GIT_PAGER`, and `GIT_DEFAULT_BRANCH`.',
    ],
    relatedCommands: ['config', 'version'],
    comparisonCommands: ['config'],
    officialReference: 'https://git-scm.com/docs/git-var',
  }
];
