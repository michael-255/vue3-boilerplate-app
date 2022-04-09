export const DEBUG = Object.freeze(true)

const view = 'View'
const layout = 'Layout'

export const Paths = Object.freeze({
  DASHBOARD: '/dashboard',
  ABOUT: '/about',
})

export const Layouts = Object.freeze({
  DEFAULT: 'Default' + layout,
  MENU: 'Menu' + layout,
})

export const Views = Object.freeze({
  DASHBOARD: 'Dashboard' + view,
  ABOUT: 'About' + view,
  NOTFOUND: 'NotFound' + view,
})
