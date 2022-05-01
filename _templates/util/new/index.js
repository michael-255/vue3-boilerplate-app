// eslint-disable-next-line
module.exports = {
  prompt: ({ prompter, args }) => {
    return generator(prompter) // Starts here...
  },
}

/**
 * All prompts (questions) for this generator.
 * @arg prompter
 * @arg A Answers
 */
async function generator(prompter, A = {}) {
  console.log('##### Launching Utility File Generator #####')

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

  let imports = []
  let questionCounter = 0

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

  let functions = []
  questionCounter = 0

  const functionQuestion = {
    prompter,
    type: 'confirm',
    variableName: 'addFunction',
    message: 'Add a new function?',
  }

  // Add functions?
  while ((await question(functionQuestion)).addFunction) {
    functions[questionCounter] = {
      // Function name
      name: (
        await question({
          prompter,
          type: 'input',
          variableName: 'name',
          message: `Function ${questionCounter + 1} name:`,
          validateFunc: (val) => {
            if (!val.length) {
              return 'Must enter function name (Example: getDisplayDate)'
            }
            return true
          },
        })
      ).name,
      // Function description
      description: (
        await question({
          prompter,
          type: 'input',
          variableName: 'description',
          message: `Function ${questionCounter + 1} description:`,
          initial: 'Utility Function',
        })
      ).description,
      // Function exportable?
      isExportFunc: (
        await question({
          prompter,
          type: 'confirm',
          variableName: 'isExportFunc',
          message: 'Is function exportable?',
        })
      ).isExportFunc,
      // Function async?
      isAsyncFunc: (
        await question({
          prompter,
          type: 'confirm',
          variableName: 'isAsyncFunc',
          message: 'Is function async?',
        })
      ).isAsyncFunc,
      // Function parameters
      parameters: [],
    }

    let parameterCounter = 0

    const paramQuestion = {
      prompter,
      type: 'confirm',
      variableName: 'addParam',
      message: 'Add function parameter?',
    }

    // Add parameters?
    while ((await question(paramQuestion)).addParam) {
      functions[questionCounter].parameters[parameterCounter] = {
        // Parameter name
        name: (
          await question({
            prompter,
            type: 'input',
            variableName: 'name',
            message: `Parameter ${parameterCounter + 1} name:`,
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
            message: `Parameter ${parameterCounter + 1} type:`,
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

      parameterCounter += 1
    }

    questionCounter += 1
  }

  // Merge functions into answers
  A = { ...A, functions }

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
 * @arg A Answers
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
          codeLines.push(` * @arg obj.${p.name}`)
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
 * @arg A Answers
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
 * @arg type
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
