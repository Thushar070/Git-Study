# GitAtlas — Interactive Git & GitHub Command Encyclopedia

**GitAtlas** is a production-grade, interactive documentation reference and learning platform for **Git & GitHub CLI** commands. Designed for software engineers, DevOps practitioners, and open-source contributors.

---

## 🌟 Key Features & Capabilities

- 📚 **Comprehensive Command Documentation**: 60+ fully documented Git & GitHub CLI commands with detailed syntax, options, real-world examples, danger levels, common mistakes, and official git-scm reference links.
- 🎨 **Interactive Visual Workflow Lab (`/visual-lab`)**: Interactive SVG visualizations for Git Architecture Lifecycle, Branching, 3-Way Merge, Rebase, Reset (`--soft`, `--mixed`, `--hard`), and Cherry-pick operations.
- 💡 **Situation-Based Command Finder (`/situations`)**: Search by real-world developer scenarios ("undo last commit", "recover deleted branch", "fix merge conflict") to receive immediate command recommendations and safe recovery instructions.
- 🚨 **Git Error Troubleshooting Guide (`/troubleshooting`)**: Diagnostic solver for common Git error messages (`detached HEAD`, `divergent branches`, `non-fast-forward`, `Permission denied (publickey)`).
- ⚡ **Interactive Terminal Simulator (`/terminal`)**: Practice Git commands in a safe, simulated browser terminal with live state tracking for working directory, staging index, branch pointers, and commit history.
- 🔍 **Global Fuzzy Search**: Instantly search commands, flags, situations, and errors via `/` or `Cmd+K` / `Ctrl+K`.
- 📊 **Side-by-Side Command Comparisons (`/compare`)**: Direct comparison tables for `reset` vs `revert`, `merge` vs `rebase`, `fetch` vs `pull`, and `restore` vs `checkout`.
- 🏆 **Structured Learning Path (`/learn`)**: 13-stage progressive curriculum from beginner to advanced Git internals with progress tracking.
- 📑 **Quick Reference Cheat Sheet (`/cheatsheet`)**: Filterable, copyable reference card organized by daily developer tasks.

---

## 🏗️ Architecture & Stack

- **Frontend Core**: React 19 + TypeScript + Vite
- **Styling**: Vanilla CSS with custom properties & design tokens (Dark-first aesthetic)
- **Icons**: Lucide React + custom SVG graphics
- **State & Storage**: `localStorage` persistence for favorites, recently viewed commands, and learning progress
- **Deployment**: Netlify SPA ready (`netlify.toml` + `public/_redirects`)

---

## 🛠️ Local Development & Build

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### Getting Started

```bash
# Clone the repository
git clone https://github.com/Thushar070/Git-Study.git
cd Git-Study

# Install dependencies
npm install

# Start local development server
npm run dev
```

### Type Check & Build

```bash
# Run TypeScript verification
npx tsc --noEmit

# Build production bundle
npm run build
```

---

## 🚀 Netlify Deployment

The project is pre-configured for one-click Netlify SPA deployment:

- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Redirects**: Handled via `netlify.toml` and `public/_redirects`

---

## 📜 License

Built for developers worldwide as an open-source learning reference.
