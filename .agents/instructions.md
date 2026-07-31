# Agent Instructions: jsonresume-theme-folio

This document provides context, workflow rules, and testing guidelines for AI agents working on this repository (`jsonresume-theme-folio`).

> **Package**: [`jsonresume-theme-folio`](https://www.npmjs.com/package/jsonresume-theme-folio) on npm
> **GitHub**: [`Rat-S/jsonresume-theme-folio`](https://github.com/Rat-S/jsonresume-theme-folio)
> **History**: Originally forked from [`phoinixi/jsonresume-theme-stackoverflow`](https://github.com/phoinixi/jsonresume-theme-stackoverflow), now an independent theme.

---

## 📋 Context & Project Rules

1. **Primary Focus**: Optimize the theme for **PDF rendering/screen viewing** (via Puppeteer/resumed), maximizing layout density and professional aesthetics.
2. **Recent Redesigns**:
   - **Header**: Name and job label are on the **same line** separated by a `|` pipe separator. On screens < 601px they stack vertically.
   - **Contact Bar**: Email, phone, location, website, and **all social profiles** are merged into a single `.contact-bar` flex row. Social profiles appear **first** in the row.
   - **Custom Networks**: Non-brand social networks like `interactive-resume`, `portfolio`, `globe`, and `website` are supported with `fa-solid` icons. The `interactive-resume` network gets a highlighted pill (accent border + background).
   - **Certificates**: 2-column plain text bullet list (`•`) — no pills.
   - **Skills**: 2-column inline format (`Category Name: Keyword1, Keyword2`) — no pills.
   - **Print Density**: Reduced margins in `SectionHeader.svelte`, `TimelineItem.svelte`, `KeywordList.svelte`, and PDF margins in `build.js` (`0.6cm`) for tight 3-page layouts.
   - **Social Profile URLs**: Cleaned display (e.g., `Jay S (linkedin.com/in/deadrat)`) — no raw full links in print mode.
   - **Print Color**: `print-color-adjust: exact` enabled so pill backgrounds render correctly in PDF exports.

---

## 🛠 Working & Testing Workflow

### 1. Build the Theme

Before any rendering or testing, always compile the Svelte components:

```bash
npm run build
```

### 2. Rendering Resumes (Always Use the `temp/` Directory)

Never output rendered PDFs, HTML, or PNG files directly in the root directory. Use the gitignored `temp/` directory for all rendering artifacts.

- **Render HTML**:
  ```bash
  npx resumed render temp/<resume>.json --theme jsonresume-theme-folio -o temp/<resume>-v<N>.html
  ```
- **Export PDF**:
  Always use the `--puppeteer-arg=--no-sandbox` flag to ensure Puppeteer runs correctly in all environments:
  ```bash
  npx resumed export temp/<resume>.json --theme jsonresume-theme-folio -o temp/<resume>-v<N>.pdf --puppeteer-arg=--no-sandbox
  ```
- **Convert PDF to PNG (for visual inspection)**:
  ```bash
  pdftoppm -png -r 150 temp/<resume>-v<N>.pdf temp/<resume>-page-v<N>
  ```

---

## 🧪 Jest Test Suites & Snapshots

The repository has automated tests checking HTML structures, section rendering, markdown support, and language localization.

- **Run all tests locally**:
  ```bash
  npm test
  ```
- **Snapshot Failures**:
  If Svelte markup, CSS class names, or component layouts change, the snapshot assertion tests in `test/SimpleTests.test.js` will fail.
  Update the Jest snapshots with:
  ```bash
  npm run updateTestSnapshots
  ```
- **Git Status**:
  Ensure that you build (`npm run build`), update snapshots (`npm run updateTestSnapshots`), and run the full suite successfully before committing and pushing.

---

## 🚀 Release Workflow

Releases are **fully automated** via GitHub Actions + `semantic-release`.

- **How it works**: Push a commit to `main` with a [Conventional Commit](https://www.conventionalcommits.org/) message. CI runs tests, builds, and publishes to npm automatically.
- **Version bump rules**:
  Maybe stick to SemVer ?

- **npm auth**: Uses **OIDC Trusted Publishing** — no `NPM_TOKEN` secret needed. Configured at npmjs.com/package/jsonresume-theme-folio → Settings → Trusted Publishers.
