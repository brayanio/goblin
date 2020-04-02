import nggt from '../nggt/nggt.js'
import Customize from './scenes/customize.js'

nggt.router({
  '/': Customize,
  'customize': Customize
})