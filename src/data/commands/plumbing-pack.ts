// ============================================================
// GitAtlas — Plumbing Pack Commands
// git commit-tree, git mktree, git pack-objects, git verify-pack, git index-pack
// ============================================================
import type { GitCommand } from '../../types';

export const plumbingPackCommands: GitCommand[] = [
  {
    id: 'commit-tree', name: 'commit-tree', executable: 'git', category: 'plumbing', subcategory: 'Object Creation', type: 'plumbing', difficulty: 'expert', dangerLevel: 'safe',
    summary: 'Create a new commit object from a tree object',
    description: 'git commit-tree creates a commit object with a given tree, parent commit(s), and message. It\'s the final step in the low-level commit process: hash-object → update-index → write-tree → commit-tree.',
    whyItExists: 'This is the raw mechanism for creating commits. While git commit handles the full workflow, commit-tree provides fine-grained control over commit creation.',
    whenToUse: ['Low-level scripting','Creating commits with specific properties','Understanding Git internals'],
    whenNotToUse: ['For normal commits — use git commit'],
    syntax: ['git commit-tree <tree> -p <parent> -m <message>','echo "msg" | git commit-tree <tree> -p <parent>'],
    options: [
      { flag: '-p <parent>', description: 'Specify a parent commit (can be used multiple times for merges).', example: 'git commit-tree abc123 -p def456 -m "Merge commit"' },
      { flag: '-m <message>', description: 'Commit message.', example: 'git commit-tree abc123 -m "Initial commit"' },
    ],
    examples: [
      { title: 'Create a commit from a tree', command: 'echo "First commit" | git commit-tree $(git write-tree)' },
      { title: 'Create with parent', command: 'echo "Second commit" | git commit-tree $(git write-tree) -p HEAD' },
    ],
    situations: [],
    mistakes: ['Forgetting to specify a parent — creates an orphan commit.'],
    relatedCommands: ['write-tree', 'hash-object', 'update-ref'],
    tips: ['The full low-level commit workflow: update-index → write-tree → commit-tree → update-ref.'],
    officialReference: 'https://git-scm.com/docs/git-commit-tree',
  },
  {
    id: 'mktree', name: 'mktree', executable: 'git', category: 'plumbing', subcategory: 'Object Creation', type: 'plumbing', difficulty: 'expert', dangerLevel: 'safe',
    summary: 'Build a tree object from ls-tree formatted text',
    description: 'git mktree reads ls-tree formatted input from stdin and creates a tree object. This allows you to construct directory structures programmatically.',
    whyItExists: 'For scripting scenarios where you need to build tree objects from scratch or modify existing trees.',
    whenToUse: ['Building tree objects programmatically','Manipulating directory structures at the object level'],
    whenNotToUse: ['For normal file operations — use git add and git commit'],
    syntax: ['git mktree','git mktree --missing'],
    options: [
      { flag: '--missing', description: 'Allow entries referencing objects not yet in the database.', example: 'git mktree --missing' },
    ],
    examples: [
      { title: 'Create a tree from input', command: 'printf "100644 blob <hash>\\tfile.txt\\n" | git mktree' },
    ],
    situations: [],
    mistakes: [],
    relatedCommands: ['ls-tree', 'write-tree', 'read-tree'],
    tips: ['Input format matches git ls-tree output: <mode> <type> <hash>\\t<name>'],
    officialReference: 'https://git-scm.com/docs/git-mktree',
  },
  {
    id: 'pack-objects', name: 'pack-objects', executable: 'git', category: 'plumbing', subcategory: 'Pack Operations', type: 'plumbing', difficulty: 'expert', dangerLevel: 'safe',
    summary: 'Create a packed archive of Git objects',
    description: 'git pack-objects reads object names from stdin and creates a packfile (.pack) and index (.idx). Packfiles are Git\'s efficient storage format that uses delta compression to minimize disk usage.',
    whyItExists: 'Loose objects are inefficient for storage and transfer. pack-objects compresses objects into packfiles, which are used for network transfers (fetch/push) and local storage optimization.',
    whenToUse: ['Understanding Git\'s pack format','Custom transfer protocols','Low-level backup operations'],
    whenNotToUse: ['For normal repository optimization — use git gc or git repack'],
    syntax: ['git pack-objects <base-name>','git pack-objects --stdout'],
    options: [
      { flag: '--stdout', description: 'Write the packfile to stdout.', example: 'git rev-list --objects --all | git pack-objects --stdout > pack.pack' },
      { flag: '--window=<n>', description: 'Set the delta search window size.', example: 'git pack-objects --window=250 pack' },
      { flag: '--depth=<n>', description: 'Set the maximum delta depth.', example: 'git pack-objects --depth=50 pack' },
    ],
    examples: [
      { title: 'Pack all objects', command: 'git rev-list --objects --all | git pack-objects pack' },
    ],
    situations: [],
    mistakes: [],
    relatedCommands: ['verify-pack', 'index-pack', 'gc', 'unpack-objects'],
    tips: ['git gc uses pack-objects internally.','Packfiles use delta compression — similar objects are stored as deltas.'],
    officialReference: 'https://git-scm.com/docs/git-pack-objects',
  },
  {
    id: 'verify-pack', name: 'verify-pack', executable: 'git', category: 'plumbing', subcategory: 'Pack Operations', type: 'plumbing', difficulty: 'expert', dangerLevel: 'safe',
    summary: 'Validate a packed Git archive file',
    description: 'git verify-pack verifies the integrity of packfile index files (.idx) and can list the objects contained in a pack with details about sizes and delta chains.',
    whyItExists: 'To ensure packfiles aren\'t corrupted and to inspect their contents for debugging or analysis.',
    whenToUse: ['Verifying pack integrity','Finding large objects in the repository','Analyzing repository storage'],
    whenNotToUse: ['For general integrity checks — use git fsck'],
    syntax: ['git verify-pack -v <pack-index>','git verify-pack --stat-only <pack-index>'],
    options: [
      { flag: '-v', shortFlag: '--verbose', description: 'Show detailed object information.', example: 'git verify-pack -v .git/objects/pack/pack-*.idx' },
      { flag: '--stat-only', description: 'Show only statistics.', example: 'git verify-pack --stat-only .git/objects/pack/*.idx' },
    ],
    examples: [
      { title: 'Verify and list objects', command: 'git verify-pack -v .git/objects/pack/pack-*.idx | head -20' },
      { title: 'Find largest objects', command: 'git verify-pack -v .git/objects/pack/*.idx | sort -k 3 -n | tail -10' },
    ],
    situations: [{ description: 'Finding large blobs bloating the repo', command: 'git verify-pack -v .git/objects/pack/*.idx | sort -k 3 -n | tail -20', explanation: 'Sorts pack objects by size to find the largest files in history.' }],
    mistakes: [],
    relatedCommands: ['pack-objects', 'index-pack', 'fsck', 'gc'],
    tips: ['Combine with sort to find the largest objects consuming repo space.'],
    officialReference: 'https://git-scm.com/docs/git-verify-pack',
  },
  {
    id: 'index-pack', name: 'index-pack', executable: 'git', category: 'plumbing', subcategory: 'Pack Operations', type: 'plumbing', difficulty: 'expert', dangerLevel: 'safe',
    summary: 'Build pack index file for an existing packed archive',
    description: 'git index-pack creates the index (.idx) file for a packfile (.pack). The index enables efficient random access to objects within the pack. This is automatically run during fetch/clone.',
    whyItExists: 'Packfiles alone are sequential — the index file enables O(log n) lookups. index-pack creates this index for incoming packfiles during network transfers.',
    whenToUse: ['Rebuilding a missing pack index','Processing manually transferred packfiles','Understanding Git\'s pack format'],
    whenNotToUse: ['Normally — Git handles this automatically during fetch/clone/gc'],
    syntax: ['git index-pack <packfile>','git index-pack --fix-thin <packfile>','git index-pack --verify <packfile>'],
    options: [
      { flag: '--fix-thin', description: 'Fix a "thin" pack by adding missing base objects.', example: 'git index-pack --fix-thin pack.pack' },
      { flag: '--verify', description: 'Verify the pack and its index.', example: 'git index-pack --verify pack.pack' },
      { flag: '-o <index-file>', description: 'Write the index to a specific file.', example: 'git index-pack -o custom.idx pack.pack' },
    ],
    examples: [
      { title: 'Create index for a pack', command: 'git index-pack pack.pack' },
      { title: 'Fix and index a thin pack', command: 'git index-pack --fix-thin pack.pack' },
    ],
    situations: [],
    mistakes: [],
    relatedCommands: ['pack-objects', 'verify-pack', 'unpack-objects'],
    tips: ['Automatically run during git fetch and git clone.','Thin packs are used in network transfers and need --fix-thin for local use.'],
    officialReference: 'https://git-scm.com/docs/git-index-pack',
  },
];
