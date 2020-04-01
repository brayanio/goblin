import nggt from '../../nggt.js'
import El from './el.js'
import Join from './join.js'

export default (el, ...args) => El(el,
  ...(args.map(html => El('li', html)))
)