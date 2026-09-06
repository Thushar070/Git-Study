// ============================================================
// GitAtlas — GitHub CLI Repo & Workflow Commands
// gh repo create, gh repo clone, gh repo fork, gh workflow list, gh run list
// ============================================================

import type { GitCommand } from '../../types';

export const githubCliRepoCommands: GitCommand[] = [
  {
    id: 'gh-repo-create',
    name: 'repo create',
    executable: 'gh',
    category: 'GitHub CLI',
    subcategory: 'Repositories',
    type: 'github-cli',
    difficulty: 'beginner',
    dangerLevel: 'safe',
    summary: 'Create a new GitHub repository',
    description: 'gh repo create creates a new GitHub repository directly from the command line, with options to create from scratch, push an existing local repository, or clone from a template.',
    whyItExists: 'Creating repositories via GitHub\'s web UI requires navigating browser menus and copying clone URLs. gh repo create automates creation and remote linking in one step.',
    whenToUse: [
      'Initializing a new GitHub repository for a local codebase',
      'Creating a new empty remote repository on GitHub',
      'Instantiating a repository from a GitHub template repository',
    ],
    whenNotToUse: [
      'Creating local Git repositories without GitHub hosting — use git init instead',
    ],
    syntax: [
      'gh repo create [<name>] [flags]',
      'gh repo create --public --source=. --remote=origin',
      'gh repo create my-project --private --clone',
    ],
    options: [
      { flag: '--public', description: 'Make the new repository public.', example: 'gh repo create my-app --public', whenUseful: 'Publishing open-source repositories' },
      { flag: '--private', description: 'Make the new repository private.', example: 'gh repo create my-app --private', whenUseful: 'Creating private personal or enterprise projects' },
      { flag: '-s', shortFlag: '--source=<path>', description: 'Specify local repository root directory to push to GitHub.', example: 'gh repo create --source=. --public', whenUseful: 'Publishing existing local project directory to GitHub' },
      { flag: '--remote=<name>', description: 'Specify remote name for created repository (default "origin").', example: 'gh repo create --source=. --remote=upstream', whenUseful: 'Configuring custom remote name' },
      { flag: '--clone', description: 'Clone the newly created repository locally.', example: 'gh repo create org/my-app --clone', whenUseful: 'Starting work immediately in a cloned directory' },
    ],
    examples: [
      { title: 'Publish current directory to GitHub as public repo', command: 'gh repo create --public --source=. --remote=origin --push', output: '✓ Created repository user/my-app on GitHub\n✓ Added remote origin\n✓ Pushed commits to origin/main' },
      { title: 'Create a private repo and clone it', command: 'gh repo create new-tool --private --clone', output: 'Cloning into \'new-tool\'...' },
    ],
    situations: [
      { description: 'Creating and linking a GitHub repo for a local project in one command', command: 'gh repo create --public --source=. --push', explanation: 'Creates remote on GitHub, attaches origin remote, and pushes all local commits.' },
    ],
    mistakes: [
      'Forgetting `--push` flag when initializing from existing source directory, leaving remote created but empty.',
    ],
    tips: [
      'Combine `gh repo create --source=. --public --push` for instant 1-command GitHub deployment.',
    ],
    relatedCommands: ['gh-repo-clone', 'gh-repo-fork', 'init'],
    comparisonCommands: ['gh-repo-clone'],
    officialReference: 'https://cli.github.com/manual/gh_repo_create',
  },

  {
    id: 'gh-repo-clone',
    name: 'repo clone',
    executable: 'gh',
    category: 'GitHub CLI',
    subcategory: 'Repositories',
    type: 'github-cli',
    difficulty: 'beginner',
    dangerLevel: 'safe',
    summary: 'Clone a GitHub repository locally',
    description: 'gh repo clone clones a GitHub repository locally using shorthand `owner/repo` syntax, handling SSH vs HTTPS protocol selection based on your `gh auth` configuration.',
    whyItExists: 'Standard `git clone` requires typing or pasting full URLs. `gh repo clone` accepts short repository identifiers like `cli/cli` and configures remotes automatically.',
    whenToUse: [
      'Cloning GitHub repositories using short `owner/repo` notation',
      'Cloning repos without needing to remember full HTTPS/SSH URL strings',
    ],
    whenNotToUse: [
      'Cloning non-GitHub repositories (GitLab, Bitbucket) — use git clone instead',
    ],
    syntax: [
      'gh repo clone <repository> [<directory>] [-- <gitflags>]',
    ],
    options: [
      { flag: '--git-flags', description: 'Pass arbitrary flags directly to underlying git clone command.', example: 'gh repo clone owner/repo -- --depth 1', whenUseful: 'Creating shallow clones using gh' },
    ],
    examples: [
      { title: 'Clone GitHub repository by name', command: 'gh repo clone cli/cli', output: 'Cloning into \'cli\'...' },
      { title: 'Clone into specific directory', command: 'gh repo clone owner/repo my-dir', output: 'Cloning into \'my-dir\'...' },
    ],
    situations: [
      { description: 'Quickly checking out a colleague\'s GitHub repository', command: 'gh repo clone org/backend-api', explanation: 'Clones org/backend-api using authenticated protocol (SSH/HTTPS).' },
    ],
    mistakes: [
      'Using full URLs when short `owner/repo` notation is supported.',
    ],
    tips: [
      'Set preferred git protocol (SSH or HTTPS) with `gh config set git_protocol ssh`.',
    ],
    relatedCommands: ['gh-repo-create', 'clone'],
    comparisonCommands: ['clone'],
    officialReference: 'https://cli.github.com/manual/gh_repo_clone',
  },

  {
    id: 'gh-repo-fork',
    name: 'repo fork',
    executable: 'gh',
    category: 'GitHub CLI',
    subcategory: 'Repositories',
    type: 'github-cli',
    difficulty: 'intermediate',
    dangerLevel: 'safe',
    summary: 'Create a fork of a repository on GitHub',
    description: 'gh repo fork creates a personal fork of a GitHub repository, clones the fork locally, and configures `upstream` and `origin` remote tracking references automatically.',
    whyItExists: 'Forking an open-source repo in GitHub web UI requires multi-step manual setup: forking on web, cloning fork, adding upstream remote. `gh repo fork` does all steps in one command.',
    whenToUse: [
      'Forking open-source repositories to contribute pull requests',
      'Setting up personal working copies of public repositories',
    ],
    whenNotToUse: [
      'When you already have push access to the main repository',
    ],
    syntax: [
      'gh repo fork [<repository>] [flags]',
    ],
    options: [
      { flag: '--clone', description: 'Clone the fork locally after creation (default behavior when interactive).', example: 'gh repo fork owner/repo --clone', whenUseful: 'Immediately downloading local copy of fork' },
      { flag: '--remote', description: 'Add remote for the fork (default true).', example: 'gh repo fork owner/repo --remote-name=myfork', whenUseful: 'Setting custom remote alias for fork' },
    ],
    examples: [
      { title: 'Fork and clone an open source project', command: 'gh repo fork facebook/react --clone', output: '✓ Created fork user/react\n✓ Cloned fork into ./react\n✓ Added remote upstream' },
    ],
    situations: [
      { description: 'Preparing to contribute a fix to a public GitHub project', command: 'gh repo fork owner/open-project --clone && cd open-project', explanation: 'Forks repo, clones it locally, and configures upstream remote pointing to original repo.' },
    ],
    mistakes: [
      'Forgetting that `upstream` points to the original repository and `origin` points to your personal fork.',
    ],
    tips: [
      'Use `git fetch upstream` to keep your fork updated with original repository commits.',
    ],
    relatedCommands: ['gh-repo-clone', 'gh-pr-create', 'remote'],
    comparisonCommands: ['gh-repo-clone'],
    officialReference: 'https://cli.github.com/manual/gh_repo_fork',
  },

  {
    id: 'gh-workflow-list',
    name: 'workflow list',
    executable: 'gh',
    category: 'GitHub CLI',
    subcategory: 'Workflows',
    type: 'github-cli',
    difficulty: 'intermediate',
    dangerLevel: 'safe',
    summary: 'View workflows in a repository',
    description: 'gh workflow list displays all GitHub Actions CI/CD workflows configured in `.github/workflows/` along with state indicators (active/disabled) and workflow IDs.',
    whyItExists: 'Developers need a quick terminal tool to inspect active GitHub Actions pipelines without opening browser tabs.',
    whenToUse: [
      'Listing GitHub Actions workflow names and IDs in a repository',
      'Checking if a CI workflow is active or disabled',
      'Discovering workflow IDs for triggering runs via `gh workflow run`',
    ],
    whenNotToUse: [
      'Viewing individual job run logs — use `gh run view` instead',
    ],
    syntax: [
      'gh workflow list [flags]',
    ],
    options: [
      { flag: '-a', shortFlag: '--all', description: 'Show all workflows, including disabled ones.', example: 'gh workflow list --all', whenUseful: 'Viewing complete workflow inventory' },
      { flag: '-L', shortFlag: '--limit <n>', description: 'Maximum number of workflows to fetch.', example: 'gh workflow list -L 20', whenUseful: 'Repositories with numerous workflows' },
    ],
    examples: [
      { title: 'List all active CI/CD workflows', command: 'gh workflow list', output: 'CI Pipeline  active  1234567\nDeploy Prod  active  7654321' },
    ],
    situations: [
      { description: 'Finding workflow ID to trigger manual deployment run', command: 'gh workflow list', explanation: 'Outputs workflow IDs needed for gh workflow run command.' },
    ],
    mistakes: [
      'Confusing `gh workflow list` (lists workflow definitions) with `gh run list` (lists execution history runs).',
    ],
    tips: [
      'Run `gh workflow view <workflow-id>` to view source code YAML of a workflow.',
    ],
    relatedCommands: ['gh-run-list', 'gh-run-view'],
    comparisonCommands: ['gh-run-list'],
    officialReference: 'https://cli.github.com/manual/gh_workflow_list',
  },

  {
    id: 'gh-run-list',
    name: 'run list',
    executable: 'gh',
    category: 'GitHub CLI',
    subcategory: 'Workflows',
    type: 'github-cli',
    difficulty: 'intermediate',
    dangerLevel: 'safe',
    summary: 'View recent workflow runs',
    description: 'gh run list displays recent GitHub Actions pipeline executions, showing status (success, failure, in_progress), branch, commit, event type, and run duration.',
    whyItExists: 'Developers need instant visibility into CI build/test statuses directly in their terminal after pushing code.',
    whenToUse: [
      'Checking if latest commit passed CI build checks',
      'Monitoring status of active deployment pipelines',
      'Locating failed workflow run IDs for log inspection',
    ],
    whenNotToUse: [
      'Listing workflow definitions — use `gh workflow list` instead',
    ],
    syntax: [
      'gh run list [flags]',
      'gh run list --workflow=<name>',
      'gh run list --branch=<branch>',
    ],
    options: [
      { flag: '-w', shortFlag: '--workflow=<name>', description: 'Filter runs by workflow name or filename.', example: 'gh run list --workflow=ci.yml', whenUseful: 'Isolating test pipeline runs' },
      { flag: '-b', shortFlag: '--branch=<branch>', description: 'Filter runs by branch.', example: 'gh run list --branch=main', whenUseful: 'Checking main branch build status' },
      { flag: '-s', shortFlag: '--status=<status>', description: 'Filter runs by status (completed, success, failure, in_progress).', example: 'gh run list --status=failure', whenUseful: 'Identifying broken builds' },
    ],
    examples: [
      { title: 'List recent workflow runs', command: 'gh run list', output: '✓ CI Pipeline  main  push  123456789  5m ago  2m30s' },
      { title: 'Find failed runs on current branch', command: 'gh run list --status=failure', output: 'X Test Suite  feature/login  push  987654321  10m ago' },
    ],
    situations: [
      { description: 'Checking if your recent push passed test suite before merging PR', command: 'gh run list --branch=$(git symbolic-ref --short HEAD)', explanation: 'Displays status of all CI runs for active branch.' },
    ],
    mistakes: [
      'Polling `gh run list` repeatedly in a loop — use `gh run watch` to stream live progress instead.',
    ],
    tips: [
      'Combine `gh run list` with `gh run view <id> --log-failed` to debug test failures immediately.',
    ],
    relatedCommands: ['gh-workflow-list', 'gh-pr-view'],
    comparisonCommands: ['gh-workflow-list'],
    officialReference: 'https://cli.github.com/manual/gh_run_list',
  }
];
