// ============================================================
// GitAtlas — GitHub CLI Secrets, Gists & Utility Commands
// gh secret set, gh gist create, gh label create, gh project view, gh codespace create
// ============================================================

import type { GitCommand } from '../../types';

export const githubCliToolsCommands: GitCommand[] = [
  {
    id: 'gh-secret-set',
    name: 'secret set',
    executable: 'gh',
    category: 'GitHub CLI',
    subcategory: 'Secrets & Security',
    type: 'github-cli',
    difficulty: 'intermediate',
    dangerLevel: 'caution',
    summary: 'Create or update secrets on GitHub',
    description: 'gh secret set encrypts and uploads environment variables or API keys directly to GitHub repository or organization secrets for use in GitHub Actions CI/CD workflows.',
    whyItExists: 'Managing secret environment variables in web UI requires manual copy-pasting. gh secret set allows developers and DevOps engineers to pipe secrets programmatically.',
    whenToUse: [
      'Configuring API tokens, credentials, or SSH keys for GitHub Actions workflows',
      'Updating production secrets securely from local CLI environment variables',
      'Automating secret provisioning across multiple repository repositories',
    ],
    whenNotToUse: [
      'Committing secrets in code files — secrets should never be committed into Git history',
    ],
    syntax: [
      'gh secret set <secret-name> [flags]',
      'gh secret set <secret-name> --body <value>',
      'gh secret set <secret-name> < <file>',
    ],
    options: [
      { flag: '-b', shortFlag: '--body=<value>', description: 'Pass secret value directly as argument string.', example: 'gh secret set API_KEY -b "sk_test_12345"', whenUseful: 'Setting simple non-multiline string secrets' },
      { flag: '-e', shortFlag: '--env=<environment>', description: 'Set secret scoped to a specific deployment environment.', example: 'gh secret set DB_PASS --env=production', whenUseful: 'Setting environment-specific secrets' },
      { flag: '-o', shortFlag: '--org=<organization>', description: 'Set organization-level secret accessible across multiple repos.', example: 'gh secret set AWS_KEY --org=my-org', whenUseful: 'Managing org-wide deployment credentials' },
    ],
    examples: [
      { title: 'Set secret from stdin', command: 'echo "my_api_key_value" | gh secret set API_KEY', output: '✓ Set secret API_KEY for user/repo' },
      { title: 'Set secret from file', command: 'gh secret set DEPLOY_KEY < ~/.ssh/id_rsa', output: '✓ Set secret DEPLOY_KEY for user/repo' },
    ],
    situations: [
      { description: 'Injecting NPM publish token into GitHub Actions repository secrets', command: 'gh secret set NPM_TOKEN -b "$NPM_AUTH_TOKEN"', explanation: 'Encrypts NPM_TOKEN and securely stores it in GitHub repo settings for CI.' },
    ],
    mistakes: [
      'Exposing secret values in terminal history by typing plain text in bash commands — pipe via stdin or use environment variables.',
    ],
    tips: [
      'Verify set secret existence with `gh secret list`.',
    ],
    relatedCommands: ['gh-workflow-run', 'gh-repo-create'],
    comparisonCommands: ['gh-repo-create'],
    officialReference: 'https://cli.github.com/manual/gh_secret_set',
  },

  {
    id: 'gh-gist-create',
    name: 'gist create',
    executable: 'gh',
    category: 'GitHub CLI',
    subcategory: 'Gists',
    type: 'github-cli',
    difficulty: 'beginner',
    dangerLevel: 'safe',
    summary: 'Create a new GitHub Gist',
    description: 'gh gist create uploads code snippets, text files, or console logs to GitHub Gists, returning a shareable web URL.',
    whyItExists: 'Sharing quick code snippets, terminal logs, or configuration files via chat or email is easier when uploaded to a GitHub Gist.',
    whenToUse: [
      'Sharing code snippets, logs, or patch files with colleagues',
      'Publishing single-file code examples publicly',
      'Creating secret Gists for temporary data exchange',
    ],
    whenNotToUse: [
      'Full multi-file projects requiring branch history — use gh repo create instead',
    ],
    syntax: [
      'gh gist create [<filename>...] [flags]',
      'gh gist create --public file.txt',
      'echo "code" | gh gist create',
    ],
    options: [
      { flag: '--public', description: 'Create a public Gist visible to everyone (default is secret/unlisted).', example: 'gh gist create snippet.py --public', whenUseful: 'Publishing public code snippets' },
      { flag: '-d', shortFlag: '--desc=<description>', description: 'Add a description message for the Gist.', example: 'gh gist create script.js -d "Utility script"', whenUseful: 'Adding descriptive context to Gists' },
      { flag: '-w', shortFlag: '--web', description: 'Open the created Gist in web browser after upload.', example: 'gh gist create log.txt -w', whenUseful: 'Immediately viewing Gist on GitHub website' },
    ],
    examples: [
      { title: 'Create a secret Gist from a file', command: 'gh gist create script.py -d "Data processing script"', output: 'https://gist.github.com/user/a1b2c3d4e5f6' },
      { title: 'Pipe terminal log into a new Gist', command: 'npm test 2>&1 | gh gist create -d "Test build failure log"', output: 'https://gist.github.com/user/987654321' },
    ],
    situations: [
      { description: 'Sharing a 500-line build log with a remote teammate', command: 'npm run build 2>&1 | gh gist create -d "Build Log" -w', explanation: 'Uploads log to GitHub Gist and opens URL in browser for instant sharing.' },
    ],
    mistakes: [
      'Forgetting that "secret" Gists on GitHub are unlisted (accessible via URL) but not encrypted.',
    ],
    tips: [
      'List your existing Gists with `gh gist list`.',
    ],
    relatedCommands: ['gh-repo-create', 'send-email'],
    comparisonCommands: ['gh-repo-create'],
    officialReference: 'https://cli.github.com/manual/gh_gist_create',
  },

  {
    id: 'gh-label-create',
    name: 'label create',
    executable: 'gh',
    category: 'GitHub CLI',
    subcategory: 'Issue & PR Tracking',
    type: 'github-cli',
    difficulty: 'beginner',
    dangerLevel: 'safe',
    summary: 'Create a new issue/PR label',
    description: 'gh label create adds a new colored label to a GitHub repository for categorizing Issues and Pull Requests.',
    whyItExists: 'Managing project issue labels in web browser UI requires individual form inputs. `gh label create` allows batch scripting and standardization of labels across projects.',
    whenToUse: [
      'Setting up standard issue labels (e.g. `type: bug`, `status: blocked`) across new repositories',
      'Automating repository setup scripts for team projects',
    ],
    whenNotToUse: [
      'Applying labels to specific issues — use `gh issue edit --add-label` instead',
    ],
    syntax: [
      'gh label create <name> [flags]',
      'gh label create <name> --color <hex> --description <text>',
    ],
    options: [
      { flag: '-c', shortFlag: '--color=<hex>', description: 'Specify 6-digit hex color code (without # prefix).', example: 'gh label create "type: bug" -c "d73a4a"', whenUseful: 'Color-coding issue tags' },
      { flag: '-d', shortFlag: '--description=<text>', description: 'Add description explaining label usage.', example: 'gh label create "good first issue" -d "Suitable for newcomers"', whenUseful: 'Clarifying label purpose for contributors' },
      { flag: '-f', shortFlag: '--force', description: 'Overwrite existing label with same name if it already exists.', example: 'gh label create bug -c "ff0000" --force', whenUseful: 'Updating label colors across repos' },
    ],
    examples: [
      { title: 'Create a custom bug label', command: 'gh label create "type: bug" --color "d73a4a" --description "Something isn\'t working"', output: '✓ Created label "type: bug" in user/repo' },
    ],
    situations: [
      { description: 'Bootstrapping standard team labels on a newly created repo', command: 'gh label create "needs-review" -c "fbca04" -d "Waiting on PR review"', explanation: 'Creates labeled tag in GitHub repo configuration.' },
    ],
    mistakes: [
      'Including `#` prefix in color hex values — pass 6-character hex strings like `d73a4a`.',
    ],
    tips: [
      'List all repository labels with `gh label list`.',
    ],
    relatedCommands: ['gh-issue-create', 'gh-pr-create'],
    comparisonCommands: ['gh-issue-create'],
    officialReference: 'https://cli.github.com/manual/gh_label_create',
  },

  {
    id: 'gh-project-view',
    name: 'project view',
    executable: 'gh',
    category: 'GitHub CLI',
    subcategory: 'Projects & Planning',
    type: 'github-cli',
    difficulty: 'intermediate',
    dangerLevel: 'safe',
    summary: 'View a GitHub Project board',
    description: 'gh project view displays details, items, fields, and progress metrics for GitHub Projects (v2) planning boards.',
    whyItExists: 'Engineering teams track roadmap items on GitHub Projects boards. `gh project view` provides CLI visibility into project items and task columns.',
    whenToUse: [
      'Inspecting sprint planning items from the terminal',
      'Checking status of items on GitHub Projects boards',
      'Printing project summaries in terminal scripts',
    ],
    whenNotToUse: [
      'Managing single issues — use `gh issue view` instead',
    ],
    syntax: [
      'gh project view [<number>] [flags]',
      'gh project view <number> --owner <org>',
    ],
    options: [
      { flag: '--owner=<user|org>', description: 'Specify project owner (user or organization).', example: 'gh project view 1 --owner=my-org', whenUseful: 'Viewing organization-level project boards' },
      { flag: '--format=<json>', description: 'Output project details in JSON format for parsing.', example: 'gh project view 1 --format=json', whenUseful: 'Extracting project data in scripts' },
      { flag: '-w', shortFlag: '--web', description: 'Open project board in web browser.', example: 'gh project view 1 -w', whenUseful: 'Navigating to full interactive board' },
    ],
    examples: [
      { title: 'View project board summary', command: 'gh project view 1 --owner=my-org', output: 'Title: Q3 Roadmap\nItems: 14 open, 28 completed...' },
    ],
    situations: [
      { description: 'Checking current active sprint project items in terminal', command: 'gh project view 2 --owner=my-org', explanation: 'Outputs project board title, columns, and item status.' },
    ],
    mistakes: [
      'Forgetting `--owner` parameter when viewing organization project boards.',
    ],
    tips: [
      'List all organization project boards with `gh project list --owner=my-org`.',
    ],
    relatedCommands: ['gh-issue-list', 'gh-pr-list'],
    comparisonCommands: ['gh-issue-list'],
    officialReference: 'https://cli.github.com/manual/gh_project_view',
  },

  {
    id: 'gh-codespace-create',
    name: 'codespace create',
    executable: 'gh',
    category: 'GitHub CLI',
    subcategory: 'Codespaces',
    type: 'github-cli',
    difficulty: 'intermediate',
    dangerLevel: 'safe',
    summary: 'Create a cloud Codespace environment',
    description: 'gh codespace create provisions a cloud-hosted development environment (GitHub Codespaces) for a repository, configuring machine specs, devcontainer containers, and SSH/VS Code connections.',
    whyItExists: 'GitHub Codespaces provides instant cloud dev environments. `gh codespace create` provisions machines directly from terminal workflows.',
    whenToUse: [
      'Setting up a cloud dev environment without local installation',
      'Testing PRs or branches in clean containerized cloud VMs',
      'Provisioning powerful cloud machines for heavy builds',
    ],
    whenNotToUse: [
      'Developing on your local filesystem — use standard local Git workflows',
    ],
    syntax: [
      'gh codespace create [flags]',
      'gh codespace create -r <repo> -b <branch>',
    ],
    options: [
      { flag: '-r', shortFlag: '--repo=<repository>', description: 'Repository to create Codespace for.', example: 'gh codespace create -r owner/repo', whenUseful: 'Creating cloud dev environment for specific repo' },
      { flag: '-b', shortFlag: '--branch=<branch>', description: 'Branch to checkout in new Codespace.', example: 'gh codespace create -r owner/repo -b feature', whenUseful: 'Working on specific branch in cloud VM' },
      { flag: '-m', shortFlag: '--machine=<type>', description: 'Specify machine type (e.g. 2-core, 4-core, 8-core).', example: 'gh codespace create -m 4core', whenUseful: 'Selecting higher hardware specs for heavy builds' },
    ],
    examples: [
      { title: 'Create Codespace for current repository', command: 'gh codespace create', output: '✓ Created codespace dev-sandbox-12345' },
    ],
    situations: [
      { description: 'Instantly spinning up a 8-core cloud machine to test a heavy build PR', command: 'gh codespace create -r org/heavy-repo -b fix-bug -m 8core', explanation: 'Provisions 8-core cloud VM on GitHub Codespaces for the repo branch.' },
    ],
    mistakes: [
      'Leaving inactive Codespaces running continuously — idle Codespaces consume storage quotas.',
    ],
    tips: [
      'Connect to a running Codespace via SSH using `gh codespace ssh`.',
    ],
    relatedCommands: ['gh-repo-clone', 'gh-pr-checkout'],
    comparisonCommands: ['gh-repo-clone'],
    officialReference: 'https://cli.github.com/manual/gh_codespace_create',
  }
];
