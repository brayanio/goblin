import nggt from '../../nggt.js'
import Id from './id.js'

export default (dataObj, fn) => {
  let sub
  return nggt.create({
    template: Id('div', 'container', [], fn(dataObj.val())),
    run: ui => sub = dataObj.onChange(v => ui.container.innerHTML = fn(v)),
    cleanup: () => sub.cleanup()
  })
}