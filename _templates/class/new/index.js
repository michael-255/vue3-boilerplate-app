// eslint-disable-next-line
module.exports = {
  prompt: ({ prompter, args }) => {
    return classGeneratorPrompts(prompter, Q)
  },
}

class HygenGenerator {
  constructor(Q = {}, A = {}, P = {}) {
    this.Q = Q // questions
    this.A = A // answers
    this.P = P // prompter
  }

  async updateAnswers(newAnswers) {
    this.A = await { ...this.A, ...newAnswers }
  }

  async runAllPrompts() {
    await updateAnswers(await initalPrompts())
  }

  async initalPrompts() {
    await updateAnswers(await Q.className())
    await updateAnswers(await Q.classDescription(A))
  }
}

/**
 * All prompts for this generator.
 * @param prompter
 * @param Q Questions
 * @param A Answers
 */
async function classGeneratorPrompts(prompter, Q, A = {}) {
  A = { ...A, ...(await initalPrompts(prompter, Q, A)) }
  A = { ...A, ...(await localDBPrompts(prompter, Q, A)) }
  A = { ...A, ...(await parameterPrompts(prompter, Q, A)) }
  A = { ...A, ...(await methodPrompts(prompter, Q, A)) }

  console.log(A)

  return prompter
}

// Prompts for basic inital information.
async function initalPrompts(prompter, Q, A) {
  A = { ...A, ...(await Q.className(prompter)) }
  A = { ...A, ...(await Q.classDescription(prompter, A)) }
  return A
}

// Prompts related to LocalDatabase.
async function localDBPrompts(prompter, Q, A) {
  A = { ...A, ...(await Q.localDB(prompter)) }

  if (A.isLocalDBStore) {
    A = { ...A, ...(await Q.localDBKey(prompter, A)) }
    A = { ...A, ...(await Q.localDBIndicies(prompter)) }
  }

  return A
}

// Class Parameter prompts.
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
    A = { ...A, parameters }
  }

  return A
}

// Class Method prompts.
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
    A = { ...A, methods }
  }

  return A
}

async function updateAnswers(A, results) {
  return await { ...A, ...results }
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
      name: 'localDBStoreKey',
      message: 'LocalDatabase store key:',
      initial: `${A.className.toLowerCase()}s`,
    })
  },

  localDBIndicies: async (prompter) => {
    return await prompter.prompt({
      type: 'input',
      name: 'localDBStoreIndices',
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
}
