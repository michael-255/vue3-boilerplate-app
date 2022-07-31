export enum DexieTable {
  EXAMPLES = 'examples',
  EXAMPLE_RECORDS = 'exampleRecords',
  SETTINGS = 'settings',
  LOGS = 'logs',
}

export enum TableField {
  ID = 'id',
  CREATED_DATE = 'createdDate',
  NAME = 'name',
  DESCRIPTION = 'description',
  NOTES = 'notes',
  VALUE = 'value',
  SEVERITY = 'severity',
  CALLER_DETAILS = 'callerDetails',
  ERROR_NAME = 'errorName',
  MESSAGE = 'message',
  STACK = 'stack',
}

export enum TableAction {
  CREATE = 'Create',
  UPDATE = 'Update',
  DELETE = 'Delete',
  CLEAR = 'Clear',
  INSPECT = 'Inspect',
  REPORT = 'Report',
}

export enum SettingKey {
  DEBUG = 'DEBUG',
  NOTIFY = 'NOTIFY',
}

export enum Severity {
  DEBUG = 'Debug',
  INFO = 'Info',
  WARN = 'Warning',
  ERROR = 'Error',
  CRITICAL = 'Critical',
}
