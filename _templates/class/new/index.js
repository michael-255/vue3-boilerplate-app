// eslint-disable-next-line
module.exports = {
  prompt: ({ prompter, args }) => {
    return classGeneratorPrompts(prompter, Q)
  },
}

/**
 * All prompts for this generator.
 * @param prompter
 * @param Q Questions
 * @param A Answers
 */
async function classGeneratorPrompts(prompter, Q, A = {}) {
  A = await updateAnswers(A, await initalPrompts(prompter, Q, A))
  A = await updateAnswers(A, await localDBPrompts(prompter, Q, A))
  A = await updateAnswers(A, await parameterPrompts(prompter, Q, A))
  A = await updateAnswers(A, await methodPrompts(prompter, Q, A))
  A = await updateAnswers(A, await importPrompts(prompter, Q, A))

  console.log(A)

  return prompter
}

// Initial Information Prompts
async function initalPrompts(prompter, Q, A) {
  A = await updateAnswers(A, await Q.className(prompter))
  A = await updateAnswers(A, await Q.classDescription(prompter, A))
  return A
}

// LocalDatabase Prompts
async function localDBPrompts(prompter, Q, A) {
  if ((await Q.localDB(prompter)).isLocalDBStore) {
    let LocalDatabase = {
      storeKey: (await Q.localDBKey(prompter, A)).storeKey,
      storeIndices: (await Q.localDBIndicies(prompter)).storeIndices,
    }
    A = await updateAnswers(A, { LocalDatabase })
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
    nextParam.paramDefault = (await Q.parameterDefault(prompter, paramNumber + 1)).paramDefault
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
    const nextMethod = {}
    nextMethod.methodName = (await Q.methodName(prompter, methodNumber + 1)).methodName
    methods[methodNumber] = nextMethod
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
    const nextImport = await Q.importForm(prompter, importNumber + 1)
    imports[importNumber] = nextImport
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

  localDB: async (prompter) => {
    return await prompter.prompt({
      type: 'confirm',
      name: 'isLocalDBStore',
      message: 'Is class a LocalDatabase store?',
    })
  },

  localDBKey: async (prompter, A) => {
    return await prompter.prompt({
      type: 'input',
      name: 'storeKey',
      message: 'LocalDatabase store key:',
      initial: `${A.className.toLowerCase()}s`,
    })
  },

  localDBIndicies: async (prompter) => {
    return await prompter.prompt({
      type: 'input',
      name: 'storeIndices',
      message: 'LocalDatabase store indices:',
      initial: '&id',
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

  parameterDefault: async (prompter, paramNumber) => {
    return await prompter.prompt({
      type: 'confirm',
      name: 'paramDefault',
      message: `Will parameter ${paramNumber} have a default value?`,
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
        { name: 'part1', message: 'import', initial: '* as example' },
        { name: 'pasrt2', message: 'from', initial: './example' },
      ],
    })
  },
}
