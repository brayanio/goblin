import nggt from '../../nggt.js'
import Layout from '../layout/module.js'

export default (label, options, onChange) => nggt.create({
  template: Layout.Container('label', ['gl-label'], 
    Layout.If(() => label, Layout.El('span', label)),
    Layout.Id('select', 'select', [],
      Layout.Map(options, o => Layout.El('option', o))
    )
  ),
  run: ui => ui.select.addEventListener('change', e => onChange(e.target.value))
})