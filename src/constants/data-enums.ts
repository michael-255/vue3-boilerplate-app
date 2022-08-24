/**
 * @todo
 */
export enum AppTable {
  EXAMPLES = 'examples',
  EXAMPLE_RECORDS = 'exampleRecords',
  LOGS = 'logs',
  SETTINGS = 'settings',
}

/**
 * @todo
 */
export enum ExactField {
  ID = 'id',
  CREATED_DATE = 'createdDate',
  NAME = 'name',
  DESCRIPTION = 'description',
  PARENT_ID = 'parentId',
  NUMBER = 'number',
  PRIMARY_ROUNDS = 'primaryRounds',
  SECONDARY_ROUNDS = 'secondaryRounds',
  SEVERITY = 'severity',
  DETAILS = 'details',
  MESSAGE = 'message',
  STACK = 'stack',
  KEY = 'key',
  VALUE = 'value',
}

/**
 * @todo
 */
export enum InputField {
  ID = 'id',
  CREATED_DATE = 'createdDate',
  NAME = 'name',
  DESCRIPTION = 'description',
  PARENT_ID = 'parentId',
  ROUNDS = 'rounds',
  NUMBER = 'number',
}

/**
 * @todo
 */
export enum Operation {
  NOOP = 'No Operation',
  CREATE = 'Create',
  UPDATE = 'Update',
  DELETE = 'Delete',
  CLEAR = 'Clear',
  INSPECT = 'Inspect',
  REPORT = 'Report',
}

/**
 * @todo
 */
export enum SettingKey {
  DEBUG = 'debug-logging',
  NOTIFY = 'all-alerts',
  INFO = 'save-info-logs',
}

/**
 * @todo
 */
export enum Severity {
  DEBUG = 'Debug',
  INFO = 'Info',
  WARN = 'Warning',
  ERROR = 'Error',
  CRITICAL = 'Critical',
}
