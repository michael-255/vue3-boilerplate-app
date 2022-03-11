export const DEBUG = Object.freeze(true)

export const LocalDatabaseOptions = Object.freeze('ExampleDatabase')

export const LocalStorageOptions = Object.freeze({
  prefix: '',
  suffix: '',
  initialValue: [],
})

export const LoggerOptions = Object.freeze({
  name: 'ExampleLogger',
  debug: DEBUG,
})

export const BuildIdOptions = Object.freeze({
  segmentLengths: [4, 4, 4],
  delimiter: '-',
})
