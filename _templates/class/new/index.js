// eslint-disable-next-line
module.exports = {
  prompt: ({ prompter, args }) => {
    return generator(prompter) // Starts here...
  },
}

/**
 * All prompts (questions) for this generator.
 * @param prompter
 * @param A Answers
 */
async function generator(prompter, A = {}) {
  console.log('##### Launching Class File Generator #####')

  // Class name
  A = await question({
    answers: A,
    prompter,
    type: 'input',
    variableName: 'className',
    message: 'Class name:',
    validateFunc: (val) => {
      if (!val.length) {
        return 'Must enter class name (Example: User)'
      }
      return true
    },
    resultFunc: (val) => val.charAt(0).toUpperCase() + val.slice(1),
  })

  // Class description
  A = await question({
    answers: A,
    prompter,
    type: 'input',
    variableName: 'classDescription',
    message: 'Class description:',
    initial: `${A.className} Class`,
  })

  // Class location
  A = await question({
    answers: A,
    prompter,
    type: 'select',
    variableName: 'classLocation',
    message: 'Class location:',
    choices: ['src/models', 'src/services'],
  })

  // Is LocalDatabase store?
  if (A.classLocation == 'src/models') {
    A = await question({
      answers: A,
      prompter,
      type: 'confirm',
      variableName: 'isLocalDatabaseStore',
      message: `Class used as LocalDatabase store?`,
    })

    if (A.isLocalDatabaseStore) {
      // LocalDatabase store key name
      A = await question({
        answers: A,
        prompter,
        type: 'input',
        variableName: 'storeKey',
        message: 'LocalDatabase store key name:',
        validateFunc: (val) => {
          if (!val.length) {
            return 'Must enter store key name (Example: users)'
          }
          return true
        },
      })

      // LocalDatabase store indicies
      A = await question({
        answers: A,
        prompter,
        type: 'input',
        variableName: 'storeIndicies',
        message: 'LocalDatabase store indicies:',
        validateFunc: (val) => {
          if (!val.length) {
            return 'Must enter store indices (Example: &id, createdDate)'
          }
          return true
        },
      })
    }
  } else {
    // Only models can be LocalDatabase stores
    A = { ...A, isLocalDatabaseStore: false }
  }

  let parameters = []
  let questionCounter = 0

  const paramQuestion = {
    prompter,
    type: 'confirm',
    variableName: 'addParam',
    message: 'Add class parameter?',
  }

  // Add parameters?
  while ((await question(paramQuestion)).addParam) {
    parameters[questionCounter] = {
      // Parameter name
      name: (
        await question({
          prompter,
          type: 'input',
          variableName: 'name',
          message: `Parameter ${questionCounter + 1} name:`,
          validateFunc: (val) => {
            if (!val.length) {
              return 'Must enter parameter name (Example: createdDate)'
            }
            return true
          },
        })
      ).name,
      // Parameter type
      type: (
        await question({
          prompter,
          type: 'select',
          variableName: 'type',
          message: `Parameter ${questionCounter + 1} type:`,
          choices: [
            'string',
            'number',
            'boolean',
            'object',
            'any',
            'string[]',
            'number[]',
            'boolean[]',
            'object[]',
            'any[]',
          ],
        })
      ).type,
    }

    questionCounter += 1
  }

  // Merge parameters into answers
  A = { ...A, parameters }
  let methods = []
  questionCounter = 0

  const methodQuestion = {
    prompter,
    type: 'confirm',
    variableName: 'addMethod',
    message: 'Add class method?',
  }

  // Add methods?
  while ((await question(methodQuestion)).addMethod) {
    // Method name
    methods[questionCounter] = (
      await question({
        prompter,
        type: 'input',
        variableName: 'name',
        message: `Method ${questionCounter + 1} name:`,
        validateFunc: (val) => {
          if (!val.length) {
            return 'Must enter method name (Example: getDisplayDate)'
          }
          return true
        },
      })
    ).name

    questionCounter += 1
  }

  // Merge methods into answers
  A = { ...A, methods }
  let imports = []
  questionCounter = 0

  const importQuestion = {
    prompter,
    type: 'confirm',
    variableName: 'addImport',
    message: 'Add file import?',
  }

  // Add imports?
  while ((await question(importQuestion)).addImport) {
    // Method name
    imports[questionCounter] = (
      await question({
        prompter,
        type: 'form',
        variableName: 'importLine',
        message: `Enter file import ${questionCounter + 1}:`,
        choices: [
          { name: 'part1', message: 'import', initial: `* as example${questionCounter + 1}` },
          { name: 'part2', message: 'from', initial: `./path/to/example${questionCounter + 1}` },
        ],
        resultFunc: (val) => `import ${val.part1} from '${val.part2}'`,
      })
    ).importLine

    questionCounter += 1
  }

  // Merge imports into answers
  A = { ...A, imports }

  console.log('Answers ::', A)

  const fileCodeLines = await buildFileCodeLines(A)
  const testCodeLines = await buildTestCodeLines(A)

  console.log('File Code Lines ::', fileCodeLines)
  console.log('Test Code Lines ::', testCodeLines)

  return {
    className: A.className,
    classLocation: A.classLocation,
    fileLines: fileCodeLines,
    testLines: testCodeLines,
  }
}

/**
 * Builds the main file code lines for the EJS template.
 * @param A Answers
 * @returns codeLines array
 */
async function buildFileCodeLines(A) {
  const codeLines = []

  // File Imports
  if (A.imports.length) {
    A.imports.forEach((i) => {
      codeLines.push(i)
    })
    codeLines.push('')
  }

  // LocalDatabase Exports
  if (A.isLocalDatabaseStore) {
    codeLines.push('// Exports for LocalDatabase')
    codeLines.push(
      `export const ${A.className}Store = Object.freeze({ ${A.storeKey}: '${A.storeIndicies}' })`
    )
    codeLines.push('')
  }
  if (A.isLocalDatabaseStore && A.parameters.length) {
    codeLines.push(`export interface I${A.className} {`)
    A.parameters.forEach((p) => {
      codeLines.push(`  ${p.name}: ${p.type}`)
    })
    codeLines.push('}')
    codeLines.push('')
  }

  // Type Params
  if (A.parameters.length) {
    codeLines.push(`type ${A.className}Params = {`)
    A.parameters.forEach((p) => {
      codeLines.push(`  ${p.name}?: ${p.type}`)
    })
    codeLines.push('}')
    codeLines.push('')
  }

  // Description
  codeLines.push('/**')
  codeLines.push(` * ${A.classDescription}`)
  if (A.parameters.length) {
    A.parameters.forEach((p) => {
      codeLines.push(` * @param ${p.name}`)
    })
  }
  codeLines.push(' */')

  // Class Export
  if (A.isLocalDatabaseStore && A.parameters.length) {
    codeLines.push(`export class ${A.className} implements I${A.className} {`)
  } else {
    codeLines.push(`export class ${A.className} {`)
  }

  // Fields
  if (A.parameters.length) {
    A.parameters.forEach((p) => {
      codeLines.push(`  ${p.name}: ${p.type}`)
    })
    codeLines.push('')
  }

  // Constructor
  if (A.parameters.length) {
    codeLines.push('  constructor({')
    A.parameters.forEach((p) => {
      codeLines.push(`    ${p.name} = ${getDefaultForType(p.type)},`)
    })
    codeLines.push(`  }: ${A.className}Params = {}) {`)
    A.parameters.forEach((p) => {
      codeLines.push(`    this.${p.name} = ${p.name}`)
    })
    codeLines.push('  }')
    codeLines.push('')
  } else {
    codeLines.push('  constructor() {')
    codeLines.push(`    console.log('empty constructor')`)
    codeLines.push('  }')
    codeLines.push('')
  }

  // Methods
  if (A.methods.length) {
    A.methods.forEach((m) => {
      codeLines.push(`  ${m}(): Error {`)
      codeLines.push(`    return new Error('Not Implemented')`)
      codeLines.push('  }')
      codeLines.push('')
    })
    codeLines.pop() // Remove last newline
  }

  // Class Export - Closing Bracket
  codeLines.push('}')

  return codeLines
}

/**
 * Builds the test file code lines for the EJS template.
 * @param A Answers
 * @returns codeLines array
 */
async function buildTestCodeLines(A) {
  const codeLines = []

  codeLines.push(`import { describe, test, expect } from 'vitest'`)
  codeLines.push(`import { ${A.className} } from '../${A.className}'`)
  codeLines.push('')
  codeLines.push(`describe('${A.className}', () => {`)

  codeLines.push(`  test('should test ${A.className}', () => {`)
  codeLines.push(`    expect(new ${A.className}()).toBe(false)`)
  codeLines.push('  })')
  codeLines.push('')

  if (A.methods.length) {
    A.methods.forEach((m) => {
      codeLines.push(`  test('should test ${m} method', () => {`)
      codeLines.push('    expect(true).toBe(false)')
      codeLines.push('  })')
      codeLines.push('')
    })
  }

  codeLines.pop() // Remove last newline
  codeLines.push('})')

  return codeLines
}

/**
 * Default value getter for TypeScript type.
 * @param type
 */
function getDefaultForType(type) {
  switch (type) {
    case 'string':
      return `''`
    case 'number':
      return '100'
    case 'boolean':
      return 'false'
    case 'object':
    case 'any':
      return '{}'
    case 'string[]':
      return "['']"
    case 'number[]':
      return '[100]'
    case 'boolean[]':
      return '[false]'
    case 'object[]':
    case 'any[]':
      return '[{}]'
    default:
      return 'null'
  }
}

/**
 * Question Prompt Types:
 * - AutoComplete
 * - BasicAuth
 * - Confirm
 * - Form
 * - Input
 * - Invisible
 * - List
 * - MultiSelect
 * - Numeral
 * - Password
 * - Quiz
 * - Survey
 * - Scale
 * - Select
 * - Sort
 * - Snippet
 * - Toggle
 */
async function question({
  answers = {},
  prompter = {},
  type = 'input',
  variableName = 'varName',
  message = 'My message:',
  choices = null,
  initial = null,
  skip = false,
  formatFunc = null,
  resultFunc = null,
  validateFunc = null,
} = {}) {
  return await {
    // Spread existing answers
    ...answers,
    // Spread results of prompt with existing answers
    ...(await prompter.prompt({
      type,
      name: variableName,
      message,
      choices,
      initial,
      skip,
      format: formatFunc,
      result: resultFunc,
      validate: validateFunc,
    })),
  }
}
