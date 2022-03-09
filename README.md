# Vue 3 Boilerplate App

This template should help get you started developing with Vue 3 in Vite.

## Table of Contents

- [Usage](#usage)
- [Project Setup](#project-setup)
- [Additional Notes](#additional-notes)

## Usage

Install the project dependencies.

```sh
npm i
```

Launch the dev server site.

```sh
npm run dev
```

Build the project `dist` directory.

```sh
npm run build
```

Run tests and coverage report (press `q` to quit).

```sh
npm test
```

Build and deploy the `dist` directory.

```sh
npm run deploy
```

## Project Setup

### Vue 3 (+Vite)

Initialize a new Vue 3 project with Vite and follow the prompts.

```sh
npm init vue@latest
```

### Vitest

Add the coverage flag to the test script to generate code coverage reports. You may be required to
install the `c8` package when you first run `vitest`.

```json
// FILE: ~/package.json
"scripts": {
  "test": "vitest --environment jsdom --coverage"
}
```

### VSCode

Recommended extensions file.

```json
// FILE: ~/.vscode/extensions.json
{
  // See http://go.microsoft.com/fwlink/?LinkId=827846
  // for the documentation about the extensions.json format
  "recommendations": [
    // Syntax highlighting for Vue/TypeScript
    "johnsoncodehk.volar",
    "johnsoncodehk.vscode-typescript-vue-plugin",
    // JavaScript linting
    "dbaeumer.vscode-eslint",
    // CSS, LESS, SCSS linting
    "stylelint.vscode-stylelint",
    // MarkDown linting
    "DavidAnson.vscode-markdownlint",
    // Code formatting
    "esbenp.prettier-vscode",
    // Git information in editor
    "eamodio.gitlens",
    // Open server in browser
    "ritwickdey.liveserver",
    // Better VSCode icons
    "pkief.material-icon-theme"
  ]
}
```

Code snippets file.

```json
// FILE: ~/.vscode/project.code-snippets
{
  "test": {
    "scope": "typescript",
    "prefix": "test (Jest 'it' func)",
    "description": "Jest test function",
    "body": ["it('${0:should test example...}', () => {", "\texpect(true).toBe(false)", "})"]
  },

  "describe": {
    "scope": "typescript",
    "prefix": "describe (Jest describe func)",
    "description": "Jest 'describe' function",
    "body": ["describe('${0:example}', () => {", "\t", "})"]
  }
}
```

### Git Ignore

Good default ignore setup for this Vue 3 project.

```bash
# FILE: ~/.gitignore
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Build files
node_modules
dist
dist-ssr

# OS files
.DS_Store
Thumbs.db
desktop.ini

# Test suite files
coverage
/cypress/videos/
/cypress/screenshots/

# Editor directories and files
# .vscode/* # Leaving .vscode on purpose
# !.vscode/extensions.json # Leaving .vscode on purpose
.idea
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# dotenv environment variables file
.env
.env.test
*.local
```

### Prettier

Create Prettier config that should work with ESLint using "eslint-config-prettier" package.

```javascript
// FILE: ~/.prettierrc.js
module.exports = {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  quoteProps: 'as-needed',
  jsxSingleQuote: true,
  trailingComma: 'es5',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',
  proseWrap: 'always',
  htmlWhitespaceSensitivity: 'css',
  vueIndentScriptAndStyle: false,
  endOfLine: 'lf',
}
```

Create Prettier ignore file so it won't format anything in the defined directories.

```bash
# FILE: ~/.prettierignore
/node_modules/**
/dist/**
/coverage/**
/logs/**
```

### Gh-pages

Install gh-pages for GitHub Pages deployments.

```sh
npm i -D gh-pages
```

Use the following script to build and deploy your project.

```json
// FILE: ~/package.json
"scripts": {
  "deploy": "npm run build && gh-pages -d dist -m Deployment"
}
```

### Chart.js

The amazing chart.js package.

```sh
npm i chart.js
```

The Vue 3 wrapper for chart.js (vue-chart-3).

```sh
npm i vue-chart-3
```

### Quasar

Install quasar and it's extras if desired (fonts, icons, etc).

```sh
npm i quasar @quasar/extras
```

Install the Quasar Vite plugin and SASS.

```sh
npm i -D @quasar/vite-plugin sass@1.32.0
```

Use the configurator tool to help setup Quasar for your specific project. It generates the files
you'll need to copy over based on your selection.

<https://quasar.dev/start/vite-plugin>

### Utils

Ported several utils with tests over that I've built over time.

`~/src/utils`

## Additional Notes

### Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) +
[Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) (and disable
Vetur) +
[TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin).

### Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI
with `vue-tsc` for type checking. In editors, we need
[TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin)
to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a
[Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669)
that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select
      `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

### Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).
