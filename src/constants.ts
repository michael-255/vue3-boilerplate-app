export const DEBUG = Object.freeze(true)

const view = 'View'
const layout = 'Layout'

export const Layouts = Object.freeze({
  DEFAULT: 'Default' + layout,
  SIMPLE: 'Simple' + layout,
  MENU: 'Menu' + layout,
})

export const Views = Object.freeze({
  DASHBOARD: 'Dashboard' + view,
  ABOUT: 'About' + view,
  NOTFOUND: 'NotFound' + view,
})
