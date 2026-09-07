# GitAtlas — Interactive Git and GitHub Command Reference

GitAtlas is a production-grade interactive documentation, visual learning platform, and reference encyclopedia for Git and GitHub CLI commands. Designed for software engineers, DevOps practitioners, and open-source contributors.

---

## Features

- **Comprehensive Command Reference**: 60+ fully documented Git and GitHub CLI commands with detailed syntax, options, real-world examples, danger levels, common mistakes, and official git-scm reference links.
- **Interactive Visual Workflow Lab**: Visualizations for Git Architecture Lifecycle, Branching, 3-Way Merge, Rebase, Reset (`--soft`, `--mixed`, `--hard`), and Cherry-pick operations.
- **Situation-Based Command Finder**: Search by real-world developer scenarios ("undo last commit", "recover deleted branch", "fix merge conflict") to receive immediate command recommendations and safe recovery instructions.
- **Git Error Troubleshooting Guide**: Diagnostic solver for common Git error messages (`detached HEAD`, `divergent branches`, `non-fast-forward`, `Permission denied (publickey)`).
- **Interactive Terminal Simulator**: Practice Git commands in a safe, simulated browser terminal with live state tracking for working directory, staging index, branch pointers, and commit history.
- **Global Fuzzy Search**: Instantly search commands, flags, situations, and errors via `/` or `Cmd+K` / `Ctrl+K`.
- **Side-by-Side Command Comparisons**: Direct comparison tables for `reset` vs `revert`, `merge` vs `rebase`, `fetch` vs `pull`, and `restore` vs `checkout`.
- **Structured Learning Path**: 13-stage progressive curriculum from beginner to advanced Git internals with progress tracking.
- **Quick Reference Cheat Sheet**: Filterable, copyable reference card organized by daily developer tasks.

---

## Application Modules

| Route | Feature Module | Description |
| :--- | :--- | :--- |
| `/` | Landing Dashboard | Overview of GitAtlas capabilities and quick navigation cards. |
| `/git` | Git Command Encyclopedia | Comprehensive index of core Git commands grouped by workflow category. |
| `/github` | GitHub CLI Guide | Dedicated reference for official `gh` CLI commands and flags. |
| `/visual-lab` | Visual Workflow Lab | Interactive SVG visualizer for Git branches, merges, rebases, and resets. |
| `/situations` | Situation Finder | Real-world problem solver mapped to safe resolution command steps. |
| `/cheatsheet` | Quick Cheat Sheet | High-density copyable syntax reference for daily developer tasks. |
| `/terminal` | Terminal Playground | Browser-based interactive Git terminal simulator supporting 18+ commands. |
| `/reference/command-index` | A-Z Command Index | Complete searchable matrix of all registered Git and GitHub commands. |
| `/compare` | Command Comparisons | Structural comparison guides highlighting differences and trade-offs. |
| `/troubleshooting` | Error Solver | Error message diagnostic guide with cause analyses and fix steps. |
| `/learn` | Learning Path | Step-by-step interactive curriculum from basic commits to advanced rebasing. |
| `/reference/glossary` | Git Terms Glossary | Definitive glossary of Git internal concepts, refs, trees, and blobs. |

---

## Tech Stack & Architecture

- **Framework**: React 19, TypeScript, Vite
- **Routing**: React Router DOM (Single Page Application architecture with SPA redirect fallbacks)
- **Styling**: Vanilla CSS design system using CSS custom properties (dark-first aesthetic)
- **Iconography**: Lucide React and custom SVG graphics
- **State & Storage**: Browser `localStorage` persistence for bookmarks, recent views, and learning progress
- **Build Tooling**: Vite client environment with LightningCSS integration

---

## Local Development Setup

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/Thushar070/Git-Study.git
   cd Git-Study
   ```

2. Install project dependencies:
   ```bash
   npm install
   ```

3. Start local development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

---

## Build and Quality Verification

To verify TypeScript types and generate the production bundle:

```bash
# Type check without emitting files
npx tsc --noEmit

# Build production bundle
npm run build
```

The output will be generated inside the `dist/` directory.

---

## Deployment Configuration

This repository is pre-configured for automated single-page application (SPA) deployment on Netlify:

- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Configuration Files**: `netlify.toml` and `public/_redirects` handle SPA fallback routing (`/* -> /index.html 200`).

---

## Project Structure

```
Git-Study/
├── public/
│   ├── favicon.svg          # Custom GitAtlas brand icon
│   └── _redirects           # Netlify SPA redirect rules
├── src/
│   ├── components/          # Reusable UI components (CodeBlock, Header, Sidebar, etc.)
│   ├── data/                # Documentation dataset (commands, cheatsheet, situations, etc.)
│   ├── lib/                 # Utility functions and storage helpers
│   ├── pages/               # Application view routes (CheatSheet, TerminalPlayground, etc.)
│   ├── App.tsx              # Root component & router layout definition
│   ├── App.css              # Design system styling & responsive utility classes
│   └── main.tsx             # Client entrypoint
├── netlify.toml             # Netlify deployment configuration
├── package.json             # Project dependencies and npm scripts
├── tsconfig.json            # TypeScript compiler configuration
└── vite.config.ts           # Vite build pipeline setup
```

---

## License

Created for software developers worldwide as an open-source reference guide.
