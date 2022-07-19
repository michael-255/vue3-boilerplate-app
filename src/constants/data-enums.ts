export enum DexieTable {
  EXAMPLES = 'examples',
  EXAMPLE_RECORDS = 'exampleRecords',
  LOGS = 'logs',
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
