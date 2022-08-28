# Vue 3 Boilerplate App

This template should help get you started developing with Vue 3 in Vite. Read through this README to
have a better understanding of how this project is setup.

## Todos

`WIP`

## Table of Contents

- [Usage](#usage)
- [Post Cloning Steps](#post-cloning-steps)
- [Project Information](#project-information)
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

Check for outdated packages.

```sh
npm outdated
```

Update packages based on `package.json` version settings. Test if you update to the latest version.

```sh
npm upgrade
```

## Post Cloning Steps

- [ ] Update `package.json`

  - [ ] `name`
  - [ ] `description`
  - [ ] `version`
  - [ ] `repository`
  - [ ] `bugs`
  - [ ] `homepage`

- [ ] Update `README.md`

  - [ ] Remove unneeded sections (even this one)
  - [ ] Add detailed project description

- [ ] Update `GitHub` repository settings

  - [ ] Description
  - [ ] Website
  - [ ] Topics
  - [ ] The `Include in the home page` section

- [ ] Update `base` in `vite.config.ts` to your repository name for deployments to work
- [ ] Update `Strings` in `ui-enums.ts` to represent your app
- [ ] Update `title` in `~/index.html` to reflect the app name you use in `ui-enums.ts`

## Project Information

### Steps for adding models (classes) and fields

Adding a new `model` for use in the database requires some extra steps.

- Create the model in `~/src/models`

- Update `LocalDatabase` with a new table for the model

- Define the field enums in `~/src/constants` > `data-enums.ts`

- Update the field helpers in `~/src/helpers` > `*.ts`

- Update the table helpers in `~/src/helpers` > `*.ts`

- Create components for the input fields in `~/src/components`

### ES2020 Support

Support for ES2020 language features is achieved by adding `es2020` to the following files.

- `tsconfig.vitest.json`
- `tsconfig.vite-config.json`
- `tsconfig.app.json`

### UUID

Use this package to create ids.

```javascript
import { v4 as createId } from 'uuid'
const id = createId()
```

### Vue 3 (+Vite)

Initialize a new Vue 3 project with Vite and follow the prompts.

```sh
npm init vue@latest
```

### Vitest

Add the coverage flag to the test script to generate code coverage reports. You may be required to
install the `c8` package when you first run `vitest`.

```jsonc
// FILE: ~/package.json
"scripts": {
  "test": "vitest --environment jsdom --coverage"
}
```

### VSCode

Recommended extensions file.

```jsonc
// FILE: ~/.vscode/extensions.json
{
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

```jsonc
// FILE: ~/.vscode/project.code-snippets
{
  "component-vue3": {
    "scope": "vue",
    "prefix": "component (vue3)",
    "description": "TypeScript component for Vue 3",
    "body": [
      "<script setup lang=\"ts\">", // 1
      "import { ref } from 'vue'", // 2
      "const data = ref('New Component')", // 3
      "</script>\n", // 4
      "<template>", // 5
      "\t<h3>{{ data }}</h3>", // 6
      "</template>\n", // 7
      "<style></style>" // 8
    ]
  },

  "imports-vitest": {
    "scope": "typescript",
    "prefix": "import (vitest imports)",
    "description": "Common imports for vitest",
    "body": "import { describe, test, expect } from 'vitest'"
  },

  "test-vitest": {
    "scope": "typescript",
    "prefix": "test (vitest func)",
    "description": "Test function for vitest",
    "body": [
      "test('${0:testing...}', () => {", // 1
      "\texpect(true).toBe(false)", // 2
      "})" // 3
    ]
  },

  "describe-vitest": {
    "scope": "typescript",
    "prefix": "describe (vitest func)",
    "description": "Describe function for vitest",
    "body": [
      "describe('${1:Example}', () => {", // 1
      "\t${0}", // 2
      "})" // 3
    ]
  },

  "beforeEach-vitest": {
    "scope": "typescript",
    "prefix": "beforeEach (vitest func)",
    "description": "BeforeEach function for vitest",
    "body": [
      "beforeEach(() => {", // 1
      "\t${0}", // 2
      "})" // 3
    ]
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

Use the following script to build and deploy your project. It makes a copy of the `index.html` in
`dist` as `404.html` to address complications related to routing. This let's you avoid using hash
based routing.

```jsonc
// FILE: ~/package.json
"scripts": {
  "deploy": "npm run build && cd dist && cp index.html 404.html && cd .. && gh-pages -d dist -m Deployment"
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

### Dexie (IndexedDB)

Using this package to store the apps data in an easy to use local DB. I've wrapped `Dexie` with a
class called `LocalDatabase` in this project.

Installing the package.

```sh
npm i dexie
```

### Hygen

Code generator that internally makes use of the `inquirer` (or `enquirer`) package.

Install the latest version globally.

```sh
npm i -g hygen
```

Initialize in a project only **once**. You should see a `~/_templates` directory.

```sh
hygen init self
```

My Boilerplate Generators

- `class`
- `util`

Create a new Hygen generator with the following steps:

1. Create a generator **NAME** directory in `~/_templates`

   - Like `class`, `component`, or `util`

2. Create a generator **ACTION** directory in the **NAME** directory

   - Like `new`, `add`, or `help`

3. Add your generator files to the **ACTION** directory

   - `*.ejf.t`
   - `*.test.ejs.t`
   - `index.js` (if using console prompts)

You can run your generators with the following command.

```sh
hygen {NAME} {ACTION}
```

You can run your ACTION help files with the following command.

```sh
hygen {NAME} help
```

### Services

Services you can reuse in other projects located at `~/src/services/*`

- `LocalDatabase`
- `LocalStorage`
- `Logger`

### Utils

Utilities you can reuse in other projects located at `~/src/utils/*`

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
