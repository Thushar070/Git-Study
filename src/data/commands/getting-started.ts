// ============================================================
// GitAtlas — Getting Started Commands
// git init, git clone, git config, git help, git version
// ============================================================

import type { GitCommand } from '../../types';

export const gettingStartedCommands: GitCommand[] = [
  {
    id: 'init',
    name: 'init',
    executable: 'git',
    category: 'getting-started',
    subcategory: 'Setup',
    type: 'porcelain',
    difficulty: 'beginner',
    dangerLevel: 'safe',
    summary: 'Create an empty Git repository or reinitialize an existing one',
    description: 'git init creates a new .git subdirectory in your current directory, which contains all the necessary repository metadata — the object database, refs, HEAD, and config. Running git init in an existing repository is safe; it will not overwrite existing configuration.',
    whyItExists: 'Every Git workflow begins with a repository. git init converts a regular directory into one that Git can track, creating the internal data structures Git needs to record history.',
    whenToUse: [
      'Starting a brand new project from scratch',
      'Converting an existing unversioned project into a Git repository',
      'Reinitializing a repository to apply updated templates',
    ],
    whenNotToUse: [
      'When you want to work on an existing remote project — use git clone instead',
      'When a .git directory already exists and you don\'t need to reinitialize',
    ],
    syntax: [
      'git init [<directory>]',
      'git init --bare [<directory>]',
      'git init --template=<template-directory>',
      'git init -b <branch-name> [<directory>]',
    ],
    options: [
      { flag: '--bare', description: 'Create a bare repository — no working directory, only the .git contents. Used for shared/remote repositories.', example: 'git init --bare project.git', whenUseful: 'Setting up a central repository on a server that developers push to' },
      { flag: '-b <name>', shortFlag: '--initial-branch=<name>', description: 'Set the name of the initial branch instead of the default.', example: 'git init -b main', whenUseful: 'When your team or organization uses "main" instead of "master"' },
      { flag: '--template=<dir>', description: 'Specify a directory from which templates (hooks, exclude files) will be copied.', example: 'git init --template=/path/to/templates', whenUseful: 'Standardizing hooks and config across team repositories' },
      { flag: '--shared[=<permissions>]', description: 'Set the repository to be shared among multiple users. Adjusts group permissions.', example: 'git init --shared=group', whenUseful: 'Multi-user server repositories where group access is needed' },
    ],
    examples: [
      { title: 'Initialize a new repository', command: 'git init', output: 'Initialized empty Git repository in /path/to/project/.git/' },
      { title: 'Initialize with a specific branch name', command: 'git init -b main my-project', output: 'Initialized empty Git repository in /path/to/my-project/.git/' },
      { title: 'Create a bare repository', command: 'git init --bare shared-repo.git', output: 'Initialized empty Git repository in /path/to/shared-repo.git/' },
    ],
    situations: [
      { description: 'Starting a new web application', command: 'mkdir my-app && cd my-app && git init', explanation: 'Creates a new directory and initializes Git tracking inside it.' },
      { description: 'Adding version control to an existing project', command: 'cd existing-project && git init && git add . && git commit -m "Initial commit"', explanation: 'Initializes Git, stages all existing files, and creates the first commit.' },
    ],
    mistakes: [
      'Running git init inside another Git repository — this creates a nested .git, which can cause confusion. Consider git submodule instead.',
      'Initializing a bare repository when you need a working directory — bare repos have no working tree.',
      'Forgetting to create an initial commit — some Git operations require at least one commit to work.',
    ],
    relatedCommands: ['clone', 'config'],
    comparisonCommands: ['clone'],
    tips: [
      'git init is idempotent — running it again in an existing repo won\'t destroy anything.',
      'Set your default branch name globally with: git config --global init.defaultBranch main',
    ],
    officialReference: 'https://git-scm.com/docs/git-init',
  },

  {
    id: 'clone',
    name: 'clone',
    executable: 'git',
    category: 'getting-started',
    subcategory: 'Setup',
    type: 'porcelain',
    difficulty: 'beginner',
    dangerLevel: 'safe',
    summary: 'Clone a repository into a new directory',
    description: 'git clone creates a local copy of an existing Git repository. It copies the entire commit history, all branches (as remote-tracking branches), tags, and files. By default, it checks out the remote\'s default branch and sets up "origin" as the remote name pointing back to the source.',
    whyItExists: 'Distributed version control requires every developer to have a complete copy of the repository. git clone is how you obtain that copy, whether from GitHub, GitLab, a network server, or even another directory on the same machine.',
    whenToUse: [
      'Joining an existing project for the first time',
      'Creating a local copy of a remote repository',
      'Setting up a development environment from a hosted repo',
      'Forking/mirroring a repository locally',
    ],
    whenNotToUse: [
      'When you already have the repository locally — use git pull or git fetch instead',
      'When you want to start a new project from scratch — use git init',
    ],
    syntax: [
      'git clone <repository> [<directory>]',
      'git clone --depth <depth> <repository>',
      'git clone --branch <branch> <repository>',
      'git clone --bare <repository>',
      'git clone --mirror <repository>',
    ],
    options: [
      { flag: '--depth <n>', description: 'Create a shallow clone with history truncated to the specified number of commits.', example: 'git clone --depth 1 https://github.com/user/repo.git', whenUseful: 'CI/CD pipelines or quick checkouts where full history is unnecessary', warning: 'Shallow clones cannot push to some remotes and have limited git log output' },
      { flag: '-b <branch>', shortFlag: '--branch <branch>', description: 'Check out a specific branch instead of the remote HEAD.', example: 'git clone -b develop https://github.com/user/repo.git', whenUseful: 'When you need to start on a feature branch immediately' },
      { flag: '--single-branch', description: 'Clone only the history leading to the tip of one branch.', example: 'git clone --single-branch -b main https://github.com/user/repo.git', whenUseful: 'Reducing clone size when you only need one branch' },
      { flag: '--bare', description: 'Create a bare clone without a working directory.', example: 'git clone --bare https://github.com/user/repo.git', whenUseful: 'Setting up a mirror or shared server repository' },
      { flag: '--mirror', description: 'Set up a mirror of the source repository, including all refs.', example: 'git clone --mirror https://github.com/user/repo.git', whenUseful: 'Creating an exact backup of a repository' },
      { flag: '--recurse-submodules', description: 'Initialize and clone submodules after cloning the main repo.', example: 'git clone --recurse-submodules https://github.com/user/repo.git', whenUseful: 'Projects that use git submodule for dependencies' },
      { flag: '--filter=<filter>', description: 'Partial clone — request that the server omit certain objects.', example: 'git clone --filter=blob:none https://github.com/user/repo.git', whenUseful: 'Large repositories where you want to fetch blobs on demand (requires server support)' },
    ],
    examples: [
      { title: 'Clone a repository', command: 'git clone https://github.com/user/project.git', output: "Cloning into 'project'...\nremote: Enumerating objects: 1543, done.\nremote: Total 1543 (delta 0), reused 0 (delta 0)\nReceiving objects: 100% (1543/1543), 2.1 MiB | 5.00 MiB/s, done." },
      { title: 'Clone into a specific directory', command: 'git clone https://github.com/user/project.git my-folder' },
      { title: 'Shallow clone (latest commit only)', command: 'git clone --depth 1 https://github.com/torvalds/linux.git', output: 'Useful for huge repos — downloads only the latest snapshot.' },
    ],
    situations: [
      { description: 'Joining a team project', command: 'git clone https://github.com/company/app.git && cd app && git checkout -b feature/my-task', explanation: 'Clones the project and immediately creates a feature branch for your work.' },
      { description: 'Quick CI checkout for testing', command: 'git clone --depth 1 --single-branch -b main https://github.com/user/repo.git', explanation: 'Minimal clone — fastest way to get the code for a CI pipeline.' },
    ],
    mistakes: [
      'Cloning into a directory that already contains a .git folder — Git will refuse and show an error.',
      'Using --depth 1 and then trying to git log or git blame the full history — shallow clones have limited history.',
      'Forgetting --recurse-submodules when the project has submodules — submodule directories will be empty.',
    ],
    relatedCommands: ['init', 'fetch', 'pull', 'remote'],
    comparisonCommands: ['init'],
    tips: [
      'Use SSH URLs (git@github.com:user/repo.git) to avoid entering credentials repeatedly.',
      'After cloning, git remote -v shows the configured origin URL.',
      'Use --filter=blob:none for partial clones of monorepos — Git fetches blobs on demand.',
    ],
    officialReference: 'https://git-scm.com/docs/git-clone',
  },

  {
    id: 'config',
    name: 'config',
    executable: 'git',
    category: 'getting-started',
    subcategory: 'Configuration',
    type: 'porcelain',
    difficulty: 'beginner',
    dangerLevel: 'safe',
    summary: 'Get and set repository or global Git configuration options',
    description: 'git config lets you customize Git\'s behavior by reading and writing configuration variables. These can be set at three levels: system (/etc/gitconfig), global (~/.gitconfig), or local (.git/config). Local settings override global, which override system.',
    whyItExists: 'Git needs to know who you are (for commit authorship), how you prefer to work (editor, merge strategy, aliases), and how to interact with remotes (credentials, proxy). git config is the central mechanism for all of this.',
    whenToUse: [
      'Setting your name and email before your first commit',
      'Configuring your preferred text editor',
      'Creating command aliases',
      'Setting default branch names',
      'Configuring credential helpers',
      'Adjusting merge and diff behavior',
    ],
    whenNotToUse: [
      'Modifying repository-specific files like .gitignore or .gitattributes — those have their own mechanisms',
    ],
    syntax: [
      'git config [--global | --system | --local] <key> <value>',
      'git config --get <key>',
      'git config --list',
      'git config --unset <key>',
      'git config --edit [--global | --system]',
    ],
    options: [
      { flag: '--global', description: 'Write to ~/.gitconfig, applying to all repos for the current user.', example: 'git config --global user.name "Jane Dev"', whenUseful: 'One-time setup of your identity and preferences' },
      { flag: '--local', description: 'Write to the repository\'s .git/config. This is the default.', example: 'git config --local user.email "jane@work.com"', whenUseful: 'Using a different identity for a specific work project' },
      { flag: '--system', description: 'Write to /etc/gitconfig, applying to all users on the machine.', example: 'sudo git config --system core.autocrlf true', whenUseful: 'System-wide defaults set by an administrator', warning: 'Requires elevated permissions' },
      { flag: '--list', description: 'List all configuration variables and their values.', example: 'git config --list', whenUseful: 'Debugging or auditing your current Git settings' },
      { flag: '--unset', description: 'Remove a configuration variable.', example: 'git config --unset user.name' },
      { flag: '--edit', description: 'Open the configuration file in your editor.', example: 'git config --global --edit' },
    ],
    examples: [
      { title: 'Set your identity', command: 'git config --global user.name "Jane Developer"\ngit config --global user.email "jane@example.com"' },
      { title: 'Set default editor', command: 'git config --global core.editor "code --wait"' },
      { title: 'Create an alias', command: 'git config --global alias.st status\ngit config --global alias.co checkout\ngit config --global alias.lg "log --oneline --graph --all"' },
      { title: 'Set default branch name', command: 'git config --global init.defaultBranch main' },
      { title: 'View all settings', command: 'git config --list --show-origin', output: 'file:/home/user/.gitconfig    user.name=Jane Developer\nfile:/home/user/.gitconfig    user.email=jane@example.com\nfile:.git/config    core.repositoryformatversion=0' },
    ],
    situations: [
      { description: 'First-time Git setup on a new machine', command: 'git config --global user.name "Your Name"\ngit config --global user.email "your@email.com"\ngit config --global core.editor "code --wait"\ngit config --global init.defaultBranch main', explanation: 'Configures the essentials: identity, editor, and default branch name.' },
      { description: 'Using a different email for work vs personal repos', command: 'git config --local user.email "jane@company.com"', explanation: 'The local config overrides global, so this repo uses the work email while others use your personal email.' },
    ],
    mistakes: [
      'Forgetting to set user.name and user.email before committing — commits will use system defaults or fail.',
      'Setting --global when you meant --local — accidentally changing all repos.',
      'Typos in config keys — Git won\'t warn you, it just creates a useless key.',
    ],
    relatedCommands: ['init', 'clone'],
    tips: [
      'Use git config --list --show-origin to see exactly where each setting comes from.',
      'Conditional includes let you auto-switch config based on directory: [includeIf "gitdir:~/work/"].',
    ],
    officialReference: 'https://git-scm.com/docs/git-config',
  },

  {
    id: 'help',
    name: 'help',
    executable: 'git',
    category: 'getting-started',
    subcategory: 'Information',
    type: 'porcelain',
    difficulty: 'beginner',
    dangerLevel: 'safe',
    summary: 'Display help information about Git or a specific command',
    description: 'git help opens the manual page for a Git command. Without arguments, it shows a summary of common commands. With a command name, it opens the detailed man page — either in the terminal or in a web browser.',
    whyItExists: 'Git has hundreds of commands and thousands of options. git help is the built-in way to access the comprehensive official documentation without leaving the terminal.',
    whenToUse: [
      'Looking up the exact syntax or options for a command',
      'Understanding what a command does before running it',
      'Discovering available Git commands',
    ],
    whenNotToUse: [
      'When you need a quick reminder — git <command> -h gives a shorter summary',
    ],
    syntax: [
      'git help [<command>]',
      'git help -a',
      'git help -g',
      'git <command> --help',
      'git <command> -h',
    ],
    options: [
      { flag: '-a', shortFlag: '--all', description: 'List all available Git commands.', example: 'git help -a' },
      { flag: '-g', shortFlag: '--guides', description: 'List available Git concept guides.', example: 'git help -g' },
      { flag: '-w', shortFlag: '--web', description: 'Open the help page in a web browser.', example: 'git help -w commit' },
      { flag: '-m', shortFlag: '--man', description: 'Display the help page as a man page (default on Unix).', example: 'git help -m rebase' },
    ],
    examples: [
      { title: 'Get help for a command', command: 'git help commit', output: 'Opens the detailed manual page for git commit.' },
      { title: 'Quick inline help', command: 'git commit -h', output: 'Shows a short usage summary with common options.' },
      { title: 'List all commands', command: 'git help -a' },
      { title: 'Open help in browser', command: 'git help -w rebase' },
    ],
    situations: [
      { description: 'Checking exact syntax of a complex command', command: 'git help rebase', explanation: 'Opens the full manual for git rebase, including all flags like --interactive, --onto, etc.' },
    ],
    mistakes: [
      'Confusing git help <command> (full manual) with git <command> -h (brief summary).',
    ],
    relatedCommands: ['config', 'version'],
    tips: [
      'git <command> -h is faster for a quick reminder — it prints directly to the terminal.',
      'git help -g lists conceptual tutorials like gitworkflows, giteveryday, and gitglossary.',
    ],
    officialReference: 'https://git-scm.com/docs/git-help',
  },

  {
    id: 'version',
    name: 'version',
    executable: 'git',
    category: 'getting-started',
    subcategory: 'Information',
    type: 'porcelain',
    difficulty: 'beginner',
    dangerLevel: 'safe',
    summary: 'Display the version of Git installed on your system',
    description: 'git version prints the installed Git version. This is useful for verifying your installation, checking feature availability (some features require newer Git versions), and troubleshooting.',
    whyItExists: 'Different Git versions support different features and flags. Knowing your version helps diagnose compatibility issues and determine whether you can use newer capabilities like partial clones, sparse-checkout, or switch/restore.',
    whenToUse: [
      'Verifying Git is installed correctly',
      'Checking if your version supports a specific feature',
      'Reporting your environment when filing bug reports',
      'Confirming an upgrade succeeded',
    ],
    whenNotToUse: [],
    syntax: [
      'git version',
      'git --version',
      'git version --build-options',
    ],
    options: [
      { flag: '--build-options', description: 'Show additional build configuration details.', example: 'git version --build-options' },
    ],
    examples: [
      { title: 'Check Git version', command: 'git version', output: 'git version 2.43.0' },
      { title: 'Alternative syntax', command: 'git --version', output: 'git version 2.43.0' },
    ],
    situations: [
      { description: 'Verifying Git is installed after setup', command: 'git version', explanation: 'If this prints a version number, Git is installed and in your PATH.' },
    ],
    mistakes: [],
    relatedCommands: ['help', 'config'],
    tips: [
      'git switch and git restore were added in Git 2.23. If you have an older version, you\'ll need to use git checkout.',
      'Sparse-checkout improvements arrived in Git 2.25+.',
    ],
    officialReference: 'https://git-scm.com/docs/git-version',
  },
];
