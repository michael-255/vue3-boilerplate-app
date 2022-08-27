/**
 * Colors for notifications and logs.
 */
export enum NotifyColor {
  LOG = 'blue-grey',
  DEBUG = 'deep-purple',
  INFO = 'primary',
  WARN = 'orange-9',
  ERROR = 'negative',
  CRITICAL = 'red-13',
}

/**
 * Material Design icons.
 */
export enum Icon {
  // Severity
  DEBUG = 'bug_report',
  INFO = 'info',
  WARN = 'warning',
  ERROR = 'error',
  CRITICAL = 'report',
  // Operations
  UNDO = 'undo',
  SAVE = 'save',
  CLOSE = 'close',
  EDIT = 'edit',
  DELETE = 'delete',
  ADD = 'add',
  REMOVE = 'remove',
  // Pages
  EXAMPLE = 'smart_toy',
  ACTIVE = 'play_arrow',
  ACTIVITIES = 'directions_run',
  RECORDS = 'web_stories',
  MEASUREMENTS = 'straighten',
  EXERCISES = 'fitness_center',
  WORKOUTS = 'assignment',
  APPLOGS = 'plagiarism',
  // Misc
  CALENDAR_DATE = 'event',
  CALENDAR_CHECK = 'event_available',
  TIME = 'access_time',
  RENEW = 'autorenew',
  DASHBOARD = 'dashboard',
  REPORT = 'timeline',
  MANAGEMENT = 'tune',
  WORKOUT = 'assignment',
  SETTINGS = 'settings',
  DETAILS = 'summarize',
  CODE = 'code',
  WEB = 'language',
  MENU = 'menu',
  HOME = 'home',
}

/**
 * App views for the router.
 */
export enum View {
  DASHBOARD = 'DashboardView',
  ACTIVE = 'ActiveView',
  EXAMPLE = 'ExampleView',
  LOGS = 'LogsView',
  SETTINGS = 'SettingsView',
  ABOUT = 'AboutView',
  NOT_FOUND = 'NotFoundView',
}

/**
 * App layouts for the router.
 */
export enum Layout {
  DEFAULT = 'DefaultLayout',
  ACTIVE = 'ActiveLayout',
  MENU = 'MenuLayout',
}

/**
 * Any links you might use throughout the app.
 */
export enum Links {
  GITHUB = 'https://github.com/michael-255',
  MYAPPS = 'https://www.example.com',
}

/**
 * Generic strings that could be used throughout the app.
 */
export enum Strings {
  APP_NAME = 'Boilerplate App',
  VERSION = '1',
}
