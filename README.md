# jsonresume-theme-folio

> A compact, print-optimized [JSON Resume](https://jsonresume.org/) theme for professionals.
> Clean inline header, unified contact bar, custom network highlights, and PDF-first layout.

[![npm version](https://img.shields.io/npm/v/jsonresume-theme-folio)](https://www.npmjs.com/package/jsonresume-theme-folio)
[![license](https://img.shields.io/npm/l/jsonresume-theme-folio)](https://github.com/Rat-S/jsonresume-theme-folio/blob/main/LICENSE)

---

## ✨ Features

- **Compact header** — Name and job title inline on one line, contact details and social profiles in a unified flex row
- **Custom network highlights** — Supports non-brand networks like `interactive-resume` with accent-color pill highlighting
- **PDF-first** — Tight print margins and `print-color-adjust` rules for crisp Puppeteer/PDF exports
- **Svelte SSR** — Server-side rendered with Svelte 5 for clean, zero-JS HTML output
- **Dark mode** — Automatic light/dark theme via `prefers-color-scheme`
- **Internationalization** — 12 languages supported out of the box
- **Customizable themes** — Override colors and fonts via `resume.json` meta field
- **Section ordering** — Reorder resume sections via `meta.theme.sectionOrder`
- **Override CSS** — Drop in an `override.css` for full control

---

## 📦 Installation

```bash
npm install jsonresume-theme-folio
```

Point your `resume.json` at the theme:

```json
{
  "meta": {
    "theme": "jsonresume-theme-folio"
  }
}
```

### With `resumed` (recommended)

```bash
# Render HTML
npx resumed render resume.json --theme jsonresume-theme-folio -o resume.html

# Export PDF (use --no-sandbox in CI/containerized environments)
npx resumed export resume.json --theme jsonresume-theme-folio -o resume.pdf --puppeteer-arg=--no-sandbox
```

### Programmatic Usage

```js
const theme = require("jsonresume-theme-folio");
const resume = require("./resume.json");

// Optional: set language (default: "en-gb")
theme.changeLanguage("de");

const html = theme.render(resume);
```

---

## 🎨 Custom Network Highlights

In addition to standard brand icons (LinkedIn, GitHub, Twitter, etc.), this theme supports custom non-brand networks with solid icons:

| Network value        | Icon                      | Style                                       |
| -------------------- | ------------------------- | ------------------------------------------- |
| `interactive-resume` | `fa-solid fa-laptop-code` | ✨ Highlighted (accent border + background) |
| `portfolio`          | `fa-solid fa-globe`       | Accent color                                |
| `globe`              | `fa-solid fa-globe`       | Accent color                                |
| `website`            | `fa-solid fa-globe`       | Accent color                                |

Example in `resume.json`:

```json
{
  "basics": {
    "profiles": [
      {
        "network": "interactive-resume",
        "username": "My Interactive Resume",
        "url": "https://yoursite.com/"
      }
    ]
  }
}
```

---

## 🎨 Theme Customization

Customize colors and fonts by adding a `theme` object inside `meta` in your `resume.json`:

```json
{
  "meta": {
    "theme": {
      "primaryColor": "#2563eb",
      "textColor": "#1e293b",
      "backgroundColor": "#ffffff",
      "fontFamily": "\"Inter\", sans-serif",
      "linkColor": "#2563eb",
      "headingColor": "#0f172a"
    }
  }
}
```

### Available theme properties

| Property             | CSS Variable             | Description                       |
| -------------------- | ------------------------ | --------------------------------- |
| `primaryColor`       | `--color-accent`         | Section titles, accents           |
| `textColor`          | `--color-text`           | Main body text                    |
| `textSecondaryColor` | `--color-text-secondary` | Secondary text (companies, dates) |
| `headingColor`       | `--color-heading`        | Heading color                     |
| `linkColor`          | `--color-link`           | Link color                        |
| `backgroundColor`    | `--color-background`     | Page background                   |
| `backgroundAltColor` | `--color-background-alt` | Summary section background        |
| `borderColor`        | `--color-border`         | Border colors                     |
| `keywordTextColor`   | `--color-keyword-text`   | Skill/keyword tag text            |
| `keywordBgColor`     | `--color-keyword-bg`     | Skill/keyword tag background      |
| `fontFamily`         | `--font-family`          | Base font family                  |

### Override CSS

For full CSS control, create an `override.css` file alongside your resume. The theme automatically loads it via `<link rel="stylesheet" href="./override.css">`.

---

## 📑 Section Ordering

Control the order of resume sections by adding a `sectionOrder` array to `meta.theme`:

```json
{
  "meta": {
    "theme": {
      "sectionOrder": ["basics", "work", "skills", "education", "projects"]
    }
  }
}
```

### Available sections

`basics`, `skills`, `work`, `projects`, `volunteer`, `education`, `awards`, `certificates`, `publications`, `languages`, `interests`, `references`

**Default order:** basics → work → education → projects → volunteer → awards → certificates → publications → skills → languages → interests → references

Only sections listed in `sectionOrder` will be rendered. Omit sections to hide them, or include all for full control over ordering.

---

## 🛠 Development

```bash
git clone https://github.com/Rat-S/jsonresume-theme-folio.git
cd jsonresume-theme-folio
npm install
npm run build
npm test
```

---

> Originally forked from the [phoinixi/jsonresume-theme-stackoverflow](https://github.com/phoinixi/jsonresume-theme-stackoverflow).
