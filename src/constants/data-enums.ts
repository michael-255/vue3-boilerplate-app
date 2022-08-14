export enum AppTable {
  EXAMPLES = 'examples',
  EXAMPLE_RECORDS = 'exampleRecords',
  LOGS = 'logs',
}

export enum SettingsTable {
  NAME = 'settings',
}

export enum Field {
  ID = 'id',
  CREATED_DATE = 'createdDate',
  NAME = 'name',
  DESCRIPTION = 'description',
  PARENT_ID = 'parentId',
  VALUE = 'value',
  SEVERITY = 'severity',
  DETAILS = 'details',
  MESSAGE = 'message',
  STACK = 'stack',
}

export enum Operation {
  NO_OP = 'No Operation',
  CREATE = 'Create',
  UPDATE = 'Update',
  DELETE = 'Delete',
  CLEAR = 'Clear',
  INSPECT = 'Inspect',
  REPORT = 'Report',
}

export enum InjectionKey {
  TABLE_INPUTS = 'AllTableInputs',
}

export enum SettingKey {
  DEBUG = 'debug-logging',
  NOTIFY = 'all-alerts',
  INFO = 'save-info-logs',
}

export enum Severity {
  DEBUG = 'Debug',
  INFO = 'Info',
  WARN = 'Warning',
  ERROR = 'Error',
  CRITICAL = 'Critical',
}
