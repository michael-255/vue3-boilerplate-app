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
  // Ask for first parameter
  A = { ...A, ...(await Q.addParameter(prompter, true)) }

  if (A.addParam) {
    const nextParam = {}
    let parameters = []
    let paramNumber = 0

    // Keep asking for parameters until user doesn't want any more
    while (A.addParam) {
      nextParam.paramName = (await Q.parameterName(prompter, paramNumber + 1)).paramName
      nextParam.paramType = (await Q.parameterType(prompter, paramNumber + 1)).paramType
      nextParam.paramDefault = (await Q.parameterDefault(prompter, paramNumber + 1)).paramDefault
      console.log(nextParam)
      parameters[paramNumber] = nextParam
      paramNumber += 1
      A = { ...A, ...(await Q.addParameter(prompter, false)) } // Do another parameter?
    }

    A = { ...A, parameters }
  }

  return A
}

async function methodPrompts(prompter, Q, A) {
  // Ask for first method
  A = { ...A, ...(await Q.addMethod(prompter, true)) }

  if (A.addMethod) {
    let methods = []
    let methodNumber = 0

    // Keep asking for methods until user doesn't want any more
    while (A.addMethod) {
      const formResult = await Q.methodForm(prompter, methodNumber + 1)
      methods[methodNumber] = { ...formResult.method }
      methodNumber += 1
      A = { ...A, ...(await Q.addMethod(prompter, false)) } // Do another method?
    }

    A = { ...A, methods }
  }

  return A
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

  methodForm: async (prompter, methodNumber) => {
    return await prompter.prompt({
      type: 'form',
      name: 'method',
      message: `Enter method ${methodNumber} details:`,
      choices: [
        { name: 'methodName', message: 'Name', initial: 'id' },
        { name: 'methodType', message: 'Type', initial: 'string' },
        { name: 'methodDefault', message: 'Default', initial: '' },
      ],
    })
  },
}
