import nggt from '../../nggt.js'
import Id from './id.js'

export default (id, ...el) => Id('div', id, ['hidden'], ...el)