import nggt from '../../nggt.js'
import Layout from '../layout/module.js'

export default (label, onChange, ...options) => nggt.create({
  template: Layout.Container('label', ['gl-label'], 
    label === null ? '' : Layout.El('span', label),
    Layout.Id('select', 'select', [],
      ...options
    )
  ),
  run: ui => ui.select.addEventListener('change', e => onChange(e.target.value))
})