import nggt from './nggt.js'
import Customize from './scenes/customize.js'

nggt.router({
  '/': Customize,
  'customize': Customize
})