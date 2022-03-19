// eslint-disable-next-line
module.exports = {
  prompt: ({ prompter, args }) => {
    return generatorPrompts(prompter, Q)
  },
}

/**
 * All prompts for this generator.
 * @param prompter
 * @param Q Questions
 * @param A Answers
 */
async function generatorPrompts(prompter, Q, A = {}) {
  A = { ...(await Q.single.name(prompter)) }
  A = { ...(await Q.single.description(prompter, A.name)), ...A }
  A = { ...(await Q.single.localDB(prompter)), ...A }
  A = { ...(await Q.single.localDBKey(prompter, A.name)), ...A }
  A = { ...(await Q.single.localDBIndicies(prompter)), ...A }

  console.log(A)

  return prompter
}

// Questions for the prompter
const Q = {
  // One time questions
  single: {
    name: async (prompter) => {
      return await prompter.prompt({
        type: 'input',
        name: 'name',
        message: 'Class name:',
        initial: 'Example',
      })
    },

    description: async (prompter, className) => {
      return await prompter.prompt({
        type: 'input',
        name: 'description',
        message: 'Class description:',
        initial: `${className} class JSDocs description.`,
      })
    },

    localDB: async (prompter) => {
      return await prompter.prompt({
        type: 'confirm',
        name: 'isLocalDBStore',
        message: 'Is class a LocalDatabase store?',
      })
    },

    localDBKey: async (prompter, className) => {
      return await prompter.prompt({
        type: 'input',
        name: 'localDBStoreKey',
        message: 'LocalDatabase store key:',
        initial: `${className.toLowerCase()}s`,
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

    // Likely to deprecate this...
    parameterCount: async (prompter) => {
      return await prompter.prompt({
        type: 'numeral',
        name: 'parameterCount',
        message: 'Number of class parameters:',
        result(value) {
          if (value < 0) {
            return 0
          } else if (value > 20) {
            return 20
          } else {
            return Math.floor(value)
          }
        },
      })
    },

    // Likely to deprecate this...
    methodCount: async (prompter) => {
      return await prompter.prompt({
        type: 'numeral',
        name: 'methodCount',
        message: 'Number of class methods:',
        result(value) {
          if (value < 0) {
            return 0
          } else if (value > 20) {
            return 20
          } else {
            return Math.floor(value)
          }
        },
      })
    },
  }, // Single End

  // Repeated questions (looped)
  repeat: {
    parameterName: async (prompter, parameterNumber) => {
      return await prompter.prompt({
        type: 'input',
        name: `paramName_${parameterNumber}`,
        message: `Parameter ${parameterNumber} name:`,
      })
    },

    parameterType: async (prompter, parameterNumber) => {
      return await prompter.prompt({
        type: 'input',
        name: `paramType_${parameterNumber}`,
        message: `Parameter ${parameterNumber} type:`,
        initial: 'string',
      })
    },

    parameterDefault: async (prompter, parameterNumber) => {
      return await prompter.prompt({
        type: 'input',
        name: `paramDefault_${parameterNumber}`,
        message: `Parameter ${parameterNumber} default value:`,
      })
    },

    methodName: async (prompter, methodNumber) => {
      return await prompter.prompt({
        type: 'input',
        name: `methodName_${methodNumber}`,
        message: `Method ${methodNumber} name:`,
      })
    },
  }, // Repeat End
}

/**
 * Question looping example with confirmation!
 */
const collectInputs = async (prompter, inputs = []) => {
  const prompts = [
    {
      type: 'input',
      name: 'inputValue',
      message: 'Enter some input: ',
      initial: 'Hello World!',
    },
    {
      type: 'confirm',
      name: 'again',
      message: 'Enter another input? ',
      initial: false,
    },
  ]

  const { again, ...answers } = await prompter.prompt(prompts)
  const newInputs = [...inputs, answers]
  return again ? collectInputs(prompter, newInputs) : newInputs
}
