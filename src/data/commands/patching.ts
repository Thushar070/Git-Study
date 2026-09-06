// ============================================================
// GitAtlas — Patching & Email Collaboration Commands
// git send-email, git request-pull, git cherry, git apply, git am
// ============================================================

import type { GitCommand } from '../../types';

export const patchingCommands: GitCommand[] = [
  {
    id: 'send-email',
    name: 'send-email',
    executable: 'git',
    category: 'Patching',
    subcategory: 'Email Collaboration',
    type: 'porcelain',
    difficulty: 'advanced',
    dangerLevel: 'safe',
    summary: 'Send a collection of patches as emails using SMTP',
    description: 'git send-email publishes patch files created by git format-patch as email messages. It formats patch subjects, body messages, diff stats, and inline patches properly so mailing list subscribers (like the Linux kernel or Git maintainers) can review and apply them.',
    whyItExists: 'In email-driven open-source projects, patch files are sent via email for peer review. Sending patches with regular mail clients often corrupts whitespaces and line wraps. git send-email ensures patches are transmitted byte-for-byte without corruption.',
    whenToUse: [
      'Submitting patches to email-based mailing lists (e.g. Linux Kernel, Git development list)',
      'Working on open-source projects that do not use web pull requests',
      'Broadcasting proposed changes directly to maintainers via SMTP',
    ],
    whenNotToUse: [
      'Projects hosted on GitHub, GitLab, or Bitbucket that use pull/merge requests — use gh pr create or web PRs instead',
      'When your email server forbids SMTP relay access',
    ],
    syntax: [
      'git send-email <patch-file>...',
      'git send-email --to=<email> <patch-file>...',
      'git send-email --annotate <patch-file>...',
    ],
    options: [
      { flag: '--to=<address>', description: 'Primary email recipient address for the patch submission.', example: 'git send-email --to=devel@example.com *.patch', whenUseful: 'Specifying the main project mailing list' },
      { flag: '--cc=<address>', description: 'Secondary CC recipient address.', example: 'git send-email --cc=maintainer@example.com *.patch', whenUseful: 'Copying specific subsystem maintainers' },
      { flag: '--annotate', description: 'Review and edit each patch header/body interactively before sending.', example: 'git send-email --annotate 0001-feature.patch', whenUseful: 'Adding extra cover letter notes or reviewing patch text' },
      { flag: '--smtp-server=<host>', description: 'Specify the SMTP server host for sending email.', example: 'git send-email --smtp-server=smtp.gmail.com *.patch', whenUseful: 'Overriding default SMTP settings' },
    ],
    examples: [
      { title: 'Send all generated patches to a mailing list', command: 'git send-email --to=kernel@vger.kernel.org 0001-*.patch', output: 'Sending 0001-fix.patch via SMTP... OK' },
      { title: 'Interactively annotate and send a patch', command: 'git send-email --annotate --to=dev@project.org 0001-add-feature.patch', output: 'Opens editor for manual inspection before dispatching email.' },
    ],
    situations: [
      { description: 'Submitting a bugfix to an email-based open-source project', command: 'git format-patch -1 && git send-email --to=list@project.org 0001-fix.patch', explanation: 'Generates patch format file from latest commit and sends it directly via SMTP.' },
    ],
    mistakes: [
      'Sending patches via desktop mail clients like Outlook or Thunderbird without git send-email, causing tab-to-space conversion and breaking patch application.',
      'Forgetting to configure SMTP credentials in git config --global sendemail.smtpserver.',
    ],
    tips: [
      'Configure send-email defaults in ~/.gitconfig to avoid typing SMTP flags every time.',
      'Test your setup by sending patches to your own email address first.',
    ],
    relatedCommands: ['format-patch', 'am', 'apply'],
    comparisonCommands: ['format-patch'],
    officialReference: 'https://git-scm.com/docs/git-send-email',
  },

  {
    id: 'request-pull',
    name: 'request-pull',
    executable: 'git',
    category: 'Patching',
    subcategory: 'Collaboration',
    type: 'porcelain',
    difficulty: 'intermediate',
    dangerLevel: 'safe',
    summary: 'Generates a summary of pending changes to request a pull from upstream',
    description: 'git request-pull generates a formatted summary message intended for project maintainers, describing commits made between a start revision and a target branch URL. It includes commit shortlogs, branch refs, and file diffstat summaries.',
    whyItExists: 'Before web platforms like GitHub automated Pull Requests, developers needed a standard summary of unmerged commits to send upstream maintainers. git request-pull standardizes this summary.',
    whenToUse: [
      'Sending a pull request notice over email to a project maintainer',
      'Generating a summary of changes hosted on a public personal Git server',
      'Providing diffstat and commit list for external code review',
    ],
    whenNotToUse: [
      'Creating a pull request on GitHub — use gh pr create instead',
      'When your changes have not been pushed to a public remote branch yet',
    ],
    syntax: [
      'git request-pull <start> <url> [<end>]',
    ],
    options: [
      { flag: '-p', description: 'Show patch diffs inline in addition to the shortlog and diffstat summary.', example: 'git request-pull -p v1.0 https://github.com/user/repo.git feature', whenUseful: 'When maintainers request inline diffs in the pull request message' },
    ],
    examples: [
      { title: 'Generate pull request text from tag v1.0 to feature branch', command: 'git request-pull v1.0 https://github.com/user/repo.git feature/login', output: 'The following changes since commit 1a2b3c... are available in the Git repository...' },
    ],
    situations: [
      { description: 'Requesting maintainer to pull feature from personal server', command: 'git request-pull main https://git.mycompany.com/dev/app.git feature/api', explanation: 'Generates text summary of commits on feature/api relative to main for email submission.' },
    ],
    mistakes: [
      'Passing a private local path instead of a public remote URL that upstream maintainers can access.',
      'Generating a request pull for unpushed commits.',
    ],
    tips: [
      'Ensure your remote branch is fetched and updated on the public URL before running request-pull.',
    ],
    relatedCommands: ['send-email', 'format-patch', 'log'],
    comparisonCommands: ['send-email'],
    officialReference: 'https://git-scm.com/docs/git-request-pull',
  },

  {
    id: 'cherry',
    name: 'cherry',
    executable: 'git',
    category: 'Patching',
    subcategory: 'History Walking',
    type: 'porcelain',
    difficulty: 'advanced',
    dangerLevel: 'safe',
    summary: 'Find commits yet to be applied to upstream branch',
    description: 'git cherry compares commits on an upstream branch against a topic branch by commit patch IDs (the contents of changes) rather than commit hashes. It outputs prefixed "+" for unapplied commits and "-" for commits whose changes are already present in upstream.',
    whyItExists: 'When rebasing or picking changes between branches, commit hashes change. git cherry identifies which changes have already been applied upstream regardless of hash changes.',
    whenToUse: [
      'Checking which commits on your feature branch are missing from main before rebasing',
      'Identifying equivalent commits that were already merged under a different hash',
      'Preparing a clean list of commits for cherry-picking',
    ],
    whenNotToUse: [
      'Simple branch comparisons when hashes have not changed — use git log upstream..topic instead',
    ],
    syntax: [
      'git cherry [-v] [<upstream> [<head> [<limit>]]]',
    ],
    options: [
      { flag: '-v', description: 'Verbose mode: show commit subject lines next to the "+" or "-" indicators.', example: 'git cherry -v origin/main feature', whenUseful: 'Understanding commit titles associated with unapplied changes' },
    ],
    examples: [
      { title: 'Compare current branch with origin/main', command: 'git cherry -v origin/main', output: '+ 1a2b3c4 Add login page\n- 5d6e7f8 Fix navbar styling' },
    ],
    situations: [
      { description: 'Verifying if a fix commit was already merged in main under a rebase', command: 'git cherry -v main feature/fix', explanation: 'Displays "-" next to commits already present in main, avoiding redundant picks.' },
    ],
    mistakes: [
      'Assuming "+" means a merge conflict — "+" simply indicates the commit patch is not yet in upstream.',
    ],
    tips: [
      'Use git cherry -v before running git cherry-pick or git rebase to avoid duplicate work.',
    ],
    relatedCommands: ['cherry-pick', 'log', 'patch-id'],
    comparisonCommands: ['cherry-pick'],
    officialReference: 'https://git-scm.com/docs/git-cherry',
  },

  {
    id: 'apply',
    name: 'apply',
    executable: 'git',
    category: 'Patching',
    subcategory: 'Patching',
    type: 'porcelain',
    difficulty: 'intermediate',
    dangerLevel: 'caution',
    summary: 'Apply a patch to files and/or to the index',
    description: 'git apply reads a diff/patch file and applies changes directly to the working directory or staging index without creating Git commits. It is similar to the Unix patch command but supports Git-specific diff extensions.',
    whyItExists: 'Sometimes you want to test or incorporate code changes from a patch file without creating commit history or metadata.',
    whenToUse: [
      'Applying code diffs generated by git diff or external code reviewers',
      'Testing patch files before creating commits',
      'Staging changes directly from patch files using --cached',
    ],
    whenNotToUse: [
      'Applying email patch series with commit messages and author metadata — use git am instead',
    ],
    syntax: [
      'git apply [<options>] [<patch-file>...]',
    ],
    options: [
      { flag: '--stat', description: 'Display a diffstat of the patch file instead of applying it.', example: 'git apply --stat 0001-fix.patch', whenUseful: 'Inspecting patch size and modified files before applying' },
      { flag: '--check', description: 'Test if the patch applies cleanly without making any actual changes.', example: 'git apply --check 0001-fix.patch', whenUseful: 'Dry-run testing for merge conflicts before applying' },
      { flag: '--cached', description: 'Apply the patch to the staging index without modifying working tree files.', example: 'git apply --cached feature.patch', whenUseful: 'Directly staging patch changes' },
      { flag: '-R', shortFlag: '--reverse', description: 'Apply the patch in reverse (undo changes in the patch).', example: 'git apply -R bugfix.patch', whenUseful: 'Reverting changes contained in a patch file' },
    ],
    examples: [
      { title: 'Check if a patch applies cleanly', command: 'git apply --check 0001-feature.patch', output: '(no output means patch applies cleanly)' },
      { title: 'Apply a patch to working tree', command: 'git apply 0001-feature.patch', output: 'Modifies files on disk to match patch contents.' },
    ],
    situations: [
      { description: 'Testing a patch shared by a teammate over Slack/Email', command: 'git apply --check fix.patch && git apply fix.patch', explanation: 'Verifies the patch applies without errors before applying it to working tree.' },
    ],
    mistakes: [
      'Expecting git apply to create a commit — it only modifies files. You must run git commit manually afterwards.',
      'Applying a patch generated from a different codebase state without checking for conflicts.',
    ],
    tips: [
      'Run git apply --check first to avoid leaving partial conflict states in your working tree.',
    ],
    relatedCommands: ['am', 'format-patch', 'diff'],
    comparisonCommands: ['am'],
    officialReference: 'https://git-scm.com/docs/git-apply',
  },

  {
    id: 'am',
    name: 'am',
    executable: 'git',
    category: 'Patching',
    subcategory: 'Patching',
    type: 'porcelain',
    difficulty: 'advanced',
    dangerLevel: 'caution',
    summary: 'Apply a series of patches from a mailbox',
    description: 'git am (Apply Mailbox) takes email patches created by git format-patch or exported from a mailbox (mbox) and automatically applies them to your repository, creating commits with original author metadata, dates, and commit messages.',
    whyItExists: 'In email-based development workflows, maintainers receive series of patches in email mailboxes. git am automates applying whole series as individual commits.',
    whenToUse: [
      'Applying patch series submitted via email or exported as mbox files',
      'Importing commit history from git format-patch outputs',
      'Replaying patch history from external contributors',
    ],
    whenNotToUse: [
      'Applying simple code diffs without commit author/message metadata — use git apply instead',
    ],
    syntax: [
      'git am [<options>] [<mbox-file>...]',
      'git am --continue',
      'git am --skip',
      'git am --abort',
    ],
    options: [
      { flag: '--resolved', shortFlag: '-r', description: 'After resolving a patch conflict, continue the patching process.', example: 'git am --resolved', whenUseful: 'Continuing patch series after manual conflict resolution' },
      { flag: '--skip', description: 'Skip the current patch in the mailbox and move to the next one.', example: 'git am --skip', whenUseful: 'Discarding a faulty or duplicate patch in a series' },
      { flag: '--abort', description: 'Abort the current patching operation and restore origin branch state.', example: 'git am --abort', whenUseful: 'Safely stopping when conflicts become unmanageable' },
      { flag: '-3', shortFlag: '--3way', description: 'Fall back on 3-way merge if a patch does not apply cleanly.', example: 'git am -3 *.patch', whenUseful: 'Resolving minor context conflicts using repository history' },
    ],
    examples: [
      { title: 'Apply a mailbox of patches', command: 'git am 0001-0005-feature.patch', output: 'Applying: Add user authentication\nApplying: Refactor session token...' },
      { title: 'Abort a conflicted patch application', command: 'git am --abort', output: 'Restores HEAD and working tree to pre-am state.' },
    ],
    situations: [
      { description: 'Applying a 5-patch series sent via mailing list', command: 'git am -3 patches/*.patch', explanation: 'Applies each patch as an individual commit with author and message preserved.' },
    ],
    mistakes: [
      'Forgetting to resolve merge conflicts and staging files with git add before running git am --continue.',
      'Running git am on raw unformatted diffs without email header fields.',
    ],
    tips: [
      'Always try git am -3 when patches fail to apply cleanly; the 3-way fallback uses Git history blobs to resolve conflicts.',
    ],
    relatedCommands: ['apply', 'format-patch', 'send-email'],
    comparisonCommands: ['apply'],
    officialReference: 'https://git-scm.com/docs/git-am',
  }
];
