// ============================================================
// GitAtlas — Index & Working Tree Utility Commands
// git check-ignore, git check-attr, git check-ref-format, git checkout-index, git update-server-info
// ============================================================

import type { GitCommand } from '../../types';

export const indexToolsCommands: GitCommand[] = [
  {
    id: 'check-ignore',
    name: 'check-ignore',
    executable: 'git',
    category: 'plumbing',
    subcategory: 'File Inspection',
    type: 'plumbing',
    difficulty: 'intermediate',
    dangerLevel: 'safe',
    summary: 'Debug gitignore and exclude files',
    description: 'git check-ignore tests specified pathnames against `.gitignore` files, `.git/info/exclude`, and global ignore patterns, outputting matching ignore rules and exact pattern line numbers.',
    whyItExists: 'When a file is unexpectedly ignored or tracked by Git, developers need to diagnose which `.gitignore` rule or line in a multi-directory hierarchy is causing the ignore behavior.',
    whenToUse: [
      'Debugging why Git is ignoring a specific file or directory',
      'Checking which `.gitignore` file contains the matching rule for a path',
      'Validating ignore patterns inside automation scripts',
    ],
    whenNotToUse: [
      'Ignoring files in Git history — files already tracked must be untracked with git rm --cached first',
    ],
    syntax: [
      'git check-ignore [<options>] <pathname>...',
      'git check-ignore -v <pathname>',
      'git check-ignore --non-matching <pathname>',
    ],
    options: [
      { flag: '-v', shortFlag: '--verbose', description: 'Verbose mode: prints the location, line number, and pattern that matched the pathname.', example: 'git check-ignore -v src/temp.log', whenUseful: 'Pinpointing the exact line in .gitignore causing a file to be ignored' },
      { flag: '-n', shortFlag: '--non-matching', description: 'Show pathnames that do not match any ignore pattern.', example: 'git check-ignore -n src/app.ts', whenUseful: 'Testing path lists to isolate non-ignored files' },
      { flag: '--no-index', description: 'Don\'t check the index when determining if a path is ignored.', example: 'git check-ignore --no-index path/to/file', whenUseful: 'Testing ignore patterns against files that are already tracked in index' },
    ],
    examples: [
      { title: 'Check which rule ignores a log file', command: 'git check-ignore -v build/output.log', output: '.gitignore:12:*.log\tbuild/output.log' },
      { title: 'Test multiple file paths', command: 'git check-ignore path1.txt path2.tmp', output: 'path2.tmp' },
    ],
    situations: [
      { description: 'Finding why a newly added file isn\'t showing in git status', command: 'git check-ignore -v config/local.json', explanation: 'Outputs file path and line number of the matching .gitignore pattern.' },
    ],
    mistakes: [
      'Expecting git check-ignore to ignore files on disk — it is a diagnostic tool, not an edit command.',
    ],
    tips: [
      'Use git check-ignore -v in large monorepos with multiple nested .gitignore files.',
    ],
    relatedCommands: ['status', 'rm'],
    comparisonCommands: ['status'],
    officialReference: 'https://git-scm.com/docs/git-check-ignore',
  },

  {
    id: 'check-attr',
    name: 'check-attr',
    executable: 'git',
    category: 'plumbing',
    subcategory: 'File Inspection',
    type: 'plumbing',
    difficulty: 'advanced',
    dangerLevel: 'safe',
    summary: 'Display gitattributes information',
    description: 'git check-attr queries `.gitattributes` files for specific attributes (such as `text`, `eol`, `diff`, `merge`, or `filter`) applied to specified pathnames.',
    whyItExists: 'Git attributes configure line-ending conversions, custom diff/merge drivers, and LFS filters. git check-attr allows inspection of active attributes for any file path.',
    whenToUse: [
      'Verifying line-ending normalization rules (CRLF vs LF) for files',
      'Checking if Git LFS or custom diff filters apply to a file path',
      'Debugging `.gitattributes` rule precedence',
    ],
    whenNotToUse: [
      'Viewing standard commit diffs — use git diff instead',
    ],
    syntax: [
      'git check-attr <attr>... [--] <pathname>...',
      'git check-attr -a [--] <pathname>...',
    ],
    options: [
      { flag: '-a', shortFlag: '--all', description: 'List all attributes associated with the specified paths.', example: 'git check-attr -a -- src/index.ts', whenUseful: 'Displaying full attribute state for a file' },
      { flag: '--cached', description: 'Read attributes from the index instead of the working tree.', example: 'git check-attr --cached -a -- image.png', whenUseful: 'Inspecting staged .gitattributes rules' },
    ],
    examples: [
      { title: 'Check eol attribute for all files', command: 'git check-attr eol -- src/app.ts', output: 'src/app.ts: eol: lf' },
      { title: 'Check all attributes for a file', command: 'git check-attr -a -- asset.png', output: 'asset.png: filter: lfs\nasset.png: diff: lfs' },
    ],
    situations: [
      { description: 'Diagnosing cross-platform line ending issues in Windows/Linux teams', command: 'git check-attr text eol -- file.txt', explanation: 'Displays normalized text and end-of-line attribute settings applied to file.txt.' },
    ],
    mistakes: [
      'Forgetting `--` separator between attribute names and file paths when path names resemble flags.',
    ],
    tips: [
      'Ensure `.gitattributes` is committed so team members receive identical attribute rules.',
    ],
    relatedCommands: ['config', 'checkout-index'],
    comparisonCommands: ['config'],
    officialReference: 'https://git-scm.com/docs/git-check-attr',
  },

  {
    id: 'check-ref-format',
    name: 'check-ref-format',
    executable: 'git',
    category: 'plumbing',
    subcategory: 'Reference Operations',
    type: 'plumbing',
    difficulty: 'intermediate',
    dangerLevel: 'safe',
    summary: 'Ensures that a reference name is well formed',
    description: 'git check-ref-format checks if a proposed branch, tag, or reference name conforms to Git ref naming rules (e.g. no control characters, `~`, `^`, `:`, double dots `..`, spaces, or trailing slashes).',
    whyItExists: 'Git branch and tag names must adhere to strict reference naming rules to prevent parsing ambiguities in rev-parse expressions. Shell scripts use check-ref-format to sanitize user inputs.',
    whenToUse: [
      'Validating user-entered branch or tag names in developer tools and CLI scripts',
      'Preventing invalid reference creation before calling git branch',
      'Sanitizing branch names in CI/CD automation',
    ],
    whenNotToUse: [
      'Checking if a ref exists — check-ref-format checks name format validity, not existence. Use git show-ref --verify for existence.',
    ],
    syntax: [
      'git check-ref-format <refname>',
      'git check-ref-format --branch <branchname>',
      'git check-ref-format --allow-onelevel <refname>',
    ],
    options: [
      { flag: '--branch <name>', description: 'Validate and expand branch name, converting "@{-1}" to previous branch name if applicable.', example: 'git check-ref-format --branch feature/login', whenUseful: 'Sanitizing branch input parameters' },
      { flag: '--allow-onelevel', description: 'Allow single-level ref names like "HEAD" or "main" without requiring "refs/heads/" prefix.', example: 'git check-ref-format --allow-onelevel main', whenUseful: 'Validating short reference names' },
      { flag: '--normalize', description: 'Normalize ref name by removing leading slashes.', example: 'git check-ref-format --normalize refs/heads/main/', whenUseful: 'Cleaning path strings' },
    ],
    examples: [
      { title: 'Check if branch name is valid', command: 'git check-ref-format refs/heads/feature/login', output: 'Exit code 0 (valid name)' },
      { title: 'Test invalid branch name containing space', command: 'git check-ref-format "refs/heads/invalid name"', output: 'Exit code 1 (fatal: bad ref name)' },
    ],
    situations: [
      { description: 'Sanitizing branch name entered in an internal CLI tool', command: 'git check-ref-format --branch "feature-name" && echo "Valid"', explanation: 'Prevents shell scripts from creating corrupted refs with illegal characters.' },
    ],
    mistakes: [
      'Assuming check-ref-format checks if the branch exists — it only checks syntax rules.',
    ],
    tips: [
      'Ref names cannot contain `..`, `~`, `^`, `:`, `?`, `*`, `[`, or spaces.',
    ],
    relatedCommands: ['symbolic-ref', 'show-ref', 'rev-parse'],
    comparisonCommands: ['show-ref'],
    officialReference: 'https://git-scm.com/docs/git-check-ref-format',
  },

  {
    id: 'checkout-index',
    name: 'checkout-index',
    executable: 'git',
    category: 'plumbing',
    subcategory: 'Index Operations',
    type: 'plumbing',
    difficulty: 'advanced',
    dangerLevel: 'caution',
    summary: 'Copy files from the index to the working tree',
    description: 'git checkout-index copies files listed in the staging index into the working directory without changing HEAD or index state. By default it does not overwrite existing working tree files unless `-f` is specified.',
    whyItExists: 'git checkout-index is the low-level plumbing tool that extracts staged file contents directly to disk, forming the foundation of porcelain restore/checkout operations.',
    whenToUse: [
      'Exporting staged index files to disk in custom build scripts',
      'Forcing working tree files to match index state',
      'Extracting files matching specific staging stages during merge conflicts',
    ],
    whenNotToUse: [
      'Normal everyday file restoration — use git restore or git checkout instead',
    ],
    syntax: [
      'git checkout-index [-u] [-q] [-a] [-f] [--] [<file>...]',
    ],
    options: [
      { flag: '-a', shortFlag: '--all', description: 'Checkout all files in the index.', example: 'git checkout-index -a', whenUseful: 'Exporting entire staged index to working directory' },
      { flag: '-f', shortFlag: '--force', description: 'Force overwrite of existing files on disk.', example: 'git checkout-index -f -a', whenUseful: 'Restoring all disk files to match index state exactly' },
      { flag: '--prefix=<dir/>', description: 'Prepend directory path to extracted files, exporting index contents to a target folder.', example: 'git checkout-index --prefix=export/ -a', whenUseful: 'Exporting clean staged codebase snapshot into a target folder' },
    ],
    examples: [
      { title: 'Export staged index files into an export folder', command: 'git checkout-index --prefix=dist/build/ -a', output: 'Extracts all index files into dist/build/ directory.' },
      { title: 'Force checkout single file from index', command: 'git checkout-index -f -- src/app.ts', output: 'Overwrites src/app.ts with staged index content.' },
    ],
    situations: [
      { description: 'Exporting staged files to a clean build directory without Git history', command: 'git checkout-index --prefix=/tmp/export-build/ -a', explanation: 'Creates clean copy of staged code on disk for packaging.' },
    ],
    mistakes: [
      'Running `git checkout-index -a -f` without backing up local working tree changes — overwrites unstaged edits.',
    ],
    tips: [
      'Specify `--prefix=` ending with a trailing slash to export into a directory.',
    ],
    relatedCommands: ['restore', 'update-index', 'read-tree'],
    comparisonCommands: ['restore'],
    officialReference: 'https://git-scm.com/docs/git-checkout-index',
  },

  {
    id: 'update-server-info',
    name: 'update-server-info',
    executable: 'git',
    category: 'administration',
    subcategory: 'Maintenance',
    type: 'plumbing',
    difficulty: 'advanced',
    dangerLevel: 'safe',
    summary: 'Update auxiliary info file to help dumb servers',
    description: 'git update-server-info updates auxiliary pack and reference index files in `.git/info/refs` and `.git/objects/info/packs` to enable clients to fetch repositories over unassisted "dumb" HTTP protocols.',
    whyItExists: 'Older "dumb" HTTP web servers that do not run Git backend processes require pre-generated static index files to let clients discover refs and packs.',
    whenToUse: [
      'Hosting static Git repositories over plain HTTP/HTTPS web servers without CGI/smart Git backends',
      'Running post-update server hooks on static Git servers',
    ],
    whenNotToUse: [
      'Modern Smart HTTP servers, SSH remotes, or GitHub/GitLab hosts — smart servers generate ref streams dynamically',
    ],
    syntax: [
      'git update-server-info [--force]',
    ],
    options: [
      { flag: '-f', shortFlag: '--force', description: 'Force updating server info files from scratch.', example: 'git update-server-info -f', whenUseful: 'Regenerating corrupted server info files' },
    ],
    examples: [
      { title: 'Update server info files', command: 'git update-server-info', output: 'Updates .git/info/refs and .git/objects/info/packs.' },
    ],
    situations: [
      { description: 'Publishing a static Git repo over standard Apache/Nginx web server', command: 'git update-server-info', explanation: 'Creates static text index files so clients can clone repo over http://.' },
    ],
    mistakes: [
      'Assuming modern SSH/GitHub remotes require update-server-info — smart protocols do not need it.',
    ],
    tips: [
      'Enable post-update hook `hooks/post-update` on dumb HTTP servers to trigger update-server-info automatically on push.',
    ],
    relatedCommands: ['gc', 'pack-objects', 'count-objects'],
    comparisonCommands: ['gc'],
    officialReference: 'https://git-scm.com/docs/git-update-server-info',
  }
];
