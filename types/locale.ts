// place it where you store your types
// import all namespaces for default language only
import home from '../public/locales/en/home.json'
import common from '../public/locales/en/common.json'

export interface Resources {
  home: typeof home
  common: typeof common
  // as many as files you have
}
