#!/usr/bin/env node

const fs = require('node:fs/promises');
const path = require('node:path');
const { execSync } = require('node:child_process');

function getGlobalNpmRoot() {
  try {
    return execSync('npm root -g', { encoding: 'utf-8' }).trim();
  } catch {
    return null;
  }
}

async function loadPuppeteer() {
  // 1. Try standard require
  try {
    return require('puppeteer');
  } catch {
    // Continue
  }

  // 2. Try resolving with search paths (cwd, theme dir, global npm root, home .npm-global)
  const searchPaths = [
    process.cwd(),
    __dirname,
    path.join(__dirname, '..'),
    getGlobalNpmRoot(),
    path.join(process.env.HOME || '', '.npm-global/lib/node_modules'),
    '/usr/local/lib/node_modules',
  ].filter(Boolean);

  for (const basePath of searchPaths) {
    try {
      const resolved = require.resolve('puppeteer', { paths: [basePath] });
      return require(resolved);
    } catch {
      // Continue searching
    }
  }

  // 3. Try dynamic import as fallback
  try {
    const mod = await import('puppeteer');
    return mod.default || mod;
  } catch {
    console.error(
      '\x1b[31mError: Could not load "puppeteer". Please install it via "npm install -D puppeteer" or "npm install -g puppeteer".\x1b[0m'
    );
    process.exit(1);
  }
}

function parseArgs(args) {
  const options = {
    file: 'resume.json',
    output: null,
    singlePage: null,
    multiPage: false,
    width: null,
    height: null,
    format: null,
    puppeteerArgs: [],
  };

  const positional = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--single-page' || arg === '-s') {
      options.singlePage = true;
    } else if (arg === '--multi-page' || arg === '-m') {
      options.multiPage = true;
      options.singlePage = false;
    } else if (arg === '-o' || arg === '--output') {
      options.output = args[++i];
    } else if (arg === '-w' || arg === '--width') {
      options.width = args[++i];
    } else if (arg === '-h' || arg === '--height') {
      options.height = args[++i];
    } else if (arg === '-f' || arg === '--format') {
      options.format = args[++i];
    } else if (arg.startsWith('--puppeteer-arg=')) {
      options.puppeteerArgs.push(arg.split('=')[1]);
    } else if (arg === '--puppeteer-arg') {
      options.puppeteerArgs.push(args[++i]);
    } else if (arg === '--help') {
      printHelp();
      process.exit(0);
    } else if (!arg.startsWith('-')) {
      positional.push(arg);
    }
  }

  if (positional.length > 0) {
    options.file = positional[0];
  }
  if (positional.length > 1 && !options.output) {
    options.output = positional[1];
  }

  return options;
}

function printHelp() {
  console.log(`
Usage: folio-export [resume.json] [output.pdf] [options]

Options:
  -s, --single-page       Render exact-height single-page PDF (zero bottom whitespace)
  -m, --multi-page        Render standard multi-page PDF (default unless singlePage is set in JSON)
  -o, --output <file>     Output PDF filename (default: <filename>.pdf)
  -w, --width <width>     Target page width (default: "240mm" for single-page)
  -h, --height <height>   Target page height (e.g. "330mm", "297mm")
  -f, --format <format>   Paper format (e.g. "A4", "Letter")
  --puppeteer-arg <arg>   Additional args to pass to Puppeteer launch
  --help                  Show this help message
`);
}

async function run() {
  const cliOpts = parseArgs(process.argv.slice(2));
  const resumePath = path.resolve(process.cwd(), cliOpts.file);

  let rawResume;
  try {
    rawResume = await fs.readFile(resumePath, 'utf-8');
  } catch (err) {
    console.error(`\x1b[31mError: Could not read resume file at ${resumePath}\x1b[0m`);
    process.exit(1);
  }

  const resume = JSON.parse(rawResume);
  const outputPath = cliOpts.output || `${path.basename(cliOpts.file, path.extname(cliOpts.file))}.pdf`;

  // Import theme render function and options from dist/index.js
  const themeDistPath = path.resolve(__dirname, '../dist/index.js');
  const themeModule = require(themeDistPath);
  const { render, pdfRenderOptions: themePdfRenderOptions = {} } = themeModule;

  const html = render(resume);

  // Determine single page vs multi page
  // Priority: CLI flag > resume.meta.singlePage > (resume.meta.pdfRenderOptions.height === 'auto') > default (false)
  let isSinglePage = false;
  if (cliOpts.singlePage !== null) {
    isSinglePage = cliOpts.singlePage;
  } else if (resume.meta?.singlePage !== undefined) {
    isSinglePage = Boolean(resume.meta.singlePage);
  } else if (resume.meta?.pdfRenderOptions?.height === 'auto') {
    isSinglePage = true;
  }

  const puppeteer = await loadPuppeteer();
  const launchArgs = ['--no-sandbox', '--disable-setuid-sandbox', ...cliOpts.puppeteerArgs];

  const browser = await puppeteer.launch({
    args: launchArgs,
    headless: 'new',
  });

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    let pdfOptions = {
      printBackground: true,
      ...themePdfRenderOptions,
      ...resume.meta?.pdfRenderOptions,
    };

    if (cliOpts.format) pdfOptions.format = cliOpts.format;
    if (cliOpts.width) pdfOptions.width = cliOpts.width;
    if (cliOpts.height) pdfOptions.height = cliOpts.height;

    if (isSinglePage) {
      const targetWidth = cliOpts.width || pdfOptions.width || '240mm';
      
      // Calculate exact rendered height of the body/content
      const contentHeight = await page.evaluate(() => {
        const body = document.body;
        const html = document.documentElement;
        return Math.max(
          body.scrollHeight,
          body.offsetHeight,
          html.clientHeight,
          html.scrollHeight,
          html.offsetHeight
        );
      });

      pdfOptions.width = targetWidth;
      // Add padding for top/bottom margins (default ~10-15px buffer)
      const topMargin = pdfOptions.margin?.top ? 12 : 0;
      const bottomMargin = pdfOptions.margin?.bottom ? 12 : 0;
      pdfOptions.height = `${contentHeight + topMargin + bottomMargin + 10}px`;
      delete pdfOptions.format;

      console.log(`\x1b[36mExporting single-page PDF (width: ${pdfOptions.width}, exact height: ${pdfOptions.height})...\x1b[0m`);
    } else {
      console.log(`\x1b[36mExporting multi-page PDF...\x1b[0m`);
    }

    const pdfBuffer = await page.pdf(pdfOptions);
    await fs.writeFile(outputPath, pdfBuffer);

    console.log(`\x1b[32mSuccessfully exported resume to \x1b[1m${outputPath}\x1b[0m 🚀`);
  } finally {
    await browser.close();
  }
}

run().catch((err) => {
  console.error('\x1b[31mExport failed:\x1b[0m', err);
  process.exit(1);
});
