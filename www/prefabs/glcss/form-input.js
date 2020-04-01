import nggt from '../../nggt.js'
import Layout from '../layout/module.js'

export default (label, attrs, dataObj) => nggt.create({
  template: Layout.Container('label', ['gl-label'],
    Layout.El('span', label),
    `<input id="input">`
  ),
  run: ui => {
    Object.keys(attrs).forEach(attr => ui.input.setAttribute(attr, attrs[attr]))
    ui.input.addEventListener('change', () => dataObj.change(ui.input.value))
  }
})