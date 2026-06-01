#!/usr/bin/env node
// weloop-init — scaffold a WeLoop-ready project or wire WeLoop into an existing one.
// Usage:  npx weloop-init
//         node node_modules/weloop-components/scripts/init.mjs

import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';

// ─── Terminal colours ─────────────────────────────────────────────────────────
const c = {
  reset:  '\x1b[0m',
  bold:   '\x1b[1m',
  dim:    '\x1b[2m',
  cyan:   '\x1b[36m',
  green:  '\x1b[32m',
  yellow: '\x1b[33m',
  blue:   '\x1b[34m',
  red:    '\x1b[31m',
  gray:   '\x1b[90m',
};
const bold   = s => `${c.bold}${s}${c.reset}`;
const cyan   = s => `${c.cyan}${s}${c.reset}`;
const green  = s => `${c.green}${s}${c.reset}`;
const yellow = s => `${c.yellow}${s}${c.reset}`;
const dim    = s => `${c.dim}${s}${c.reset}`;
const gray   = s => `${c.gray}${s}${c.reset}`;

// ─── Readline prompt helper — works in both TTY and piped (CI) modes ─────────
import { createInterface as _rl } from 'readline';

const lineQueue = [];
const lineWaiters = [];

process.stdin.on('data', chunk => {
  chunk.toString().split('\n').forEach(raw => {
    const line = raw.replace(/\r$/, '').trim();
    if (lineWaiters.length > 0) {
      lineWaiters.shift()(line);
    } else {
      lineQueue.push(line);
    }
  });
});
process.stdin.resume();

function ask(prompt) {
  process.stdout.write(prompt);
  return new Promise(res => {
    if (lineQueue.length > 0) {
      res(lineQueue.shift());
    } else {
      lineWaiters.push(res);
    }
  });
}

const rl = { close: () => process.stdin.destroy() };

async function choose(prompt, options) {
  while (true) {
    console.log(`\n${bold(prompt)}`);
    options.forEach((o, i) => console.log(`  ${cyan(i + 1 + '.')} ${o}`));
    const ans = await ask(`\n${gray('Enter number')} › `);
    const n = parseInt(ans, 10);
    if (n >= 1 && n <= options.length) return n - 1;
    console.log(yellow('  Please enter a valid number.'));
  }
}

// ─── File writer helper ───────────────────────────────────────────────────────
const created = [];
function write(filePath, content) {
  mkdirSync(filePath.replace(/\/[^/]+$/, ''), { recursive: true });
  writeFileSync(filePath, content, 'utf-8');
  created.push(filePath);
}

// ─── Template: animation CSS (goes in index.html) ────────────────────────────
const ANIMATION_CSS = `
  /* WeLoop — Toast animations */
  @keyframes wl-toast-in  { from { opacity:0; transform:translateY(8px) scale(0.95); } to { opacity:1; transform:translateY(0) scale(1); } }
  @keyframes wl-toast-out { from { opacity:1; transform:translateY(0)   scale(1);    } to { opacity:0; transform:translateY(8px) scale(0.95); } }
  .wl-toast[data-state="open"]   { animation: wl-toast-in  0.25s ease; }
  .wl-toast[data-state="closed"] { animation: wl-toast-out 0.18s ease; }

  /* WeLoop — Snackbar animations */
  @keyframes wl-snackbar-in-up    { from{opacity:0;transform:translateY(14px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
  @keyframes wl-snackbar-out-down { from{opacity:1;transform:translateY(0) scale(1)}      to{opacity:0;transform:translateY(14px) scale(.97)} }
  @keyframes wl-snackbar-in-down  { from{opacity:0;transform:translateY(-14px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
  @keyframes wl-snackbar-out-up   { from{opacity:1;transform:translateY(0) scale(1)}       to{opacity:0;transform:translateY(-14px) scale(.97)} }
  .wl-snackbar[data-state="open"][data-pos^="bottom"]   { animation: wl-snackbar-in-up    0.30s cubic-bezier(.34,1.26,.64,1); }
  .wl-snackbar[data-state="closed"][data-pos^="bottom"] { animation: wl-snackbar-out-down 0.20s ease; }
  .wl-snackbar[data-state="open"][data-pos^="top"]      { animation: wl-snackbar-in-down  0.30s cubic-bezier(.34,1.26,.64,1); }
  .wl-snackbar[data-state="closed"][data-pos^="top"]    { animation: wl-snackbar-out-up   0.20s ease; }`;

// ─── Template generators ──────────────────────────────────────────────────────

function genThemeTs(theme, mode) {
  return `import { getTheme, applyThemeToCSSVars } from 'weloop-components/tokens';
import type { ThemeName, ColorMode } from 'weloop-components/tokens';

export const defaultTheme: ThemeName = '${theme}';
export const defaultMode: ColorMode  = '${mode}';

/**
 * Call once at app startup (before React renders) to apply
 * the design system CSS variables to :root.
 */
export function initWeLoopTheme() {
  const tokens = getTheme(defaultTheme, defaultMode);
  applyThemeToCSSVars(tokens);
}
`;
}

function genProviderTsx(theme, mode) {
  return `import React from 'react';
import { ThemeProvider } from 'weloop-components/tokens';
import type { ThemeName, ColorMode } from 'weloop-components/tokens';

interface WeLoopProviderProps {
  children: React.ReactNode;
  theme?: ThemeName;
  mode?: ColorMode;
}

/**
 * Wrap your app root with WeLoopProvider once.
 * All WeLoop components will automatically read
 * the active theme through CSS variables.
 *
 * Usage in main.tsx:
 *   <WeLoopProvider theme="${theme}" mode="${mode}">
 *     <App />
 *   </WeLoopProvider>
 */
export function WeLoopProvider({
  children,
  theme = '${theme}',
  mode  = '${mode}',
}: WeLoopProviderProps) {
  return (
    <ThemeProvider
      defaultTheme={theme}
      defaultMode={mode}
      applyToCSSVars
    >
      {children}
    </ThemeProvider>
  );
}
`;
}

function genMainTsx(theme, mode) {
  return `import React from 'react';
import ReactDOM from 'react-dom/client';
import { WeLoopProvider } from './weloop/Provider';
import { App } from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WeLoopProvider theme="${theme}" mode="${mode}">
      <App />
    </WeLoopProvider>
  </React.StrictMode>
);
`;
}

function genAppTsx(theme) {
  return `import React from 'react';
import {
  ButtonSingle,
  Toggle,
  InlineTip,
  Tooltip,
} from 'weloop-components';

export function App() {
  const [dark, setDark] = React.useState(false);

  return (
    <div style={{ padding: 40, fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-text-default)' }}>
        WeLoop · ${theme}
      </h1>

      <InlineTip
        type="information"
        title="WeLoop is ready."
        description="Your theme, tokens, and components are wired up."
        showLink={false}
      />

      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <ButtonSingle buttonType="primary" variant="filled" size="md">
          Primary action
        </ButtonSingle>
        <ButtonSingle buttonType="primary" variant="outline" size="md">
          Secondary
        </ButtonSingle>
        <ButtonSingle buttonType="danger" variant="outline" size="md">
          Danger
        </ButtonSingle>
      </div>

      <Tooltip content="Toggle dark mode" side="right">
        <div>
          <Toggle
            size="md"
            checked={dark}
            onChange={setDark}
            label="Dark mode"
            showLabel
          />
        </div>
      </Tooltip>
    </div>
  );
}
`;
}

function genIndexHtml(projectName) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${projectName}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <style>
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: Inter, sans-serif; background: var(--color-bg-default, #fff); color: var(--color-text-default, #000); }
      ${ANIMATION_CSS}
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;
}

function genViteConfig() {
  return `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
`;
}

function genTsConfig() {
  return `{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "baseUrl": "."
  },
  "include": ["src/**/*"]
}
`;
}

function genPackageJson(projectName, theme) {
  return JSON.stringify({
    name: projectName,
    version: '0.1.0',
    private: true,
    scripts: {
      dev:       'vite',
      build:     'vite build',
      preview:   'vite preview',
      typecheck: 'tsc --noEmit',
    },
    dependencies: {
      'react':              '^18.0.0',
      'react-dom':          '^18.0.0',
      'weloop-components':  '^2.1.0',
    },
    devDependencies: {
      '@types/react':        '^18.3.1',
      '@types/react-dom':    '^18.3.1',
      '@vitejs/plugin-react':'latest',
      'typescript':          '^5.7.2',
      'vite':                '^6.0.5',
    },
  }, null, 2) + '\n';
}

// ─── Mode A: scaffold a brand-new Vite project ────────────────────────────────
async function scaffoldNewProject(theme, mode) {
  const rawName = await ask(`\n${bold('Project name')} ${gray('(folder will be created)')} › `);
  const projectName = rawName || 'my-weloop-app';
  const dir = resolve(process.cwd(), projectName);

  if (existsSync(dir)) {
    console.log(yellow(`\n  ⚠ Folder "${projectName}" already exists. Aborting.`));
    return;
  }

  console.log(`\n  ${dim('Scaffolding')} ${cyan(projectName)} …\n`);

  write(join(dir, 'package.json'),    genPackageJson(projectName, theme));
  write(join(dir, 'vite.config.ts'),  genViteConfig());
  write(join(dir, 'tsconfig.json'),   genTsConfig());
  write(join(dir, 'index.html'),      genIndexHtml(projectName));
  write(join(dir, 'src', 'main.tsx'), genMainTsx(theme, mode));
  write(join(dir, 'src', 'App.tsx'),  genAppTsx(theme));
  write(join(dir, 'src', 'weloop', 'theme.ts'),    genThemeTs(theme, mode));
  write(join(dir, 'src', 'weloop', 'Provider.tsx'), genProviderTsx(theme, mode));

  // Print structure
  console.log(green(`  ✓ Created ${created.length} files\n`));
  console.log(bold(`  ${projectName}/`));
  console.log(gray(`  ├── package.json`));
  console.log(gray(`  ├── vite.config.ts`));
  console.log(gray(`  ├── tsconfig.json`));
  console.log(gray(`  ├── index.html            ← animation CSS included`));
  console.log(gray(`  └── src/`));
  console.log(gray(`      ├── main.tsx           ← <WeLoopProvider> wraps <App>`));
  console.log(gray(`      ├── App.tsx            ← starter page with components`));
  console.log(gray(`      └── weloop/`));
  console.log(gray(`          ├── theme.ts       ← defaultTheme="${theme}", defaultMode="${mode}"`));
  console.log(gray(`          └── Provider.tsx   ← <ThemeProvider> wrapper`));

  console.log(`\n  ${bold('Next steps:')}`);
  console.log(cyan(`    cd ${projectName}`));
  console.log(cyan(`    npm install`));
  console.log(cyan(`    npm run dev`));
}

// ─── Mode B: add WeLoop to an existing project ────────────────────────────────
async function addToExisting(theme, mode) {
  const srcDir = await ask(`\n${bold('Path to your src folder')} ${gray('(default: ./src)')} › `);
  const src = resolve(process.cwd(), srcDir || 'src');

  if (!existsSync(src)) {
    console.log(yellow(`\n  ⚠ Folder "${src}" not found. Creating it.`));
  }

  console.log(`\n  ${dim('Writing WeLoop files into')} ${cyan(src)} …\n`);

  write(join(src, 'weloop', 'theme.ts'),    genThemeTs(theme, mode));
  write(join(src, 'weloop', 'Provider.tsx'), genProviderTsx(theme, mode));

  console.log(green(`  ✓ Created ${created.length} files\n`));
  console.log(gray(`  src/weloop/`));
  console.log(gray(`  ├── theme.ts       ← defaultTheme="${theme}", defaultMode="${mode}"`));
  console.log(gray(`  └── Provider.tsx   ← <WeLoopProvider> wrapper component`));

  console.log(`\n  ${bold('1. Install the package (if not yet done):')}`);
  console.log(cyan(`     npm install weloop-components`));

  console.log(`\n  ${bold('2. Wrap your app root in main.tsx / index.tsx:')}`);
  console.log(gray(`
     import { WeLoopProvider } from './weloop/Provider';

     root.render(
       <WeLoopProvider theme="${theme}" mode="${mode}">
         <App />
       </WeLoopProvider>
     );`));

  console.log(`\n  ${bold('3. Add animation CSS to your index.html <style> block:')}`);
  console.log(dim(`     (Required for Toast and Snackbar components)`));
  console.log(gray(`
     /* WeLoop — Toast animations */
     @keyframes wl-toast-in  { from { opacity:0; transform:translateY(8px) scale(0.95); } to { opacity:1; transform:translateY(0) scale(1); } }
     @keyframes wl-toast-out { from { opacity:1; transform:translateY(0) scale(1); }    to { opacity:0; transform:translateY(8px) scale(0.95); } }
     .wl-toast[data-state="open"]   { animation: wl-toast-in  0.25s ease; }
     .wl-toast[data-state="closed"] { animation: wl-toast-out 0.18s ease; }
     /* ... (see DESIGN-SYSTEM-GENERATOR.md for full Snackbar animations) */`));

  console.log(`\n  ${bold('4. Import any component you need:')}`);
  console.log(gray(`
     import { ButtonSingle, Toggle, Dialog } from 'weloop-components';`));
}

// ─── Entry point ──────────────────────────────────────────────────────────────
async function main() {
  console.log(`\n${bold(cyan('  ◆  WeLoop Init'))}  ${dim('v2.1')}`);
  console.log(dim('  ─────────────────────────────────────────────'));
  console.log(dim('  Scaffolds a WeLoop-ready project or wires'));
  console.log(dim('  WeLoop into your existing React project.\n'));

  const modeIdx = await choose(
    'What would you like to do?',
    [
      'Create a new Vite + React project (full scaffold)',
      'Add WeLoop to my existing project',
    ],
  );

  const themeIdx = await choose(
    'Choose your brand theme:',
    [
      'webill365  — corporate blue  (#1D32FF)',
      'wabooks    — finance purple  (#0060B9)',
      'wecafe     — hospitality orange (#E7450F)',
    ],
  );
  const theme = ['webill365', 'wabooks', 'wecafe'][themeIdx];

  const modeColorIdx = await choose(
    'Default color mode:',
    ['Light', 'Dark'],
  );
  const mode = ['light', 'dark'][modeColorIdx];

  if (modeIdx === 0) {
    await scaffoldNewProject(theme, mode);
  } else {
    await addToExisting(theme, mode);
  }

  console.log(`\n  ${bold(green('Done!'))}  ${dim('Check the files above and start building.')}\n`);
  rl.close();
}

main().catch(err => {
  console.error(`\n  ${c.red}Error:${c.reset}`, err.message);
  rl.close();
  process.exit(1);
});
