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
  console.log('##### Launching Component File Generator #####')

  // File name
  A = await question({
    answers: A,
    prompter,
    type: 'input',
    variableName: 'fileName',
    message: 'Utility file name:',
    validateFunc: (val) => {
      if (!val.length) {
        return 'Must enter a file name (Example: my-utils)'
      }
      return true
    },
  })

  console.log('Answers ::', A)

  const fileCodeLines = await buildFileCodeLines(A)
  const testCodeLines = await buildTestCodeLines(A)

  console.log('File Code Lines ::', fileCodeLines)
  console.log('Test Code Lines ::', testCodeLines)

  return {
    fileName: A.fileName,
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

  // Utility Functions
  if (A.functions.length) {
    A.functions.forEach((f) => {
      // Type Params
      if (f.parameters.length) {
        codeLines.push(`type ${f.name}Params = {`)
        f.parameters.forEach((p) => {
          codeLines.push(`  ${p.name}?: ${p.type}`)
        })
        codeLines.push('}')
        codeLines.push('')
      }

      // Description
      codeLines.push('/**')
      codeLines.push(` * ${f.description}`)
      if (f.parameters.length) {
        f.parameters.forEach((p) => {
          codeLines.push(` * @param obj.${p.name}`)
        })
      }
      codeLines.push(' */')

      // Function Name Line
      const hasExport = f.isExportFunc ? 'export ' : ''
      const hasAsync = f.isAsyncFunc ? 'async ' : ''
      const hasVoid = f.isAsyncFunc ? 'Promise<void>' : 'void'
      if (f.parameters.length) {
        codeLines.push(`${hasExport}${hasAsync}function ${f.name}({`)
        let paramNames = []
        f.parameters.forEach((p) => {
          paramNames.push(p.name)
          codeLines.push(`  ${p.name} = ${getDefaultForType(p.type)},`)
        })
        codeLines.push(`}: ${f.name}Params = {}): ${hasVoid} {`)
        codeLines.push(`  console.log(${paramNames.toString()})`)
        codeLines.push(`}`)
      } else {
        codeLines.push(`${hasExport}${hasAsync}function ${f.name}(): ${hasVoid} {`)
        codeLines.push(`  console.log('empty function')`)
        codeLines.push(`}`)
      }
      codeLines.push('')
    })
  }

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
  codeLines.push(`import * as utils from '../${A.fileName}'`)
  codeLines.push('')
  codeLines.push(`describe('${A.fileName}', () => {`)

  codeLines.push(`  test('should test ${A.fileName} file', () => {`)
  codeLines.push(`    expect(true).toBe(false)`)
  codeLines.push('  })')
  codeLines.push('')

  if (A.functions.length) {
    A.functions.forEach((f) => {
      if (f.isExportFunc) {
        codeLines.push(`  describe('${f.name}', () => {`)
        codeLines.push(`    test('should test ${f.name} function', () => {`)
        codeLines.push(`      expect(true).toBe(false)`)
        codeLines.push('    })')
        codeLines.push('  })')
        codeLines.push('')
      }
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
