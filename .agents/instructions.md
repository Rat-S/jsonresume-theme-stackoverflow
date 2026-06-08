# Agent Instructions: JSON Resume Theme Stackoverflow

This document provides context, workflow rules, and testing guidelines for AI agents working on this repository (`jsonresume-theme-stackoverflow`).

---

## 📋 Context & Project Rules

1. **Primary Focus**: The goal of this fork is to optimize the theme for **PDF rendering/screen viewing** (via Puppeteer/resumed), maximizing layout density and professional aesthetics.
2. **Recent Redesigns**:
   * **Certificates**: Transitioned from a pilled cloud layout to a clean **2-column plain text bullet list** (`•`).
   * **Skills**: Transitioned from blocky pills/badges to a clean **2-column inline format** (`Category Name: Keyword1, Keyword2`).
   * **Basics & Contact Info**: 
     * Location has been moved inline on the same line as the email and phone inside the contact bar.
     * All contact items and social profiles are styled as **borderless pills/badges** with a soft background (`var(--color-background-alt)`).
     * Social profiles display cleaned URLs (e.g., `Jay S (linkedin.com/in/deadrat)`) rather than appending raw full links in print mode.
     * Print-color-adjust rules (`print-color-adjust: exact`) are enabled to ensure pill backgrounds render correctly in PDF exports.

---

## 🛠 Working & Testing Workflow

### 1. Build the Theme
Before any rendering or testing, always compile the Svelte components:
```bash
npm run build
```

### 2. Rendering Resumes (Always Use the `temp/` Directory)
Never output rendered PDFs, HTML, or PNG files directly in the root directory. Use the gitignored `temp/` directory for all rendering artifacts.

* **Render HTML**:
  ```bash
  npx resumed render temp/general-ally-tech.json --theme @deadrat/jsonresume-theme-stackoverflow -o temp/general-ally-tech-v<N>.html
  ```
* **Export PDF**:
  Always use the `--puppeteer-arg=--no-sandbox` flag to ensure Puppeteer runs correctly in all environment environments:
  ```bash
  npx resumed export temp/general-ally-tech.json --theme @deadrat/jsonresume-theme-stackoverflow -o temp/general-ally-tech-v<N>.pdf --puppeteer-arg=--no-sandbox
  ```
* **Convert PDF to PNG (for visual inspection)**:
  ```bash
  pdftoppm -png -r 150 temp/general-ally-tech-v<N>.pdf temp/general-ally-tech-page-v<N>
  ```

---

## 🧪 Jest Test Suites & Snapshots

The repository has automated tests checking HTML structures, section rendering, markdown support, and language localization.

* **Run all tests locally**:
  ```bash
  npm test
  ```
* **Snapshot Failures**:
  If Svelte markup, CSS class names, or component layouts change, the snapshot assertion tests in `test/SimpleTests.test.js` will fail.
  Update the Jest snapshots with the `-u` flag:
  ```bash
  npx jest -u
  ```
* **Git Status**:
  Ensure that you build (`npm run build`), update snapshots (`npx jest -u`), and run the full suite successfully before committing and pushing changes.
