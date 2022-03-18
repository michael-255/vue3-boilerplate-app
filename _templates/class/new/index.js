// eslint-disable-next-line
module.exports = {
  prompt: ({ prompter, args }) => {
    // Initial questions
    let questions = [nameQuestion()]
    let allAnswers = {}

    return prompter.prompt(questions).then((answers) => {
      allAnswers = {
        ...answers,
      }
      questions = [descriptionQuestion(allAnswers.name), localDBQuestion(allAnswers.name)]

      return prompter.prompt(questions).then((answers) => {
        allAnswers = {
          ...allAnswers,
          ...answers,
        }
        questions = []

        if (answers.isLocalDBStore) {
          questions.push(localDBKeyQuestion(allAnswers.name))
          questions.push(localDBIndicesQuestion())
        }

        questions.push(paramCountQuestion())

        return prompter.prompt(questions).then((answers) => {
          allAnswers = {
            ...allAnswers,
            ...answers,
          }
          questions = []

          for (let i = 0; i < answers.parameterCount; i++) {
            questions.push(parameterNameQuestion(i + 1))
            questions.push(parameterTypeQuestion(i + 1))
            questions.push(parameterDefaultQuestion(i + 1))
          }

          return prompter.prompt(questions).then((answers) => {
            allAnswers = {
              ...allAnswers,
              ...answers,
            }
            console.log(allAnswers)
          })
        })
      })
    })
  },
}

function nameQuestion() {
  return {
    type: 'input',
    name: 'name',
    message: 'Class name:',
    initial: 'Example',
  }
}

function descriptionQuestion(className) {
  return {
    type: 'input',
    name: 'description',
    message: 'Class description:',
    initial: `${className} class JSDocs.`,
  }
}

function localDBQuestion() {
  return {
    type: 'confirm',
    name: 'isLocalDBStore',
    message: 'Is class a LocalDatabase store?',
  }
}

function localDBKeyQuestion(className) {
  return {
    type: 'input',
    name: 'localDBStoreKey',
    message: 'LocalDatabase store key:',
    initial: `${className.toLowerCase()}s`,
  }
}

function localDBIndicesQuestion() {
  return {
    type: 'input',
    name: 'localDBStoreIndices',
    message: 'LocalDatabase store indices:',
    initial: '&id',
  }
}

function paramCountQuestion() {
  return {
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
  }
}

function parameterNameQuestion(parameterNumber) {
  return {
    type: 'input',
    name: `paramName_${parameterNumber}`,
    message: `Parameter ${parameterNumber} name:`,
  }
}

function parameterTypeQuestion(parameterNumber) {
  return {
    type: 'input',
    name: `paramType_${parameterNumber}`,
    message: `Parameter ${parameterNumber} type:`,
    initial: 'string',
  }
}

function parameterDefaultQuestion(parameterNumber) {
  return {
    type: 'input',
    name: `paramDefault_${parameterNumber}`,
    message: `Parameter ${parameterNumber} default value:`,
  }
}

function methodCountQuestion() {
  return {
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
  }
}

function methodNameQuestion(methodNumber) {
  return {
    type: 'input',
    name: `methodName_${methodNumber}`,
    message: `Method ${methodNumber} name:`,
  }
}
