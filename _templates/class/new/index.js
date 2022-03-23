// eslint-disable-next-line
module.exports = {
  prompt: ({ prompter, args }) => {
    return hygenGenerator(prompter, Q)
  },
}

/**
 * All prompts for this generator.
 * @param prompter
 * @param Q Questions
 * @param A Answers
 */
async function hygenGenerator(prompter, Q, A = {}) {
  // Prompts
  A = await updateAnswers(A, await initalPrompts(prompter, Q, A))
  A = await updateAnswers(A, await localDatabasePrompts(prompter, Q, A))
  A = await updateAnswers(A, await parameterPrompts(prompter, Q, A))
  A = await updateAnswers(A, await methodPrompts(prompter, Q, A))
  A = await updateAnswers(A, await importPrompts(prompter, Q, A))

  console.log('ANSWERS', A)

  const fileCodeLines = await buildFileCodeLines(A)
  const testCodeLines = await buildTestCodeLines(A)

  console.log('FILELINES', fileCodeLines)
  console.log('TESTLINES', testCodeLines)

  return { className: A.className, fileLines: fileCodeLines, testLines: testCodeLines }
}

// Initial Information Prompts
async function initalPrompts(prompter, Q, A) {
  A = await updateAnswers(A, await Q.className(prompter))
  A = await updateAnswers(A, await Q.classDescription(prompter, A))
  return A
}

// LocalDatabase Prompts
async function localDatabasePrompts(prompter, Q, A) {
  if ((await Q.localDatabase(prompter)).isLocalDatabaseStore) {
    let localDatabase = {
      storeKey: (await Q.localDatabaseKey(prompter, A)).storeKey,
      storeIndices: (await Q.localDatabaseIndicies(prompter)).storeIndices,
    }
    A = await updateAnswers(A, { localDatabase })
  }

  return A
}

// Parameter Prompts
async function parameterPrompts(prompter, Q, A) {
  let parameters = []
  let paramNumber = 0
  let isFirst = true

  while ((await Q.addParameter(prompter, isFirst)).addParam) {
    const nextParam = {}
    nextParam.paramName = (await Q.parameterName(prompter, paramNumber + 1)).paramName
    nextParam.paramType = (await Q.parameterType(prompter, paramNumber + 1)).paramType
    parameters[paramNumber] = nextParam
    paramNumber += 1
    isFirst = false
    A = await updateAnswers(A, { parameters })
  }

  return A
}

// Method Prompts
async function methodPrompts(prompter, Q, A) {
  let methods = []
  let methodNumber = 0
  let isFirst = true

  while ((await Q.addMethod(prompter, isFirst)).addMethod) {
    methods[methodNumber] = (await Q.methodName(prompter, methodNumber + 1)).methodName
    methodNumber += 1
    isFirst = false
    A = await updateAnswers(A, { methods })
  }

  return A
}

// Import Prompts
async function importPrompts(prompter, Q, A) {
  let imports = []
  let importNumber = 0
  let isFirst = true

  while ((await Q.addImport(prompter, isFirst)).addImport) {
    imports[importNumber] = (await Q.importForm(prompter, importNumber + 1)).import
    importNumber += 1
    isFirst = false
    A = await updateAnswers(A, { imports })
  }

  return A
}

// Helper that makes answer updates easier to read in code
async function updateAnswers(A, newAnswers) {
  return await { ...A, ...newAnswers }
}

// Lookup default type
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

// Builds the main file code lines for the EJS template
async function buildFileCodeLines(A) {
  const codeLines = []

  // File Imports
  if (A.imports) {
    A.imports.forEach((i) => {
      codeLines.push(`import ${i.part1} from '${i.part2}'`)
    })
    codeLines.push('')
  }

  // LocalDatabase Exports
  if (A.localDatabase) {
    codeLines.push('// Exports for LocalDatabase')
    codeLines.push(
      `export const ${A.className}Store = Object.freeze({ ${A.localDatabase.storeKey}: '${A.localDatabase.storeIndices}' })`
    )
    codeLines.push('')
  }
  if (A.localDatabase && A.parameters) {
    codeLines.push(`export interface I${A.className} {`)
    A.parameters.forEach((p) => {
      codeLines.push(`  ${p.paramName}: ${p.paramType}`)
    })
    codeLines.push('}')
    codeLines.push('')
  }

  // Type Params
  if (A.parameters) {
    codeLines.push(`type ${A.className}Params = {`)
    A.parameters.forEach((p) => {
      codeLines.push(`  ${p.paramName}?: ${p.paramType}`)
    })
    codeLines.push('}')
    codeLines.push('')
  }

  // Description
  codeLines.push('/**')
  codeLines.push(` * ${A.classDescription}`)
  if (A.parameters) {
    A.parameters.forEach((p) => {
      codeLines.push(` * @param ${p.paramName}`)
    })
  }
  codeLines.push(' */')

  // Class Export
  if (A.localDatabase && A.parameters) {
    codeLines.push(`export class ${A.className} implements I${A.className} {`)
  } else {
    codeLines.push(`export class ${A.className} {`)
  }

  // Fields
  if (A.parameters) {
    A.parameters.forEach((p) => {
      codeLines.push(`  ${p.paramName}: ${p.paramType}`)
    })
    codeLines.push('')
  }

  // Constructor
  if (A.parameters) {
    codeLines.push('  constructor({')
    A.parameters.forEach((p) => {
      codeLines.push(`    ${p.paramName} = ${getDefaultForType(p.paramType.toString())},`)
    })
    codeLines.push(`  }: ${A.className}Params = {}) {`)
    A.parameters.forEach((p) => {
      codeLines.push(`    this.${p.paramName} = ${p.paramName}`)
    })
    codeLines.push('  }')
    codeLines.push('')
  } else {
    codeLines.push('  constructor() {')
    codeLines.push(`    this.example = 'example`)
    codeLines.push('  }')
    codeLines.push('')
  }

  // Methods
  if (A.methods) {
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

// Builds the test file code lines for the EJS template
async function buildTestCodeLines(A) {
  const codeLines = []

  codeLines.push(`import { describe, test, expect } from 'vitest'`)
  codeLines.push('')
  codeLines.push(`describe('${A.className}', () => {`)

  codeLines.push(`  test('should test ${A.className}', () => {`)
  codeLines.push('    expect(true).toBe(false)')
  codeLines.push('  })')
  codeLines.push('')

  if (A.methods) {
    A.methods.forEach((m) => {
      codeLines.push(`  test('should test ${A.className}', () => {`)
      codeLines.push('    expect(true).toBe(false)')
      codeLines.push('  })')
      codeLines.push('')
    })
  }

  codeLines.pop() // Remove last newline
  codeLines.push('})')

  return codeLines
}

// Questions for the prompter
const Q = {
  className: async (prompter) => {
    return await prompter.prompt({
      type: 'input',
      name: 'className',
      message: 'Class name:',
      initial: 'Example',
    })
  },

  classDescription: async (prompter, A) => {
    return await prompter.prompt({
      type: 'input',
      name: 'classDescription',
      message: 'Class description:',
      initial: `${A.className} class JSDocs description.`,
    })
  },

  localDatabase: async (prompter) => {
    return await prompter.prompt({
      type: 'confirm',
      name: 'isLocalDatabaseStore',
      message: 'Is class a LocalDatabase store?',
    })
  },

  localDatabaseKey: async (prompter, A) => {
    return await prompter.prompt({
      type: 'input',
      name: 'storeKey',
      message: 'LocalDatabase store key:',
      initial: `${A.className.toLowerCase()}s`,
    })
  },

  localDatabaseIndicies: async (prompter) => {
    return await prompter.prompt({
      type: 'input',
      name: 'storeIndices',
      message: 'LocalDatabase store indices:',
      initial: '&id, createdDate',
    })
  },

  addParameter: async (prompter, isFirst) => {
    const another = isFirst ? 'a' : 'another'

    return await prompter.prompt({
      type: 'confirm',
      name: 'addParam',
      message: `Add ${another} class parameter?`,
    })
  },

  parameterName: async (prompter, paramNumber) => {
    return await prompter.prompt({
      type: 'input',
      name: 'paramName',
      message: `Parameter ${paramNumber} name:`,
      initial: `param${paramNumber}`,
    })
  },

  parameterType: async (prompter, paramNumber) => {
    return await prompter.prompt({
      type: 'select',
      name: 'paramType',
      message: `Parameter ${paramNumber} type:`,
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
  },

  addMethod: async (prompter, isFirst) => {
    const another = isFirst ? 'a' : 'another'

    return await prompter.prompt({
      type: 'confirm',
      name: 'addMethod',
      message: `Add ${another} class method?`,
    })
  },

  methodName: async (prompter, methodNumber) => {
    return await prompter.prompt({
      type: 'input',
      name: 'methodName',
      message: `Method ${methodNumber} name:`,
      initial: `getExample${methodNumber}`,
    })
  },

  addImport: async (prompter, isFirst) => {
    const another = isFirst ? 'an' : 'another'

    return await prompter.prompt({
      type: 'confirm',
      name: 'addImport',
      message: `Add ${another} import?`,
    })
  },

  importForm: async (prompter, importNumber) => {
    return await prompter.prompt({
      type: 'form',
      name: 'import',
      message: `Enter import ${importNumber} details:`,
      choices: [
        { name: 'part1', message: 'import', initial: `* as example${importNumber}` },
        { name: 'part2', message: 'from', initial: `./example${importNumber}` },
      ],
    })
  },
}
