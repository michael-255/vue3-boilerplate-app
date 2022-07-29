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

export enum SettingKey {
  DEBUG = 'DEBUG',
  NOTIFY = 'NOTIFY',
}

/**
 * Class field
 */
export enum Field {
  ID = 'id',
  CREATED_AT = 'createdAt',
  NAME = 'name',
  DESCRIPTION = 'description',
  PARENT_ID = 'parentId',
  NOTE = 'note',
  PARENT_TYPE = 'parentType',
  VALUE = 'value',
}

export enum Severity {
  DEBUG = 'Debug',
  INFO = 'Info',
  WARN = 'Warning',
  ERROR = 'Error',
  CRITICAL = 'Critical',
}
